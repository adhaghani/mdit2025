"use client";
import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { CheckCircle, Copy, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

const page = () => {
  const [licenseData, setLicenseData] = useState<LicenseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      } else {
        toast.error(result.error || "Failed to retrieve license key");
      }
    } catch (error) {
      console.error("Error:", error);
      setLicenseData({
        success: false,
        error: "Network error. Please check your connection and try again.",
      });
      toast.error("Network error occurred");
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

  return (
    <>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* HEADER REDEEM */}
        <div className="text-center space-y-4 px-4 py-32 lg:py-48 max-w-4xl mx-auto">
          <BlurFade inView delay={0.1}>
            <Text as="h1" className="text-primary">
              Redeem Workshop License
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text as="p" className="text-xl">
              Thank you for attending the workshop! To find your license key,
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
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormDescription className="text-left">
                            Please enter your IC Number to retrieve your license
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Retrieving license...
                        </>
                      ) : (
                        "Get your license key"
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
                    ? "License Key Retrieved"
                    : "License Key Redeemed Successfully!"}
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
                      This license key has been previously redeemed.
                    </Text>
                  </div>
                )}

                <div className="space-y-2">
                  <Text as="label" className="text-sm font-medium">
                    Your License Key:
                  </Text>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border font-mono text-sm break-all">
                      {licenseData.license_key}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyLicenseKey}
                      className="flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Text as="p" className="text-sm text-muted-foreground">
                    Please save this license key securely. You will need it to
                    activate your software.
                  </Text>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Redeem Another License
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
                  Unable to Retrieve License
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
                        We collect your IC number solely for the purpose of
                        license key redemption. This information is used to
                        verify your workshop attendance and provide you with the
                        appropriate software license.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Data Security
                      </Text>
                      <Text as="p" className="text-sm">
                        Your personal information is encrypted and stored
                        securely. We implement industry-standard security
                        measures to protect your data from unauthorized access.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Data Sharing
                      </Text>
                      <Text as="p" className="text-sm">
                        We do not share, sell, or distribute your personal
                        information to third parties. Your data is used
                        exclusively for MDIT 2025 workshop-related purposes.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        License Key Usage
                      </Text>
                      <Text as="p" className="text-sm">
                        The license key provided is for personal use only and is
                        tied to your workshop attendance. Sharing or
                        distributing the license key is prohibited and may
                        result in license revocation.
                      </Text>
                    </div>

                    <div>
                      <Text as="h4" className="font-semibold mb-2">
                        Contact Information
                      </Text>
                      <Text as="p" className="text-sm">
                        If you have any questions about these terms or need
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
