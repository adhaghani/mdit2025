import { ReactNode } from "react";

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineStatus = "completed" | "in-progress" | "pending";
export type TimelineColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "destructive";

export interface TimelineElement {
  id: number;
  date: string;
  title: string;
  description: string;
  icon?: ReactNode | (() => ReactNode);
  status?: TimelineStatus;
  color?: TimelineColor;
  size?: TimelineSize;
  loading?: boolean;
  error?: string;
}

export interface TimelineProps {
  items: TimelineElement[];
  size?: TimelineSize;
  animate?: boolean;
  iconColor?: TimelineColor;
  connectorColor?: TimelineColor;
  className?: string;
}

export interface CompetitionPhase {
  phase: string;
  date: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: string;
}

export interface CompetitionHighlight {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  gradient: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Organizer {
  name: string;
  logo: string;
  logoLight?: string;
  logoAlt: string;
  width: number;
  height: number;
  className: string;
}

export interface Sponsor {
  logo: string;
  logoAlt: string;
  name: string;
  width: number;
  height: number;
  className: string;
}

export interface MediaPartner {
  logo: string;
  logoAlt: string;
  name: string;
  width: number;
  height: number;
  className: string;
}

export interface MarqueeImageData {
  src: string;
  alt: string;
}

export interface SponsorDialogProps {
  sponsor: {
    name: string;
    logo: string;
    logoAlt: string;
    tier: string;
    description?: string;
    website?: string;
    industry?: string;
    founded?: string;
    headquarters?: string;
  };
  children: React.ReactNode;
}

export interface QuickLink {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SupportOption {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "secondary";
}

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface ErrorAction {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "destructive";
}

export interface ErrorSolution {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "outline" | "secondary";
}

export interface MaintenanceInfo {
  title: string;
  description: string;
  estimatedDuration: string;
  startTime: Date;
  endTime: Date;
  reason: string;
  status: "scheduled" | "in-progress" | "completed";
}

export interface MaintenanceUpdate {
  timestamp: Date;
  message: string;
  type: "info" | "warning" | "success";
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  description: string;
  link: string;
}

export interface SocialPlatform {
  name: string;
  handle: string;
  link: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
  cardClass: string;
  iconBg: string;
  titleClass: string;
  linkClass: string;
}
