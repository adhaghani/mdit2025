"use client";

import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text } from "@/components/ui/text";
import { useDevice } from "@/contexts/device-context";
import Image from "next/image";
import { toast } from "sonner";
import { MditAuroraSubtle } from "@/components/optimized-react-bits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertCircle,
  Loader2,
  Award,
  Download,
  FileText,
} from "lucide-react";

const formSchema = z.object({
  icNumber: z
    .string()
    .min(1, { message: "IC Number is required" })
    .regex(/^\d{6}-\d{2}-\d{4}$/, {
      message: "IC Number must be in the format XXXXXX-XX-XXXX",
    }),
});

interface CertificateData {
  success: boolean;
  message?: string;
  data?: {
    participant_name: string;
    certificate_url: string;
    claimed_at: string;
  };
  has_claimed?: boolean;
  certificate_url?: string;
  error?: string;
}

const ClaimCertificatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);

  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setCertificateData(null);

    try {
      const response = await fetch("/api/certificate/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ icNumber: data.icNumber }),
      });

      const result: CertificateData = await response.json();

      if (result.success) {
        setCertificateData(result);
        toast.success("Certificate claimed successfully!");
      } else {
        if (result.has_claimed) {
          setCertificateData(result);
          toast.info("You have already claimed your certificate.");
        } else {
          toast.error(result.error || "Failed to claim certificate");
        }
      }
    } catch (error) {
      console.error("Error claiming certificate:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (
    certificateUrl: string,
    participantName: string
  ) => {
    try {
      // Open the certificate URL in a new tab for download
      window.open(certificateUrl, "_blank");
      toast.success("Opening certificate for download...");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate. Please try again.");
    }
  };

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
        {/* HEADER */}
        <div className="text-center space-y-4 px-4 py-32 lg:py-48 pb-24 lg:pb-12 max-w-4xl mx-auto">
          <BlurFade inView delay={0.1}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-12 w-12 text-primary" />
              <Text as="h1" className="text-primary">
                Claim E-Certificate
              </Text>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Text as="p" className="text-xl">
              Thank you for participating in MDIT x DOSM Datathon 2025!
            </Text>
          </BlurFade>
          <BlurFade inView delay={0.2}>
            <Text as="p" className="text-muted-foreground">
              Enter your IC number to claim and download your participation
              certificate.
            </Text>
          </BlurFade>
        </div>

        {/* CLAIM FORM */}
        <div className="px-4 pb-20">
          <BlurFade inView delay={0.25}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  Certificate Claim
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!certificateData ? (
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
                                className="text-center text-lg"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter your IC number in the format XXXXXX-XX-XXXX
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Claiming Certificate...
                          </>
                        ) : (
                          <>
                            <Award className="mr-2 h-5 w-5" />
                            Claim Certificate
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    {/* Success Message */}
                    <div className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-12 w-12" />
                      <div className="text-left">
                        <Text as="h3" className="font-semibold text-xl">
                          {certificateData.has_claimed
                            ? "Already Claimed"
                            : "Certificate Claimed!"}
                        </Text>
                        <Text as="p" className="text-sm">
                          {certificateData.message ||
                            "Your certificate is ready to download"}
                        </Text>
                      </div>
                    </div>

                    {/* Participant Info */}
                    {certificateData.data && (
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <Text
                            as="p"
                            className="text-sm text-muted-foreground"
                          >
                            Participant Name:
                          </Text>
                          <Text as="p" className="font-semibold">
                            {certificateData.data.participant_name}
                          </Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text
                            as="p"
                            className="text-sm text-muted-foreground"
                          >
                            Claimed At:
                          </Text>
                          <Text as="p" className="font-semibold">
                            {new Date(
                              certificateData.data.claimed_at
                            ).toLocaleString()}
                          </Text>
                        </div>
                      </div>
                    )}

                    {/* Download Button */}
                    <Button
                      onClick={() =>
                        handleDownload(
                          certificateData.data?.certificate_url ||
                            certificateData.certificate_url ||
                            "",
                          certificateData.data?.participant_name ||
                            "participant"
                        )
                      }
                      className="w-full"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Certificate
                    </Button>

                    {/* Claim Another Button */}
                    <Button
                      onClick={() => {
                        setCertificateData(null);
                        form.reset();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Claim Another Certificate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Information Card */}
          <BlurFade inView delay={0.3}>
            <Card className="max-w-2xl mx-auto mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <Text
                      as="p"
                      className="text-sm text-blue-800 dark:text-blue-200"
                    >
                      <strong>Important Notes:</strong>
                    </Text>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                      <li>
                        Each participant can only claim their certificate once
                      </li>
                      <li>
                        Make sure to enter your IC number correctly in the
                        format XXXXXX-XX-XXXX
                      </li>
                      <li>
                        Certificates are available for all registered
                        participants
                      </li>
                      <li>
                        If you encounter any issues, please contact the
                        organizers
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </>
  );
};

export default ClaimCertificatePage;
