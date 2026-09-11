export interface ProductItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  ctaLabel: string;
  tag: string;
}

export interface TechnologyMetric {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  products: string[];
  features: string[];
  metrics: TechnologyMetric[];
  accentColor: "blue" | "emerald" | "purple" | "amber";
  ctaText: string;
}

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  company: string;
  tag: string;
}

export interface ContentDict {
  nav: {
    home: string;
    services: string;
    projects: string;
    testimonials: string;
    about: string;
    contact: string;
    contactUs: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    credit: string;
    scrollCue: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    items: ProductItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    missionTitle: string;
    missionText: string;
    addressLabel: string;
    addressValue: string;
    hotlineLabel: string;
    hotlineValue: string;
    emailLabel: string;
    emailValue: string;
  };
  footer: {
    tagline: string;
    description: string;
    rights: string;
    linksTitle: string;
    contactTitle: string;
  };
  studioControls: {
    title: string;
    note: string;
    themeTitle: string;
    reset: string;
  };
}

export const content: Record<"vi" | "en", ContentDict> = {
  vi: {
    nav: {
      home: "Trang chủ",
      services: "Dịch vụ",
      projects: "Sản phẩm",
      testimonials: "Đánh giá",
      about: "Về chúng tôi",
      contact: "Liên hệ",
      contactUs: "Liên hệ ngay",
    },
    hero: {
      eyebrow: "CataSoft · Giải pháp Công nghệ & Chuyển đổi số",
      headline: "Tiên phong Đột phá với",
      headlineHighlight: "AI, TMĐT & Chuyển đổi số",
      description: "Đơn vị chuyên sâu về Phát triển phần mềm & Đổi mới hệ thống thời đại số. Chúng tôi thiết kế các ứng dụng linh hoạt, tích hợp các giải pháp đột phá như AI/Gen AI, IoT và hệ thống TMĐT tối ưu vận hành.",
      credit: "© 2026 CataSoft — All Rights Reserved",
      scrollCue: "Cuộn để trải nghiệm",
      ctaPrimary: "Khám phá giải pháp",
      ctaSecondary: "Tư vấn dự án",
    },
    products: {
      eyebrow: "Hệ sinh thái sản phẩm",
      title: "Sản phẩm Công nghệ Tiêu biểu",
      description: "Các giải pháp và nền tảng ứng dụng AI thông minh do CataSoft nghiên cứu và phát triển, giúp doanh nghiệp tự động hóa và tăng tốc năng suất vượt trội.",
      items: [
        {
          id: 1,
          title: "AI Smart PDF Converter",
          description: "Chuyển đổi, bóc tách và trích xuất dữ liệu hóa đơn, tài liệu PDF tự động sang Excel/JSON với độ chính xác cao bằng công nghệ OCR & LLM thông minh.",
          imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Trải nghiệm thử",
          tag: "AI OCR & Docs",
        },
        {
          id: 2,
          title: "CataVideo / QuickTik",
          description: "Nền tảng tải video chất lượng cao (HD/4K) không dính logo/watermark từ TikTok, Facebook, YouTube, Instagram Reels tốc độ siêu tốc.",
          imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
          href: "https://catavideo.net",
          ctaLabel: "Truy cập CataVideo",
          tag: "Media Tools",
        },
        {
          id: 3,
          title: "TopBot AI Tư Vấn & CSKH",
          description: "Trợ lý ảo AI trực chiến 24/7, tự động phản hồi thông minh, giải đáp thắc mắc chuyên sâu, phân loại khách hàng tiềm năng và chốt đơn đa kênh.",
          imageSrc: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Xem Demo TopBot",
          tag: "GenAI Chatbot",
        },
        {
          id: 4,
          title: "AI Workflow Studio",
          description: "Hệ thống quy trình tự động hóa sản xuất hình ảnh sản phẩm, banner quảng cáo và video marketing bằng generative AI hàng loạt theo nhận diện thương hiệu.",
          imageSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Khám phá Workflow",
          tag: "Creative Automation",
        },
        {
          id: 5,
          title: "AI LiveStream Assistant",
          description: "Hệ thống AI tương tác livestream thông minh: tự động ghim bình luận, nhận diện cú pháp đặt hàng, tổng hợp đơn tức thì và gửi tin nhắn xác nhận tự động.",
          imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Trợ lý Livestream",
          tag: "Livestream Tech",
        },
        {
          id: 6,
          title: "E-Commerce & Digital Hub",
          description: "Hệ sinh thái TMĐT tích hợp sâu: quản lý kho vận, cổng thanh toán tự động, kết nối sàn Shopee/Lazada/TikTok Shop và đồng bộ ERP/SAP toàn diện.",
          imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Giải pháp TMĐT",
          tag: "Enterprise TMĐT",
        },
      ],
    },
    services: {
      eyebrow: "Định hướng Chiến lược · Strategic Pillars",
      title: "4 Trọng Tâm Công Nghệ & Giải Pháp Cốt Lõi",
      subtitle: "CataSoft tập trung phát triển các giải pháp đột phá trong 4 lĩnh vực mũi nhọn, đồng hành cùng doanh nghiệp tối ưu vận hành và bứt phá doanh thu trong kỷ nguyên số.",
      items: [
        {
          id: "ai-products",
          number: "01",
          category: "Sản phẩm & Giải pháp AI",
          badge: "Định hướng Trí tuệ Nhân tạo",
          title: "Hệ sinh thái AI & Gen AI",
          tagline: "Nghiên cứu & triển khai mô hình AI chuyên sâu, tự động hóa CSKH và bóc tách dữ liệu thông minh.",
          description: "Làm chủ các mô hình AI và GenAI chuyên biệt cho doanh nghiệp: phản hồi khách hàng đa kênh tức thì dưới 2s và trích xuất dữ liệu chứng từ chính xác tuyệt đối.",
          products: ["TopBot AI CSKH 24/7", "Smart PDF OCR", "AI Media Studio", "Custom LLMs"],
          features: [
            "Trợ lý AI Đa kênh: Phản hồi thông minh tức thì 24/7 trên Zalo, Messenger và Web",
            "Smart PDF OCR: Tự động trích xuất hóa đơn GTGT & chứng từ sang Excel/JSON với độ chính xác 99.4%",
            "GenAI Media Studio: Tự động hóa sản xuất nội dung số, banner và video marketing đa nền tảng",
          ],
          metrics: [
            { value: "< 2s", label: "Phản hồi khách hàng 24/7" },
            { value: "99.4%", label: "Độ chính xác bóc tách OCR" },
          ],
          accentColor: "blue",
          ctaText: "Khám phá Sản phẩm AI",
        },
        {
          id: "ecommerce",
          number: "02",
          category: "Giải pháp Thương mại Điện tử",
          badge: "Định hướng E-Commerce",
          title: "E-Commerce & Live Commerce",
          tagline: "Hạ tầng TMĐT hiệu năng cao kết hợp công nghệ Live Commerce bắt đơn tự động, tối đa hóa doanh thu.",
          description: "Giải pháp bán hàng trực tuyến toàn diện: trợ lý AI quét comment bắt mã đơn livestream thời gian thực, tự động chốt đơn và đồng bộ tồn kho Shopee, TikTok Shop, Lazada.",
          products: ["Live Commerce AI", "Omnichannel Hub", "CataPOS Sync", "TikTok/Shopee Flow"],
          features: [
            "LiveStream AI: Quét & nhận diện cú pháp bình luận chốt đơn livestream tức thì không sót đơn",
            "Chốt đơn Đa kênh: Tự động tạo đơn hàng và gửi link thanh toán bảo mật trực tiếp cho khách",
            "Đồng bộ Tồn kho: Cập nhật tồn kho, đơn hàng và bảng giá đa sàn theo thời gian thực",
          ],
          metrics: [
            { value: "x3.5", label: "Tốc độ chốt đơn livestream" },
            { value: "100%", label: "Đồng bộ tồn kho thời gian thực" },
          ],
          accentColor: "emerald",
          ctaText: "Khám phá Giải pháp TMĐT",
        },
        {
          id: "digital-transformation",
          number: "03",
          category: "Chuyển đổi số Doanh nghiệp",
          badge: "Định hướng Chuyển đổi số",
          title: "Chuyển đổi số & Tự động hóa",
          tagline: "Số hóa toàn diện nghiệp vụ vận hành bằng robot RPA, văn phòng không giấy tờ và Dashboard BI thông minh.",
          description: "Giải phóng nhân sự khỏi các tác vụ thủ công lặp lại: robot phần mềm đối soát tài chính 24/7, văn phòng số không giấy tờ và Dashboard BI trực quan kết nối ERP/CRM/WMS liền mạch.",
          products: ["RPA Software Bots", "Văn phòng số không giấy tờ", "Real-time BI Dashboard", "ERP / CRM Bridge"],
          features: [
            "Robot RPA 24/7: Tự động hóa đối soát và nhập liệu dữ liệu tài chính chính xác 100% không sai sót",
            "Văn phòng số: Quy trình trình ký, phê duyệt và luân chuyển tài liệu điện tử không giấy tờ",
            "Dashboard BI: Phân tích dữ liệu kinh doanh đa chiều theo thời gian thực hỗ trợ ra quyết định",
          ],
          metrics: [
            { value: "-80%", label: "Thời gian xử lý chứng từ" },
            { value: "0%", label: "Sai sót trong đối soát tự động" },
          ],
          accentColor: "purple",
          ctaText: "Khám phá Chuyển đổi số",
        },
        {
          id: "custom-software",
          number: "04",
          category: "Phần mềm Doanh nghiệp & Tích hợp",
          badge: "Định hướng Phần mềm May đo",
          title: "Phần mềm May đo & Tích hợp",
          tagline: "Phát triển Web/App chuyên sâu, kiến trúc vi dịch vụ chịu tải cao và kết nối API hệ sinh thái toàn diện.",
          description: "May đo giải pháp quản trị theo logic nghiệp vụ đặc thù: kiến trúc Cloud-native mở rộng linh hoạt, phát triển Web/Mobile App mượt mà và kết nối API hệ thống ERP, CRM, POS, SAP.",
          products: ["Custom Web & Mobile App", "Cloud Microservices", "ERP/CRM API Gateway", "Hệ thống POS/Kho"],
          features: [
            "Web & Mobile App: May đo chuyên biệt theo quy trình và văn hóa vận hành riêng của doanh nghiệp",
            "Cloud Microservices: Kiến trúc vi dịch vụ chịu tải cao, uptime 99.99%, mở rộng quy mô linh hoạt",
            "API Enterprise Bridge: Kết nối bảo mật liên thông dữ liệu giữa ERP, CRM, kế toán & ngân hàng",
          ],
          metrics: [
            { value: "99.99%", label: "Uptime hệ thống Cloud-native" },
            { value: "100%", label: "May đo theo quy trình doanh nghiệp" },
          ],
          accentColor: "amber",
          ctaText: "Tư vấn Dự án Phần mềm",
        },
      ],
    },
    testimonials: {
      eyebrow: "Phản hồi khách hàng",
      title: "Đối tác & Doanh nghiệp nói gì về CataSoft",
      subtitle: "Lắng nghe những chia sẻ thực tế từ các nhà lãnh đạo và đội ngũ kỹ thuật khi triển khai các giải pháp AI, TMĐT và phần mềm của CataSoft.",
      items: [
        {
          text: "Topbot AI giúp chúng tôi tự động hóa hơn 85% hội thoại CSKH trên Fanpage và Zalo OA. Tỷ lệ phản hồi tức thì dưới 2 giây giúp tỷ lệ chuyển đổi đơn hàng tăng 35% ngay trong tháng đầu tiên triển khai.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          name: "Trần Minh Đức",
          role: "Head of Operations",
          company: "TechZone Retail",
          tag: "Topbot AI",
        },
        {
          text: "Nền tảng AI Workflow của CataSoft đã thay đổi hoàn toàn quy trình sáng tạo của team. Tốc độ sản xuất bài viết SEO và kịch bản video TikTok tăng gấp 5 lần mà vẫn giữ đúng văn phong thương hiệu.",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          name: "Nguyễn Mai Linh",
          role: "Marketing Director",
          company: "VinaMedia Group",
          tag: "AI Workflow",
        },
        {
          text: "Giải pháp AI Live Commerce chốt đơn livestream đa kênh đã giải phóng toàn bộ đội ngũ trực phiên live. Tự động nhận diện cú pháp đặt hàng và gửi link thanh toán bảo mật trong nháy mắt.",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
          name: "Lê Hoàng Nam",
          role: "Co-Founder & CEO",
          company: "FastFashion Vietnam",
          tag: "AI Live Commerce",
        },
        {
          text: "CataSoft Smart OCR xử lý hàng nghìn hóa đơn và chứng từ vận tải phức tạp với độ chính xác trên 99%. Đội ngũ kế toán của chúng tôi tiết kiệm được hơn 400 giờ nhập liệu thủ công mỗi quý.",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
          name: "Phạm Quỳnh Nga",
          role: "Chief Financial Officer",
          company: "Logistics Thăng Long",
          tag: "Smart OCR",
        },
        {
          text: "Kiến trúc microservices và API đồng bộ dữ liệu của CataSoft giúp hệ thống ERP kết nối mượt mà giữa 12 chi nhánh và kho trung tâm. Năng lực kỹ thuật và bảo mật của team rất chuẩn mực.",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
          name: "Đặng Quốc Tuấn",
          role: "Chief Technology Officer",
          company: "Sài Gòn Retail Group",
          tag: "ERP & Cloud",
        },
        {
          text: "Đội ngũ kỹ sư CataSoft có tư duy giải pháp sản phẩm vượt trội. Họ không chỉ phát triển phần mềm mà còn tư vấn tối ưu lại luồng vận hành, giúp chúng tôi giảm hơn 200 triệu chi phí lãng phí.",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
          name: "Hoàng Thu Thảo",
          role: "Chief Operating Officer",
          company: "GreenEcom",
          tag: "Tối ưu vận hành",
        },
        {
          text: "Hệ thống vận hành bền bỉ và ổn định tuyệt đối trong đợt Siêu Sale Mega với hàng triệu lượt truy cập đồng thời. Khả năng chịu tải và sự hỗ trợ kỹ thuật 24/7 của CataSoft là chỗ dựa vững chắc.",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
          name: "Vũ Đình Khoa",
          role: "E-commerce Lead",
          company: "SunMart Omni-channel",
          tag: "Chịu tải cao",
        },
        {
          text: "Triển khai thần tốc, giao diện trực quan và dễ đào tạo cho nhân sự. CataSoft thực sự là đối tác công nghệ tin cậy trong toàn bộ hành trình số hóa doanh nghiệp của chúng tôi.",
          image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
          name: "Bùi Thanh Tùng",
          role: "Managing Director",
          company: "Nội thất Tân Á",
          tag: "Chuyển đổi số",
        },
        {
          text: "Mô hình AI Agent may đo theo quy trình nội bộ của CataSoft rất xuất sắc. Nhân viên mới tra cứu tài liệu và xử lý nghiệp vụ nhanh gấp 10 lần mà không cần đào tạo lại từ đầu.",
          image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
          name: "Đỗ Hải Yến",
          role: "HR & Operations Lead",
          company: "NextLogistics Hub",
          tag: "AI Multi-Agent",
        },
      ],
    },
    about: {
      eyebrow: "Về CataSoft",
      title: "Đồng hành Chuyển đổi số cùng Doanh nghiệp",
      lead: "CataSoft ra đời với sứ mệnh mang những bước tiến công nghệ hiện đại nhất — đặc biệt là Trí tuệ nhân tạo và Tự động hóa — vào thực tiễn kinh doanh của doanh nghiệp Việt Nam.",
      body: "Chúng tôi không chỉ viết code, mà cùng khách hàng phân tích bài toán thực tế, từ đó kiến tạo những giải pháp phần mềm vừa vặn, trực quan và có khả năng mở rộng lâu dài. Mỗi sản phẩm được tạo ra đều đặt sự ổn định, tốc độ và trải nghiệm người dùng làm thước đo cốt lõi.",
      missionTitle: "Tầm nhìn & Sứ mệnh",
      missionText: "Trở thành đối tác công nghệ tin cậy hàng đầu về AI và Chuyển đổi số cho các doanh nghiệp vừa và lớn, thúc đẩy nền kinh tế số Việt Nam vươn tầm khu vực.",
      addressLabel: "Trụ sở chính",
      addressValue: "NO6C-LK21 Khu Dịch vụ Vạn Phúc, Phường Vạn Phúc, Quận Hà Đông, TP. Hà Nội, Việt Nam",
      hotlineLabel: "Hotline hỗ trợ",
      hotlineValue: "0932 322 202",
      emailLabel: "Email hợp tác",
      emailValue: "contact@catasoft.net",
    },
    footer: {
      tagline: "CataSoft — Giải pháp Tự động hóa AI và Chuyển đổi số Doanh nghiệp",
      description: "Kiến tạo giải pháp công nghệ có chiều sâu, đồng hành bền vững cùng sự phát triển của doanh nghiệp thời đại số.",
      rights: "© 2026 CataSoft. Bảo lưu mọi quyền.",
      linksTitle: "Điều hướng",
      contactTitle: "Liên hệ",
    },
    studioControls: {
      title: "Tùy chọn hiển thị",
      note: "Điều chỉnh bảng màu trường trọng lực WebGL. Khi bạn cuộn, màu sắc sẽ chuyển tiếp mượt mà theo từng phân đoạn.",
      themeTitle: "Bảng màu Hero 3D",
      reset: "Khôi phục mặc định",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Products",
      testimonials: "Testimonials",
      about: "About Us",
      contact: "Contact",
      contactUs: "Contact Us",
    },
    hero: {
      eyebrow: "CataSoft · Technology & Digital Transformation",
      headline: "Pioneering Innovations in",
      headlineHighlight: "AI, E-Commerce & Transformation",
      description: "Specialized in Software Development & Digital Systems Modernization. We build versatile applications integrating cutting-edge solutions like AI/Gen AI, IoT, and high-performance E-Commerce architectures.",
      credit: "© 2026 CataSoft — All Rights Reserved",
      scrollCue: "Scroll to explore",
      ctaPrimary: "Explore Solutions",
      ctaSecondary: "Consult Project",
    },
    products: {
      eyebrow: "Product Ecosystem",
      title: "Featured Tech Products",
      description: "Intelligent AI-powered platforms and specialized digital tools engineered by CataSoft to automate operations and accelerate business growth.",
      items: [
        {
          id: 1,
          title: "AI Smart PDF Converter",
          description: "Automated conversion, parsing, and structured data extraction from invoices and documents into Excel/JSON with high-accuracy OCR & LLM technology.",
          imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Try Demo",
          tag: "AI OCR & Docs",
        },
        {
          id: 2,
          title: "CataVideo / QuickTik",
          description: "High-speed, crisp HD/4K video downloader removing watermarks from TikTok, Facebook, YouTube, and Instagram Reels instantly.",
          imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
          href: "https://catavideo.net",
          ctaLabel: "Visit CataVideo",
          tag: "Media Tools",
        },
        {
          id: 3,
          title: "TopBot AI Customer Care",
          description: "24/7 conversational AI virtual assistant with multi-language LLM, intelligent customer inquiry handling, lead qualification, and omni-channel sales.",
          imageSrc: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "View TopBot Demo",
          tag: "GenAI Chatbot",
        },
        {
          id: 4,
          title: "AI Workflow Studio",
          description: "End-to-end generative AI workflows for automated batch product image creation, promotional banner generation, and dynamic marketing video rendering.",
          imageSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Explore Workflow",
          tag: "Creative Automation",
        },
        {
          id: 5,
          title: "AI LiveStream Assistant",
          description: "Real-time intelligent livestream companion: auto comment pinning, instant order keyword detection, checkout processing, and real-time revenue analytics.",
          imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Live Assistant",
          tag: "Livestream Tech",
        },
        {
          id: 6,
          title: "E-Commerce & Digital Hub",
          description: "Unified enterprise commerce platform with warehouse synchronization, automated payment gateways, multi-marketplace sync, and deep SAP/ERP integration.",
          imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
          href: "https://catasoft.net",
          ctaLabel: "Commerce Solutions",
          tag: "Enterprise Commerce",
        },
      ],
    },
    services: {
      eyebrow: "Strategic Pillars",
      title: "4 Core Strategic Technology Pillars",
      subtitle: "CataSoft focuses on pioneering breakthrough solutions across 4 strategic pillars, empowering enterprises to optimize operations and accelerate revenue growth in the digital era.",
      items: [
        {
          id: "ai-products",
          number: "01",
          category: "AI Products & Solutions",
          badge: "Strategic Pillar: AI",
          title: "AI & Generative AI Ecosystem",
          tagline: "Proprietary AI research powering 24/7 conversational commerce and high-precision document extraction.",
          description: "CataSoft pioneers specialized enterprise AI: delivering sub-2s conversational customer engagement and high-precision automated document extraction.",
          products: ["TopBot AI 24/7", "Smart PDF OCR", "AI Media Studio", "Custom LLMs"],
          features: [
            "Omnichannel AI Agent: 24/7 intelligent automated customer responses on Zalo, Messenger & Web",
            "Smart PDF OCR: Automated document and VAT invoice extraction to Excel/JSON with 99.4% precision",
            "GenAI Media Studio: Automated generation of batch marketing banners and promotional video content",
          ],
          metrics: [
            { value: "< 2s", label: "24/7 instant customer response" },
            { value: "99.4%", label: "Document OCR parsing precision" },
          ],
          accentColor: "blue",
          ctaText: "Explore AI Products",
        },
        {
          id: "ecommerce",
          number: "02",
          category: "E-Commerce Solutions",
          badge: "Strategic Pillar: E-Commerce",
          title: "E-Commerce & Live Commerce",
          tagline: "High-conversion digital storefronts coupled with real-time AI livestream order automation.",
          description: "Unified commerce engine pairing real-time livestream comment syntax parsing with seamless catalog and inventory sync across Shopee, TikTok Shop, and Lazada.",
          products: ["Live Commerce AI", "Omnichannel Hub", "CataPOS Sync", "TikTok/Shopee Flow"],
          features: [
            "LiveStream AI: Real-time livestream comment parsing to capture orders instantly without drops",
            "Multi-channel Checkout: Automated order creation with secure instant payment link dispatch",
            "Omnichannel Inventory: Real-time unified inventory, order, and pricing synchronization",
          ],
          metrics: [
            { value: "3.5x", label: "Livestream order conversion speed" },
            { value: "100%", label: "Real-time inventory synchronization" },
          ],
          accentColor: "emerald",
          ctaText: "Explore E-Commerce",
        },
        {
          id: "digital-transformation",
          number: "03",
          category: "Digital Transformation",
          badge: "Strategic Pillar: Digitalization",
          title: "Digital Transformation & RPA",
          tagline: "Total operational modernization via RPA bots, paperless workflows, and real-time BI analytics.",
          description: "Liberate organizational capacity from repetitive manual tasks: 24/7 robotic financial reconciliation, paperless digital approvals, and real-time executive BI dashboards.",
          products: ["RPA Software Bots", "Paperless Enterprise", "Real-time BI Dashboard", "ERP / CRM Bridge"],
          features: [
            "24/7 RPA Software Bots: Automated reconciliation and document processing with 0% data error",
            "Paperless Enterprise: Agile digital document routing, e-signing, and multi-tier approval flows",
            "Real-time BI Dashboard: Multi-dimensional business data intelligence driving fast decision-making",
          ],
          metrics: [
            { value: "-80%", label: "Manual document processing hours" },
            { value: "0%", label: "Data error in automated reconciliation" },
          ],
          accentColor: "purple",
          ctaText: "Explore Automation",
        },
        {
          id: "custom-software",
          number: "04",
          category: "Bespoke Software & Integration",
          badge: "Strategic Pillar: Software",
          title: "Custom Software & Integration",
          tagline: "High-performance Web/Mobile apps, microservices architecture, and unified enterprise API integrations.",
          description: "Bespoke management software engineered to unique business logic: scalable cloud-native microservices, fluid Web/Mobile Apps, and unified API integration across ERP, CRM, POS, SAP.",
          products: ["Custom Web & Mobile App", "Cloud Microservices", "ERP/CRM API Gateway", "POS/Warehouse Systems"],
          features: [
            "Custom Web & Mobile App: Engineered specifically around unique enterprise workflows and culture",
            "Cloud Microservices: High-concurrency architecture ensuring 99.99% uptime and elastic scaling",
            "API Enterprise Bridge: Secure data interchange across ERP, CRM, accounting, and banking systems",
          ],
          metrics: [
            { value: "99.99%", label: "Cloud-native system uptime" },
            { value: "100%", label: "Tailored to business workflows" },
          ],
          accentColor: "amber",
          ctaText: "Consult Software Project",
        },
      ],
    },
    testimonials: {
      eyebrow: "Client Success Stories",
      title: "Trusted by Modern Business Leaders",
      subtitle: "Discover how innovative enterprises accelerate growth and eliminate operational friction with CataSoft's Applied AI and Software Solutions.",
      items: [
        {
          text: "Topbot AI automated over 85% of our customer service inquiries across Facebook and Zalo. Response latency dropped under 2 seconds, boosting conversion rates by 35% in month one.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          name: "Duc Tran",
          role: "Head of Operations",
          company: "TechZone Retail",
          tag: "Topbot AI",
        },
        {
          text: "CataSoft's AI Workflow platform transformed our content machinery. We produce viral TikTok scripts and SEO articles 5x faster while maintaining pristine brand voice consistency.",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          name: "Linh Nguyen",
          role: "Marketing Director",
          company: "VinaMedia Group",
          tag: "AI Workflow",
        },
        {
          text: "Their AI Live Commerce solution completely liberated our live streaming team. It parses buyer comments instantly and dispatches secure checkout links in sub-3 seconds.",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
          name: "Nam Le",
          role: "Co-Founder & CEO",
          company: "FastFashion Vietnam",
          tag: "Live Commerce",
        },
        {
          text: "CataSoft Smart OCR effortlessly extracts complex transport manifests and invoices with >99% precision. Our accounting unit saved over 400 manual input hours each quarter.",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
          name: "Nga Pham",
          role: "Chief Financial Officer",
          company: "Thang Long Logistics",
          tag: "Smart OCR",
        },
        {
          text: "The microservices architecture engineered by CataSoft delivers flawless real-time synchronization between 12 branch outlets and our central warehouse. Unmatched technical caliber.",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
          name: "Tuan Dang",
          role: "Chief Technology Officer",
          company: "Saigon Retail Group",
          tag: "ERP & Cloud",
        },
        {
          text: "CataSoft engineers possess deep product thinking. Beyond writing code, they restructured our operational flow, cutting over $10,000 in recurring overhead every month.",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
          name: "Thao Hoang",
          role: "Chief Operating Officer",
          company: "GreenEcom",
          tag: "Operations",
        },
        {
          text: "Zero downtime during our Mega Sales campaigns handling millions of simultaneous queries. CataSoft's high-throughput architecture and 24/7 technical escort are invaluable.",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
          name: "Khoa Vu",
          role: "E-commerce Lead",
          company: "SunMart Omni-channel",
          tag: "High Throughput",
        },
        {
          text: "Swift rollout, modern aesthetics, and seamless staff onboarding. CataSoft has been our most dependable strategic technology partner throughout our transformation.",
          image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
          name: "Tung Bui",
          role: "Managing Director",
          company: "Tan A Decor",
          tag: "Transformation",
        },
        {
          text: "Custom AI Agent models trained on proprietary SOPs reduced new employee training cycles tenfold. Team members now query complex internal policies within seconds.",
          image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
          name: "Yen Do",
          role: "HR & Operations Lead",
          company: "NextLogistics Hub",
          tag: "AI Multi-Agent",
        },
      ],
    },
    about: {
      eyebrow: "About CataSoft",
      title: "Empowering Enterprises Through Digital Excellence",
      lead: "CataSoft was founded with the mission to deliver practical, cutting-edge technology advancements — notably Artificial Intelligence and Automation — directly into the core workflows of modern businesses.",
      body: "We go beyond writing code: we partner with clients to understand real operational hurdles, crafting resilient software solutions that are intuitive, scalable, and secure. Every system we deploy is measured by stability, speed, and tangible business ROI.",
      missionTitle: "Vision & Mission",
      missionText: "To become the premier trusted digital transformation and AI technology partner for growing and enterprise businesses across the region.",
      addressLabel: "Headquarters",
      addressValue: "NO6C-LK21 Van Phuc Urban Area, Ha Dong District, Hanoi, Vietnam",
      hotlineLabel: "Hotline Support",
      hotlineValue: "+84 932 322 202",
      emailLabel: "Collaboration Email",
      emailValue: "contact@catasoft.net",
    },
    footer: {
      tagline: "CataSoft — AI Automation & Enterprise Digital Transformation",
      description: "Crafting impactful digital technology with depth, fostering enduring growth for modern enterprises.",
      rights: "© 2026 CataSoft. All rights reserved.",
      linksTitle: "Navigation",
      contactTitle: "Contact Us",
    },
    studioControls: {
      title: "Display Preferences",
      note: "Tune the WebGL gravity field colors. As you scroll, the palette morphs seamlessly across sections.",
      themeTitle: "Hero 3D Palette",
      reset: "Reset Defaults",
    },
  },
};
