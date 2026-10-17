// Interface copy in English and Japanese. Japanese is a light, optional layer:
// it covers navigation, the hero, section titles, and calls to action.
// Case-study bodies stay in English.

export type Lang = "en" | "ja";

export const dict = {
  "nav.overview": { en: "Overview", ja: "概要" },
  "nav.experience": { en: "Experience", ja: "職歴" },
  "nav.projects": { en: "Projects", ja: "プロジェクト" },
  "nav.lab": { en: "Lab", ja: "ラボ" },
  "nav.skills": { en: "Skills", ja: "スキル" },
  "nav.contact": { en: "Contact", ja: "連絡先" },
  // Short labels for the phone tab bar (about 60px per tab).
  "tab.overview": { en: "Home", ja: "概要" },
  "tab.experience": { en: "Work", ja: "職歴" },
  "tab.projects": { en: "Projects", ja: "実績" },
  "tab.lab": { en: "Lab", ja: "ラボ" },
  "tab.skills": { en: "Skills", ja: "スキル" },
  "tab.contact": { en: "Contact", ja: "連絡" },
  "exp.showMore": { en: "Show earlier roles", ja: "以前の経歴を表示" },
  "exp.showLess": { en: "Show fewer roles", ja: "経歴を折りたたむ" },

  "hero.role": { en: "Data Innovation & AI Intern at Bank Danamon", ja: "ダナモン銀行 データイノベーション＆AI インターン" },
  "hero.summary": {
    en: "7th-semester Informatics Engineering student at Universitas Padjadjaran and Bakti BCA Scholarship awardee. I build data products for financial services, from fund and bond dashboards to data warehouses and machine learning models, and I have worked on the strategy side of investment products at Maybank.",
    ja: "パジャジャラン大学 情報工学科 4年生（7学期）、Bakti BCA 奨学生。投資信託・債券のダッシュボードからデータウェアハウス、機械学習モデルまで、金融向けのデータプロダクトを作っています。Maybank では投資商品の戦略業務を経験しました。",
  },
  "hero.now": {
    en: "Data Innovation & AI intern at Bank Danamon, acting as product owner liaison on an initiative that moves manual processes to AI-driven workflows.",
    ja: "ダナモン銀行でプロダクトオーナーの橋渡し役として、手作業の業務を AI 主導のワークフローへ移行するプロジェクトに携わっています。",
  },
  "hero.nowLabel": { en: "Now", ja: "現在" },
  "cta.cv": { en: "Download CV", ja: "履歴書をダウンロード" },
  "cta.palette": { en: "Search everything", ja: "すべてを検索" },

  "section.experience": { en: "Experience", ja: "職歴" },
  "section.projects": { en: "Projects", ja: "プロジェクト" },
  "section.projectsNote": { en: "Case studies", ja: "ケーススタディ" },
  "section.lab": { en: "Lab", ja: "ラボ" },
  "section.github": { en: "GitHub activity", ja: "GitHub アクティビティ" },
  "section.githubNote": { en: "Live from GitHub", ja: "GitHub から自動更新" },
  "section.skills": { en: "Skills and education", ja: "スキルと学歴" },
  "section.contact": { en: "Contact", ja: "連絡先" },

  "filter.all": { en: "All", ja: "すべて" },
  "project.read": { en: "Read case study", ja: "ケーススタディを読む" },

  "lab.title": { en: "Fund Monitor", ja: "ファンドモニター" },
  "lab.blurb": {
    en: "A public rebuild of the mutual fund dashboard idea from my Maybank internship. It runs on synthetic data, so you can explore it freely.",
    ja: "Maybank インターンで作った投資信託ダッシュボードの考え方を公開用に再構築したものです。架空のデータで動くので自由に操作できます。",
  },
  "lab.open": { en: "Open the demo", ja: "デモを開く" },

  "contact.lead": {
    en: "Open to internships and projects in data, AI, and financial products.",
    ja: "データ・AI・金融プロダクト分野のインターンやプロジェクトのお話をお待ちしています。",
  },

  "honors": { en: "Honors", ja: "受賞" },
  "certs": { en: "Certifications", ja: "資格" },
  "status.active": { en: "Active", ja: "在籍中" },
  "status.completed": { en: "Completed", ja: "修了" },
} as const;

export type DictKey = keyof typeof dict;
