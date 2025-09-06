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
import {
  CheckCircle,
  Copy,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
  Globe,
  GraduationCap,
  Play,
  User,
  Lock,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useDevice } from "@/contexts/device-context";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  icNumber: z
    .string()
    .min(1, { message: "IC Number is required" })
    .regex(/^\d{6}-\d{2}-\d{4}$/, {
      message: "IC Number must be in the format XXXXXX-XX-XXXX",
    }),
});

interface CredentialResponse {
  success: boolean;
  username?: string;
  password?: string;
  already_redeemed?: boolean;
  error?: string;
}

const MAX_ATTEMPTS = 5;
const COOLDOWN_MINUTES = 15;

const page = () => {
  const [credentialData, setCredentialData] =
    useState<CredentialResponse | null>(null);
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
    setCredentialData(null);

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

      const result: CredentialResponse = await response.json();
      setCredentialData(result);

      if (result.success) {
        toast.success(
          result.already_redeemed
            ? "User credentials retrieved successfully!"
            : "User credentials redeemed successfully!"
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
              result.error || "Failed to retrieve user credentials"
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

      setCredentialData({
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

  const copyUsernameCredentials = async () => {
    if (credentialData?.username) {
      try {
        await navigator.clipboard.writeText(credentialData.username);
        toast.success("Username copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy username");
      }
    }
  };

  const copyPasswordCredentials = async () => {
    if (credentialData?.password) {
      try {
        await navigator.clipboard.writeText(credentialData.password);
        toast.success("Password copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy password");
      }
    }
  };

  const resetForm = () => {
    form.reset();
    setCredentialData(null);
  };

  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  return (
    <>
      {/* User Interafce */}
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
      {/* Page Content */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* HEADER REDEEM */}
        <div className="text-center space-y-4 px-4 py-32 lg:py-48 pb-24 lg:pb-12 max-w-4xl mx-auto">
          <BlurFade inView delay={0.1}>
            <Text as="h1" className="text-primary">
              Redeem Workshop Credentials
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text as="p" className="text-xl">
              Thank you for attending the workshop! To find your login
              credentials, please enter your IC Number.
            </Text>
          </BlurFade>
        </div>

        {/* FORM SECTION */}
        {!credentialData?.success && (
          <BlurFade inView delay={0.2} className="px-4">
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
                            Please enter your IC Number to retrieve your
                            credentials
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
                          Retrieving credentials...
                        </>
                      ) : isBlocked ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Blocked - Try again in {formatTime(cooldownRemaining)}
                        </>
                      ) : attemptsLeft <= 0 ? (
                        "No attempts remaining"
                      ) : (
                        "Get your credentials"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* SUCCESS RESULT */}
        {credentialData?.success && (
          <>
            <BlurFade inView delay={0.3} className="px-4">
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-green-800 dark:text-green-200 text-xl">
                    {credentialData.already_redeemed
                      ? "🎉 Credentials Retrieved"
                      : "🎉 Credentials Redeemed Successfully!"}
                  </CardTitle>
                  <Text
                    as="p"
                    className="text-green-700 dark:text-green-300 text-sm mt-2"
                  >
                    Your workshop access is now ready
                  </Text>
                </CardHeader>

                <CardContent className="space-y-6">
                  {credentialData.already_redeemed && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
                          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <Text
                          as="p"
                          className="text-blue-800 dark:text-blue-200 text-sm"
                        >
                          <span className="font-medium">
                            Previously Retrieved:
                          </span>{" "}
                          These credentials have been accessed before.
                        </Text>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <Text
                        as="p"
                        className="text-lg font-semibold text-green-800 dark:text-green-200"
                      >
                        Your Secure Login Credentials
                      </Text>
                    </div>

                    {/* Username Credential */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl opacity-50"></div>
                      <div className="relative p-4 border border-blue-200 dark:border-blue-800 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <Text
                            as="p"
                            className="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wide"
                          >
                            Username
                          </Text>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="flex-1 group">
                            <div className="relative">
                              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-blue-900 dark:text-blue-100 rounded-lg border border-blue-200 dark:border-blue-700 font-mono text-base font-medium break-all transition-all duration-200 group-hover:shadow-md">
                                {credentialData.username}
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={copyUsernameCredentials}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Password Credential */}
                    <div className="group relative">
                      <div className="relative p-4 border border-purple-200 dark:border-purple-800 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <Text
                            as="p"
                            className="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wide"
                          >
                            Password
                          </Text>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="flex-1 group">
                            <div className="relative">
                              <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 text-purple-900 dark:text-purple-100 rounded-lg border border-purple-200 dark:border-purple-700 font-mono text-base font-medium break-all transition-all duration-200 group-hover:shadow-md">
                                {credentialData.password}
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={copyPasswordCredentials}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                        <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <Text
                          as="p"
                          className="text-amber-800 dark:text-amber-200 text-sm font-medium mb-1"
                        >
                          Security Reminder
                        </Text>
                        <Text
                          as="p"
                          className="text-amber-700 dark:text-amber-300 text-xs"
                        >
                          Keep these credentials secure and don't share them.
                          You'll need both to access the workshop platform.
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2 hiddem sm:block" />
                      Redeem Another Set of Credentials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            {/* Enhanced Cards Section */}
            <BlurFade inView delay={0.4} className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Environment Link Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800">
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-blue-800 dark:text-blue-200 text-lg">
                      Workshop Environment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <Text
                      as="p"
                      className="text-sm text-blue-700 dark:text-blue-300"
                    >
                      Access the MicroStrategy workshop environment to start
                      your data analytics journey.
                    </Text>
                    <Link
                      href="https://autotrial.microstrategy.com/MicroStrategyLibrary/"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors group"
                    >
                      <span>Launch Environment</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Academic Program Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 dark:border-emerald-800">
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                      <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-emerald-800 dark:text-emerald-200 text-lg">
                      Academic Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <Text
                      as="p"
                      className="text-sm text-emerald-700 dark:text-emerald-300"
                    >
                      Students with valid school email can join the academic
                      program for extended access.
                    </Text>
                    <Link
                      href="https://www.strategysoftware.com/education/academic-program"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors group"
                    >
                      <span>Join Program</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Tutorial Videos Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 dark:border-purple-800">
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                      <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-purple-800 dark:text-purple-200 text-lg">
                      Tutorial Videos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <Text
                      as="p"
                      className="text-sm text-purple-700 dark:text-purple-300"
                    >
                      Free comprehensive tutorials to help you master the
                      platform and tools.
                    </Text>
                    <Link
                      href="https://www.strategysoftware.com/video/strategy-tutorials"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors group"
                    >
                      <span>Watch Tutorials</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          </>
        )}

        {/* ERROR RESULT */}
        {credentialData && !credentialData.success && (
          <BlurFade inView delay={0.3} className="px-4">
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-red-800 dark:text-red-200">
                  Unable to Retrieve Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <Text as="p" className="text-red-700 dark:text-red-300">
                  {credentialData.error}
                </Text>

                <Button variant="outline" onClick={resetForm}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* DISCLAIMER SECTION */}
        <BlurFade inView delay={0.4} className="px-4">
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
                        Credential Usage
                      </Text>
                      <Text as="p" className="text-sm">
                        The credential provided is for use in the MDIT x DOSM
                        Datathon 2025 only and is tied to your workshop
                        attendance. Sharing or distributing the credential is
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
