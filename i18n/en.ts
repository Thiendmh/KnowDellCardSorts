import type { Dict } from "./vi";
import type { BucketId } from "@/types";

export const en: Dict = {
  common: {
    start: "Start",
    continue: "Continue",
    back: "Back",
    cancel: "Cancel",
    loading: "Loading…",
    add: "Add",
    skipIntro: "Skip intro",
    home: "Home",
    private: "Private — runs entirely in your browser",
    privacyFooter:
      "Your data is saved in localStorage only. Use \"Reset all\" on the results page to clear.",
  },

  languageToggle: {
    label: "Language",
    en: "EN",
    vi: "VI",
  },

  progress: (step: number, total: number) => `Step ${step} of ${total}`,

  buckets: {
    unsorted: "Unsorted",
    always: "Always Valued",
    often: "Often Valued",
    sometimes: "Sometimes Valued",
    seldom: "Seldom Valued",
    never: "Never Valued",
  } as Record<BucketId, string>,

  bucketShort: {
    always: "Always",
    often: "Often",
    sometimes: "Sometimes",
    seldom: "Seldom",
    never: "Never",
  },

  support: {
    "3": "Strong support",
    "2": "Moderate support",
    "1": "Unclear / needs more info",
    "-1": "Conflict",
    unknown: "Unknown",
  } as Record<string, string>,

  landing: {
    heroBadge: "Knowdell Card Decks · Career coaching lab",
    heroTitle: "Knowdell Card Decks",
    heroSubtitle: "Sort values, skills, and interests — know yourself better",
    heroDesc:
      "A self-coaching toolkit that helps you understand your values, skills, interests, and leisure preferences so you can make career and life choices that actually fit.",
    ctaTry: "Try the Career Values deck",
    ctaLearn: "Learn about the method",

    methodologyTitle: "What is the Knowdell Card Sort method?",
    methodologyBody:
      "Developed by Dr. Richard Knowdell — a career coach with 40+ years of experience. Each deck is a short, hands-on sorting exercise: you group cards by importance, then rank your top priorities to surface the real drivers behind your choices.",
    methodologyWhoTitle: "Who it's for",
    methodologyWhoBody:
      "People considering a career change, early-career professionals navigating direction, coaches and mentors who need a working tool with their coachee, or anyone wanting to re-examine life priorities.",

    decksTitle: "The 4 Knowdell decks",
    decksSubtitle: "Each deck zooms in on a different dimension of self-knowledge.",
    comingSoon: "Coming soon",
    available: "Available",
    tryNow: "Try now",
    deckExampleLabel: "Example card",
    purposeLabel: "Purpose",

    howItWorksTitle: "How it works",
    howItWorksSteps: [
      {
        title: "Sort cards into groups",
        body: "Place each card into a category — from \"love it\" to \"no interest\" — to quickly narrow the full deck down to what resonates.",
      },
      {
        title: "Refine your top picks",
        body: "Go deeper on the cards that matter: rank them, rate a second dimension, or compare them against your life choices.",
      },
      {
        title: "Discover your results",
        body: "Get a personalized breakdown — what drives you, what you should lean into, and where to focus next.",
      },
    ],

    finalCtaTitle: "Start with the Career Values deck",
    finalCtaBody:
      "The first deck is ready — 15–25 minutes to your first result.",
  },

  instructions: {
    titleEn: "How to sort",
    titleVi: "Hướng dẫn phân loại",
    intro:
      "You'll sort 54 career values into five buckets based on how much each one matters to you.",
    alwaysRule: "Rule: Always Valued — max 8 cards",
    alwaysRuleBody:
      "\"Always Valued\" can hold at most 8 cards. These are the values that matter most to you.",
    tipLabel: "Tip:",
    tipBody:
      "On desktop, drag cards into columns. On mobile, tap a card to pick a bucket.",
    startSorting: "Start sorting",
  },

  sort: {
    titleEn: "Sort your 54 career values",
    titleVi: "Phân loại 54 giá trị nghề nghiệp",
    loading: "Loading…",
    dropHere: "Drop / tap cards here",
    ready: "Ready! Click Continue.",
    remaining: (n: number) => `${n} card${n === 1 ? "" : "s"} left to sort.`,
    needMore: (n: number) => `Need ${n} more in \"Always Valued\".`,
    tooMany: (n: number) => `${n} too many in \"Always Valued\" — remove some.`,
    toastIncomplete: "Sort all 54 cards with exactly 8 in Always Valued.",
    toastAlwaysFull: (limit: number) => `\"Always Valued\" holds at most ${limit} cards.`,
    assignSheetReturn: "Return to Unsorted",
  },

  rank: {
    titleEn: "Rank your top 8 from most to least important",
    titleVi: "Xếp hạng 8 giá trị quan trọng nhất (1 = quan trọng nhất)",
    tip: "Tip: Desktop — drag the handle on the left. Mobile — use ▲ ▼ buttons on the right.",
    moveUp: "Move up",
    moveDown: "Move down",
    dragReorder: "Drag to reorder",
  },

  choices: {
    titleEn: "Compare your choices",
    titleVi: "So sánh các lựa chọn",
    section1: "1. Your choices",
    section2: "2. Support matrix",
    section2Help:
      "For each value, rate how well the choice supports that value:",
    listHelp:
      "Add 2–5 career / life choices you want to compare (e.g., \"Stay at current company\", \"Move to startup\", \"Go freelance\").",
    newChoicePlaceholder: "New choice label…",
    countSuffix: "choices",
    minRequired: "(min 2)",
    rename: "Rename",
    remove: "Remove",
    minChoices: "At least 2 choices required.",
    matrixIncomplete: "Fill every cell of the matrix.",
    matrixAllFilled: "All filled!",
    emptyMatrix: "Add at least 2 choices above to start the matrix.",
    columnValue: "Value",
    seeResults: "See results",
    labelEmpty: "Label cannot be empty.",
    maxReached: "Maximum 5 choices.",
    cannotAdd: "Cannot add",
    toastIncomplete: "Add 2–5 choices and fill every cell before continuing.",
  },

  results: {
    titleEn: "Your results",
    titleVi: "Kết quả của bạn",
    top8Heading: "Your top 8 career values",
    comparisonHeading: "Comparison of choices",
    insightsHeading: "Insights",
    top3: "Top 3 — Core values",
    ranks48: "Ranks 4 – 8",
    backToChoices: "Back to choices",
    emptyInsights: "No insights yet — fill the matrix first.",
    colChoice: "Choice",
    colTotal: "Total",
    colSupport: "Support",
    colUnknown: "Unknown",
    colConflict: "Conflict",
    copy: "Copy as text",
    print: "Print",
    copied: "Copied results to clipboard",
    copyFailed: "Could not copy — try selecting and copying manually.",
  },

  reset: {
    button: "Reset all",
    title: "Reset all progress?",
    body:
      "All card sorting, your top 8 order, choices, and matrix will be permanently deleted from this browser. This cannot be undone.",
    confirm: "Yes, reset everything",
  },

  insights: {
    highestScore: (label: string, score: number) =>
      `\"${label}\" has the highest total score (${score}) — this is the choice most supported by your current core values.`,
    mostUnknown: (label: string, count: number) =>
      `\"${label}\" has the most \"Unknown\" cells (${count}) — you need more information before deciding.`,
    mostConflict: (label: string, count: number) =>
      `\"${label}\" has the most conflicts (${count}) — this choice may go against your core values.`,
  },

  clipboard: {
    header: "CAREER VALUES — RESULTS",
    topSection: "TOP 8 RANKED VALUES",
    comparisonSection: "COMPARISON TABLE",
    insightsSection: "INSIGHTS",
    cols: {
      choice: "Choice",
      total: "Total",
      support: "Support",
      unknown: "Unknown",
      conflict: "Conflict",
    },
  },

  skills: {
    common: {
      deckName: "Motivated Skills",
      deckNameEn: "Motivated Skills",
    },
    intro: {
      title: "Motivated Skills",
      titleEn: "Motivated Skills",
      body: "A card deck that surfaces which skills genuinely motivate you — not just skills you have, but skills you both enjoy and are good at.",
      stepsTitle: "3 steps",
      step1Label: "Step 1 — Enjoyment",
      step1Body: "Sort 51 cards into 5 buckets by how much you enjoy each skill.",
      step2Label: "Step 2 — Proficiency",
      step2Body: "Rate every card on 3 proficiency levels.",
      step3Label: "Step 3 — 5 result groups",
      step3Body: "The app combines both axes into 5 Knowdell groups: Motivated, Developmental, Neutral, Burnout, Irrelevant.",
      cta: "Start",
    },
    enjoyment: {
      titleEn: "Sort skills by enjoyment",
      titleVi: "Phân loại theo mức độ yêu thích",
      subtitle: "Each bucket needs at least 3 cards.",
      buckets: {
        unsorted: "Unsorted",
        love: "Absolutely love it",
        "like-a-lot": "Really enjoy",
        like: "Like",
        dislike: "Don't enjoy",
        hate: "Strongly dislike",
      },
      minPerBucket: "At least 3",
      counterBelow: (n: number) => `${n} / 3+`,
      toastUnsorted: (n: number) => `${n} card${n === 1 ? "" : "s"} still unsorted.`,
      toastBucketUnderfilled: (name: string, need: number) =>
        `Bucket "${name}" needs ${need} more card${need === 1 ? "" : "s"} (min 3).`,
      continueLabel: "Continue",
      dropHere: "Drop / tap cards here",
      assignSheetReturn: "Return to Unsorted",
    },
    proficiency: {
      titleEn: "Rate your proficiency",
      titleVi: "Chấm mức độ thành thạo",
      subtitle: "Rate every one of the 51 cards on 3 proficiency levels.",
      levels: {
        expert: "Highly proficient",
        competent: "Proficient",
        learning: "Still learning",
      },
      counter: (done: number, total: number) => `${done} / ${total} rated`,
      toastIncomplete: (remaining: number) =>
        `${remaining} card${remaining === 1 ? "" : "s"} still need a proficiency rating.`,
      continueLabel: "See results",
      groupLabel: (bucketName: string, count: number) =>
        `${bucketName} (${count})`,
    },
    results: {
      titleEn: "Your Motivated Skills",
      titleVi: "Kết quả Motivated Skills",
      groups: {
        motivated: {
          name: "Motivated",
          nameEn: "Motivated",
          description:
            "Skilled AND enjoy it. Core zone — seek work that uses these most.",
        },
        developmental: {
          name: "Developmental",
          nameEn: "Developmental",
          description:
            "Enjoy but not yet skilled. Invest in learning — highest future potential.",
        },
        neutral: {
          name: "Neutral",
          nameEn: "Neutral",
          description:
            "Neutral feelings. Not a development priority, not something to avoid either.",
        },
        burnout: {
          name: "Burnout",
          nameEn: "Burnout",
          description:
            "Skilled but don't enjoy it. Warning sign — if the job leans here, burnout risk is real.",
        },
        irrelevant: {
          name: "Irrelevant",
          nameEn: "Irrelevant",
          description:
            "Don't enjoy and not skilled. Safe to deprioritize; don't make this the focus.",
        },
      },
      groupCount: (n: number) => `${n} card${n === 1 ? "" : "s"}`,
      copy: "Copy as text",
      print: "Print",
      copied: "Results copied to clipboard",
      copyFailed: "Could not copy — select and copy manually.",
      resetTitle: "Reset Motivated Skills progress?",
      resetBody:
        "All enjoyment sorting and proficiency ratings for Motivated Skills will be permanently deleted from this browser. Your Career Values progress is NOT affected.",
      resetConfirm: "Yes, reset Motivated Skills",
      resetButton: "Reset Motivated Skills",
    },
    clipboard: {
      header: "MOTIVATED SKILLS — RESULTS",
    },
  },

  interests: {
    common: {
      deckName: "Sở thích nghề nghiệp",
      deckNameEn: "Occupational Interests",
    },
    landing: {
      title: "Khám phá sở thích nghề nghiệp",
      titleEn: "Explore your occupational interests",
      body:
        "Sort 52 occupations by how much they interest you, rank your top picks, rate your exposure to each, and see which to pursue, explore, or skip.",
      stepsTitle: "You'll go through 4 steps",
      step1Label: "Sort",
      step1Body: "Split the 52 occupation cards across 5 interest levels.",
      step2Label: "Rank",
      step2Body: "Pick 3, 5, or 8 top interests and put them in order.",
      step3Label: "Exposure",
      step3Body: "Rate how much contact you've had with the top-interest cards.",
      step4Label: "Results",
      step4Body: "See four recommended groups and what to do next.",
      cta: "Get started",
      timeHint: "Takes about 15–20 minutes",
    },
    interestLevels: {
      unsorted: { label: "Unsorted", short: "Unsorted" },
      "very-high": { label: "Very High Interest", short: "Very High" },
      high: { label: "High Interest", short: "High" },
      medium: { label: "Medium Interest", short: "Medium" },
      low: { label: "Low Interest", short: "Low" },
      none: { label: "No Interest", short: "None" },
    },
    exposureLevels: {
      experienced: {
        label: "Direct experience",
        description: "You've done or practised this work yourself.",
      },
      explored: {
        label: "Some exploration",
        description: "You've read, asked, or observed — but not tried it.",
      },
      none: {
        label: "No exposure",
        description: "You don't yet have concrete information about this work.",
      },
    },
    groups: {
      "pursue-now": {
        label: "Pursue Now",
        description:
          "Your top picks — prioritise time and concrete action here.",
      },
      "explore-deep": {
        label: "Explore Deeply",
        description:
          "You're interested and have some exposure — dig deeper to decide.",
      },
      consider: {
        label: "Consider",
        description:
          "You're interested but haven't been exposed — try shadowing, interviewing, or reading before committing.",
      },
      skip: {
        label: "Skip",
        description: "Low interest — you can deprioritise these.",
      },
    },
    sort: {
      title: "Phân loại theo mức độ quan tâm",
      titleEn: "Sort by interest level",
      instruction:
        "Drag each occupation card into one of the 5 columns. On mobile, tap the card to pick.",
      unsortedLabel: "Unsorted",
      counter: (sorted: number, total: number) => `${sorted} / ${total}`,
      toastUnsorted: (n: number) => `${n} cards still unsorted.`,
      toastBucketUnderfilled: (bucket: string, need: number) =>
        `Bucket "${bucket}" needs ${need} more cards.`,
      hintReady: "All sorted — ready to rank.",
    },
    rank: {
      title: "Xếp hạng nghề quan tâm nhất",
      titleEn: "Rank your top interests",
      instruction:
        "Choose how many top picks you want to rank, then drag (or use arrows on mobile) to order them.",
      sizeSelectLabel: "Number of top picks",
      sizeOption: (n: number) => `Top ${n}`,
      sizeDisabledHint: (available: number) =>
        `You need at least ${available} cards in "Very High Interest" to pick this.`,
      sizeAutoAdjusted: (n: number) =>
        `Adjusted to Top ${n} because "Very High" doesn't have enough cards.`,
      topZoneLabel: (n: number) => `Your top ${n}`,
      restZoneLabel: "Other cards (Very High Interest)",
      incomplete: (need: number) => `Rank ${need} more card(s) into Top.`,
    },
    exposure: {
      title: "Mức độ tiếp xúc",
      titleEn: "Exposure level",
      instruction:
        "For each card in your 3 top-interest buckets, say how much exposure you've had.",
      counter: (done: number, total: number) => `${done} / ${total} rated`,
      sectionHeader: (bucketLabel: string, count: number) =>
        `${bucketLabel} (${count})`,
      toastIncomplete: (n: number) => `${n} cards still need an exposure rating.`,
    },
    results: {
      title: "Kết quả sở thích nghề nghiệp",
      titleEn: "Your occupational interests",
      subtitle:
        "Four recommended groups to help you decide what to pursue, explore, consider, or skip.",
      countBadge: (n: number) => `${n} cards`,
      emptyGroup: "No cards in this group.",
      actions: {
        copy: "Copy",
        copied: "Copied!",
        print: "Print / Save PDF",
        reset: "Start over",
        copyFailed: "Copy failed — please try manually",
      },
      exposureBadge: (label: string) => `• ${label}`,
      rankIndex: (n: number) => `#${n}`,
    },
    insights: {
      headline: (pursueN: number, exploreN: number) =>
        `You have ${pursueN} priority picks and ${exploreN} to explore deeply.`,
      tipExperiencedTop: (n: number) =>
        `You already have direct experience in ${n} top-interest picks — leverage your existing network.`,
      tipUntriedTop: (n: number) =>
        `${n} of your top interests are untried — consider shadowing for a day or interviewing someone in the field.`,
      tipBackupDeep: (n: number) =>
        `${n} "medium" options already have exposure — they might be solid backups.`,
    },
    reset: {
      title: "Start this deck over?",
      body: "This clears your interest sort, ranking, and exposure ratings for the Occupational Interests deck. The other two decks are untouched.",
      confirm: "Start over",
      cancel: "Cancel",
    },
    clipboard: {
      header: "OCCUPATIONAL INTERESTS / KHÁM PHÁ SỞ THÍCH NGHỀ NGHIỆP",
    },
  },
  leisure: {
    common: {
      deckName: "Hoạt động giải trí & nghỉ hưu",
      deckNameEn: "Leisure / Retirement Activities",
    },
    landing: {
      title: "Khám phá hoạt động giải trí của bạn",
      titleEn: "Explore your leisure activities",
      body: "Sort 48 activities by how often you do them and how much you want to do them, rank your top picks, rate how active you currently are, and see which to keep, develop, or release.",
      stepsTitle: "You'll go through 4 steps",
      step1Label: "Sort",
      step1Body: "Split the 48 activity cards across 5 frequency/desire levels.",
      step2Label: "Rank",
      step2Body: "Pick 3, 5, or 8 top activities and put them in order.",
      step3Label: "Frequency",
      step3Body: "Rate how actively you're currently doing the top-interest activities.",
      step4Label: "Results",
      step4Body: "See four recommended groups and what to do next.",
      cta: "Get started",
      timeHint: "Takes about 15–20 minutes",
    },
    activityLevels: {
      unsorted: { label: "Unsorted", short: "Unsorted" },
      "do-often": { label: "Do Often", short: "Do Often" },
      "want-more": { label: "Would Like to Do More", short: "Want More" },
      "used-to": { label: "Used to Do", short: "Used to Do" },
      "never-tried": { label: "Never Tried", short: "Never Tried" },
      "not-interested": { label: "Not Interested", short: "Not Interested" },
    },
    frequencyLevels: {
      active: {
        label: "Currently Active",
        description: "You regularly do this activity.",
      },
      occasional: {
        label: "Occasionally",
        description: "You do it sometimes, but not consistently.",
      },
      "not-active": {
        label: "Not Currently Active",
        description: "You're not currently doing this activity.",
      },
    },
    groups: {
      priority: {
        label: "Priority Activities",
        description: "Your top picks — invest time and energy here.",
      },
      "keep-active": {
        label: "Keep Active",
        description: "You're interested and doing it — keep it up or do more.",
      },
      develop: {
        label: "Develop",
        description: "You're interested but not doing it yet — a great opportunity to start.",
      },
      release: {
        label: "Release",
        description: "Not interested — you can drop these from consideration.",
      },
    },
    sort: {
      title: "Phân loại theo tần suất & mong muốn",
      titleEn: "Sort by frequency & desire",
      instruction: "Drag each activity card into one of the 5 columns. On mobile, tap the card to pick.",
      unsortedLabel: "Unsorted",
      counter: (sorted: number, total: number) => `${sorted} / ${total}`,
      toastUnsorted: (n: number) => `${n} cards still unsorted.`,
      toastBucketUnderfilled: (bucket: string, need: number) =>
        `Bucket "${bucket}" needs ${need} more cards.`,
      hintReady: "All sorted — ready to rank.",
    },
    rank: {
      title: "Xếp hạng hoạt động hay làm nhất",
      titleEn: "Rank your top leisure activities",
      instruction: "Choose how many top picks you want to rank, then drag (or use arrows on mobile) to order them.",
      sizeSelectLabel: "Number of top picks",
      sizeOption: (n: number) => `Top ${n}`,
      sizeDisabledHint: (available: number) =>
        `You need at least ${available} cards in "Do Often" to pick this.`,
      sizeAutoAdjusted: (n: number) =>
        `Adjusted to Top ${n} because "Do Often" doesn't have enough cards.`,
      topZoneLabel: (n: number) => `Your top ${n}`,
      restZoneLabel: "Other cards (Do Often)",
      incomplete: (need: number) => `Rank ${need} more card(s) into Top.`,
    },
    frequency: {
      title: "Mức độ thực hiện hiện tại",
      titleEn: "Current frequency",
      instruction: "For each card in your 3 top-activity buckets, rate how actively you're currently doing it.",
      counter: (done: number, total: number) => `${done} / ${total} rated`,
      sectionHeader: (bucketLabel: string, count: number) =>
        `${bucketLabel} (${count})`,
      toastIncomplete: (n: number) => `${n} cards still need a frequency rating.`,
    },
    results: {
      title: "Kết quả hoạt động giải trí",
      titleEn: "Your leisure activities",
      subtitle: "Four recommended groups to help you decide what to keep, develop, or release.",
      countBadge: (n: number) => `${n} cards`,
      emptyGroup: "No cards in this group.",
      actions: {
        copy: "Copy",
        copied: "Copied!",
        print: "Print / Save PDF",
        reset: "Start over",
        copyFailed: "Copy failed — please try manually",
      },
      frequencyBadge: (label: string) => `• ${label}`,
      rankIndex: (n: number) => `#${n}`,
    },
    insights: {
      headline: (priorityCount: number, keepActiveCount: number) =>
        `You have ${priorityCount} priority activities and ${keepActiveCount} to keep active.`,
      tipActiveTop: (n: number) =>
        `You're actively doing ${n} of your top picks — keep that momentum going.`,
      tipUntriedHighInterest: (n: number) =>
        `${n} activities you want to do more are not currently active — try scheduling one this month.`,
    },
    reset: {
      title: "Start this deck over?",
      body: "This clears your activity sort, ranking, and frequency ratings for the Leisure Activities deck. The other decks are untouched.",
      confirm: "Start over",
      cancel: "Cancel",
    },
    clipboard: {
      header: "LEISURE & RETIREMENT ACTIVITIES / HOẠT ĐỘNG GIẢI TRÍ & NGHỈ HƯU",
    },
  },
};
