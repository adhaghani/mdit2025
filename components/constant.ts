import {
  DoorOpenIcon,
  DoorClosedIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  MegaphoneIcon,
  PresentationIcon,
  CrownIcon,
  AlignJustifyIcon,
  ListCheckIcon,
  CalendarIcon,
  TrophyIcon,
  GraduationCapIcon,
  AwardIcon,
  Users2Icon,
  BrainIcon,
} from "lucide-react";

export const FAQ = [
  {
    question: "What is MDIT 2025?",
    answer:
      "MDIT 2025 (Malaysia Data Innovation Talent) is a national inter-varsity datathon competition aimed at fostering innovation and collaboration among students in the fields of computer science and mathematics. This competition motivates participants to think critically about data studies and become skilled in precise and transparent analysis.",
  },
  {
    question: "Who can participate in MDIT 2025?",
    answer:
      "MDIT 2025 is open to all university students currently enrolled in Malaysian institutions. This includes both undergraduate and postgraduate students, as well as international students studying in Malaysia. Teams must consist of 3-4 members, all from the same university.",
  },
  {
    question: "What is the registration fee and when is the deadline?",
    answer:
      "The registration fee is RM150.00 per team (non-refundable). Registration opens on August 15, 2025, and closes on August 30, 2025, at 11:59 PM. Limited slots are available on a first-come, first-served basis.",
  },
  {
    question: "What are the team requirements?",
    answer:
      "Teams must have 3-4 members maximum, with at least 3 members required to participate. All team members must be from the same university. Mixed-year teams are allowed (undergraduate and postgraduate students can team up). Each participant can only be part of one team.",
  },
  {
    question: "When does the competition take place?",
    answer:
      "The competition period runs from September 6, 2025, to October 18, 2025. The final presentations for finalists will be held on October 17, 2025, with the winner announcement and closing ceremony on October 18, 2025.",
  },
  {
    question: "What programming languages and tools can we use?",
    answer:
      "Teams may use any programming language or analytical tools they prefer. Popular choices include Python, R, SQL, Java, and various data science libraries. Virtual environments are encouraged for reproducibility, and version control (Git) is strongly recommended.",
  },
  {
    question: "Will datasets be provided or do we need to find our own?",
    answer:
      "Datasets will be provided at the start of the competition. Teams must use only the provided dataset - external data sources are strictly prohibited. This ensures fairness and focuses the competition on analytical skills rather than data collection.",
  },
  {
    question: "What should be included in our final submission?",
    answer:
      "Final submissions must include: complete code with proper comments, a PDF report (maximum 20 pages), documentation for reproducibility, and presentation slides if you reach the finals. The complete submission package must be under 100MB in file size.",
  },
  {
    question: "How will teams be judged?",
    answer:
      "Teams will be evaluated based on: Technical Innovation (25%), Data Analysis Quality (25%), Practical Application (20%), Presentation & Communication (15%), and Code Quality & Documentation (15%). The top 10 teams will be selected as finalists for live pitching.",
  },
  {
    question: "Is there a prize pool?",
    answer:
      "Yes! MDIT 2025 features a substantial prize pool for winning teams. Specific prize amounts and categories will be announced closer to the competition date. All finalists will receive recognition and certificates.",
  },
  {
    question: "Do I need to be physically present for the competition?",
    answer:
      "The competition is conducted in a hybrid format - both online and physical participation. The initial competition phase can be completed remotely, but finalists may need to attend the final presentation in person. Specific venue details will be announced later.",
  },
  {
    question: "What technical support is available during the competition?",
    answer:
      "Technical support is available during business hours (Mon-Fri, 9:00 AM - 5:00 PM). For urgent matters during the competition period, emergency WhatsApp support (+60 12-345 6789) is available 24/7 from September 6-October 18, 2025.",
  },
  {
    question: "Can international students participate?",
    answer:
      "Yes, international students currently enrolled in Malaysian universities are eligible to participate. However, all team members must be from the same Malaysian institution.",
  },
  {
    question: "What happens if we submit late?",
    answer:
      "Late submissions will not be accepted under any circumstances. The deadline is October 18, 2025, at 11:59 PM. We strongly recommend submitting well before the deadline to avoid any technical issues.",
  },
  {
    question: "How do we register and what documents are needed?",
    answer:
      "Registration is done through our online platform (details will be announced). You'll need to provide: complete team information, all team members' student IDs, valid university enrollment verification, and team leader's active contact information.",
  },
  {
    question: "Can we change team members after registration?",
    answer:
      "Team changes after registration are generally not allowed to maintain fairness. In exceptional circumstances, please contact our support team immediately. Any changes must be approved by the organizing committee.",
  },
  {
    question: "Who are the organizers and partners?",
    answer:
      "MDIT 2025 is organized by the INSTATS club of Universiti Teknologi MARA (UiTM) Shah Alam, with support from the Faculty of Computer Science and Mathematics UiTM Shah Alam, and in collaboration with the Department of Statistics Malaysia (DOSM).",
  },
  {
    question:
      "What should I do if I encounter technical issues during submission?",
    answer:
      "Contact our technical support team immediately through the contact page or emergency WhatsApp line. Document the issue with screenshots if possible. For last-minute submission issues, our emergency support line is available 24/7 during competition dates.",
  },
];

