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
  User,
  Shield,
  CheckCircle2,
  Vote,
  Users,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import Image from "next/image";

const formSchema = z.object({
  icNumber: z
    .string()
    .min(1, { message: "IC Number is required" })
    .regex(/^\d{6}-\d{2}-\d{4}$/, {
      message: "IC Number must be in the format XXXXXX-XX-XXXX",
    }),
});

interface VotingData {
  success: boolean;
  data?: {
    participants: any[];
    teams: any[];
    currentParticipant: any;
  };
  participantTeam?: any;
  has_voted?: boolean;
  error?: string;
}

interface VoteSubmission {
  success: boolean;
  message?: string;
  vote?: {
    pitchingExcellence: string;
    criticalThinking: string;
    aiInnovation: string;
  };
  error?: string;
}

const MAX_ATTEMPTS = 5;
const COOLDOWN_MINUTES = 15;

const VotingPage = () => {
  const [step, setStep] = useState<
    "login" | "pitching" | "critical" | "innovation" | "review" | "confirmation"
  >("login");
  const [votingData, setVotingData] = useState<VotingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  // Voting selections
  const [selectedVotes, setSelectedVotes] = useState({
    pitchingExcellence: "",
    criticalThinking: "",
    aiInnovation: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icNumber: "",
    },
  });

  // Initialize rate limiting from localStorage
  React.useEffect(() => {
    const storedAttempts = localStorage.getItem("voting-attempts-left");
    const storedBlockEnd = localStorage.getItem("voting-block-end");

    if (storedBlockEnd) {
      const blockEndTime = parseInt(storedBlockEnd);
      if (Date.now() < blockEndTime) {
        setIsBlocked(true);
        setBlockEndTime(blockEndTime);
        setAttemptsLeft(0);
      } else {
        // Block expired, reset attempts
        localStorage.removeItem("voting-block-end");
        localStorage.removeItem("voting-attempts-left");
        setAttemptsLeft(MAX_ATTEMPTS);
      }
    } else if (storedAttempts) {
      setAttemptsLeft(parseInt(storedAttempts));
    }
  }, []);

  // Cooldown timer effect
  React.useEffect(() => {
    if (isBlocked && blockEndTime) {
      const timer = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.ceil((blockEndTime - Date.now()) / 1000)
        );
        setCooldownRemaining(remaining);

        if (remaining === 0) {
          setIsBlocked(false);
          setBlockEndTime(null);
          setAttemptsLeft(MAX_ATTEMPTS);
          localStorage.removeItem("voting-block-end");
          localStorage.removeItem("voting-attempts-left");
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockEndTime]);

  const onLoginSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isBlocked) {
      toast.error(
        `You are blocked for ${Math.ceil(
          cooldownRemaining / 60
        )} more minutes due to too many failed attempts.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/vote/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ icNumber: data.icNumber }),
      });

      const result: VotingData = await response.json();
      setVotingData(result);

      if (result.success) {
        if (result.has_voted) {
          toast.error("You have already submitted your votes.");
        } else {
          toast.success("Login successful! You can now vote.");
          setStep("pitching");
          // Reset attempts on success
          setAttemptsLeft(MAX_ATTEMPTS);
          localStorage.removeItem("voting-attempts-left");
        }
      } else {
        // Decrement attempts on failure
        const newAttemptsLeft = attemptsLeft - 1;
        setAttemptsLeft(newAttemptsLeft);
        localStorage.setItem(
          "voting-attempts-left",
          newAttemptsLeft.toString()
        );

        // Block user if no attempts left
        if (newAttemptsLeft <= 0) {
          const blockEnd = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
          setIsBlocked(true);
          setBlockEndTime(blockEnd);
          localStorage.setItem("voting-block-end", blockEnd.toString());
          toast.error(
            `Too many failed attempts. You are blocked for ${COOLDOWN_MINUTES} minutes.`
          );
        } else {
          toast.error(
            `${
              result.error || "Failed to authenticate"
            } (${newAttemptsLeft} attempts remaining)`
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoteSubmission = async () => {
    if (
      !selectedVotes.pitchingExcellence ||
      !selectedVotes.criticalThinking ||
      !selectedVotes.aiInnovation
    ) {
      toast.error("Please make all three selections before submitting.");
      return;
    }

    // Check participant data
    if (!votingData?.data?.currentParticipant) {
      toast.error("Participant data not found. Please log in again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/vote/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          icNumber: form.getValues("icNumber"),
          votes: selectedVotes,
        }),
      });

      const result: VoteSubmission = await response.json();

      if (result.success) {
        toast.success(
          result.message || "Your votes have been submitted successfully!"
        );

        setStep("confirmation");
      } else {
        toast.error(
          result.error || "Failed to submit votes. Please try again."
        );
      }
    } catch (error) {
      console.error("Vote submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderLoginStep = () => (
    <>
      <BlurFade delay={0.25} className="w-full max-w-md mx-auto">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Vote className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              MDIT 2025 Voting
            </CardTitle>
            <Text as="p" className="text-muted-foreground">
              Enter your IC number to participate in voting
            </Text>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onLoginSubmit)}
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
                          className="text-center"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your IC number in the format XXXXXX-XX-XXXX
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isBlocked && attemptsLeft < MAX_ATTEMPTS && (
                  <div className="flex items-center justify-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                    <Text as="p" className="text-sm text-amber-800">
                      {attemptsLeft} attempts remaining
                    </Text>
                  </div>
                )}

                {isBlocked && (
                  <div className="flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                    <Text as="p" className="text-sm text-red-800">
                      Blocked for {formatTime(cooldownRemaining)} due to too
                      many failed attempts
                    </Text>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isBlocked}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Authenticate & Continue
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </BlurFade>
      <BlurFade delay={0.35} className="w-full max-w-md mx-auto">
        <Card className="w-full max-w-md mx-auto mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <Text
                  as="p"
                  className="text-sm font-medium text-blue-800 dark:text-blue-200"
                >
                  Voting Guidelines
                </Text>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <li>
                    • You cannot vote for yourself in the Pitching Excellence
                    Award
                  </li>
                  <li>
                    • You cannot vote for your own team in any team category
                  </li>
                  <li>• Each participant can only vote once</li>
                  <li>• All three categories must be completed to submit</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </>
  );

  // Progress indicator
  const getStepNumber = () => {
    switch (step) {
      case "login":
        return 1;
      case "pitching":
        return 2;
      case "critical":
        return 3;
      case "innovation":
        return 4;
      case "review":
        return 5;
      case "confirmation":
        return 6;
      default:
        return 1;
    }
  };

  const renderProgressIndicator = () => {
    if (step === "login" || step === "confirmation") return null;

    return (
      <BlurFade delay={0.1}>
        <Card className="w-full max-w-2xl mx-auto mb-6">
          <CardContent>
            <div className="flex flex-col gap-4 items-center justify-between">
              <Text as="p" className="text-sm font-medium">
                Step {getStepNumber() - 1} of 4
              </Text>
              <div className="flex space-x-2">
                {[2, 3, 4, 5].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`w-3 h-3 rounded-full ${
                      stepNum <= getStepNumber()
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    );
  };

  const renderPitchingStep = () => {
    if (!votingData?.data) return null;

    const { participants, currentParticipant } = votingData.data;

    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <BlurFade delay={0.25}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Pitching Excellence Award
              </CardTitle>
              <Text as="p" className="text-muted-foreground">
                {currentParticipant
                  ? `Welcome, ${currentParticipant.participant_name}! Select the best individual pitcher.`
                  : "Select the best individual pitcher."}
              </Text>
            </CardHeader>
          </Card>
        </BlurFade>

        <BlurFade delay={0.35}>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participants.map((participant) => (
                  <Card
                    key={participant.participant_id}
                    className={`cursor-pointer transition-all ${
                      selectedVotes.pitchingExcellence ===
                      participant.participant_id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() =>
                      setSelectedVotes((prev) => ({
                        ...prev,
                        pitchingExcellence: participant.participant_id,
                      }))
                    }
                  >
                    <CardContent className="text-center">
                      <Image
                        src={participant.participant_photo_url}
                        alt={participant.participant_name}
                        width={80}
                        height={80}
                        className="rounded-lg w-full aspect-square mx-auto mb-3 object-cover"
                      />
                      <Text as="p" className="font-semibold">
                        {participant.participant_name}
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        {participant.teams?.team_name}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.45}>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Button
              onClick={() => setStep("login")}
              variant="outline"
              size="lg"
            >
              Back to Login
            </Button>
            <Button
              onClick={() => setStep("critical")}
              size="lg"
              disabled={!selectedVotes.pitchingExcellence}
            >
              Next: Critical Thinking
            </Button>
          </div>
        </BlurFade>
      </div>
    );
  };

  const renderCriticalStep = () => {
    if (!votingData?.data) return null;

    const { teams } = votingData.data;

    return (
      <div className="w-full  max-w-5xl mx-auto space-y-6">
        <BlurFade delay={0.25}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                Critical Thinking Award
              </CardTitle>
              <Text as="p" className="text-muted-foreground">
                Select the team with the best critical thinking and
                problem-solving skills.
              </Text>
            </CardHeader>
          </Card>
        </BlurFade>

        <BlurFade delay={0.35}>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card
                    key={team.team_id}
                    className={`cursor-pointer transition-all ${
                      selectedVotes.criticalThinking === team.team_id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() =>
                      setSelectedVotes((prev) => ({
                        ...prev,
                        criticalThinking: team.team_id,
                      }))
                    }
                  >
                    <CardContent>
                      <Image
                        src={team.team_group_photo_url}
                        alt={team.team_name}
                        width={80}
                        height={80}
                        className="rounded-lg aspect-5/4 w-full bg-background mx-auto mb-3"
                      />
                      <div className="w-full flex justify-start items-center gap-2">
                        <Image
                          src={team.team_university_logo_url}
                          alt={team.team_university_name + " Logo"}
                          width={100}
                          height={80}
                          className="rounded-lg aspect-video bg-white p-2 max-w-[200px] object-contain"
                        />
                        <div>
                          <Text as="p" className="font-semibold">
                            {team.team_name}
                          </Text>
                          <Text
                            as="p"
                            className="text-xs text-muted-foreground"
                          >
                            {team.team_university_name}
                          </Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.45}>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Button
              onClick={() => setStep("pitching")}
              variant="outline"
              size="lg"
            >
              Back: Pitching Excellence
            </Button>
            <Button
              onClick={() => setStep("innovation")}
              size="lg"
              disabled={!selectedVotes.criticalThinking}
            >
              Next: AI Innovation
            </Button>
          </div>
        </BlurFade>
      </div>
    );
  };

  const renderInnovationStep = () => {
    if (!votingData?.data) return null;

    const { teams } = votingData.data;

    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <BlurFade delay={0.25}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Users className="h-6 w-6 text-green-500" />
                AI Innovation Award
              </CardTitle>
              <Text as="p" className="text-muted-foreground">
                Select the team with the most innovative AI solution and
                approach.
              </Text>
            </CardHeader>
          </Card>
        </BlurFade>

        <BlurFade delay={0.35}>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card
                    key={team.team_id}
                    className={`cursor-pointer transition-all ${
                      selectedVotes.aiInnovation === team.team_id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() =>
                      setSelectedVotes((prev) => ({
                        ...prev,
                        aiInnovation: team.team_id,
                      }))
                    }
                  >
                    <CardContent>
                      <Image
                        src={team.team_group_photo_url}
                        alt={team.team_name}
                        width={80}
                        height={80}
                        className="rounded-lg aspect-5/4 w-full bg-background mx-auto mb-3"
                      />
                      <div className="w-full flex justify-start items-center gap-2">
                        <Image
                          src={team.team_university_logo_url}
                          alt={team.team_university_name + " Logo"}
                          width={100}
                          height={80}
                          className="rounded-lg aspect-video bg-white p-2 max-w-[200px] object-contain"
                        />
                        <div>
                          <Text as="p" className="font-semibold">
                            {team.team_name}
                          </Text>
                          <Text
                            as="p"
                            className="text-xs text-muted-foreground"
                          >
                            {team.team_university_name}
                          </Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.45}>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Button
              onClick={() => setStep("critical")}
              variant="outline"
              size="lg"
            >
              Back: Critical Thinking
            </Button>
            <Button
              onClick={() => setStep("review")}
              size="lg"
              disabled={!selectedVotes.aiInnovation}
            >
              Review & Submit
            </Button>
          </div>
        </BlurFade>
      </div>
    );
  };

  const renderReviewStep = () => {
    if (!votingData?.data) return null;

    const { participants, teams } = votingData.data;

    // Find selected nominees
    const selectedParticipant = participants.find(
      (p) => p.participant_id === selectedVotes.pitchingExcellence
    );
    const selectedCriticalTeam = teams.find(
      (t) => t.team_id === selectedVotes.criticalThinking
    );
    const selectedInnovationTeam = teams.find(
      (t) => t.team_id === selectedVotes.aiInnovation
    );

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <BlurFade delay={0.25}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Review Your Votes
              </CardTitle>
              <Text as="p" className="text-muted-foreground">
                Please review your selections before submitting.
              </Text>
            </CardHeader>
          </Card>
        </BlurFade>

        {/* Review Cards */}
        <div className="grid gap-6">
          <BlurFade delay={0.35}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Pitching Excellence Award
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {selectedParticipant && (
                  <>
                    <Image
                      src={selectedParticipant.participant_photo_url}
                      alt={selectedParticipant.participant_name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                    <div>
                      <Text as="p" className="font-semibold">
                        {selectedParticipant.participant_name}
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        {selectedParticipant.teams?.team_name}
                      </Text>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.45}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Critical Thinking Award
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {selectedCriticalTeam && (
                  <>
                    <Image
                      src={selectedCriticalTeam.team_group_photo_url}
                      alt={selectedCriticalTeam.team_name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                    <div>
                      <Text as="p" className="font-semibold">
                        {selectedCriticalTeam.team_name}
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        {selectedCriticalTeam.team_university_name}
                      </Text>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.55}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  AI Innovation Award
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                {selectedInnovationTeam && (
                  <>
                    <Image
                      src={selectedInnovationTeam.team_group_photo_url}
                      alt={selectedInnovationTeam.team_name}
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                    <div>
                      <Text as="p" className="font-semibold">
                        {selectedInnovationTeam.team_name}
                      </Text>
                      <Text as="p" className="text-sm text-muted-foreground">
                        {selectedInnovationTeam.team_university_name}
                      </Text>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        <BlurFade delay={0.65}>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <Button
              onClick={() => setStep("innovation")}
              variant="outline"
              size="lg"
            >
              Back: AI Innovation
            </Button>
            <Button
              onClick={handleVoteSubmission}
              size="lg"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit All Votes
                </>
              )}
            </Button>
          </div>
        </BlurFade>
      </div>
    );
  };

  const renderConfirmationStep = () => (
    <BlurFade delay={0.25} className="w-full max-w-md mx-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Votes Submitted!</CardTitle>
          <Text as="p" className="text-muted-foreground">
            Thank you for participating in MDIT 2025 voting. Your votes have
            been recorded successfully.
          </Text>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </BlurFade>
  );

  return (
    <main className="relative overflow-hidden">
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

      <div className="py-32 lg:py-48 relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {renderProgressIndicator()}
          {step === "login" && renderLoginStep()}
          {step === "pitching" && renderPitchingStep()}
          {step === "critical" && renderCriticalStep()}
          {step === "innovation" && renderInnovationStep()}
          {step === "review" && renderReviewStep()}
          {step === "confirmation" && renderConfirmationStep()}
        </div>
      </div>
    </main>
  );
};

export default VotingPage;
