"use client";

import React, { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import { useDevice } from "@/contexts/device-context";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MditAuroraSubtle } from "@/components/optimized-react-bits";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Lightbulb,
  Loader2,
  Award,
  TrendingUp,
  CheckCircle2,
  Crown,
  Medal,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const BlurFade = dynamic(
  () =>
    import("@/components/magicui/blur-fade").then((m) => ({
      default: m.BlurFade,
    })),
  {
    ssr: false,
  }
);

interface VoteResult {
  nominee_id: string;
  nominee_name: string;
  vote_count: number;
  participant_votes?: number;
  guest_votes?: number;
  vote_percentage: number;
  photo_url?: string;
  team_name?: string;
  university_logo?: string;
}

interface VotingStatistics {
  total_participants: number;
  total_votes: number;
  total_participant_votes?: number;
  total_guest_votes?: number;
  participants_not_voted: number;
  voting_percentage: number;
}

interface CategoryResults {
  pitching_excellence: VoteResult[];
  critical_thinking: VoteResult[];
  ai_innovation: VoteResult[];
}

const VoteResult = () => {
  const [results, setResults] = useState<CategoryResults | null>(null);
  const [statistics, setStatistics] = useState<VotingStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const {
    isWebGLSupported,
    shouldReducePerformance,
    isLoading: deviceLoading,
  } = useDevice();

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/vote/results");
      const data = await response.json();

      if (data.success && data.results) {
        // The API returns results and statistics directly from the database function
        const categoryResults: CategoryResults = {
          pitching_excellence: data.results.pitching_excellence.map(
            (item: any) => ({
              nominee_id: item.nominee_id,
              nominee_name: item.nominee_name,
              vote_count: item.vote_count,
              participant_votes: item.participant_votes,
              guest_votes: item.guest_votes,
              vote_percentage: 0, // Will calculate below
              photo_url: item.photo_url,
              team_name: item.team_name,
              university_logo: item.university_logo,
            })
          ),
          critical_thinking: data.results.critical_thinking.map(
            (item: any) => ({
              nominee_id: item.nominee_id,
              nominee_name: item.nominee_name,
              vote_count: item.vote_count,
              participant_votes: item.participant_votes,
              guest_votes: item.guest_votes,
              vote_percentage: 0, // Will calculate below
              photo_url: item.photo_url,
              university_logo: item.university_logo,
            })
          ),
          ai_innovation: data.results.ai_innovation.map((item: any) => ({
            nominee_id: item.nominee_id,
            nominee_name: item.nominee_name,
            vote_count: item.vote_count,
            participant_votes: item.participant_votes,
            guest_votes: item.guest_votes,
            vote_percentage: 0, // Will calculate below
            photo_url: item.photo_url,
            university_logo: item.university_logo,
          })),
        };

        // Calculate percentages for each category
        Object.keys(categoryResults).forEach((category) => {
          const results = categoryResults[category as keyof CategoryResults];
          const totalVotes = results.reduce(
            (sum, item) => sum + item.vote_count,
            0
          );

          results.forEach((item) => {
            item.vote_percentage =
              totalVotes > 0 ? (item.vote_count / totalVotes) * 100 : 0;
          });
        });

        setResults(categoryResults);
        setStatistics(data.statistics);
        setLastUpdated(new Date());
      } else {
        toast.error(data.error || "Failed to fetch results");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchResults, 30000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pitching_excellence":
        return Trophy;
      case "critical_thinking":
        return Users;
      case "ai_innovation":
        return Lightbulb;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pitching_excellence":
        return "from-yellow-500 to-amber-500";
      case "critical_thinking":
        return "from-blue-500 to-indigo-500";
      case "ai_innovation":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "pitching_excellence":
        return "Pitching Excellence Award";
      case "critical_thinking":
        return "Critical Thinking & Defence Award";
      case "ai_innovation":
        return "AI Driven Innovation Award";
      default:
        return category;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
            <Crown className="h-5 w-5" />
            <span className="font-bold">1st</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Medal className="h-5 w-5" />
            <span className="font-bold">2nd</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
            <Medal className="h-5 w-5" />
            <span className="font-bold">3rd</span>
          </div>
        );
      default:
        return (
          <span className="text-muted-foreground font-semibold">
            #{index + 1}
          </span>
        );
    }
  };

  if (isLoading && !results) {
    return (
      <>
        {!deviceLoading && shouldReducePerformance ? (
          <div className="absolute left-0 -top-1/2 lg:-left-128 w-screen lg:w-auto lg:h-[1200px] h-auto rotate-180 overflow-hidden -z-10 pointer-events-none">
            <Image
              src={"/assets/bg-gradients/13.png"}
              alt="Background Gradient"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-left !overflow-visible"
            />
          </div>
        ) : isWebGLSupported ? (
          <div className="absolute w-full h-[300px] hidden lg:block sm:h-[500px]">
            <MditAuroraSubtle />
          </div>
        ) : null}

        <div className="min-h-screen flex items-center justify-center px-4">
          <BlurFade inView delay={0.1}>
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                <Text as="h3" className="font-semibold mb-2">
                  Loading Results
                </Text>
                <Text as="p" className="text-muted-foreground">
                  Please wait while we fetch the voting results...
                </Text>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Background */}
      {!deviceLoading && shouldReducePerformance ? (
        <div className="absolute left-0 -top-1/2 lg:-left-128 w-screen lg:w-auto lg:h-[1200px] h-auto rotate-180 overflow-hidden -z-10 pointer-events-none">
          <Image
            src={"/assets/bg-gradients/13.png"}
            alt="Background Gradient"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-left !overflow-visible"
          />
        </div>
      ) : isWebGLSupported ? (
        <div className="absolute w-full h-[300px] hidden lg:block sm:h-[500px]">
          <MditAuroraSubtle />
        </div>
      ) : null}

      {/* Header */}
      <div className="text-center space-y-4 px-4 py-32 lg:py-48 pb-24 lg:pb-12 max-w-4xl mx-auto">
        <BlurFade inView delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-primary" />
            <Text as="h1" className="text-primary">
              Voting Results
            </Text>
          </div>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <Text as="p" className="text-xl">
            MDIT x DOSM Datathon 2025 Special Awards
          </Text>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <Text as="p" className="text-muted-foreground">
            Live results for all three award categories
          </Text>
        </BlurFade>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Statistics Cards */}
        {statistics && (
          <BlurFade inView delay={0.25}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-1"
                      >
                        Total Participants
                      </Text>
                      <Text as="h3" className="text-2xl font-bold">
                        {statistics.total_participants}
                      </Text>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-1"
                      >
                        Participant Votes
                      </Text>
                      <Text as="h3" className="text-2xl font-bold">
                        {statistics.total_participant_votes || 0}
                      </Text>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-1"
                      >
                        Guest Votes
                      </Text>
                      <Text as="h3" className="text-2xl font-bold">
                        {statistics.total_guest_votes || 0}
                      </Text>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-1"
                      >
                        Pending Votes
                      </Text>
                      <Text as="h3" className="text-2xl font-bold">
                        {statistics.participants_not_voted}
                      </Text>
                    </div>
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text
                        as="p"
                        className="text-sm text-muted-foreground mb-1"
                      >
                        Participation
                      </Text>
                      <Text as="h3" className="text-2xl font-bold">
                        {statistics.voting_percentage.toFixed(1)}%
                      </Text>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurFade>
        )}

        {/* Refresh Button and Last Updated */}
        <BlurFade inView delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {lastUpdated && (
                <>
                  <span>Last updated:</span>
                  <span className="font-medium">
                    {lastUpdated.toLocaleTimeString()}
                  </span>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchResults}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Refresh Results
                </>
              )}
            </Button>
          </div>
        </BlurFade>

        {/* Results for Each Category */}
        {results &&
          (Object.keys(results) as Array<keyof CategoryResults>).map(
            (category, categoryIndex) => {
              const categoryResults = results[category];
              const Icon = getCategoryIcon(category);

              return (
                <BlurFade
                  key={category}
                  inView
                  delay={0.35 + categoryIndex * 0.1}
                >
                  <Card className="mb-8">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(
                            category
                          )}`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">
                            {getCategoryTitle(category)}
                          </CardTitle>
                          <Text
                            as="p"
                            className="text-sm text-muted-foreground mt-1"
                          >
                            {categoryResults.length} nominees • Top results
                            shown
                          </Text>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categoryResults.length > 0 ? (
                          categoryResults.map((result, index) => {
                            const maxVotes =
                              categoryResults[0]?.vote_count || 1;
                            const percentage =
                              (result.vote_count / maxVotes) * 100;

                            return (
                              <div
                                key={result.nominee_id}
                                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                                  index === 0
                                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                                    : index === 1
                                    ? "border-gray-400 bg-gray-50 dark:bg-gray-950/20"
                                    : index === 2
                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                                    : "border-muted bg-background"
                                }`}
                              >
                                {/* Progress Bar Background */}
                                <div
                                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />

                                <div className="relative flex items-center gap-4">
                                  {/* Rank Badge */}
                                  <div className="flex-shrink-0 w-12 text-center">
                                    {getRankBadge(index)}
                                  </div>

                                  {/* Photo (if available) */}
                                  {result.photo_url && (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted border-2 border-background">
                                      <Image
                                        src={result.photo_url}
                                        alt={result.nominee_name}
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                      />
                                    </div>
                                  )}

                                  {/* Nominee Info */}
                                  <div className="flex-1 min-w-0">
                                    <Text
                                      as="p"
                                      className="font-semibold text-lg truncate"
                                    >
                                      {result.nominee_name}
                                    </Text>
                                    {result.team_name && (
                                      <Text
                                        as="p"
                                        className="text-sm text-muted-foreground truncate"
                                      >
                                        {result.team_name}
                                      </Text>
                                    )}
                                  </div>

                                  {/* University Logo */}
                                  {result.university_logo && (
                                    <div className="relative w-8 h-8 flex-shrink-0">
                                      <Image
                                        src={result.university_logo}
                                        alt="University Logo"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                      />
                                    </div>
                                  )}

                                  {/* Vote Count */}
                                  <div className="flex-shrink-0 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                      <Badge
                                        variant={
                                          index < 3 ? "default" : "outline"
                                        }
                                        className="text-lg px-3 py-1"
                                      >
                                        {result.vote_count} vote
                                        {result.vote_count !== 1 ? "s" : ""}
                                      </Badge>
                                      {result.participant_votes !== undefined &&
                                        result.guest_votes !== undefined && (
                                          <div className="flex gap-2 text-xs">
                                            <span className="text-blue-600 dark:text-blue-400">
                                              👥 {result.participant_votes}
                                            </span>
                                            <span className="text-purple-600 dark:text-purple-400">
                                              🌐 {result.guest_votes}
                                            </span>
                                          </div>
                                        )}
                                    </div>
                                    <Text
                                      as="p"
                                      className="text-xs text-muted-foreground mt-1"
                                    >
                                      {percentage.toFixed(1)}%
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8">
                            <Text as="p" className="text-muted-foreground">
                              No votes submitted yet
                            </Text>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>
              );
            }
          )}

        {/* Footer Note */}
        <BlurFade inView delay={0.6}>
          <div className="space-y-4">
            <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <Text
                      as="p"
                      className="text-sm text-purple-800 dark:text-purple-200"
                    >
                      <strong>Vote Breakdown:</strong> 👥 represents participant
                      votes, 🌐 represents guest votes. Note: Only 2 eligible
                      presenters per team can be voted for in the Pitching
                      Excellence Award (20 total nominees).
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <Text
                      as="p"
                      className="text-sm text-blue-800 dark:text-blue-200"
                    >
                      <strong>Live Results:</strong> These results update
                      automatically every 30 seconds during the voting period.
                      The final winners will be announced at the awards
                      ceremony.
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </>
  );
};

export default VoteResult;
