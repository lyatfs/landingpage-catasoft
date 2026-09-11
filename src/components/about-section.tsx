"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Target,
  Compass,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Maximize2,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

interface OfficePhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
}

const officePhotos: Record<"vi" | "en", OfficePhoto[]> = {
  vi: [
    {
      id: "reception",
      src: "/images/catasoft-reception.jpg",
      title: "Sảnh Đón tiếp & Không gian Nhận diện",
      subtitle: "AI kiến tạo giá trị số · Better Technology, Brighter Future",
      tag: "Trụ sở CataSoft",
    },
    {
      id: "panoramic",
      src: "/images/catasoft-office-panoramic.jpg",
      title: "Không gian R&D & Kỹ thuật Toàn cảnh",
      subtitle: "Tầm nhìn khoáng đạt truyền cảm hứng kiến tạo giải pháp đột phá",
      tag: "Trung tâm Nghiên cứu AI",
    },
    {
      id: "meeting",
      src: "/images/catasoft-meeting-collaboration.jpg",
      title: "Phòng Hội thảo & Cố vấn Chiến lược",
      subtitle: "Đồng hành cùng đối tác giải quyết các bài toán vận hành phức tạp",
      tag: "Đồng hành Doanh nghiệp",
    },
    {
      id: "lounge",
      src: "/images/catasoft-workspace-lounge.jpg",
      title: "Khu vực Sáng tạo & Kết nối Mở",
      subtitle: "Văn hóa đổi mới liên tục hướng tới tiêu chuẩn công nghệ toàn cầu",
      tag: "Văn hóa Đổi mới",
    },
  ],
  en: [
    {
      id: "reception",
      src: "/images/catasoft-reception.jpg",
      title: "Corporate Reception & Brand Space",
      subtitle: "AI Creating Digital Value · Better Technology, Brighter Future",
      tag: "CataSoft HQ",
    },
    {
      id: "panoramic",
      src: "/images/catasoft-office-panoramic.jpg",
      title: "Panoramic R&D & Engineering Hub",
      subtitle: "Inspiring workspace engineering cutting-edge digital architectures",
      tag: "AI Research Center",
    },
    {
      id: "meeting",
      src: "/images/catasoft-meeting-collaboration.jpg",
      title: "Strategic Consulting & Conference Room",
      subtitle: "Collaborating closely with enterprises to solve core operational challenges",
      tag: "Enterprise Partnership",
    },
    {
      id: "lounge",
      src: "/images/catasoft-workspace-lounge.jpg",
      title: "Open Creative & Collaboration Lounge",
      subtitle: "Continuous innovation culture driving global software engineering standards",
      tag: "Innovation Culture",
    },
  ],
};

interface TabItem {
  id: string;
  tabLabel: string;
  icon: typeof Target;
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  points: { title: string; desc: string }[];
}

