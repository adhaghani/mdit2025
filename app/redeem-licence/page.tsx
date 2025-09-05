"use client";
import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { MditAuroraSubtle } from "@/components/optimized-react-bits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/radix/dialog";
import {
  Form,
  FormItem,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, Copy, AlertCircle, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useDevice } from "@/contexts/device-context";
import Image from "next/image";

const formSchema = z.object({
  icNumber: z
    .string()
    .min(1, { message: "IC Number is required" })
    .regex(/^\d{6}-\d{2}-\d{4}$/, {
      message: "IC Number must be in the format XXXXXX-XX-XXXX",
    }),
});

interface LicenseResponse {
  success: boolean;
  license_key?: string;
  already_redeemed?: boolean;
  error?: string;
}

const MAX_ATTEMPTS = 5;
const COOLDOWN_MINUTES = 15;

const page = () => {
  const [licenseData, setLicenseData] = useState<LicenseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  // Initialize rate limiting from localStorage
  React.useEffect(() => {
    const storedAttempts = localStorage.getItem("license-attempts-left");
    const storedBlockEnd = localStorage.getItem("license-block-end");

    if (storedBlockEnd) {
      const blockEndTime = parseInt(storedBlockEnd);
      if (Date.now() < blockEndTime) {
        setIsBlocked(true);
        setBlockEndTime(blockEndTime);
        setAttemptsLeft(0);
      } else {
        // Block expired, reset attempts
        localStorage.removeItem("license-block-end");
        localStorage.removeItem("license-attempts-left");
        setAttemptsLeft(MAX_ATTEMPTS);
      }
    } else if (storedAttempts) {
      setAttemptsLeft(parseInt(storedAttempts));
    }
  }, []);

  // Cooldown timer effect
  React.useEffect(() => {
    if (isBlocked && blockEndTime) {
      const interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.ceil((blockEndTime - Date.now()) / 1000)
        );
        setCooldownRemaining(remaining);

        if (remaining <= 0) {
          setIsBlocked(false);
          setBlockEndTime(null);
          setAttemptsLeft(MAX_ATTEMPTS);
          localStorage.removeItem("license-block-end");
          localStorage.removeItem("license-attempts-left");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isBlocked, blockEndTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLicenseData(null);

    try {
      // Check if user is blocked
      if (isBlocked || attemptsLeft <= 0) {
        toast.error(
          isBlocked
            ? `Too many attempts. Please wait ${formatTime(
                cooldownRemaining
              )} before trying again.`
            : "You have exceeded the maximum number of attempts. Please try again later."
        );
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/redeem-license", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ icNumber: data.icNumber }),
      });

      const result: LicenseResponse = await response.json();
      setLicenseData(result);

      if (result.success) {
        toast.success(
          result.already_redeemed
            ? "License key retrieved successfully!"
            : "License key redeemed successfully!"
        );
        // Reset attempts on success
        setAttemptsLeft(MAX_ATTEMPTS);
        localStorage.removeItem("license-attempts-left");
      } else {
        // Decrement attempts on failure
        const newAttemptsLeft = attemptsLeft - 1;
        setAttemptsLeft(newAttemptsLeft);
        localStorage.setItem(
          "license-attempts-left",
          newAttemptsLeft.toString()
        );

        // Block user if no attempts left
        if (newAttemptsLeft <= 0) {
          const blockEnd = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
          setIsBlocked(true);
          setBlockEndTime(blockEnd);
          localStorage.setItem("license-block-end", blockEnd.toString());
          toast.error(
            `Too many failed attempts. You are blocked for ${COOLDOWN_MINUTES} minutes.`
          );
        } else {
          toast.error(
            `${
              result.error || "Failed to retrieve license key"
            } (${newAttemptsLeft} attempts remaining)`
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);

      // Decrement attempts on network error too
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      localStorage.setItem("license-attempts-left", newAttemptsLeft.toString());

      setLicenseData({
        success: false,
        error: "Network error. Please check your connection and try again.",
      });

      if (newAttemptsLeft <= 0) {
        const blockEnd = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
        setIsBlocked(true);
        setBlockEndTime(blockEnd);
        localStorage.setItem("license-block-end", blockEnd.toString());
        toast.error(
          `Network error. You are blocked for ${COOLDOWN_MINUTES} minutes due to too many attempts.`
        );
      } else {
        toast.error(
          `Network error occurred (${newAttemptsLeft} attempts remaining)`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyLicenseKey = async () => {
    if (licenseData?.license_key) {
      try {
        await navigator.clipboard.writeText(licenseData.license_key);
        toast.success("License key copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy license key");
      }
    }
  };

  const resetForm = () => {
    form.reset();
    setLicenseData(null);
  };

  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  return (
    <>
      {!deviceLoading && shouldReducePerformance ? (
        <>
          <div className="absolute left-0 -top-1/2 lg:-left-128 w-screen lg:w-auto lg:h-[1200px] h-auto rotate-180 overflow-hidden -z-10 pointer-events-none">
            <Image
              src={"/assets/bg-gradients/13.png"}
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left !overflow-visible"
            />
          </div>
        </>
      ) : isWebGLSupported ? (
        <div className="absolute w-full h-[300px] hidden lg:block sm:h-[500px]">
          <MditAuroraSubtle />
        </div>
      ) : null}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* HEADER REDEEM */}
        <div className="text-center space-y-4 px-4 py-32 lg:py-48 pb-24 lg:pb-12 max-w-4xl mx-auto">
          <BlurFade inView delay={0.1}>
            <Text as="h1" className="text-primary">
              Redeem Workshop Licence
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text as="p" className="text-xl">
              Thank you for attending the workshop! To find your licence key,
              please enter your IC Number.
            </Text>
          </BlurFade>
        </div>

        {/* FORM SECTION */}
        {!licenseData?.success && (
          <BlurFade inView delay={0.2}>
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Enter Your IC Number</CardTitle>
                {/* Attempts indicator */}
                {attemptsLeft < MAX_ATTEMPTS && !isBlocked && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Attempts remaining: {attemptsLeft}</span>
                    {attemptsLeft <= 2 && (
                      <div className="flex items-center text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Few attempts left</span>
                      </div>
                    )}
                  </div>
                )}
                {/* Blocked indicator */}
                {isBlocked && (
                  <div className="mt-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center text-red-800 dark:text-red-200 text-sm">
                      <X className="h-4 w-4 mr-2" />
                      <div>
                        <div className="font-medium">
                          Access temporarily blocked
                        </div>
                        <div className="text-xs text-left mt-1">
                          Try again in: {formatTime(cooldownRemaining)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="icNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IC Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="XXXXXX-XX-XXXX"
                              {...field}
                              disabled={isLoading || isBlocked}
                            />
                          </FormControl>
                          <FormDescription className="text-left">
                            Please enter your IC Number to retrieve your licence
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || isBlocked || attemptsLeft <= 0}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Retrieving licence...
                        </>
                      ) : isBlocked ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Blocked - Try again in {formatTime(cooldownRemaining)}
                        </>
                      ) : attemptsLeft <= 0 ? (
                        "No attempts remaining"
                      ) : (
                        "Get your licence key"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* SUCCESS RESULT */}
        {licenseData?.success && (
          <BlurFade inView delay={0.3}>
            <Card className="max-w-2xl mx-auto border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-green-800 dark:text-green-200">
                  {licenseData.already_redeemed
                    ? "Licence Key Retrieved"
                    : "Licence Key Redeemed Successfully!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {licenseData.already_redeemed && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Text
                      as="p"
                      className="text-blue-800 dark:text-blue-200 text-sm"
                    >
                      <AlertCircle className="inline h-4 w-4 mr-2" />
                      This licence key has been previously redeemed.
                    </Text>
                  </div>
                )}

                <div className="space-y-2">
                  <Text as="p" className="text-sm font-medium">
                    Your Licence Key:
                  </Text>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-2 bg-green-100 text-green-800 rounded-lg border font-mono text-sm break-all">
                      {licenseData.license_key}
                    </div>
                    <Button
                      size="icon"
                      onClick={copyLicenseKey}
                      className="flex-shrink-0 bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Text as="p" className="text-sm text-muted-foreground">
                    Please save this licence key securely. You will need it to
                    activate your software.
                  </Text>

                  <div className="flex gap-2">
                    <Button
                      onClick={resetForm}
                      variant={"secondary"}
                      className="flex-1"
                    >
                      Redeem Another Licence
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* ERROR RESULT */}
        {licenseData && !licenseData.success && (
          <BlurFade inView delay={0.3}>
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-red-800 dark:text-red-200">
                  Unable to Retrieve Licence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <Text as="p" className="text-red-700 dark:text-red-300">
                  {licenseData.error}
                </Text>

                <Button variant="outline" onClick={resetForm}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* DISCLAIMER SECTION */}
        <BlurFade inView delay={0.4}>
          <div className="max-w-2xl mx-auto space-y-4">
            <Text as="p" styleVariant="muted" className="text-center">
              Your data is secured and will not be shared with any third
              parties. Please read our terms of service and privacy policy for
              more information.
            </Text>
            <div className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Read Terms & Privacy Policy</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Terms of Service & Privacy Policy</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="space-y-4 text-left">
                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Data Collection and Use
                      </Text>
                      <Text as="p" className="text-sm">
                        Your IC Number was collected during the registration
                        process. This information is used to verify your
                        workshop attendance and to provide you with the
                        appropriate software licence.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Data Security
                      </Text>
                      <Text as="p" className="text-sm">
                        Your personal information is encrypted and stored
                        securely. We implement industry-standard security
                        measures to protect your data from unauthorised access.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Data Sharing
                      </Text>
                      <Text as="p" className="text-sm">
                        We do not share, sell, or distribute your personal
                        information to third parties. Your data is used
                        exclusively for purposes related to the MDIT x DOSM
                        Datathon 2025 workshop.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Licence Key Usage
                      </Text>
                      <Text as="p" className="text-sm">
                        The licence key provided is for use in the MDIT x DOSM
                        Datathon 2025 only and is tied to your workshop
                        attendance. Sharing or distributing the licence key is
                        prohibited and may result in its revocation.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Contact Information
                      </Text>
                      <Text as="p" className="text-sm">
                        If you have any questions about these terms or require
                        support, please contact us at mditxdd2025@gmail.com.
                      </Text>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

export default page;
