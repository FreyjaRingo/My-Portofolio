const mediaBase = "/portfolio-media";

type Media = { src: string; alt: string; caption: string; slot: string };

const noMedia: Media[] = [];

export const portfolioData = {
  personal: {
    name: "ATHALLAH AZHAR AULIA HADI",
    ticker: "ATHL.JK",
    alias: "Data Strategist / AI Builder / 日本語 N2",
    role: "Data Innovation & AI Intern at Bank Danamon",
    location: "Tangerang Selatan, Indonesia",
    summary:
      "7th-semester Informatics Engineering student at Universitas Padjadjaran and Bakti BCA Scholarship awardee. I build data products for financial services, from fund and bond dashboards to data warehouses and machine learning models, and I have worked on the strategy side of investment products at Maybank.",
    currentThread:
      "Data Innovation & AI intern at Bank Danamon, acting as product owner liaison on an initiative that moves manual processes to AI-driven workflows.",
    email: "athallah.rahza@gmail.com",
    linkedin: "https://linkedin.com/in/athallah-azhar",
    github: "https://github.com/FreyjaRingo",
    cv: "/cv-athallah-azhar-aulia-hadi.pdf",
    media: [
      {
        src: `${mediaBase}/profile/profile-photo.jpg`,
        alt: "Portrait of Athallah Azhar Aulia Hadi",
        caption: "Profile",
        slot: "PROFILE_VISUAL",
      },
    ],
  },
  socialLinks: [
    {
      label: "GitHub",
      handle: "FreyjaRingo",
      href: "https://github.com/FreyjaRingo",
      status: "CODE",
    },
    {
      label: "LinkedIn",
      handle: "athallah-azhar",
      href: "https://linkedin.com/in/athallah-azhar",
      status: "CAREER",
    },
    {
      label: "Email",
      handle: "athallah.rahza@gmail.com",
      href: "mailto:athallah.rahza@gmail.com",
      status: "PING",
    },
    {
      label: "Instagram",
      handle: "@athaaazhr",
      href: "https://instagram.com/athaaazhr",
      status: "SOCIAL",
    },
  ],
  japanese: {
    headline: "日本語",
    market: "オタク・マーケット",
    desk: "東京-データ",
    motto: "数値で読む、物語で伝える",
    watchlist: [
      { term: "改善", romaji: "kaizen", meaning: "Iterative improvement" },
      { term: "分析", romaji: "bunseki", meaning: "Analysis discipline" },
      { term: "物語", romaji: "monogatari", meaning: "Narrative thinking" },
      { term: "勝負", romaji: "shoubu", meaning: "Competitive edge" },
    ],
  },
  terminalTape: [
    { label: "DANAMON", value: "ACTIVE", trend: "DATA+AI" },
    { label: "GPA", value: "3.81", trend: "+MERIT" },
    { label: "JLPT", value: "N2", trend: "日本語" },
    { label: "TOEFL", value: "600", trend: "+BILINGUAL" },
    { label: "MAYBANK", value: "CLOSED", trend: "STRAT" },
    { label: "BCA", value: "SCHOLAR", trend: "2025" },
    { label: "PROJECTS", value: "8", trend: "CASE STUDIES" },
  ],
  kpis: [
    { label: "Current desk", value: "Danamon", detail: "Data Innovation & AI intern" },
    { label: "Education", value: "UNPAD IF", detail: "Informatics Engineering, GPA 3.81" },
    { label: "Language edge", value: "JLPT N2", detail: "Japanese N2, English TOEFL 600" },
    { label: "Scholarship", value: "Bakti BCA", detail: "Awardee 2025" },
  ],
  experience: [
    {
      id: "DNM-01",
      title: "Data Innovation and AI Intern",
      company: "PT Bank Danamon Indonesia Tbk",
      period: "Sep 2026 - Present",
      status: "LIVE",
      media: noMedia,
      descriptions: [
        "Product owner liaison between business units, IT, and vendors on an initiative moving manual processes to AI-driven workflows.",
        "Translate business requirements into user stories and backlogs, and write product initiation decks to align stakeholders on scope and rollout.",
        "Run backlog grooming with IT and vendor teams to prioritize development.",
      ],
    },
    {
      id: "MBK-02",
      title: "Strategist Intern",
      company: "Maybank Indonesia",
      period: "Feb 2026 - Aug 2026",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Built a Streamlit dashboard that tracks mutual fund performance across multiple indicators, replacing manual data collection with automated updates and cutting analysis time by 75%.",
        "Built a pipeline that extracts top holdings and sector allocations from fund fact sheets, plus a fixed-income dashboard that flags bonds beating their benchmark on yield and duration.",
        "Built VBA calculators and Vercel-hosted web tools for Relationship Managers and Investment Specialists to process bond subscriptions, redemptions, and switches with fewer manual errors.",
        "Wrote the Monthly Investment Focus report, covering macro conditions, strengthening sectors, and portfolio rotation ideas.",
      ],
    },
    {
      id: "DBS-03",
      title: "Data Scientist Cohort",
      company: "Coding Camp powered by DBS Foundation",
      period: "Feb 2026 - Jun 2026",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Completed the Data Scientist path: preprocessing, EDA, feature engineering, visualization, and model evaluation.",
        "Capstone: NutriMatch, an allergy-aware meal plan recommender. Prepared nutrition and allergen datasets and computed per-user needs with BMR and TDEE.",
      ],
    },
    {
      id: "MBK-04",
      title: "Student Mbassador",
      company: "Maybank Indonesia",
      period: "Aug 2025 - Jan 2026",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Ran a career preparation workshop for 30+ students end to end, from concept and speaker sourcing to delivery.",
        "Partnered with Writeyuk and Maybank speakers on sessions covering CVs, portfolios, and work ethics.",
      ],
    },
    {
      id: "SPK-05",
      title: "SPARK Student Ambassador",
      company: "Monee (SeaBank & ShopeePay)",
      period: "Sep 2025 - Jan 2026",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Ran financial literacy campaigns on campus focused on SeaBank and ShopeePay adoption.",
        "Worked with the SeaMoney team on social media and campus activations.",
      ],
    },
    {
      id: "UNP-06",
      title: "Numerical Methods Teaching Assistant",
      company: "Informatika Unpad",
      period: "Aug 2025 - Dec 2025",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Mentored 40 students on engineering mathematics problems in Excel and Python.",
        "Led lab sessions implementing numerical algorithms in C++ and Python.",
      ],
    },
    {
      id: "BCA-07",
      title: "Bakti BCA Scholarship Awardee",
      company: "PT Bank Central Asia Tbk",
      period: "Jan 2025 - Dec 2025",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Built an Excel bookkeeping system for local MSMEs in Jatinangor.",
        "Trained business owners on digital tools for reaching more customers.",
      ],
    },
    {
      id: "UNP-08",
      title: "Computer Organization & Architecture Teaching Assistant",
      company: "Informatika Unpad",
      period: "Feb 2025 - Jun 2025",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Assisted digital logic labs in Tinkercad and assembly programming with NASM on DOSBox.",
        "Helped grade practical assignments.",
      ],
    },
    {
      id: "MBK-09",
      title: "Student Ambassador",
      company: "Maybank",
      period: "Mar 2024 - Dec 2024",
      status: "CLOSED",
      media: noMedia,
      descriptions: [
        "Represented Maybank at campus and community events and led seminars on its programs.",
      ],
    },
  ],
  education: [
    {
      title: "Universitas Padjadjaran",
      subtitle: "Bachelor of Computer Science, Informatics Engineering",
      period: "2023 - 2027 (expected)",
      meta: "GPA 3.81/4.00",
    },
    {
      title: "SMA Negeri 24 Jakarta",
      subtitle: "Science Major",
      period: "2020 - 2023",
      meta: "GPA 89.29/100, ranked 2nd in science",
    },
  ],
  awards: [
    "Bakti BCA Scholarship Awardee, 2025",
    "SPARK Student Ambassador, 2025",
    "Maybank Student Ambassador, 2024 and 2025",
    "2nd Place, Japanese Language Olympiad DKI Jakarta, 2022",
  ],
  certifications: [
    "JLPT N2, 2026",
    "Alibaba Cloud Certified Developer: AI, 2025",
    "Python Fundamental for Data Science, DQLab, 2025",
    "JLPT N3, 2023",
  ],
  skills: {
    Programming: ["Python", "SQL", "TypeScript", "C++", "Java", "JavaScript", "PHP", "R", "VBA"],
    "Data & AI": ["Pandas", "Scikit-learn", "LightGBM", "NLTK", "YOLO", "MediaPipe", "LDA", "Selenium"],
    "Data platforms": ["PostgreSQL", "ClickHouse", "Streamlit", "FastAPI", "Supabase", "Oracle"],
    "Web & tools": ["Next.js", "Tailwind CSS", "Laravel", "Git", "Figma", "Excel"],
    Languages: ["Indonesian (native)", "English (TOEFL 600)", "Japanese (JLPT N2)"],
  },
};