export const PROGRAM_TIMELINE = [
  {
    icon: DoorOpenIcon,
    date: new Date(2025, 7, 15),
    event: "Registration Opens",
    details: "Registration for MDIT 2025 opens.",
    extendedDetails: {
      time: "12:00 AM GMT+8",
      location: "Online Platform",
      description:
        "Teams can begin their registration process through the official MDIT website. Early registration is encouraged as slots are limited and allocated on a first-come, first-served basis.",
      requirements: [
        "Complete team registration form",
        "Payment of RM150 registration fee",
        "Upload required documents",
      ],
    },
  },
  {
    icon: DoorClosedIcon,
    date: new Date(2025, 7, 30),
    event: "Registration Closes",
    details: "Registration for MDIT 2025 closes.",
    extendedDetails: {
      time: "11:59 PM GMT+8",
      location: "Online Platform",
      description:
        "Final deadline for team registration. No late registrations will be accepted after this date.",
      requirements: [
        "Final payment confirmation",
        "Complete documentation",
        "Team member verification",
      ],
    },
  },
  {
    icon: SparklesIcon,
    date: new Date(2025, 8, 6),
    event: "Opening Ceremony & Competition Briefing",
    details:
      "Covers competition briefing and pitching essentials to guide your team toward an effective project presentation.",
    extendedDetails: {
      time: "To be Announced",
      location: "Online Platform",
      description:
        "Official launch of MDIT 2025 featuring keynote speeches, competition briefing.It will covers competition briefing and pitching essentials to guide your team toward an effective project presentation.",
      requirements: [
        "Team attendance (minimum 1 representative)",
        "Stable internet connection for online participants",
        "Notebook for taking notes",
      ],
    },
  },
  {
    icon: SparklesIcon,
    date: new Date(2025, 8, 6),
    event: "Software Workshops",
    details:
      "Learn to enhance your project using statistical and data visualization tools.",
    extendedDetails: {
      time: "TBA",
      location: "Online Platform",
      description:
        "Online Software Workshops, team will be guided on using various statistical and data visualization tools effectively. This will help teams enhance their projects with advanced analytical techniques and visualization methods.",
      requirements: [
        "Team attendance (minimum 1 representative)",
        "Stable internet connection for online participants",
        "Notebook for taking notes",
      ],
    },
  },
  {
    icon: PlayIcon,
    date: new Date(2025, 8, 21),
    event: "Preliminary Round Begins",
    details:
      "Submission window is now open for your team to upload their report, dashboard, and video.",
    extendedDetails: {
      time: "9:00 AM GMT+8",
      location: "Online Platform",
      description:
        "Teams can start submitting their preliminary reports, dashboards, and presentation videos. This phase allows teams to showcase their initial findings and solutions.",
      requirements: [
        "Complete technical report (PDF)",
        "Data dashboard/visualization",
        "Presentation Video",
      ],
    },
  },
  {
    icon: PauseIcon,
    date: new Date(2025, 9, 15),
    event: "Submission Period Ended",
    details:
      "All your submitted materials will now proceed to the evaluation phase.",
    extendedDetails: {
      time: "11:59 PM GMT+8",
      location: "Online",
      description:
        "The competition concludes. All teams must ensure their final submissions are uploaded before the deadline. No late submissions will be accepted.",
      requirements: [
        "Complete technical report (PDF)",
        "Data dashboard/visualization",
        "5-minute presentation video",
      ],
    },
  },
  {
    icon: AlignJustifyIcon,
    date: new Date(2025, 9, 16),
    event: "Evaluation Period Begins",
    details: "Shortlisting of groups begins.",
    extendedDetails: {
      time: "9:00 AM GMT+8",
      location: "Judge Panel Review",
      description:
        "Expert judges begin comprehensive evaluation of all submissions based on technical excellence, innovation, presentation quality, and practical applicability.",
      requirements: [
        "Judge panel coordination",
        "Scoring rubric application",
        "Detailed feedback preparation",
      ],
    },
  },
  {
    icon: ListCheckIcon,
    date: new Date(2025, 9, 16),
    event: "Top 10 Finalists Announced",
    details: "Shortlisting of groups is completed.",
    extendedDetails: {
      time: "6:00 PM GMT+8",
      location: "Online Announcement",
      description:
        "The top 10 finalist teams are announced and will be invited to present their solutions live to the expert panel during the final presentation session.",
      requirements: [
        "Official notification to finalists",
        "Final presentation guidelines",
        "Travel coordination for physical attendance",
      ],
    },
  },
  {
    icon: PresentationIcon,
    date: new Date(2025, 9, 17),
    event: "Final Presentations",
    details: "Finalists present their pitches live to expert judges.",
    extendedDetails: {
      time: "9:00 AM - 5:00 PM GMT+8",
      location: "To be Announced",
      description:
        "Finalist teams deliver 15-minute presentations followed by 10-minute Q&A sessions with industry experts, government officials, and academic leaders.",
      requirements: [
        "Physical attendance required",
        "Presentation slides",
        "Demo-ready solutions",
        "Professional attire",
      ],
    },
  },
  {
    icon: CrownIcon,
    date: new Date(2025, 9, 18),
    event: "Awards Ceremony & Closing",
    details: "Winners are announced and the event concludes.",
    extendedDetails: {
      time: "2:00 PM - 6:00 PM GMT+8",
      location: "To be Announced",
      description:
        "Grand finale featuring winner announcements, prize distribution, networking sessions, and celebration dinner. Recognition of all participants and appreciation for sponsors and partners.",
      requirements: [
        "Attendance for prize collection",
        "Networking opportunities",
        "Group photos and media sessions",
      ],
    },
  },
];

