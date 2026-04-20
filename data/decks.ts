import type { LucideIcon } from "lucide-react";
import { Compass, Sparkles, Palette, Mountain } from "lucide-react";

export type DeckStatus = "available" | "coming-soon";

export interface Deck {
  id: string;
  nameEn: string;
  nameVi: string;
  purposeEn: string;
  purposeVi: string;
  exampleEn: string;
  exampleVi: string;
  icon: LucideIcon;
  href: string;
  status: DeckStatus;
  accent: string;
}

export const decks: Deck[] = [
  {
    id: "career-values",
    nameEn: "Career Values",
    nameVi: "Giá trị nghề nghiệp",
    purposeEn:
      "Clarify what matters most in your career: recognition, balance, growth, impact…",
    purposeVi:
      "Làm rõ điều gì quan trọng nhất trong nghề nghiệp: ghi nhận, cân bằng, phát triển, tác động…",
    exampleEn: "Achievement · Balance · Creative expression · Recognition",
    exampleVi: "Thành tựu · Cân bằng · Sáng tạo · Được ghi nhận",
    icon: Compass,
    href: "/instructions",
    status: "available",
    accent: "from-emerald-500/10 to-emerald-500/0 border-emerald-300",
  },
  {
    id: "motivated-skills",
    nameEn: "Motivated Skills",
    nameVi: "Kỹ năng tạo động lực",
    purposeEn:
      "Identify skills you're genuinely energized using — not just skills you have.",
    purposeVi:
      "Nhận ra những kỹ năng mà bạn thực sự có động lực sử dụng — không chỉ kỹ năng bạn đang có.",
    exampleEn: "Negotiating · Facilitating · Writing · Analyzing data",
    exampleVi: "Đàm phán · Điều phối · Viết · Phân tích dữ liệu",
    icon: Sparkles,
    href: "/skills",
    status: "available",
    accent: "from-sky-500/10 to-sky-500/0 border-sky-300",
  },
  {
    id: "occupational-interest",
    nameEn: "Occupational Interest",
    nameVi: "Sở thích nghề nghiệp",
    purposeEn:
      "Discover which fields and types of work pull your curiosity the strongest.",
    purposeVi:
      "Khám phá lĩnh vực và loại công việc thu hút sự tò mò của bạn nhất.",
    exampleEn: "Teaching · Technology · Healthcare · Arts & design",
    exampleVi: "Giảng dạy · Công nghệ · Y tế · Nghệ thuật & thiết kế",
    icon: Palette,
    href: "/interests",
    status: "available",
    accent: "from-amber-500/10 to-amber-500/0 border-amber-300",
  },
  {
    id: "leisure-activities",
    nameEn: "Leisure / Retirement Activities",
    nameVi: "Hoạt động giải trí / nghỉ hưu",
    purposeEn:
      "Design a life outside work that fits who you are — for now and for later.",
    purposeVi:
      "Thiết kế cuộc sống ngoài công việc phù hợp với bạn — bây giờ và sau này.",
    exampleEn: "Gardening · Volunteering · Travel · Learning a language",
    exampleVi: "Làm vườn · Thiện nguyện · Du lịch · Học ngôn ngữ mới",
    icon: Mountain,
    href: "#",
    status: "coming-soon",
    accent: "from-rose-500/10 to-rose-500/0 border-rose-300",
  },
];
