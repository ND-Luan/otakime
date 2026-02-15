'use client';

import NextLink from "next/link";
import { 
    BookOpenIcon,
    FilmIcon,
    TvIcon,
    NewspaperIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    HeartIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ShieldCheckIcon,
    BoltIcon
} from "@heroicons/react/24/outline";
import { 
    SparklesIcon,
    FireIcon,
    StarIcon
} from "@heroicons/react/24/solid";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = {
        popular: [
            { label: "Manga Hot", href: "/manga/hot", icon: FireIcon, color: "text-[#F3ADC3]" },
            { label: "Manga Mới Nhất", href: "/manga/new", icon: SparklesIcon, color: "text-[#ADF709]" },
            { label: "Anime Trending", href: "/anime/trending", icon: BoltIcon, color: "text-[#00CCFF]" },
            { label: "Top Rating", href: "/top-rating", icon: StarIcon, color: "text-[#ADF709]" },
        ],
        categories: [
            { label: "Manga", href: "/manga", icon: BookOpenIcon },
            { label: "Movies", href: "/movies", icon: FilmIcon },
            { label: "Anime", href: "/anime", icon: TvIcon },
            { label: "Light Novel", href: "/light-novel", icon: NewspaperIcon },
        ],
        community: [
            { label: "Diễn Đàn", href: "/forum" },
            { label: "Blog", href: "/blog" },
            { label: "Sự Kiện", href: "/events" },
            { label: "Đóng Góp", href: "/contribute" },
        ],
        info: [
            { label: "Về Chúng Tôi", href: "/about" },
            { label: "Liên Hệ", href: "/contact" },
            { label: "Tuyển Dụng", href: "/careers" },
            { label: "Đối Tác", href: "/partners" },
        ],
        legal: [
            { label: "Điều Khoản Sử Dụng", href: "/terms" },
            { label: "Chính Sách Bảo Mật", href: "/privacy" },
            { label: "Quy Định Bản Quyền", href: "/copyright" },
            { label: "DMCA", href: "/dmca" },
        ],
        support: [
            { label: "Trung Tâm Hỗ Trợ", href: "/help" },
            { label: "FAQ", href: "/faq" },
            { label: "Báo Lỗi", href: "/report" },
            { label: "Yêu Cầu Tính Năng", href: "/feature-request" },
        ]
    };

    const socialLinks = [
        { 
            label: "Facebook", 
            href: "https://facebook.com", 
            color: "hover:bg-[#1877F2]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        { 
            label: "Twitter", 
            href: "https://twitter.com",
            color: "hover:bg-[#1DA1F2]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            )
        },
        { 
            label: "Discord", 
            href: "https://discord.com",
            color: "hover:bg-[#5865F2]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
            )
        },
        { 
            label: "Telegram", 
            href: "https://telegram.org",
            color: "hover:bg-[#0088CC]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            )
        },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-t border-white/10">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00CCFF]/5 to-transparent pointer-events-none" />
            
            <div className="relative container mx-auto px-6">
                
                {/* Top Section - Popular Links */}
                <div className="py-12 border-b border-white/5">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <FireIcon className="w-6 h-6 text-[#F3ADC3]" />
                        Nổi Bật
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickLinks.popular.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <NextLink
                                    key={index}
                                    href={item.href}
                                    className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00CCFF]/50 transition-all"
                                >
                                    <div className={`p-2 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-white font-semibold text-sm">{item.label}</span>
                                </NextLink>
                            );
                        })}
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                        
                        {/* Brand - Takes 3 columns */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <SparklesIcon className="w-10 h-10 text-[#ADF709]" />
                                    <div className="absolute inset-0 blur-xl opacity-50">
                                        <SparklesIcon className="w-10 h-10 text-[#00CCFF]" />
                                    </div>
                                </div>
                                <span className="font-black text-2xl bg-gradient-to-r from-[#ADF709] via-[#00CCFF] to-[#F3ADC3] bg-clip-text text-transparent">
                                    MANGA
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Nền tảng đọc manga, xem anime và phim hàng đầu Việt Nam. 
                                Cập nhật nhanh, chất lượng cao.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-3">
                                <div className="flex-1 bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 rounded-lg p-3 border border-[#ADF709]/20">
                                    <div className="text-[#ADF709] font-black text-xl">1M+</div>
                                    <div className="text-gray-500 text-xs">Users</div>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 rounded-lg p-3 border border-[#00CCFF]/20">
                                    <div className="text-[#00CCFF] font-black text-xl">3K+</div>
                                    <div className="text-gray-500 text-xs">Content</div>
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-3">Theo Dõi Chúng Tôi</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <NextLink
                                            key={index}
                                            href={social.href}
                                            className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110 ${social.color}`}
                                            aria-label={social.label}
                                            target="_blank"
                                        >
                                            {social.icon}
                                        </NextLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Categories - 2 columns */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Danh Mục</h3>
                            <ul className="space-y-2.5">
                                {quickLinks.categories.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={index}>
                                            <NextLink 
                                                href={item.href}
                                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                                            >
                                                <Icon className="w-4 h-4 group-hover:text-[#00CCFF] transition-colors" />
                                                {item.label}
                                            </NextLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Community - 2 columns */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Cộng Đồng</h3>
                            <ul className="space-y-2.5">
                                {quickLinks.community.map((item, index) => (
                                    <li key={index}>
                                        <NextLink 
                                            href={item.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                                        >
                                            {item.label}
                                        </NextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Info - 2 columns */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Thông Tin</h3>
                            <ul className="space-y-2.5">
                                {quickLinks.info.map((item, index) => (
                                    <li key={index}>
                                        <NextLink 
                                            href={item.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                                        >
                                            {item.label}
                                        </NextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support & Contact - 3 columns */}
                        <div className="lg:col-span-3">
                            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Hỗ Trợ</h3>
                            <ul className="space-y-2.5 mb-6">
                                {quickLinks.support.map((item, index) => (
                                    <li key={index}>
                                        <NextLink 
                                            href={item.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                                        >
                                            {item.label}
                                        </NextLink>
                                    </li>
                                ))}
                            </ul>

                            {/* Contact Info */}
                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <h4 className="text-white font-semibold text-sm mb-3">Liên Hệ</h4>
                                <a href="mailto:support@manga.vn" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm group">
                                    <EnvelopeIcon className="w-4 h-4 group-hover:text-[#F3ADC3]" />
                                    support@manga.vn
                                </a>
                                <a href="tel:1900xxxx" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm group">
                                    <PhoneIcon className="w-4 h-4 group-hover:text-[#00CCFF]" />
                                    1900 xxxx
                                </a>
                                <div className="flex items-start gap-2 text-gray-400 text-sm">
                                    <MapPinIcon className="w-4 h-4 mt-0.5 text-[#ADF709]" />
                                    Hà Nội, Việt Nam
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="py-6 border-t border-white/5">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        {quickLinks.legal.map((item, index) => (
                            <NextLink
                                key={index}
                                href={item.href}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                {item.label}
                            </NextLink>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        
                        {/* Copyright */}
                        <div className="text-gray-500 text-sm text-center md:text-left">
                            <p className="flex items-center gap-1.5 justify-center md:justify-start">
                                Made with 
                                <HeartIcon className="w-4 h-4 text-[#F3ADC3] fill-current animate-pulse" /> 
                                by <span className="text-white font-semibold">MANGA Team</span>
                            </p>
                            <p className="mt-1">
                                © {currentYear} MANGA. All rights reserved.
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ADF709]/10 border border-[#ADF709]/20">
                                <ShieldCheckIcon className="w-4 h-4 text-[#ADF709]" />
                                <span className="text-xs text-gray-400">Secured</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00CCFF]/10 border border-[#00CCFF]/20">
                                <Cog6ToothIcon className="w-4 h-4 text-[#00CCFF]" />
                                <span className="text-xs text-gray-400">24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3ADC3]/10 border border-[#F3ADC3]/20">
                                <UserGroupIcon className="w-4 h-4 text-[#F3ADC3]" />
                                <span className="text-xs text-gray-400">Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;