const missionTabs: Record<"vi" | "en", TabItem[]> = {
  vi: [
    {
      id: "mission",
      tabLabel: "01. Sứ mệnh",
      icon: Target,
      imageSrc: "/images/tab-mission-realistic.jpg",
      title: "Đồng hành Chuyển đổi số & Ứng dụng AI Thực chiến",
      subtitle: "Đưa những bước tiến công nghệ hiện đại nhất vào giải quyết bài toán cốt lõi của doanh nghiệp.",
      description:
        "CataSoft ra đời với sứ mệnh đồng hành bền bỉ cùng các doanh nghiệp Việt Nam trên hành trình số hóa toàn diện. Chúng tôi không chỉ xây dựng phần mềm, mà cùng khách hàng phân tích sâu bài toán vận hành để chuyển đổi từ mô hình truyền thống sang doanh nghiệp số tự động, tối ưu chi phí và bứt phá doanh thu.",
      points: [
        {
          title: "Thấu hiểu Thực tiễn",
          desc: "Khảo sát chi tiết quy trình, may đo giải pháp vừa vặn thay vì áp đặt giải pháp chung chung.",
        },
        {
          title: "Làm chủ Công nghệ Tiên phong",
          desc: "Ứng dụng các mô hình AI/GenAI chuyên sâu và tự động hóa quy trình nghiệp vụ (RPA) thực chiến.",
        },
        {
          title: "Đo lường bằng ROI Cụ thể",
          desc: "Mọi giải pháp bàn giao đều lấy hiệu quả vận hành và lợi nhuận của doanh nghiệp làm thước đo cao nhất.",
        },
      ],
    },
    {
      id: "vision",
      tabLabel: "02. Tầm nhìn",
      icon: Compass,
      imageSrc: "/images/tab-vision-realistic.jpg",
      title: "Hệ sinh thái Công nghệ AI & Phần mềm Tiên phong",
      subtitle: "Trở thành đối tác công nghệ chiến lược tin cậy hàng đầu cho cộng đồng doanh nghiệp thời đại số.",
      description:
        "Định hướng của CataSoft đến năm 2030 là trở thành trung tâm công nghệ tiên phong trong lĩnh vực Trí tuệ Nhân tạo ứng dụng và Kiến trúc phần mềm doanh nghiệp chịu tải cao. Chúng tôi không ngừng mở rộng nghiên cứu các giải pháp AI thế hệ mới, đóng góp trực tiếp vào sự phát triển của nền kinh tế số Việt Nam và vươn tầm khu vực.",
      points: [
        {
          title: "Tiên phong R&D",
          desc: "Liên tục cải tiến các mô hình ngôn ngữ lớn (LLMs), công nghệ OCR chính xác cao và trợ lý ảo thông minh.",
        },
        {
          title: "Chuẩn mực Toàn cầu",
          desc: "Xây dựng kiến trúc Cloud-native, bảo mật đa tầng chuẩn ISO/Enterprise và cam kết uptime 99.99%.",
        },
        {
          title: "Hệ sinh thái Mở",
          desc: "Kết nối liên thông dữ liệu linh hoạt với các hệ sinh thái ERP, CRM, TMĐT và chuỗi cung ứng hiện đại.",
        },
      ],
    },
    {
      id: "values",
      tabLabel: "03. Giá trị Cốt lõi",
      icon: ShieldCheck,
      imageSrc: "/images/tab-values-realistic.jpg",
      title: "Tận tâm · Chuẩn mực · Đổi mới · Hiệu quả",
      subtitle: "Bộ nguyên tắc định hướng mọi quyết định kỹ thuật và cam kết phục vụ khách hàng tại CataSoft.",
      description:
        "Uy tín và sự hài lòng lâu dài của doanh nghiệp đối tác là tài sản quý giá nhất của CataSoft. Chúng tôi xây dựng văn hóa kỹ thuật dựa trên sự minh bạch, kỷ luật và tinh thần trách nhiệm tuyệt đối trong từng dòng mã nguồn cũng như từng phiên hỗ trợ khách hàng.",
      points: [
        {
          title: "Tận tâm Đồng hành",
          desc: "Sẵn sàng hỗ trợ kỹ thuật 24/7, luôn lắng nghe và đồng hành sát sao cùng đội ngũ đối tác.",
        },
        {
          title: "Chuẩn mực Kỹ thuật",
          desc: "Quy trình kiểm thử nghiêm ngặt, kiến trúc hệ thống bền bỉ, bảo mật và an toàn dữ liệu tuyệt đối.",
        },
        {
          title: "Đổi mới & Thực chất",
          desc: "Dám thử nghiệm công nghệ mới nhất, lấy tính thực tiễn và giá trị hoàn vốn (ROI) làm trọng tâm hàng đầu.",
        },
      ],
    },
  ],
  en: [
    {
      id: "mission",
      tabLabel: "01. Mission",
      icon: Target,
      imageSrc: "/images/tab-mission-realistic.jpg",
      title: "Empowering Enterprises with Applied AI & Digital Transformation",
      subtitle: "Translating cutting-edge technological advancements into tangible operational advantages.",
      description:
        "CataSoft was founded with the core mission to stand alongside enterprises on their complete digital journey. We do not just write code; we deeply analyze operational workflows to transition traditional models into automated, high-yield digital operations.",
      points: [
        {
          title: "Practical Tailoring",
          desc: "In-depth workflow discovery to deliver bespoke software rather than rigid, generic templates.",
        },
        {
          title: "Proprietary AI Engineering",
          desc: "Deploying enterprise-grade GenAI models, intelligent OCR, and robust RPA software bots.",
        },
        {
          title: "Measurable ROI",
          desc: "Every deployed solution is benchmarked by tangible cost reduction and bottom-line revenue growth.",
        },
      ],
    },
    {
      id: "vision",
      tabLabel: "02. Vision",
      icon: Compass,
      imageSrc: "/images/tab-vision-realistic.jpg",
      title: "A Pioneering Applied AI & Cloud Architecture Ecosystem",
      subtitle: "Becoming the most trusted strategic technology partner for modern enterprise leaders.",
      description:
        "By 2030, CataSoft aims to lead the region as an applied AI research and high-concurrency cloud software center. We continuously push the frontiers of artificial intelligence to empower businesses and elevate the digital economy.",
      points: [
        {
          title: "R&D Leadership",
          desc: "Advancing proprietary LLMs, high-accuracy document intelligence, and automated live commerce.",
        },
        {
          title: "Global Standards",
          desc: "Cloud-native microservices, multi-layer ISO/Enterprise security, and strict 99.99% system uptime.",
        },
        {
          title: "Open Ecosystem",
          desc: "Seamless enterprise data interoperability across global ERP, CRM, and supply chain networks.",
        },
      ],
    },
    {
      id: "values",
      tabLabel: "03. Core Values",
      icon: ShieldCheck,
      imageSrc: "/images/tab-values-realistic.jpg",
      title: "Dedication · Standards · Innovation · Real Impact",
      subtitle: "The foundational principles guiding every engineering decision and client collaboration.",
      description:
        "Long-term trust and operational excellence are our ultimate assets. We foster an engineering culture rooted in transparency, discipline, and uncompromising accountability across every code release and client consultation.",
      points: [
        {
          title: "Dedicated Partnership",
          desc: "Round-the-clock 24/7 technical support, working collaboratively alongside your team.",
        },
        {
          title: "Engineering Rigor",
          desc: "Strict quality assurance, resilient fault tolerance, and enterprise-grade data governance.",
        },
        {
          title: "Pragmatic Innovation",
          desc: "Constantly adopting cutting-edge technology focused on pragmatic business value and ROI.",
        },
      ],
    },
  ],
};

