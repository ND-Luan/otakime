'use client'

import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Chip, Image } from "@heroui/react";
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FireIcon, NewspaperIcon } from "@heroicons/react/24/solid";

const recentUpdates = [
    {
        id: 1,
        slug: "solo-leveling",
        title: "Solo Leveling",
        chapters: [
            { label: "Ch. 200", slug: "200" },
            { label: "Ch. 199", slug: "199" },
            { label: "Ch. 198", slug: "198" }
        ],
        time: "5 phút trước",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=220&fit=crop",
        hot: true
    },
    {
        id: 2,
        slug: "tower-of-god",
        title: "Tower of God",
        chapters: [
            { label: "Ch. 590", slug: "590" },
            { label: "Ch. 589", slug: "589" }
        ],
        time: "15 phút trước",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=150&h=220&fit=crop",
        hot: false
    },
    {
        id: 3,
        slug: "the-beginning-after-the-end",
        title: "The Beginning After The End",
        chapters: [
            { label: "Ch. 180", slug: "180" },
            { label: "Ch. 179", slug: "179" },
            { label: "Ch. 178", slug: "178" }
        ],
        time: "30 phút trước",
        image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=150&h=220&fit=crop",
        hot: true
    },
    {
        id: 4,
        slug: "omniscient-reader",
        title: "Omniscient Reader",
        chapters: [
            { label: "Ch. 150", slug: "150" },
            { label: "Ch. 149", slug: "149" }
        ],
        time: "1 giờ trước",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=220&fit=crop",
        hot: false
    }
];

export default function RecentUpdate() {
    const router = useRouter();

    return (
        <Card className="bg-gradient-to-br from-[#00CCFF]/20 to-[#F3ADC3]/20 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-0">
                <div className="w-full">
                    <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <NewspaperIcon className="w-10 h-10 text-[#00CCFF]" />
                        Cập Nhật Gần Đây
                    </h2>
                    <p className="text-gray-400">Chapters mới nhất vừa được đăng tải</p>
                </div>
            </CardHeader>
            <CardBody className="pt-6">
                <div className="space-y-4">
                    {recentUpdates.map((item) => (
                        <Card
                            key={item.id}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                            onClick={() => router.push(`/manga/${item.slug}`)}
                        >
                            <CardBody className="p-4">
                                <div className="flex gap-4">
                                    {/* Thumbnail */}
                                    <div className="relative flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-28 object-cover rounded-lg"
                                        />
                                        {item.hot && (
                                            <div className="absolute -top-2 -right-2">
                                                <Chip
                                                    size="sm"
                                                    className="bg-[#F3ADC3] text-white font-bold animate-pulse"
                                                    startContent={<FireIcon className="w-3 h-3" />}
                                                >
                                                    HOT
                                                </Chip>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-lg mb-2 hover:text-[#00CCFF] transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {item.chapters.map((ch, idx) => (
                                                <Chip
                                                    key={idx}
                                                    size="sm"
                                                    variant="flat"
                                                    color="primary"
                                                    className="cursor-pointer hover:scale-105 transition-transform"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/manga/${item.slug}/${ch.slug}`);
                                                    }}
                                                >
                                                    {ch.label}
                                                </Chip>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                                <ClockIcon className="w-4 h-4" />
                                                {item.time}
                                            </span>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                variant="flat"
                                                endContent={<ArrowRightIcon className="w-4 h-4" />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Navigate to latest chapter
                                                    router.push(`/manga/${item.slug}/${item.chapters[0].slug}`);
                                                }}
                                            >
                                                Đọc Tiếp
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}