export const ABOUT_MDIT_HOME = [
  {
    Title: "Objective of MDIT",
    Content:
      "This competition aims to ignite the minds of participants, motivating them to think critically about data studies and become skilled in precise and transparent data analysis. In addition, it provides an exciting platform to educate the public about the important field of statistics and its wide-ranging influence.",
  },
  {
    Title: "Goals of MDIT",
    Content:
      "The goal of MDIT 2025 is to create a society that values responsible data and information management. Participants will use their diverse talents to develop innovative dashboards that effectively communicate statistical insights to the community.",
  },
  {
    Title: "What will Participants Gain?",
    Content:
      "Participants will gain valuable experience in data science and analytics, enhancing their skills in data visualization, statistical analysis, and problem-solving. They will also have the opportunity to network with industry professionals and showcase their talents on a national platform.",
  },
];

export const FOOTER_QUICK_LINK = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Event Details",
    href: "/event-details",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Rules & Regulation",
    href: "/rules-regulation",
  },
  {
    title: "FAQ",
    href: "/frequently-asked-questions",
  },
];

export const MDIT2024_IMAGE = [
  {
    src: "/assets/mdit2024/DSC_0088.jpg",
    alt: "MDIT 2024 Image 1",
  },
  {
    src: "/assets/mdit2024/DSC_0148.jpg",
    alt: "MDIT 2024 Image 2",
  },
  {
    src: "/assets/mdit2024/DSC_0180.jpg",
    alt: "MDIT 2024 Image 3",
  },
  {
    src: "/assets/mdit2024/DSC_0198.jpg",
    alt: "MDIT 2024 Image 4",
  },
  {
    src: "/assets/mdit2024/DSC_0216.jpg",
    alt: "MDIT 2024 Image 5",
  },
  {
    src: "/assets/mdit2024/DSC_0248.jpg",
    alt: "MDIT 2024 Image 6",
  },
  {
    src: "/assets/mdit2024/DSC_0290.jpg",
    alt: "MDIT 2024 Image 7",
  },
];

