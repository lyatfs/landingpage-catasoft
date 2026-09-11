"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  company?: string;
}

// --- Data tailored for CataSoft & Enterprise Clients ---
export const defaultTestimonials: Testimonial[] = [
  {
    text: "Hệ thống AI Smart PDF của CataSoft giúp chúng tôi bóc tách hơn 5.000 hóa đơn và chứng từ mỗi tháng với độ chính xác trên 99%, tiết kiệm hơn 80% thời gian nhập liệu thủ công của phòng kế toán.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Nguyễn Thị Thu Trang",
    role: "Giám đốc Vận hành (COO) · LogiTrans VN",
  },
  {
    text: "Topbot AI tư vấn và CSKH 24/7 của CataSoft phản hồi tức thì dưới 2 giây trên cả Fanpage và Zalo OA. Tỷ lệ chốt đơn tự động tăng thêm 35% ngay trong tháng đầu tiên áp dụng.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Trần Quốc Bảo",
    role: "Head of Growth · RetailPlus Vietnam",
  },
  {
    text: "Hệ thống AI Workflow tạo ảnh và video marketing tự động theo nhận diện thương hiệu giúp đội ngũ sáng tạo của chúng tôi sản xuất hàng trăm nội dung quảng cáo mỗi tuần với chi phí tối thiểu.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Lê Phương Mai",
    role: "Giám đốc Marketing (CMO) · Nova Media",
  },
  {
    text: "Nền tảng TMĐT do CataSoft phát triển vận hành cực kỳ ổn định trong các đợt Mega Sale. Khả năng đồng bộ tức thời giữa Shopee, TikTok Shop và hệ sinh thái ERP giúp chúng tôi không bao giờ bị lệch tồn kho.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Phạm Hải Đăng",
    role: "CEO & Co-Founder · E-Brand Fashion",
  },
  {
    text: "Trợ lý AI LiveStream quét bình luận theo thời gian thực và chốt đơn tự động giúp các phiên live bán hàng của công ty đạt hiệu quả vượt bậc, không còn tình trạng sót đơn của khách hàng.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Vũ Mai Khanh",
    role: "Trưởng phòng Bán hàng Trực tuyến · BeautyHouse",
  },
  {
    text: "Công cụ CataVideo tải video sắc nét 4K không logo hỗ trợ đội ngũ biên tập viên của chúng tôi thu thập tài liệu truyền thông đa nền tảng siêu nhanh và vô cùng tiện lợi.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Đặng Tiến Dũng",
    role: "Chuyên viên Truyền thông Số · Creative Hub",
  },
  {
    text: "Quy trình chuyển đổi số và tự động hóa RPA của CataSoft đã giải phóng hoàn toàn các tác vụ lặp đi lặp lại. Đội ngũ kỹ sư CataSoft làm việc chuyên nghiệp, am hiểu sâu bài toán thực tế.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Hoàng Bích Ngọc",
    role: "Trưởng ban Chuyển đổi số · VietIndus Group",
  },
  {
    text: "Dự án tích hợp hệ thống phần mềm nội bộ với SAP và IoT được CataSoft triển khai chuẩn tiến độ. Dữ liệu báo cáo tài chính và chuỗi cung ứng được cập nhật theo thời gian thực rất trực quan.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    name: "Lâm Quang Huy",
    role: "Giám đốc CNTT (CIO) · Apex Distribution",
  },
  {
    text: "CataSoft không chỉ cung cấp phần mềm mà là đối tác công nghệ chiến lược tin cậy. Họ cùng chúng tôi giải quyết từng bài toán kinh doanh cụ thể để tạo ra giá trị doanh thu đo lường được.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Đỗ Thanh Trúc",
    role: "Tổng Giám đốc (Managing Director) · SmartLife Tech",
  },
];

