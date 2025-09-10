import {
  DoorOpenIcon,
  DoorClosedIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
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

export const FAQ: FAQItem[] = [
  {
    question: "What is MDIT?",
    category: "general",
    answer:
      "The Malaysia Data Innovation Talent (MDIT) is a prestigious national datathon competition organised by the Statistics Club (inStats), Faculty of Computer and Mathematical Sciences, Universiti Teknologi MARA (UiTM), Shah Alam. This competition aims to cultivate data innovation skills among university students through real-world data challenges aligned with global sustainability goals.",
  },
  {
    question: "What is a datathon?",
    category: "general",
    answer:
      "A datathon is a competition in which participants work intensively with data to solve defined problems or uncover insights within a limited time frame.",
  },
  {
    question: "What are the differences between a datathon and a hackathon?",
    category: "general",
    answer:
      "A datathon focuses on analysing data to find solutions or insights, whereas a hackathon focuses on building functional products or prototypes through coding and design.",
  },
  {
    question:
      "Which Sustainable Development Goals (SDGs) does this competition focus on?",
    answer: "MDIT 2025 will focus on the following SDGs:",
    category: "general",
    list: [
      "SDG 1 – No Poverty",
      "SDG 3 – Good Health and Well-being",
      "SDG 4 – Quality Education",
      "SDG 8 – Decent Work and Economic Growth",
      "SDG 9 – Industry, Innovation and Infrastructure",
      "SDG 10 – Reduced Inequalities",
    ],
    subtext:
      "Participants are expected to design data-driven solutions that support and address issues within these six SDGs.",
  },
  {
    question: "Who can participate in the MDIT?",
    category: "general",
    answer:
      "The competition is open to all diploma and undergraduate students from both public universities (IPTA) and private universities (IPTS) within Malaysia.",
  },
  {
    question:
      "Are students or advisors from different universities allowed to form one team?",
    category: "general",
    answer:
      "No, all team members and the advisor must be from the same university.",
  },
  {
    question: "Are datasets provided, or must participants find their own?",
    category: "general",
    answer:
      "Datasets will not be provided by the organiser. Teams must source their own datasets from reliable and credible sources and provide proper citations. Extra points will be awarded for using datasets from OpenDOSM.",
  },
  {
    question: "Can we use any programming language or software?",
    category: "general",
    answer:
      "Yes, participants may use any programming language or software tools that support data analysis and dashboard creation. Common tools include Python, R, Excel, Power BI, and Tableau.",
  },
  {
    question: "Will training or workshops be provided before the competition?",
    category: "general",
    answer:
      "Yes, there will be pre-event workshops covering topics such as data visualisation, analysis techniques, and dashboard building. More details will be shared in due course.",
  },
  {
    question: "Can we use AI tools like ChatGPT during the competition?",
    category: "general",
    answer:
      "Yes,  but  with  limitations.  Teams must ensure originality and critical thinking in their submissions.  Plagiarised  or  AI-generated  content  without  proper  human  input  may result in disqualification.",
  },
  {
    question: "Who can I contact for more information?",
    category: "general",
    answer: "You may contact the Management Bureau for inquiries:",
    contact: [
      {
        name: "Muhammad Fiqri",
        role: "Support",
        number: "+60184727274",
      },
      {
        name: "Amira Adriana",
        role: "Support",
        number: "+60192766323",
      },
    ],
  },
  {
    question: "How many team members are allowed?",
    category: "registration",
    answer:
      "Each team must consist of four (4) student members and one (1) lecturer as an academic advisor.",
  },
  {
    question: "How much is the registration fee?",
    category: "registration",
    answer:
      "Each team is required to pay a non-refundable entrance fee of RM150.00.",
  },
  {
    question: "Does each participant need to register individually?",
    category: "registration",
    answer:
      "No, only the team leader is required to register on behalf of the team. The registration form must include the details of all team members and the advisor.",
  },
  {
    question: "When is the registration fee due?",
    category: "registration",
    answer:
      "The registration fee must be paid only after the team receives a confirmation email stating that their registration has been successfully approved. Payment should be made only after receiving the official payment instruction email. Registration will only be confirmed upon successful payment.",
  },
  {
    question:
      "Do all team members need to pay the registration fee individually?",
    category: "registration",
    answer:
      "No, only the team leader needs to make the payment on behalf of the entire team.",
  },
  {
    question: "Can teams withdraw from the competition?",
    category: "registration",
    answer:
      "Yes, teams may withdraw, but they must notify the organising committee in advance via official communication channels. Please note that the registration fee will not be refunded under any circumstances.",
  },
  {
    question: "Can we change team members after registration?",
    category: "registration",
    answer:
      "No, changes to team members are not allowed once registration is approved, unless exceptional circumstances are approved by the organising committee.",
  },
  {
    question: "Can the same university send more than one team?",
    category: "registration",
    answer: "Yes, multiple teams from the same university are allowed.",
  },
  {
    question: "Will advisors be assigned by the organiser?",
    category: "registration",
    answer:
      "No, each team must find a lecturer from their own university to be their advisor.",
  },
  {
    question: "What is the format of the competition?",
    category: "competition",
    answer: "Each team must submit: ",
    list: [
      "A video presentation (maximum duration as stated in the guidelines)",
      "A comprehensive report detailing methodology, findings, and insights",
      "A data dashboard to visualise their data solutions effectively",
    ],
  },
  {
    question: "Is there a submission deadline for the preliminary round?",
    category: "competition",
    answer:
      "Yes, all teams must submit their final work by the official deadline, which will be announced via WhatsApp group and official platforms. Late submissions will not be accepted.",
  },
  {
    question: "Are there specific rules that participants must follow?",
    category: "competition",
    answer:
      "Yes, participants must comply with the official rules and regulations as stated in the MDIT Rules and Regulations section.",
  },
  {
    question: "Will a certificate be provided?",
    category: "competition",
    answer:
      "Yes, all participants and advisors will receive a certificate of participation. Winners will receive additional certificates of achievement.",
  },
  {
    question: "Is it required to build a dashboard?",
    category: "competition",
    answer: "Yes, creating a dashboard is a mandatory part of the competition.",
  },
  {
    question:
      "Can I develop a prototype or application instead of a dashboard?",
    category: "competition",
    answer:
      "Yes, you may create a prototype or application, but the dashboard must be developed first as it is the core deliverable.",
  },
  {
    question: "Will there be a live presentation?",
    category: "competition",
    answer:
      "Yes, only the top 10 shortlisted teams will be invited to present their solutions during a live pitching session in front of a panel of expert judges. This will be held physically, and further instructions will be provided to selected teams.",
  },
  {
    question: "What are the prizes for the winners?",
    category: "competition",

    answer: "The prize for the winner are as follows:",
    list: [
      "🏆 Champion: RM3,500",
      "🥈 1st Runner-up: RM2,500",
      "🥉 2nd Runner-up: RM1,500",
    ],
  },
  {
    question: "Is this competition only open to statistics students?",
    category: "competition",
    answer:
      "No, it is open to all students regardless of their course or background. However, basic data analysis skills (such as using spreadsheets, simple visualisations, or dashboard tools) are expected in order to compete effectively.",
  },
];

export const PROGRAM_TIMELINE = [
  {
    icon: DoorOpenIcon,
    date: new Date(2025, 7, 10),
    event: "Registration Opens",
    details: "Registration for MDIT X DOSM Datathon 2025 Officially Opens.",
    type: "milestone", // milestone, workshop, event, deadline
    hasDetails: false,
    extendedDetails: {
      time: "10:00 AM GMT+8",
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
    details: "Registration for MDIT X DOSM Datathon 2025 Officially Closes.",
    type: "deadline",
    hasDetails: false,
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
      "Covers competition briefing and pitching essentials to guide participants toward an effective project presentation.",
    type: "event",
    hasDetails: false,
    extendedDetails: {
      time: "2:00 PM - 4:00 PM GMT+8",
      location: "Online Platform (Microsoft Teams)",
      description:
        "Official launch of MDIT 2025 featuring keynote speeches, competition briefing. It will covers competition briefing and pitching essentials to guide your team toward an effective project presentation.",
      requirements: [
        "Team attendance (minimum 1 representative)",
        "Stable internet connection for online participants",
        "Notebook for taking notes",
      ],
      // TODO: TOBE ADJUSTED
      eventDetails: {
        speakers: ["Prof. Dr. Ahmad Rahman - UiTM", "Dato' Sarah Lim - DOSM"],
        agenda: [
          "2:00 PM - Welcome & Opening Remarks",
          "2:30 PM - Competition Rules & Guidelines",
          "3:00 PM - Pitching Workshop",
          "3:45 PM - Q&A Session",
          "4:00 PM - Closing",
        ],
        meetingLink: "https://teams.microsoft.com/meet/...",
        recordingAvailable: false,
      },
    },
  },
  {
    icon: BrainIcon,
    date: new Date(2025, 8, 7),
    event: "Software Workshop",
    details:
      "A software workshop to upskill participants and enhance projects using statistical and data visualization tools.",
    type: "workshop",
    hasDetails: false,
    extendedDetails: {
      time: "10:00 AM - 4:00 PM GMT+8",
      location: "Online Platform (Zoom)",
      description:
        "Comprehensive workshop covering data analytics, statistical methods, and visualization techniques. Teams will be guided through hands-on exercises using various tools and frameworks.",
      requirements: [
        "Laptop with Python/R installed",
        "Stable internet connection",
        "Workshop materials (provided)",
      ],
      // TODO: TO BE ADJUSTED
      eventDetails: {
        instructors: [
          "Dr. Nurul Ain - Data Scientist",
          "Ahmad Hassan - Analytics Expert",
        ],
        agenda: [
          "10:00 AM - Introduction to Data Analytics",
          "11:00 AM - Statistical Analysis Fundamentals",
          "12:00 PM - Lunch Break",
          "1:00 PM - Data Visualization Techniques",
          "2:30 PM - Hands-on Practice Session",
          "3:30 PM - Q&A and Troubleshooting",
          "4:00 PM - Wrap-up",
        ],
        tools: [
          "Python (Pandas, NumPy, Matplotlib)",
          "R (ggplot2, dplyr)",
          "Tableau Public",
        ],
        materialsProvided: [
          "Workshop slides",
          "Sample datasets",
          "Code templates",
        ],
      },
    },
  },
  {
    icon: PlayIcon,
    date: new Date(2025, 8, 8),
    event: "Preliminary Round Begins",
    details:
      "Submission window is now open for all team to upload their report, dashboard, and video.",
    type: "milestone",
    hasDetails: false,
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
    date: new Date(2025, 8, 21),
    event: "Submission Period Ended",
    details:
      "Participant submissions will now proceed to the evaluation phase.",
    type: "deadline",
    hasDetails: false,
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
    date: new Date(2025, 8, 21),
    event: "Evaluation Period Begins",
    details: "Shortlisting of group begins.",
    type: "milestone",
    hasDetails: false,
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
    date: new Date(2025, 9, 3),
    event: "Top 10 Finalists Announced",
    details: "Shortlisting of groups is completed.",
    type: "milestone",
    hasDetails: false,
    extendedDetails: {
      time: "6:00 PM GMT+8",
      location: "Online Announcement",
      description:
        "The top 10 finalists teams are announced and will be invited to present their solutions live to the expert panel during the final presentation session.",
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
    event: "Final Pitching",
    details:
      "Top 10 finalists will present their pitches live to expert judges.",
    type: "event",
    hasDetails: false,
    extendedDetails: {
      time: "9:00 AM - 5:00 PM GMT+8",
      location: "UiTM Shah Alam, Selangor",
      description:
        "Finalist teams deliver 15-minute presentations followed by 10-minute Q&A sessions with industry experts, government officials, and academic leaders.",
      requirements: [
        "Physical attendance required",
        "Presentation slides",
        "Demo-ready solutions",
        "Professional attire",
      ],
      // TODO: TO BE CHANGED
      eventDetails: {
        venue: "Auditorium Dewan Latihan, UiTM Shah Alam",
        judges: [
          "Industry leaders",
          "Government officials",
          "Academic experts",
        ],
        agenda: [
          "9:00 AM - Registration & Setup",
          "9:30 AM - Opening Remarks",
          "10:00 AM - Team Presentations (Round 1)",
          "12:00 PM - Lunch Break",
          "1:00 PM - Team Presentations (Round 2)",
          "4:00 PM - Deliberation",
          "5:00 PM - Preliminary Results",
        ],
        liveStreaming: false,
        presentationFormat: "15 min presentation + 10 min Q&A",
      },
    },
  },
  {
    icon: CrownIcon,
    date: new Date(2025, 9, 18),
    event: "Awards Ceremony & Closing",
    details: "Winners are announced and the event concludes.",
    type: "event",
    hasDetails: false,
    extendedDetails: {
      time: "2:00 PM - 6:00 PM GMT+8",
      location: "UiTM Shah Alam, Selangor",
      description:
        "Grand finale featuring winner announcements, prize distribution, networking sessions, and celebration dinner. Recognition of all participants and appreciation for sponsors and partners.",
      requirements: [
        "Attendance for prize collection",
        "Networking opportunities",
        "Group photos and media sessions",
      ],
      // TODO: TO BE CHANGED
      eventDetails: {
        venue: "Dewan Resital, UiTM Shah Alam",
        agenda: [
          "2:00 PM - Registration & Welcome",
          "2:30 PM - Opening Ceremony",
          "3:00 PM - Winner Announcements",
          "3:30 PM - Prize Distribution",
          "4:00 PM - Networking Session",
          "5:00 PM - Group Photos",
          "5:30 PM - Closing Remarks",
        ],
        keynoteSpeker: "Dato' Ahmad Rahman - Chief Statistician Malaysia",
        dinnerIncluded: false,
        liveStreaming: false,
      },
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
    title: "Redeem Licence Key",
    href: "/redeem-licence",
  },
  {
    title: "FAQ",
    href: "/frequently-asked-questions",
  },
];

// Freeze arrays for better performance and prevent mutations
export const MDIT2024_IMAGE = Object.freeze([
  {
    src: "/assets/mdit2024/DSC_0088.png",
    alt: "MDIT 2024 Image 1",
  },
  {
    src: "/assets/mdit2024/DSC_0148.png",
    alt: "MDIT 2024 Image 2",
  },
  {
    src: "/assets/mdit2024/DSC_0180.png",
    alt: "MDIT 2024 Image 3",
  },
  {
    src: "/assets/mdit2024/DSC_0198.png",
    alt: "MDIT 2024 Image 4",
  },
  {
    src: "/assets/mdit2024/DSC_0216.png",
    alt: "MDIT 2024 Image 5",
  },
  {
    src: "/assets/mdit2024/DSC_0248.png",
    alt: "MDIT 2024 Image 6",
  },
  {
    src: "/assets/mdit2024/DSC_0290.png",
    alt: "MDIT 2024 Image 7",
  },
] as const);

export const MDIT2023_IMAGE = Object.freeze([
  {
    src: "/assets/mdit2023/DSC_0127.png",
    alt: "MDIT 2023 Image 1",
  },
  {
    src: "/assets/mdit2023/DSC_0133.png",
    alt: "MDIT 2023 Image 2",
  },
  {
    src: "/assets/mdit2023/DSC_0141.png",
    alt: "MDIT 2023 Image 3",
  },
  {
    src: "/assets/mdit2023/DSC_0143.png",
    alt: "MDIT 2023 Image 4",
  },
  {
    src: "/assets/mdit2023/DSC_0194.png",
    alt: "MDIT 2023 Image 5",
  },
  {
    src: "/assets/mdit2023/DSC_0221.png",
    alt: "MDIT 2023 Image 6",
  },
  {
    src: "/assets/mdit2023/DSC_0239.png",
    alt: "MDIT 2023 Image 7",
  },
  {
    src: "/assets/mdit2023/DSC_0255.png",
    alt: "MDIT 2023 Image 8",
  },
  {
    src: "/assets/mdit2023/DSC_0256.png",
    alt: "MDIT 2023 Image 9",
  },
] as const);

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
    description:
      "RM9,600 in total prizes with RM3,500 for first place plus special awards.",
    color: " text-yellow-600 dark:text-yellow-400",
    bgColor: " bg-yellow-50 dark:bg-yellow-900/30",
  },
  {
    icon: BrainIcon,
    title: "Real-World Datasets",
    description:
      "Opportunity to push yourself to work with open data provided by DOSM such as OpenDOSM, eStatistik, StatsDW IDL facility.",
    color: " text-blue-600 dark:text-blue-400",
    bgColor: " bg-blue-50 dark:bg-blue-900/30",
  },
  {
    icon: PresentationIcon,
    title: "Industry Exposure",
    description: "Present to experts from the industry.",
    color: " text-green-600 dark:text-green-400",
    bgColor: " bg-green-50 dark:bg-green-900/30",
  },
  {
    icon: AwardIcon,
    title: "National Recognition",
    description: "Prestigious competition with certificates and trophies.",
    color: " text-purple-600 dark:text-purple-400",
    bgColor: " bg-purple-50 dark:bg-purple-900/30",
  },
  {
    icon: CrownIcon,
    title: "Collaborative Under Pressure",
    description:
      "Manage conflict, manage responsibilities, handle time constraints, and deliver your work under pressure.",
    color: " text-purple-600 dark:text-purple-400",
    bgColor: " bg-purple-50 dark:bg-purple-900/30",
  },
];

interface contact {
  name: string;
  role: string;
  number: string;
}
// FAQ interface for type safety
interface FAQItem {
  question: string;
  answer: string;
  category: string;
  list?: string[];
  contact?: contact[];
  subtext?: string;
}

// Judge interface for type safety
interface Judge {
  name: string;
  title: string;
  position?: string; // Optional position for Chief Judge
  image?: {
    src: string;
    alt: string;
  };
  bio: string;
}

// Partner interfaces for type safety
interface Organizer {
  name: string;
  logo: string;
  logoLight?: string;
  logoAlt: string;
  width: number;
  height: number;
  className: string;
}

interface Sponsor {
  name: string;
  logo: string;
  logoAlt: string;
  width: number;
  height: number;
  className: string;
  tier: string;
  description?: string;
  website?: string;
  industry?: string;
  founded?: string;
  headquarters?: string;
}

interface MediaPartner {
  name: string;
  logo: string;
  logoAlt: string;
  width: number;
  height: number;
  className: string;
}

export const EVENT_JUDGES: Judge[] = [
  // {
  //   name: "Dr. Ahmad Fazreen bin Baharudden",
  //   position: "Chief Judge",
  //   image: {
  //     src: "/judges/J1.png",
  //     alt: "Dr. Ahmad Fazreen bin Baharudden",
  //   },
  //   title: "Business Intelligence & Analytics Director, DataMicron",
  //   bio: "Experienced practitioner of business and social science analytics with a demonstrated 24 years history of working in the information technology and services industry. Skilled in gap analysis, business problem solving, and analytics story telling.",
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

// Organizers data
export const ORGANIZERS: Organizer[] = [
  {
    name: "Jabatan Perangkaan Malaysia",
    logo: "/ekonomi.png",
    logoLight: "/ekonomi_Light.png", // For dark mode
    logoAlt: "Logo Jabatan Perangkaan Malaysia",
    width: 140,
    height: 120,
    className: "w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24 object-cover",
  },
  {
    name: "Universiti Teknologi MARA (UiTM)",
    logo: "/uitm.svg",
    logoLight: "/uitm_Light.svg", // For dark mode
    logoAlt: "UiTM Logo",
    width: 140,
    height: 120,
    className: "w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24",
  },
  {
    name: "Malaysia Digital",
    logo: "/md.svg",
    logoLight: "/md_Light.svg", // For dark mode
    logoAlt: "logo Malaysia Digital",
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-24 sm:h-24",
  },
  {
    name: "inStats UiTM Shah Alam",
    logo: "/instats.svg",
    logoAlt: "inStats UiTM",
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-24 sm:h-24",
  },
  {
    name: "Department of Statistics Malaysia (DOSM)",
    logo: "/dosm.svg",
    logoLight: "/DOSM_Light.svg", // For dark mode
    logoAlt: "Department of Statistics Malaysia",
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-24",
  },
];

// Official Sponsors data
export const OFFICIAL_SPONSORS: Sponsor[] = [
  {
    name: "TechCorp Solutions",
    logo: "/instats.svg",
    logoAlt: "TechCorp Solutions",
    width: 120,
    height: 120,
    className: "w-28 h-28 sm:w-32 sm:h-32",
    tier: "platinum",
    description:
      "TechCorp Solutions is a leading technology company specializing in enterprise software solutions, cloud computing, and data analytics. We empower businesses to harness the power of data for strategic decision-making and operational excellence.",
    website: "https://techcorp.com",
    industry: "Technology & Software",
    founded: "2010",
    headquarters: "Kuala Lumpur, Malaysia",
  },
  {
    name: "DataVision Analytics",
    logo: "/instats.svg",
    logoAlt: "DataVision Analytics",
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-28 sm:h-28",
    tier: "gold",
    description:
      "DataVision Analytics is a premier data science consultancy that helps organizations transform raw data into actionable insights. Our expertise spans machine learning, artificial intelligence, and advanced analytics across various industries.",
    website: "https://datavision.com",
    industry: "Data Analytics & AI",
    founded: "2015",
    headquarters: "Cyberjaya, Malaysia",
  },
  {
    name: "Innovation Hub Malaysia",
    logo: "/instats.svg",
    logoAlt: "Innovation Hub Malaysia",
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-28 sm:h-28",
    tier: "silver",
    description:
      "Innovation Hub Malaysia is a government-backed initiative that supports startups and emerging technologies. We provide funding, mentorship, and resources to foster innovation in the Malaysian tech ecosystem, particularly in data science and digital transformation.",
    website: "https://innovationhub.my",
    industry: "Government & Innovation",
    founded: "2018",
    headquarters: "Putrajaya, Malaysia",
  },
  {
    name: "CloudFirst Technologies",
    logo: "/instats.svg",
    logoAlt: "CloudFirst Technologies",
    width: 120,
    height: 120,
    className: "w-20 h-20 sm:w-24 sm:h-24",
    tier: "bronze",
    description:
      "CloudFirst Technologies is a cloud computing specialist that provides scalable infrastructure solutions for data-intensive applications. We enable organizations to build, deploy, and manage big data and analytics workloads in the cloud.",
    website: "https://cloudfirst.tech",
    industry: "Cloud Computing",
    founded: "2017",
    headquarters: "Shah Alam, Malaysia",
  },
  {
    name: "EduTech Solutions",
    logo: "/instats.svg",
    logoAlt: "EduTech Solutions",
    width: 120,
    height: 120,
    className: "w-20 h-20 sm:w-24 sm:h-24",
    tier: "technology",
    description:
      "EduTech Solutions bridges the gap between education and industry by providing cutting-edge learning platforms and tools for data science education. We empower students and professionals with the skills needed for the digital economy.",
    website: "https://edutech.solutions",
    industry: "Education Technology",
    founded: "2019",
    headquarters: "Petaling Jaya, Malaysia",
  },
];

// Media Partners data
export const MEDIA_PARTNERS: MediaPartner[] = [
  // {
  //   name: "Media Partner 1",
  //   logo: "/instats.svg",
  //   logoAlt: "Media Partner 1",
  //   width: 120,
  //   height: 120,
  //   className: "w-24 h-24 sm:w-28 sm:h-28",
  // },
  // {
  //   name: "Media Partner 2",
  //   logo: "/instats.svg",
  //   logoAlt: "Media Partner 2",
  //   width: 120,
  //   height: 120,
  //   className: "w-24 h-24 sm:w-28 sm:h-28",
  // },
  // {
  //   name: "Media Partner 3",
  //   logo: "/instats.svg",
  //   logoAlt: "Media Partner 3",
  //   width: 120,
  //   height: 120,
  //   className: "w-24 h-24 sm:w-28 sm:h-28",
  // },
  // {
  //   name: "Media Partner 4",
  //   logo: "/instats.svg",
  //   logoAlt: "Media Partner 4",
  //   width: 120,
  //   height: 120,
  //   className: "w-24 h-24 sm:w-28 sm:h-28",
  // },
];

export const GOOGLE_FORM_LINK = "https://bit.ly/MDITxDD_2025";

export const EVENT_DATA = {
  Expected_Team: "93",
  Total_Prize_Pool: "RM 9,600",
  Universities: "24",
  Competition_Days: "43",
};
