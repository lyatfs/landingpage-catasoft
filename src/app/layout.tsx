import type { Metadata, Viewport } from "next";
import { Montserrat, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#2F69FF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://catasoft.net"),
  title: "CataSoft - Giải pháp Tự động hóa AI và Chuyển đổi số doanh nghiệp",
  description: "Đơn vị chuyên sâu về Phát triển phần mềm & Đổi mới hệ thống thời đại số. Chúng tôi thiết kế các ứng dụng linh hoạt, tích hợp các giải pháp đột phá như AI/Gen AI, IoT và hệ thống TMĐT.",
  keywords: [
    "Catasoft",
    "phát triển phần mềm",
    "ứng dụng AI",
    "Gen AI",
    "tự động hóa",
    "chuyển đổi số",
    "TMĐT",
    "phần mềm SAP",
    "CataVideo",
    "TopBot AI"
  ],
  authors: [{ name: "CataSoft" }],
  creator: "CataSoft Digital Studio",
  publisher: "CataSoft",
  robots: "index, follow",
  icons: {
    icon: "/images/catasoft-logo.png",
    shortcut: "/images/catasoft-logo.png",
    apple: "/images/catasoft-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://catasoft.net",
    title: "CataSoft - Giải pháp Tự động hóa AI và Chuyển đổi số doanh nghiệp",
    description: "Đơn vị chuyên sâu về Phát triển phần mềm & Đổi mới hệ thống thời đại số. Tích hợp AI/Gen AI, IoT và hệ thống TMĐT.",
    siteName: "CataSoft",
    images: [
      {
        url: "/images/catasoft-logo.png",
        width: 1200,
        height: 630,
        alt: "CataSoft - AI & Chuyển đổi số",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CataSoft - Giải pháp Tự động hóa AI và Chuyển đổi số doanh nghiệp",
    description: "Đơn vị chuyên sâu về Phát triển phần mềm & Đổi mới hệ thống thời đại số.",
    images: ["/images/catasoft-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${montserrat.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-neutral-900 bg-[#f8fafc] min-h-screen selection:bg-brand-blue selection:text-white`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
