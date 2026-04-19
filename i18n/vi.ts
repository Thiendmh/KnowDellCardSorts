import type { BucketId, SupportValue } from "@/types";

export const vi = {
  common: {
    start: "Bắt đầu",
    continue: "Tiếp tục",
    back: "Quay lại",
    cancel: "Hủy",
    loading: "Đang tải…",
    add: "Thêm",
    skipIntro: "Bỏ qua giới thiệu",
    home: "Trang chủ",
    private: "Riêng tư — chạy hoàn toàn trong trình duyệt",
    privacyFooter:
      "Dữ liệu của bạn chỉ lưu trong localStorage. Dùng \"Reset tất cả\" ở trang kết quả để xóa.",
  },

  languageToggle: {
    label: "Ngôn ngữ",
    en: "EN",
    vi: "VI",
  },

  progress: (step: number, total: number) => `Bước ${step} / ${total}`,

  buckets: {
    unsorted: "Chưa phân loại",
    always: "Luôn coi trọng",
    often: "Thường coi trọng",
    sometimes: "Đôi khi coi trọng",
    seldom: "Hiếm khi coi trọng",
    never: "Không coi trọng",
  } as Record<BucketId, string>,

  bucketShort: {
    always: "Luôn",
    often: "Thường",
    sometimes: "Đôi khi",
    seldom: "Hiếm khi",
    never: "Không",
  },

  support: {
    "3": "Hỗ trợ mạnh",
    "2": "Hỗ trợ vừa",
    "1": "Chưa rõ / cần thêm thông tin",
    "-1": "Xung đột",
    unknown: "Không rõ",
  } as Record<string, string>,

  landing: {
    heroBadge: "Bộ thẻ Knowdell · Lab coaching nghề nghiệp",
    heroTitle: "Bộ thẻ Knowdell",
    heroSubtitle: "Sắp xếp giá trị, kỹ năng, sở thích — hiểu rõ chính mình",
    heroDesc:
      "Một bộ công cụ tự khai vấn giúp bạn hiểu sâu về giá trị, kỹ năng, sở thích và hoạt động giải trí của bản thân để có lựa chọn nghề nghiệp và cuộc sống phù hợp hơn.",
    ctaTry: "Thử bộ Giá trị nghề nghiệp",
    ctaLearn: "Tìm hiểu phương pháp",

    methodologyTitle: "Phương pháp Knowdell Card Sort là gì?",
    methodologyBody:
      "Được phát triển bởi TS. Richard Knowdell — chuyên gia coaching nghề nghiệp với hơn 40 năm kinh nghiệm. Mỗi bộ thẻ là một bài tập sắp xếp ngắn, trực quan: bạn phân loại các thẻ theo mức độ quan trọng, rồi xếp thứ tự ưu tiên để khám phá động lực thật sự đằng sau các lựa chọn.",
    methodologyWhoTitle: "Phù hợp với ai",
    methodologyWhoBody:
      "Người đang cân nhắc chuyển nghề, bạn trẻ định hướng sự nghiệp, coach / mentor cần công cụ làm việc với coachee, hoặc bất kỳ ai muốn kiểm điểm lại các ưu tiên cuộc sống.",

    decksTitle: "4 bộ thẻ Knowdell",
    decksSubtitle: "Mỗi bộ tập trung vào một khía cạnh khác nhau của sự tự hiểu bản thân.",
    comingSoon: "Sắp ra mắt",
    available: "Đã có",
    tryNow: "Thử ngay",
    deckExampleLabel: "Ví dụ thẻ",
    purposeLabel: "Mục đích",

    howItWorksTitle: "Quy trình chung",
    howItWorksSteps: [
      {
        title: "Phân loại vào 5 nhóm",
        body: "Từ \"Luôn coi trọng\" đến \"Không coi trọng\" — giúp gạn lọc nhanh.",
      },
      {
        title: "Xếp hạng Top 8",
        body: "Sắp thứ tự ưu tiên những thẻ quan trọng nhất để thấy rõ điều gì dẫn dắt bạn.",
      },
      {
        title: "Đối chiếu lựa chọn",
        body: "Xem lựa chọn nghề nghiệp / cuộc sống của bạn có hỗ trợ hay xung đột với giá trị cốt lõi.",
      },
    ],

    finalCtaTitle: "Bắt đầu với bộ Giá trị nghề nghiệp",
    finalCtaBody:
      "Bộ thẻ đầu tiên đã sẵn sàng — chỉ mất 15–25 phút để có kết quả đầu tiên.",
  },

  instructions: {
    titleEn: "How to sort",
    titleVi: "Hướng dẫn phân loại",
    intro:
      "Bạn sẽ phân loại 54 thẻ giá trị nghề nghiệp vào 5 nhóm tùy theo mức độ quan trọng.",
    alwaysRule: "Quy tắc: Luôn coi trọng — tối đa 8 thẻ",
    alwaysRuleBody:
      "\"Luôn coi trọng\" chỉ được chứa tối đa 8 thẻ. Đây là những giá trị quan trọng nhất với bạn.",
    tipLabel: "Mẹo:",
    tipBody:
      "Trên desktop, bạn có thể kéo thẻ vào các cột. Trên điện thoại, nhấn vào thẻ để chọn nhóm.",
    startSorting: "Bắt đầu phân loại",
  },

  sort: {
    titleEn: "Sort your 54 career values",
    titleVi: "Phân loại 54 giá trị nghề nghiệp",
    loading: "Đang tải…",
    dropHere: "Thả / nhấn thẻ vào đây",
    ready: "Sẵn sàng! Nhấn Tiếp tục.",
    remaining: (n: number) => `Còn ${n} thẻ chưa phân loại.`,
    needMore: (n: number) => `Cần thêm ${n} thẻ vào \"Luôn coi trọng\".`,
    tooMany: (n: number) => `Quá ${n} thẻ trong \"Luôn coi trọng\" — bỏ bớt.`,
    toastIncomplete: "Cần phân loại hết 54 thẻ và có đúng 8 thẻ trong Luôn coi trọng.",
    toastAlwaysFull: (limit: number) => `\"Luôn coi trọng\" chỉ được tối đa ${limit} thẻ.`,
    assignSheetReturn: "Trả về Chưa phân loại",
  },

  rank: {
    titleEn: "Rank your top 8 from most to least important",
    titleVi: "Xếp hạng 8 giá trị quan trọng nhất (1 = quan trọng nhất)",
    tip: "Mẹo: Desktop — kéo tay cầm bên trái. Mobile — dùng nút ▲ ▼ bên phải.",
    moveUp: "Di chuyển lên",
    moveDown: "Di chuyển xuống",
    dragReorder: "Kéo để sắp xếp lại",
  },

  choices: {
    titleEn: "Compare your choices",
    titleVi: "So sánh các lựa chọn",
    section1: "1. Lựa chọn của bạn",
    section2: "2. Ma trận hỗ trợ",
    section2Help:
      "Với mỗi giá trị, đánh giá lựa chọn đó hỗ trợ giá trị đến mức nào:",
    listHelp:
      "Thêm 2–5 lựa chọn nghề nghiệp / cuộc sống bạn muốn so sánh (ví dụ: \"Ở lại công ty hiện tại\", \"Chuyển sang startup\", \"Làm freelance\").",
    newChoicePlaceholder: "Tên lựa chọn mới…",
    countSuffix: "lựa chọn",
    minRequired: "(cần tối thiểu 2)",
    rename: "Đổi tên",
    remove: "Xóa",
    minChoices: "Cần tối thiểu 2 lựa chọn.",
    matrixIncomplete: "Điền đầy đủ các ô của ma trận.",
    matrixAllFilled: "Đã điền đủ!",
    emptyMatrix: "Thêm ít nhất 2 lựa chọn ở trên để bắt đầu điền ma trận.",
    columnValue: "Giá trị",
    seeResults: "Xem kết quả",
    labelEmpty: "Nhãn không được để trống.",
    maxReached: "Tối đa 5 lựa chọn.",
    cannotAdd: "Không thể thêm",
    toastIncomplete: "Hãy thêm 2–5 lựa chọn và điền đủ các ô trước khi tiếp tục.",
  },

  results: {
    titleEn: "Your results",
    titleVi: "Kết quả của bạn",
    top8Heading: "8 giá trị nghề nghiệp hàng đầu của bạn",
    comparisonHeading: "So sánh các lựa chọn",
    insightsHeading: "Insight",
    top3: "Top 3 — Giá trị cốt lõi",
    ranks48: "Hạng 4 – 8",
    backToChoices: "Quay lại lựa chọn",
    emptyInsights: "Chưa có insight nào — hãy điền ma trận trước.",
    colChoice: "Lựa chọn",
    colTotal: "Tổng",
    colSupport: "Hỗ trợ",
    colUnknown: "Không rõ",
    colConflict: "Xung đột",
    copy: "Sao chép văn bản",
    print: "In",
    copied: "Đã sao chép kết quả",
    copyFailed: "Không sao chép được — thử chọn và sao chép thủ công.",
  },

  reset: {
    button: "Reset tất cả",
    title: "Xóa toàn bộ tiến trình?",
    body:
      "Toàn bộ phân loại thẻ, thứ tự top 8, lựa chọn và ma trận sẽ bị xóa vĩnh viễn khỏi trình duyệt này. Không thể khôi phục.",
    confirm: "Có, xóa tất cả",
  },

  insights: {
    highestScore: (label: string, score: number) =>
      `\"${label}\" có tổng điểm cao nhất (${score}) — đây là lựa chọn được các giá trị cốt lõi hiện tại của bạn ủng hộ mạnh nhất.`,
    mostUnknown: (label: string, count: number) =>
      `\"${label}\" có nhiều ô \"Không rõ\" nhất (${count}) — bạn cần tìm hiểu thêm thông tin trước khi quyết định.`,
    mostConflict: (label: string, count: number) =>
      `\"${label}\" có nhiều xung đột nhất (${count}) — lựa chọn này có thể đi ngược lại các giá trị cốt lõi của bạn.`,
  },

  clipboard: {
    header: "BỘ THẺ GIÁ TRỊ NGHỀ NGHIỆP — KẾT QUẢ",
    topSection: "8 GIÁ TRỊ HÀNG ĐẦU",
    comparisonSection: "BẢNG SO SÁNH",
    insightsSection: "INSIGHT",
    cols: {
      choice: "Lựa chọn",
      total: "Tổng",
      support: "Hỗ trợ",
      unknown: "Không rõ",
      conflict: "Xung đột",
    },
  },

  skills: {
    common: {
      deckName: "Kỹ năng tạo động lực",
      deckNameEn: "Motivated Skills",
    },
    intro: {
      title: "Kỹ năng tạo động lực",
      titleEn: "Motivated Skills",
      body: "Bộ thẻ giúp bạn nhận ra kỹ năng nào thực sự tạo động lực — không chỉ kỹ năng bạn có, mà là kỹ năng bạn vừa thành thạo vừa yêu thích.",
      stepsTitle: "Quy trình 3 bước",
      step1Label: "Bước 1 — Mức độ yêu thích",
      step1Body: "Phân loại 51 thẻ vào 5 nhóm theo mức độ bạn yêu thích mỗi kỹ năng.",
      step2Label: "Bước 2 — Mức độ thành thạo",
      step2Body: "Chấm 3 cấp độ thành thạo cho từng thẻ.",
      step3Label: "Bước 3 — 5 nhóm kết quả",
      step3Body: "App kết hợp 2 trục thành 5 nhóm Knowdell: Động lực, Cần phát triển, Trung tính, Kiệt sức, Không liên quan.",
      cta: "Bắt đầu",
    },
    enjoyment: {
      titleEn: "Sort skills by enjoyment",
      titleVi: "Phân loại theo mức độ yêu thích",
      subtitle: "Mỗi nhóm cần tối thiểu 3 thẻ.",
      buckets: {
        unsorted: "Chưa phân loại",
        love: "Cực kỳ yêu thích",
        "like-a-lot": "Rất thích",
        like: "Thích",
        dislike: "Không thích",
        hate: "Hoàn toàn không thích",
      },
      minPerBucket: "Tối thiểu 3 thẻ",
      counterBelow: (n: number) => `${n} / 3+`,
      toastUnsorted: (n: number) => `Còn ${n} thẻ chưa phân loại.`,
      toastBucketUnderfilled: (name: string, need: number) =>
        `Nhóm "${name}" cần thêm ${need} thẻ (tối thiểu 3).`,
      continueLabel: "Tiếp tục",
      dropHere: "Thả / nhấn thẻ vào đây",
      assignSheetReturn: "Trả về Chưa phân loại",
    },
    proficiency: {
      titleEn: "Rate your proficiency",
      titleVi: "Chấm mức độ thành thạo",
      subtitle: "Chấm 3 cấp độ thành thạo cho cả 51 thẻ.",
      levels: {
        expert: "Rất thành thạo",
        competent: "Thành thạo",
        learning: "Chưa thành thạo",
      },
      counter: (done: number, total: number) => `${done} / ${total} đã chấm`,
      toastIncomplete: (remaining: number) =>
        `Còn ${remaining} thẻ chưa chấm thành thạo.`,
      continueLabel: "Xem kết quả",
      groupLabel: (bucketName: string, count: number) =>
        `${bucketName} (${count})`,
    },
    results: {
      titleEn: "Your Motivated Skills",
      titleVi: "Kết quả Motivated Skills",
      groups: {
        motivated: {
          name: "Động lực",
          nameEn: "Motivated",
          description:
            "Thành thạo + yêu thích. Đây là vùng cốt lõi — hãy tìm công việc dùng nhiều nhất những kỹ năng này.",
        },
        developmental: {
          name: "Cần phát triển",
          nameEn: "Developmental",
          description:
            "Yêu thích nhưng chưa thành thạo. Đầu tư học thêm — tiềm năng cao nhất cho tương lai.",
        },
        neutral: {
          name: "Trung tính",
          nameEn: "Neutral",
          description:
            "Cảm xúc trung lập. Không phải ưu tiên phát triển, cũng không cần tránh.",
        },
        burnout: {
          name: "Kiệt sức",
          nameEn: "Burnout",
          description:
            "Thành thạo nhưng không thích. Dấu hiệu cảnh báo — nếu công việc tập trung vào đây, bạn dễ cháy sức.",
        },
        irrelevant: {
          name: "Không liên quan",
          nameEn: "Irrelevant",
          description:
            "Không thích và cũng chưa thành thạo. Có thể bỏ qua, không nên đặt làm trọng tâm.",
        },
      },
      groupCount: (n: number) => `${n} thẻ`,
      copy: "Sao chép văn bản",
      print: "In",
      copied: "Đã sao chép kết quả",
      copyFailed: "Không sao chép được — thử chọn và sao chép thủ công.",
      resetTitle: "Xóa toàn bộ tiến trình Motivated Skills?",
      resetBody:
        "Toàn bộ phân loại và điểm thành thạo của bộ Motivated Skills sẽ bị xóa vĩnh viễn khỏi trình duyệt này. Bộ Career Values không bị ảnh hưởng.",
      resetConfirm: "Có, xóa Motivated Skills",
      resetButton: "Reset Motivated Skills",
    },
    clipboard: {
      header: "BỘ THẺ MOTIVATED SKILLS — KẾT QUẢ",
    },
  },
};

export type Dict = typeof vi;
