'use client'

import { Button } from "@heroui/button";
import { Card, CardBody, Chip, Image } from "@heroui/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon, EyeIcon, FireIcon, BoltIcon, SparklesIcon, TrophyIcon } from "@heroicons/react/24/solid";

const trendingToday = [
    { 
        id: 1, 
        title: "Oshi no Ko", 
        chapter: "Ch. 150", 
        views: "125K",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=420&fit=crop",
        rating: 9.1,
        trend: "+15%",
        badgeText: "HOT",
        badgeIcon: FireIcon
    },
    { 
        id: 2, 
        title: "Kaiju No.8", 
        chapter: "Ch. 110", 
        views: "98K",
        image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=300&h=420&fit=crop",
        rating: 8.8,
        trend: "+22%",
        badgeText: "TRENDING",
        badgeIcon: BoltIcon
    },
    { 
        id: 3, 
        title: "Dandadan", 
        chapter: "Ch. 99", 
        views: "87K",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=300&h=420&fit=crop",
        rating: 8.9,
        trend: "+18%",
        badgeText: "NEW",
        badgeIcon: SparklesIcon
    },
    { 
        id: 4, 
        title: "Sakamoto Days", 
        chapter: "Ch. 170", 
        views: "76K",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=420&fit=crop",
        rating: 8.7,
        trend: "+12%",
        badgeText: "QUALITY",
        badgeIcon: StarIcon
    },
    { 
        id: 5, 
        title: "Blue Lock", 
        chapter: "Ch. 280", 
        views: "112K",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=420&fit=crop",
        rating: 8.5,
        trend: "+25%",
        badgeText: "HOT",
        badgeIcon: FireIcon
    },
    { 
        id: 6, 
        title: "Chainsaw Man", 
        chapter: "Ch. 160", 
        views: "134K",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=420&fit=crop",
        rating: 9.0,
        trend: "+30%",
        badgeText: "TOP",
        badgeIcon: TrophyIcon
    }
];

export default function TrendingToday() {
    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <FireIcon className="w-12 h-12 text-[#F3ADC3]" />
                        Trending Hôm Nay
                    </h2>
                    <p className="text-gray-400 text-lg">Những tác phẩm đang được yêu thích nhất</p>
                </div>
                <Button 
                    variant="flat" 
                    className="bg-white/10 text-white hover:bg-white/20"
                    endContent={<ArrowRightIcon className="w-4 h-4" />}
                >
                    Xem Tất Cả
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {trendingToday.map((item) => {
                    const BadgeIcon = item.badgeIcon;
                    return (
                        <Card 
                            key={item.id}
                            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 hover:scale-105 transition-all group"
                        >
                            <CardBody className="p-0 relative">
                                {/* Image - Clickable Area */}
                                <div 
                                    className="relative overflow-hidden rounded-t-lg cursor-pointer"
                                    onClick={() => {
                                        // Handle navigation to detail page
                                        console.log('Navigate to:', item.title);
                                    }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    
                                    {/* Badge */}
                                    <div className="absolute top-3 left-3">
                                        <Chip 
                                            size="sm" 
                                            className="bg-[#F3ADC3] text-white font-bold"
                                            startContent={<BadgeIcon className="w-3 h-3" />}
                                        >
                                            {item.badgeText}
                                        </Chip>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-3 right-3">
                                        <Chip 
                                            size="sm" 
                                            className="bg-black/60 text-white backdrop-blur"
                                            startContent={<StarIcon className="w-3 h-3 text-[#ADF709]" />}
                                        >
                                            {item.rating}
                                        </Chip>
                                    </div>

                                    {/* Info at bottom */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <div className="flex items-center justify-between text-white text-xs mb-1">
                                            <span className="flex items-center gap-1">
                                                <EyeIcon className="w-3 h-3" />
                                                {item.views}
                                            </span>
                                            <span className="text-[#ADF709] font-bold">{item.trend}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3">
                                    <h3 
                                        className="text-white font-bold text-sm mb-1 line-clamp-1 cursor-pointer hover:text-[#00CCFF] transition-colors"
                                        onClick={() => {
                                            console.log('Navigate to:', item.title);
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs mb-2">{item.chapter}</p>
                                    <Button 
                                        size="sm" 
                                        color="primary"
                                        className="w-full bg-gradient-to-r from-[#00CCFF] to-[#ADF709] font-semibold"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Read now:', item.title);
                                        }}
                                    >
                                        Đọc Ngay
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}