export function AboutSection() {
  const { lang } = useLanguage();
  const t = content[lang].about;
  const photos = officePhotos[lang];
  const tabs = missionTabs[lang];

  // Tab State: First tab active by default
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentTab = tabs[activeTab] || tabs[0];
  const TabIcon = currentTab.icon;

  const [selectedPhoto, setSelectedPhoto] = useState<OfficePhoto | null>(null);

  return (
    <section
      id="about"
      className="relative min-h-[100svh] py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center items-center text-center z-10 pointer-events-none font-montserrat"
    >
      {/* 1. Header Section - Clean, modern, balanced */}
      <div className="max-w-4xl mx-auto mb-14 md:mb-16 pointer-events-auto">
        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
          {lang === "vi"
            ? "Đồng hành cùng Doanh nghiệp trong Kỷ nguyên Số"
            : "Partnering with Enterprises in the Digital Era"}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {lang === "vi"
            ? "CataSoft là đối tác công nghệ chiến lược, mang các giải pháp AI và Chuyển đổi số đột phá vào thực tiễn kinh doanh, kiến tạo giá trị bền vững và tối ưu vận hành toàn diện."
            : "CataSoft is your strategic technology partner, translating breakthrough AI and Digital Transformation into tangible business growth and resilient operations."}
        </p>
      </div>

      {/* 2. Visual Showcase: 4 Real Office & Team Photos (Neat 2x2 Balanced Grid) */}
      <div className="w-full max-w-7xl mx-auto mb-20 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch text-left">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-800 bg-neutral-900 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Pill Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20">
                    {photo.tag}
                  </span>
                </div>

                {/* Zoom icon hint */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Content Description */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h3 className="font-montserrat font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5 transition-colors group-hover:text-blue-300">
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed line-clamp-2">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Corporate Tab Component: SỨ MỆNH · TẦM NHÌN · GIÁ TRỊ CỐT LÕI */}
      <div className="w-full max-w-7xl mx-auto mb-20 pointer-events-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-neutral-950 dark:text-white tracking-tight">
            {lang === "vi"
              ? "Sứ mệnh & Định hướng Phát triển"
              : "Mission & Strategic Directions"}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            {lang === "vi"
              ? "Nền tảng định hướng sứ mệnh, tầm nhìn tương lai và hệ giá trị cốt lõi của CataSoft"
              : "The strategic foundations guiding our mission, future vision, and core corporate values"}
          </p>
        </div>

        {/* 3 Horizontal Tabs at the Top */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto mb-8">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`w-full py-4 px-6 rounded-2xl font-montserrat font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer text-center ${
                  isActive
                    ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md"
                    : "bg-white dark:bg-neutral-900 border-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-neutral-800"
                }`}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Content Panel: Large white container aligned with max-w-7xl, thin blue border, rounded corners */}
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-neutral-900 border-2 border-blue-600/30 dark:border-blue-500/30 rounded-3xl p-6 sm:p-10 md:p-14 min-h-[480px] flex items-center text-left transition-colors shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Realistic 3D Tech Illustration */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[360px] sm:max-w-[400px] rounded-3xl overflow-hidden border-2 border-blue-100 dark:border-neutral-800 shadow-lg bg-neutral-50 dark:bg-neutral-950 p-2 group">
                  <img
                    src={currentTab.imageSrc}
                    alt={currentTab.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle corner badge with Tab ID */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 bg-white/90 dark:bg-neutral-900/90 px-3 py-1 rounded-full border border-blue-200 dark:border-neutral-700 shadow-xs">
                      {currentTab.tabLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h4 className="font-montserrat font-extrabold text-2xl sm:text-3xl lg:text-[32px] text-neutral-950 dark:text-white tracking-tight leading-tight mb-3">
                  {currentTab.title}
                </h4>
                <p className="font-montserrat font-semibold text-sm sm:text-base text-blue-600 dark:text-blue-400 leading-snug mb-4">
                  {currentTab.subtitle}
                </p>
                <p className="font-montserrat font-normal text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  {currentTab.description}
                </p>

                {/* Key Points List */}
                <div className="space-y-3.5 pt-5 border-t border-neutral-200 dark:border-neutral-800">
                  {currentTab.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 stroke-[2]" />
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <span className="font-montserrat font-bold text-neutral-950 dark:text-white mr-1.5">
                          {pt.title}:
                        </span>
                        <span className="font-montserrat font-normal text-neutral-600 dark:text-neutral-400">
                          {pt.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Company Info & Official Contact Card (Symmetric 2-Column Grid) */}
      <div
        id="about-contact"
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pointer-events-auto text-left"
      >
        {/* Left Column: Mission & Slogan */}
        <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                  CataSoft Corporation
                </span>
                <h3 className="font-montserrat font-bold text-xl text-neutral-950 dark:text-white">
                  {t.missionTitle}
                </h3>
              </div>
            </div>

            <p className="font-montserrat font-semibold text-base sm:text-lg text-blue-600 dark:text-blue-400 mb-3 leading-snug">
              {lang === "vi"
                ? "AI kiến tạo giá trị số — Better Technology, Brighter Future"
                : "AI Creating Digital Value — Better Technology, Brighter Future"}
            </p>

            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 font-normal">
              {t.missionText}
            </p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              {t.body}
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-6 flex items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Bảo mật chuẩn ISO/Enterprise
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>Uptime 99.99%</span>
          </div>
        </div>

        {/* Right Column: Address, Contact Details & Direct Call CTA */}
        <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-montserrat font-bold text-xl text-neutral-950 dark:text-white tracking-tight mb-4">
              {lang === "vi" ? "Thông tin Trụ sở & Liên hệ" : "Headquarters & Direct Contact"}
            </h3>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                  {t.addressLabel}
                </div>
                <div className="text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                  {t.addressValue}
                </div>
              </div>
            </div>

            {/* Phone & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    {t.hotlineLabel}
                  </div>
                  <a
                    href="tel:0932322202"
                    className="text-sm font-bold text-neutral-900 dark:text-white hover:text-blue-600 transition-colors truncate block"
                  >
                    {t.hotlineValue}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    {t.emailLabel}
                  </div>
                  <a
                    href="mailto:contact@catasoft.net"
                    className="text-sm font-bold text-neutral-900 dark:text-white hover:text-blue-600 transition-colors truncate block"
                  >
                    {t.emailValue}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-6">
            <a
              href="mailto:contact@catasoft.net?subject=Tu%20van%20chuyen%20doi%20so%20CataSoft"
              className="w-full py-3.5 px-6 rounded-2xl font-montserrat font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-sm group/btn"
            >
              <span>{lang === "vi" ? "Đặt lịch Tư vấn cùng Chuyên gia" : "Schedule an Enterprise Consultation"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* 6. Lightbox Modal for Photo Inspection */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 pointer-events-auto animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-950"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="p-6 bg-neutral-950 text-left border-t border-white/10">
              <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 block">
                {selectedPhoto.tag}
              </span>
              <h4 className="text-xl font-bold text-white mb-1">
                {selectedPhoto.title}
              </h4>
              <p className="text-sm text-neutral-400">
                {selectedPhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