export const englishTestimonials: Testimonial[] = [
  {
    text: "CataSoft's AI Smart PDF automated the extraction of over 5,000 monthly invoices with >99% accuracy, slashing manual accounting data entry time by over 80%.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Thu Trang Nguyen",
    role: "Chief Operating Officer · LogiTrans VN",
  },
  {
    text: "Topbot AI provides 24/7 instant customer engagement with sub-2s response times across channels. Our automated conversion rate leaped by 35% in the first month.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Bao Tran",
    role: "Head of Growth · RetailPlus Vietnam",
  },
  {
    text: "CataSoft's automated AI Workflow allows our team to generate hundreds of on-brand marketing images and promotional videos weekly with exceptional speed and quality.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    name: "Mai Le",
    role: "Chief Marketing Officer · Nova Media",
  },
  {
    text: "The enterprise E-Commerce platform built by CataSoft handled extreme peak traffic effortlessly. Real-time multi-marketplace sync keeps our inventory perfectly balanced.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Dang Pham",
    role: "CEO & Co-Founder · E-Brand Fashion",
  },
  {
    text: "The AI LiveStream Assistant auto-pins live inquiries, detects order keywords in real-time, and closes transactions instantly without missing a single customer order.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Khanh Vu",
    role: "Head of Live Commerce · BeautyHouse",
  },
  {
    text: "CataVideo allows our content teams to download crisp 4K watermark-free media from multi-platforms with blazing speed, significantly speeding up production workflows.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Dung Dang",
    role: "Digital Media Lead · Creative Hub",
  },
  {
    text: "CataSoft's digital transformation roadmap and RPA workflows eliminated repetitive bottlenecks across our departments. Their engineering team is remarkably practical.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Bich Ngoc Hoang",
    role: "Head of Digital Transformation · VietIndus",
  },
  {
    text: "The complex system integration connecting our internal software with SAP and IoT data was delivered strictly on schedule with real-time executive dashboards.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    name: "Huy Lam",
    role: "Chief Information Officer · Apex Distribution",
  },
  {
    text: "CataSoft is not just a software vendor; they are our strategic digital partner who deeply understand our business models to drive tangible ROI.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Thanh Truc Do",
    role: "Managing Director · SmartLife Tech",
  },
];

// --- Sub-Components ---
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 14,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(14, 42, 197, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(14, 42, 197, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(14, 42, 197, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(14, 42, 197, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="p-8 md:p-10 rounded-3xl border border-white/60 dark:border-neutral-800 shadow-xl shadow-brand-blue/5 max-w-sm w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-sm md:text-base m-0 transition-colors duration-300">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3.5 mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-blue/30 group-hover:ring-brand-blue transition-all duration-300 ease-in-out shadow-sm"
                      />
                      <div className="flex flex-col text-left">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-950 dark:text-white transition-colors duration-300 text-sm md:text-base">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-tight text-neutral-500 dark:text-neutral-400 mt-0.5 transition-colors duration-300 font-medium">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  data?: Testimonial[];
}

export const TestimonialsSection = ({
  title = "Đối tác & Khách hàng nói gì về CataSoft",
  subtitle = "Lắng nghe những chia sẻ thực tế từ các doanh nghiệp khi triển khai giải pháp AI, TMĐT và Chuyển đổi số cùng CataSoft.",
  badge = "Đánh giá từ khách hàng",
  data = defaultTestimonials,
}: TestimonialsSectionProps) => {
  const firstColumn = data.slice(0, 3);
  const secondColumn = data.slice(3, 6);
  const thirdColumn = data.slice(6, 9);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-28 md:py-36 relative overflow-hidden z-20 pointer-events-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-blue dark:text-blue-300 px-4 py-1.5 rounded-full border border-brand-blue/30 bg-white/50 dark:bg-black/40 backdrop-blur-md shadow-xs">
              {badge}
            </span>
          </div>

          <h2
            id="testimonials-heading"
            className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-950 dark:text-white tracking-tight leading-tight transition-colors"
          >
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto transition-colors">
            {subtitle}
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={19}
          />
        </div>
      </motion.div>
    </section>
  );
};

// --- Standalone Demo App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-brand-blue selection:text-white">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}
