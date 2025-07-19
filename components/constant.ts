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
  },
  {
    icon: DoorClosedIcon,
    date: new Date(2025, 7, 30),
    event: "Registration Closes",
    details: "Registration for MDIT 2025 closes.",
  },
  {
    icon: SparklesIcon,
    date: new Date(2025, 8, 1),
    event: "Opening Ceremony",
    details: "Opening ceremony for MDIT 2025.",
  },
  {
    icon: PlayIcon,
    date: new Date(2025, 8, 8),
    event: "Competition Begins",
    details: "The competition officially starts.",
  },
  {
    icon: PauseIcon,
    date: new Date(2025, 8, 21),
    event: "Competition Ends",
    details: "The competition concludes.",
  },
  {
    icon: AlignJustifyIcon,
    date: new Date(2025, 8, 22),
    event: "Finalist Shortlisting Begins",
    details: "Shortlisting of groups begins.",
  },
  {
    icon: ListCheckIcon,
    date: new Date(2025, 9, 3),
    event: "Finalist Shortlisting Ends",
    details: "Shortlisting of groups is completed.",
  },
  {
    icon: MegaphoneIcon,
    date: new Date(2025, 9, 3),
    event: "Announcement of top 10 Finalist",
    details: "Announcement of the top 10 finalists.",
  },
  {
    icon: PresentationIcon,
    date: new Date(2025, 9, 17),
    event: "Live Pitching for Finalist",
    details: "Finalists present their pitches live to 4 judges.",
  },
  {
    icon: CrownIcon,
    date: new Date(2025, 9, 18),
    event: "Winner Announcement and Closing Ceremony",
    details: "Winners are announced and the event concludes.",
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
  { label: "Universities", value: "50+", icon: GraduationCapIcon },
  { label: "Expected Teams", value: "60+", icon: Users2Icon },
  { label: "Competition Days", value: "43", icon: CalendarIcon },
];

export const COMPETITION_HIGHLIGHTS = [
  {
    icon: TrophyIcon,
    title: "Massive Prize Pool",
    description: "RM11,000 in total prizes with RM3,500 for first place",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: BrainIcon,
    title: "Real-World Datasets",
    description: "Work with actual government data from DOSM",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: PresentationIcon,
    title: "Industry Exposure",
    description: "Present to experts from PwC, DOSM, and UiTM",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: AwardIcon,
    title: "National Recognition",
    description: "Prestigious competition with certificates and trophies",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
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
