'use client'

import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from '@heroui/react';
import NextLink from "next/link";
import React, { useMemo, useState, useEffect, useRef } from "react";
import {
    MagnifyingGlassIcon,
    BookOpenIcon,
    FilmIcon,
    UserGroupIcon,
    NewspaperIcon,
    InformationCircleIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

/* ─────────────────────────────────────
   HOOK: ẩn khi scroll xuống, hiện khi scroll lên
───────────────────────────────────── */
function useScrollDirection() {
    const [hidden, setHidden]   = useState(false);   // true → ẩn navbar
    const lastY                 = useRef(0);
    const ticking               = useRef(false);

    useEffect(() => {
        const THRESHOLD = 8; // px tối thiểu để kích hoạt

        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const delta    = currentY - lastY.current;

                if (currentY < 60) {
                    // Gần đầu trang → luôn hiện
                    setHidden(false);
                } else if (delta > THRESHOLD) {
                    // Scroll xuống → ẩn
                    setHidden(true);
                } else if (delta < -THRESHOLD) {
                    // Scroll lên → hiện
                    setHidden(false);
                }

                lastY.current   = currentY;
                ticking.current = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return hidden;
}

/* ─────────────────────────────────────
   LOGO
───────────────────────────────────── */
export const Logo: React.FC = () => (
    <div className="flex items-center gap-2">
        <div className="relative">
            <SparklesIcon className="w-8 h-8 text-[#ADF709]" />
            <div className="absolute inset-0 blur-lg opacity-50">
                <SparklesIcon className="w-8 h-8 text-[#00CCFF]" />
            </div>
        </div>
        <span className="font-black text-xl bg-gradient-to-r from-[#ADF709] via-[#00CCFF] to-[#F3ADC3] bg-clip-text text-transparent">
            MANGA
        </span>
    </div>
);

/* ─────────────────────────────────────
   HEADER
───────────────────────────────────── */
const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hidden = useScrollDirection();

    const menuItems = useMemo(() => [
        { label: "Home",  href: "/",      icon: SparklesIcon         },
        { label: "Manga", href: "/manga", icon: BookOpenIcon         },
        { label: "Movie", href: "/movie", icon: FilmIcon             },
        { label: "Team",  href: "/team",  icon: UserGroupIcon        },
        { label: "Blog",  href: "/blog",  icon: NewspaperIcon        },
        { label: "About", href: "/about", icon: InformationCircleIcon},
    ], []);

    return (
        /*
         * Wrapper div handles the slide animation.
         * position: fixed + z-50 so it stays on top.
         * transform + transition moves it off the top edge when hidden.
         */
        <div
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                transform:  hidden ? "translateY(-110%)" : "translateY(0)",
                transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
            }}
        >
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                classNames={{
                    base:    "bg-gray-950/85 backdrop-blur-xl border-white/10",
                    wrapper: "px-4 sm:px-6",
                    item: [
                        "flex",
                        "relative",
                        "h-full",
                        "items-center",
                        "data-[active=true]:after:content-['']",
                        "data-[active=true]:after:absolute",
                        "data-[active=true]:after:bottom-0",
                        "data-[active=true]:after:left-0",
                        "data-[active=true]:after:right-0",
                        "data-[active=true]:after:h-[2px]",
                        "data-[active=true]:after:rounded-[2px]",
                        "data-[active=true]:after:bg-gradient-to-r",
                        "data-[active=true]:after:from-[#ADF709]",
                        "data-[active=true]:after:to-[#00CCFF]",
                    ],
                }}
            >
                {/* Mobile toggle */}
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="text-white"
                    />
                </NavbarContent>

                {/* Mobile logo (center) */}
                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Logo />
                    </NavbarBrand>
                </NavbarContent>

                {/* Desktop logo + menu */}
                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarBrand className="mr-4">
                        <Logo />
                    </NavbarBrand>
                    <NavbarContent className="flex gap-6">
                        {menuItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <NavbarItem key={i}>
                                    <NextLink
                                        href={item.href}
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors group"
                                    >
                                        <Icon className="w-4 h-4 group-hover:text-[#00CCFF] transition-colors" />
                                        <span>{item.label}</span>
                                    </NextLink>
                                </NavbarItem>
                            );
                        })}
                    </NavbarContent>
                </NavbarContent>

                {/* Search + Avatar */}
                <NavbarContent as="div" className="items-center" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[12rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small text-white placeholder:text-gray-500",
                            inputWrapper: [
                                "h-full",
                                "font-normal",
                                "bg-white/5",
                                "backdrop-blur-md",
                                "border",
                                "border-white/10",
                                "hover:border-[#00CCFF]/50",
                                "focus-within:border-[#00CCFF]",
                                "transition-colors",
                                "group-data-[focus=true]:bg-white/10",
                            ],
                        }}
                        placeholder="Tìm kiếm..."
                        size="sm"
                        startContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />}
                        type="search"
                    />

                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform border-2 border-[#00CCFF]/50 hover:border-[#ADF709] hover:scale-110"
                                color="primary"
                                name="User"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                            classNames={{
                                base: "bg-gray-900/95 backdrop-blur-xl border border-white/10",
                                list: "gap-1",
                            }}
                        >
                            <DropdownItem
                                key="profile"
                                startContent={<UserCircleIcon className="w-5 h-5 text-[#00CCFF]" />}
                                classNames={{ base: "text-white hover:bg-white/10" }}
                            >
                                <NextLink href="/profile" className="w-full">Profile</NextLink>
                            </DropdownItem>
                            <DropdownItem
                                key="team_settings"
                                startContent={<UserGroupIcon className="w-5 h-5 text-[#F3ADC3]" />}
                                classNames={{ base: "text-white hover:bg-white/10" }}
                            >
                                Team Settings
                            </DropdownItem>
                            <DropdownItem
                                key="configurations"
                                startContent={<Cog6ToothIcon className="w-5 h-5 text-[#ADF709]" />}
                                classNames={{ base: "text-white hover:bg-white/10" }}
                            >
                                Configurations
                            </DropdownItem>
                            <DropdownItem
                                key="help_and_feedback"
                                startContent={<QuestionMarkCircleIcon className="w-5 h-5 text-gray-400" />}
                                classNames={{ base: "text-white hover:bg-white/10" }}
                            >
                                Help & Feedback
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
                                classNames={{ base: "text-red-400 hover:bg-red-500/10" }}
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>

                {/* Mobile menu */}
                <NavbarMenu className="bg-gray-950/95 backdrop-blur-xl border-r border-white/10 pt-6">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <NavbarMenuItem key={`${item.label}-${i}`}>
                                <NextLink
                                    href={item.href}
                                    className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-white/5 transition-colors group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00CCFF] transition-colors" />
                                    <span className="text-base font-semibold">{item.label}</span>
                                </NextLink>
                            </NavbarMenuItem>
                        );
                    })}
                </NavbarMenu>
            </Navbar>
        </div>
    );
};

/* ─────────────────────────────────────
   ICON EXPORTS (giữ nguyên)
───────────────────────────────────── */
export const AcmeLogo: React.FC = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

type SearchIconProps = {
    size?: number; strokeWidth?: number; width?: number; height?: number; [key: string]: any;
};
export const SearchIcon: React.FC<SearchIconProps> = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
    <svg aria-hidden="true" fill="none" focusable="false"
        height={height || size} role="presentation" viewBox="0 0 24 24" width={width || size} {...props}>
        <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
        <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
);

export default Header;