export const MDIT2023_IMAGE = [
  {
    src: "/assets/mdit2023/DSC_0127.jpg",
    alt: "MDIT 2023 Image 1",
  },
  {
    src: "/assets/mdit2023/DSC_0133.jpg",
    alt: "MDIT 2023 Image 2",
  },
  {
    src: "/assets/mdit2023/DSC_0141.jpg",
    alt: "MDIT 2023 Image 3",
  },
  {
    src: "/assets/mdit2023/DSC_0143.jpg",
    alt: "MDIT 2023 Image 4",
  },
  {
    src: "/assets/mdit2023/DSC_0194.jpg",
    alt: "MDIT 2023 Image 5",
  },
  {
    src: "/assets/mdit2023/DSC_0221.jpg",
    alt: "MDIT 2023 Image 6",
  },
  {
    src: "/assets/mdit2023/DSC_0239.jpg",
    alt: "MDIT 2023 Image 7",
  },
  {
    src: "/assets/mdit2023/DSC_0255.jpg",
    alt: "MDIT 2023 Image 8",
  },
  {
    src: "/assets/mdit2023/DSC_0256.jpg",
    alt: "MDIT 2023 Image 9",
  },
];

export const KEY_STATISTICS = [
  { label: "Total Prize Pool", value: "RM 11,000", icon: TrophyIcon },
  { label: "Universities", value: "10+", icon: GraduationCapIcon },
  { label: "Expected Teams", value: "80+", icon: Users2Icon },
  { label: "Competition Days", value: "12", icon: CalendarIcon },
];

export const COMPETITION_HIGHLIGHTS = [
  {
    icon: TrophyIcon,
    title: "Massive Prize Pool",
    description: "RM11,000 in total prizes with RM3,500 for first place",
    color: " text-yellow-600 dark:text-yellow-400",
    bgColor: " bg-yellow-50 dark:bg-yellow-900/30",
  },
  {
    icon: BrainIcon,
    title: "Real-World Datasets",
    description:
      "Opportunity to push yourself to work with Open Data provided by DOSM such as OpenDOSM, e-Statistik, StatsDW IDL facility",
    color: " text-blue-600 dark:text-blue-400",
    bgColor: " bg-blue-50 dark:bg-blue-900/30",
  },
  {
    icon: PresentationIcon,
    title: "Industry Exposure",
    description: "Present to experts from Maybank, SAS and DOSM",
    color: " text-green-600 dark:text-green-400",
    bgColor: " bg-green-50 dark:bg-green-900/30",
  },
  {
    icon: AwardIcon,
    title: "National Recognition",
    description: "Prestigious competition with certificates and trophies",
    color: " text-purple-600 dark:text-purple-400",
    bgColor: " bg-purple-50 dark:bg-purple-900/30",
  },
  {
    icon: CrownIcon,
    title: "Collaborative Under Pressure",
    description:
      "manage conflict, manage responsibilities, handle time constraints, and deliver your work under pressure.",
    color: " text-purple-600 dark:text-purple-400",
    bgColor: " bg-purple-50 dark:bg-purple-900/30",
  },
];

// Judge interface for type safety
interface Judge {
  name: string;
  title: string;
  bio: string;
}

export const EVENT_JUDGES: Judge[] = [
  // {
  //   name: "AHMAD ADHA BIN MOHD GHANI",
  //   title: "PwC Trust Ambassador, PwC Malaysia",
  //   bio: "Ahmad Adha is a seasoned professional with extensive experience in data analytics and business intelligence, currently serving as a PwC Trust Ambassador with over 10 years of experience in transforming data into actionable insights.",
  // },
  // {
  //   name: "DR. SARAH LIAM",
  //   title: "Senior Data Scientist, Department of Statistics Malaysia",
  //   bio: "Dr. Sarah leads the data innovation initiatives at DOSM with a PhD in Applied Statistics and 15 years of experience in government data systems and policy-making through data-driven insights.",
  // },
  // {
  //   name: "PROF. AHMAD HASSAN",
  //   title: "Dean, Faculty of Computer Science and Mathematics, UiTM",
  //   bio: "Professor Ahmad Hassan is an expert in machine learning and data mining with over 20 years of academic experience and numerous publications in top-tier journals.",
  // },
  // {
  //   name: "MS. NURUL AISYAH",
  //   title: "Head of Analytics, Grab Malaysia",
  //   bio: "Nurul leads data science teams at Grab Malaysia, focusing on predictive analytics and machine learning solutions for Southeast Asia super app ecosystem.",
  // },
];
