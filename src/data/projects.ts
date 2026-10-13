// Case-study content. Every claim here comes from Athallah's LinkedIn project
// descriptions or CV. Do not add numbers or outcomes that are not in those sources.

const img = (name: string) => `/portfolio-media/projects/${name}.webp`;

export type Domain = "Data Engineering" | "Machine Learning" | "NLP" | "Web" | "Product";

export type ProjectImage = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  period: string;
  year: number;
  role: string;
  team: string;
  context: string;
  domains: Domain[];
  stack: string[];
  signal: { label: string; value: string };
  cover: ProjectImage;
  gallery: ProjectImage[];
  links: { label: string; href: string }[];
  problem: string;
  approach: { title: string; body: string }[];
  results: string[];
  facts: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "enterprise-data-warehouse",
    code: "DWH",
    title: "Enterprise Data Warehouse for a Super-App",
    tagline: "One analytical model for ride, food, delivery, and wallet data.",
    period: "May – Jun 2026",
    year: 2026,
    role: "Data engineering",
    team: "Team project",
    context: "University project, Universitas Padjadjaran",
    domains: ["Data Engineering"],
    stack: ["Python", "PostgreSQL", "ClickHouse", "FastAPI", "Next.js"],
    signal: { label: "Query latency", value: "Sub-second" },
    cover: { src: img("dwh-gofood"), alt: "GoFood and merchant operations dashboard built on the data warehouse", width: 1172, height: 645 },
    gallery: [
      { src: img("dwh-goride"), alt: "GoRide operations dashboard with trip volume and fleet mix", width: 1172, height: 628, caption: "GoRide operations: trip volume, fleet mix, pickup cities" },
      { src: img("dwh-gopay"), alt: "GoPay financial ledger dashboard with revenue and cashback burn", width: 1172, height: 495, caption: "GoPay ledger: admin fee revenue against cashback burn" },
    ],
    links: [{ label: "Code", href: "https://github.com/Luthfi-AS/GojekDataWarehouse" }],
    problem:
      "In a simulated multi-vertical super-app (GoRide, GoFood, GoSend, GoPay), each service kept its own operational data. Cross-service questions, such as whether wallet usage tracks food delivery demand, could not be answered without hitting the production databases.",
    approach: [
      { title: "Model", body: "Kimball bottom-up galaxy schema: 4 domain fact tables sharing 8 conformed dimensions, so every vertical can be sliced by the same date, city, user, and merchant." },
      { title: "Pipeline", body: "Custom Python ETL that extracts from PostgreSQL, cleans the data, and tracks history with Slowly Changing Dimension Type 2." },
      { title: "Engine", body: "ClickHouse with MergeTree tables and materialized views that pre-aggregate the heavy metrics." },
      { title: "Serving", body: "FastAPI exposes the aggregates to an interactive Next.js dashboard." },
    ],
    results: [
      "Cross-vertical behavioral analytics with sub-second query latency.",
      "Analytical workload moved off the operational OLTP database.",
    ],
    facts: [
      { label: "Fact tables", value: "4" },
      { label: "Conformed dims", value: "8" },
      { label: "History", value: "SCD Type 2" },
    ],
  },
  {
    slug: "nutrimatch",
    code: "REC",
    title: "NutriMatch",
    tagline: "Allergy-aware weekly meal plans, personalized to each user.",
    period: "Apr – Jun 2026",
    year: 2026,
    role: "Data Scientist",
    team: "Cross-functional team",
    context: "Capstone, Coding Camp powered by DBS Foundation",
    domains: ["Machine Learning", "Web"],
    stack: ["Python", "Next.js", "TypeScript", "Supabase", "PostgreSQL", "Prisma"],
    signal: { label: "Plan horizon", value: "7 days" },
    cover: { src: img("nutrimatch-landing"), alt: "NutriMatch landing page with a nutrition summary card", width: 1510, height: 759 },
    gallery: [],
    links: [
      { label: "Live", href: "https://nutrimatch-app.vercel.app/" },
      { label: "Code", href: "https://github.com/Kurtz17/NutriMatch" },
    ],
    problem:
      "Generic meal plans ignore both how much a person actually needs to eat and what they cannot eat. For people with food allergies, a plan that is wrong is not just unhelpful, it is unsafe.",
    approach: [
      { title: "Nutrition targets", body: "Calculated BMR, TDEE, target calories, and macronutrient split from age, gender, height, weight, activity level, and goal." },
      { title: "Data", body: "Turned several public nutrition and allergen datasets into model-ready data that the recommender could rely on." },
      { title: "Safety filter", body: "Allergy-aware filtering that removes foods conflicting with the user's allergy profile before recommending." },
      { title: "Product", body: "Fed these into an end-to-end flow: onboarding, nutrition summary, allergy profile, 7-day plan, and dashboard." },
    ],
    results: [
      "Deployed end-to-end product on Vercel.",
      "Weekly plans generated from each user's own targets and allergy constraints.",
    ],
    facts: [
      { label: "My role", value: "Data Scientist" },
      { label: "Targets", value: "BMR · TDEE" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    slug: "careconnect",
    code: "WEB",
    title: "CareConnect",
    tagline: "A safe place to get psychological help, report cases, and find support.",
    period: "Mar – Jun 2026",
    year: 2026,
    role: "Front-end developer",
    team: "Team project",
    context: "Software Project II (PPL II), Universitas Padjadjaran",
    domains: ["Web"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Vitest"],
    signal: { label: "User roles", value: "3" },
    cover: { src: img("careconnect-landing"), alt: "CareConnect landing page", width: 1173, height: 589 },
    gallery: [
      { src: img("careconnect-dashboard"), alt: "CareConnect user dashboard with consultations and report status", width: 1173, height: 563, caption: "User dashboard: consultations, reports, and donations in one view" },
    ],
    links: [
      { label: "Live", href: "https://care-connect-ten-hazel.vercel.app/" },
      { label: "Code", href: "https://github.com/KangDap/care-connect" },
    ],
    problem:
      "People who need psychological help, or who need to report physical, sexual, or psychological incidents, often have no single safe channel to do it, and no way to follow up on what happens next.",
    approach: [
      { title: "Consultation", body: "Online consultations with an anonymous mode, automated scheduling, and real-time private chat." },
      { title: "Case reporting", body: "A secure reporting module with real-time status tracking." },
      { title: "Access control", body: "Role-based access with separate dashboards for users, psychologists, and admins." },
      { title: "Community and donations", body: "A moderated forum, plus Midtrans payments for donations to the platform or specific cases." },
    ],
    results: [
      "Unit tests with Vitest and a CI pipeline on GitHub Actions.",
      "AI analysis tools help admins find patterns in reported cases.",
    ],
    facts: [
      { label: "My role", value: "Front end" },
      { label: "Roles", value: "User · Psych · Admin" },
      { label: "Quality", value: "Vitest + CI" },
    ],
  },
  {
    slug: "dataniaga",
    code: "DSS",
    title: "DataNiaga",
    tagline: "Retail decision support: what to stock, bundle, and promote, by region.",
    period: "Oct – Dec 2025",
    year: 2025,
    role: "Data mining and modeling",
    team: "3-person team",
    context: "University project, Universitas Padjadjaran",
    domains: ["Machine Learning"],
    stack: ["Python", "LightGBM", "FP-Growth", "Pandas", "Scikit-learn"],
    signal: { label: "Forecast", value: "10 weeks" },
    cover: { src: img("dataniaga-dashboard"), alt: "DataNiaga dashboard with demand forecasts and association rules", width: 1210, height: 759 },
    gallery: [
      { src: img("dataniaga-poster"), alt: "DataNiaga project poster", width: 536, height: 759, caption: "Project poster" },
    ],
    links: [{ label: "Code", href: "https://github.com/hdans/DataNiaga" }],
    problem:
      "A retailer operating across several islands sees very different buying behavior per region. One national forecast leads to stockouts in some places and dead stock in others.",
    approach: [
      { title: "Forecasting", body: "LightGBM with a Tweedie loss and log transform, built for zero-inflated retail demand, forecasting 10 weeks ahead." },
      { title: "Basket analysis", body: "FP-Growth to find product associations for bundling and cross-selling in each island cluster." },
      { title: "Per-region models", body: "A segregated model per region so each one learns local behavior." },
      { title: "Process", body: "CRISP-DM for the data mining work, Waterfall for the system, evaluated with MAE and MAPE." },
    ],
    results: [
      "Stock, promotion, and store-layout recommendations generated from transaction data.",
      "Multi-region patterns visualized for more targeted promotions.",
    ],
    facts: [
      { label: "Model", value: "LightGBM · Tweedie" },
      { label: "Rules", value: "FP-Growth" },
      { label: "Metrics", value: "MAE · MAPE" },
    ],
  },
  {
    slug: "xiaomi-vs-advan-sentiment",
    code: "NLP",
    title: "Xiaomi vs Advan: Sentiment and Aspect Analysis",
    tagline: "What buyers of a local and a global phone brand actually complain about.",
    period: "Oct – Dec 2025",
    year: 2025,
    role: "Data collection and modeling",
    team: "3-person team",
    context: "University project, Universitas Padjadjaran",
    domains: ["NLP"],
    stack: ["Python", "Selenium", "BeautifulSoup", "Scikit-learn", "TF-IDF", "SVM", "LDA"],
    signal: { label: "SVM accuracy", value: "90.8%" },
    cover: { src: img("sentiment-wordcloud"), alt: "Word clouds of negative Advan reviews and positive Xiaomi reviews", width: 1564, height: 456 },
    gallery: [],
    links: [],
    problem:
      "To support local tech brands, it helps to know where they lose to global ones. Star ratings do not say why. Review text does.",
    approach: [
      { title: "Collection", body: "Scraped reviews from official Tokopedia stores with Selenium and BeautifulSoup." },
      { title: "Labeling", body: "Semi-supervised annotation with GPT-4, then manual validation for a reliable ground truth." },
      { title: "Features", body: "Negation merging (\"tidak bagus\" becomes \"tidakbagus\") so the model keeps the meaning of negated phrases." },
      { title: "Modeling", body: "Benchmarked several classifiers. SVM performed best. LDA split negative reviews into five operational themes." },
    ],
    results: [
      "Advan: 85.7% positive sentiment. Xiaomi: 82.9%.",
      "Local-brand complaints centered on dead-on-arrival units and returns, not missing features.",
    ],
    facts: [
      { label: "Best model", value: "SVM, 90.8%" },
      { label: "Advan positive", value: "85.7%" },
      { label: "Xiaomi positive", value: "82.9%" },
    ],
  },
  {
    slug: "public-opinion-toxicity",
    code: "TOX",
    title: "Toxicity in Public Opinion on Polri, 2015 vs 2025",
    tagline: "How the cause of a crisis changes the tone of online discourse.",
    period: "2025",
    year: 2025,
    role: "Data pipeline and analysis",
    team: "3-person team",
    context: "University project, Universitas Padjadjaran",
    domains: ["NLP"],
    stack: ["Python", "Selenium", "BeautifulSoup", "Pandas", "nlp-id", "LDA"],
    signal: { label: "Posts analyzed", value: "12,000+" },
    cover: { src: img("toxicity-results"), alt: "Bar charts comparing toxic and non-toxic accounts in 2015 and 2025", width: 1354, height: 759 },
    gallery: [
      { src: img("toxicity-architecture"), alt: "Modeling architecture: lexicon toxicity detection and LDA topic modeling", width: 1354, height: 759, caption: "Two models: lexicon-based toxicity detection and LDA topics" },
    ],
    links: [],
    problem:
      "Public anger at institutions rises and falls, but not all crises are alike. This study compared an institutional conflict (KPK vs Polri, 2015) with a civilian death (2025) to see how the trigger changes digital civility.",
    approach: [
      { title: "Data", body: "Scraped and cleaned over 12,000 unique posts from X, managed end to end with CRISP-DM." },
      { title: "Toxicity", body: "Lexicon-based detection with custom dictionaries for local slang and dehumanizing terms." },
      { title: "Topics", body: "LDA to map how the conversation shifted between the two periods." },
    ],
    results: [
      "Users posting aggressive content rose from 7.35% (2015) to 18.12% (2025).",
      "Discussion shifted from legal and procedural criticism to emotional, humanitarian anger.",
    ],
    facts: [
      { label: "Toxic users 2015", value: "7.35%" },
      { label: "Toxic users 2025", value: "18.12%" },
      { label: "Method", value: "Lexicon + LDA" },
    ],
  },
  {
    slug: "growmate",
    code: "PM",
    title: "GrowMate",
    tagline: "Planning an AI farming assistant: scope, schedule, cost, and risk.",
    period: "Nov – Dec 2025",
    year: 2025,
    role: "Project planning",
    team: "3-person team",
    context: "University project, Universitas Padjadjaran",
    domains: ["Product"],
    stack: ["COCOMO II", "WBS", "Risk management", "Agile"],
    signal: { label: "Budget est.", value: "IDR 8.79M" },
    cover: { src: img("growmate-cover"), alt: "GrowMate project presentation cover", width: 1172, height: 657 },
    gallery: [],
    links: [],
    problem:
      "Indonesian farmers face more unpredictable weather while having limited access to technology. GrowMate was planned as a digital assistant that helps them adapt.",
    approach: [
      { title: "Product scope", body: "Crop recommendations from location and climate data, CNN-based leaf disease detection, and a daily task system for watering and fertilizing based on weather." },
      { title: "Offline first", body: "Designed to keep working in fields with poor connectivity." },
      { title: "Cost", body: "Estimated the budget with COCOMO II at about IDR 8.79 million." },
      { title: "Plan", body: "A 5-month delivery plan with a work breakdown structure and risk register." },
    ],
    results: [
      "A costed, scheduled plan ready for development.",
      "Main risk identified: model accuracy across crop varieties and lighting conditions.",
    ],
    facts: [
      { label: "Estimation", value: "COCOMO II" },
      { label: "Timeline", value: "5 months" },
      { label: "Budget", value: "≈ IDR 8.79M" },
    ],
  },
];

export const domains: Domain[] = ["Data Engineering", "Machine Learning", "NLP", "Web", "Product"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
