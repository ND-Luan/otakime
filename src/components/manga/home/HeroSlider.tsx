'use client'

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/react";
import { 
    PlayIcon, 
    InformationCircleIcon, 
    HeartIcon, 
    FireIcon, 
    StarIcon as StarIconSolid,
    BookOpenIcon,
    SparklesIcon 
} from "@heroicons/react/24/solid";

const heroSlides = [
    {
        id: 1,
        title: "One Piece",
        subtitle: "Hành trình huyền thoại vươn tới đỉnh cao",
        description: "Theo chân Luffy và băng Mũ Rơm trong cuộc phiêu lưu vĩ đại nhất, khám phá những bí ẩn của thế giới One Piece",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
        rating: 9.8,
        chapters: "1100+",
        status: "Đang phát hành",
        tags: ["Phiêu lưu", "Hành động", "Hài hước"],
        color: "from-[#ADF709] to-[#00CCFF]",
        badgeIcon: FireIcon,
        badgeText: "HOT"
    },
    {
        id: 2,
        title: "Jujutsu Kaisen",
        subtitle: "Cuộc chiến chống lại lời nguyền",
        description: "Yuji Itadori bước vào thế giới phù thủy đầy nguy hiểm để cứu nhân loại khỏi những lời nguyền đáng sợ",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=600&fit=crop",
        rating: 9.2,
        chapters: "250+",
        status: "Đang phát hành",
        tags: ["Siêu nhiên", "Hành động", "Dark Fantasy"],
        color: "from-[#F3ADC3] to-[#ADF709]",
        badgeIcon: SparklesIcon,
        badgeText: "NEW"
    },
    {
        id: 3,
        title: "Your Name",
        subtitle: "Khi số phận gắn kết hai linh hồn",
        description: "Một câu chuyện tình yêu vượt thời gian giữa Mitsuha và Taki, đầy cảm động và kỳ diệu",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        rating: 9.5,
        chapters: "Movie",
        status: "Hoàn thành",
        tags: ["Romance", "Drama", "Supernatural"],
        color: "from-[#00CCFF] to-[#F3ADC3]",
        badgeIcon: StarIconSolid,
        badgeText: "POPULAR"
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const currentHero = heroSlides[currentSlide];
    const BadgeIcon = currentHero.badgeIcon;

    return (
        <section className="relative h-[90vh] overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
                    style={{ backgroundImage: `url(${currentHero.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                <div className="max-w-3xl space-y-6">
                    {/* Badge */}
                    <div className="flex items-center gap-3">
                        <Chip 
                            size="lg"
                            className={`bg-gradient-to-r ${currentHero.color} text-white font-bold px-4`}
                            startContent={<BadgeIcon className="w-4 h-4" />}
                        >
                            {currentHero.badgeText}
                        </Chip>
                        <Chip variant="flat" size="sm" className="bg-white/10 text-white backdrop-blur">
                            {currentHero.status}
                        </Chip>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-3 leading-tight tracking-tight">
                            {currentHero.title}
                        </h1>
                        <p className="text-2xl text-[#00CCFF] font-semibold">
                            {currentHero.subtitle}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                        {currentHero.description}
                    </p>

                    {/* Stats Bar */}
                    <div className="flex items-center gap-6 py-4">
                        <div className="flex items-center gap-2 bg-[#ADF709]/20 px-4 py-2 rounded-full backdrop-blur border border-[#ADF709]/30">
                            <StarIconSolid className="w-5 h-5 text-[#ADF709]" />
                            <span className="text-white font-bold text-lg">{currentHero.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#00CCFF]/20 px-4 py-2 rounded-full backdrop-blur border border-[#00CCFF]/30">
                            <BookOpenIcon className="w-5 h-5 text-[#00CCFF]" />
                            <span className="text-white font-semibold">{currentHero.chapters}</span>
                        </div>
                        <div className="flex gap-2">
                            {currentHero.tags.map((tag, idx) => (
                                <Chip 
                                    key={idx} 
                                    size="sm" 
                                    variant="flat"
                                    className="bg-white/10 text-white backdrop-blur"
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button 
                            size="lg"
                            className={`bg-gradient-to-r ${currentHero.color} text-white font-bold px-8 shadow-2xl hover:scale-105 transition-transform`}
                            startContent={<PlayIcon className="w-5 h-5" />}
                        >
                            Đọc Ngay
                        </Button>
                        <Button 
                            size="lg"
                            variant="bordered"
                            className="border-2 border-white text-white font-semibold px-8 hover:bg-white/10 backdrop-blur"
                            startContent={<InformationCircleIcon className="w-5 h-5" />}
                        >
                            Thông Tin
                        </Button>
                        <Button 
                            size="lg"
                            variant="flat"
                            className="bg-white/10 text-white font-semibold backdrop-blur hover:bg-white/20"
                            startContent={<HeartIcon className="w-5 h-5" />}
                        >
                            Yêu Thích
                        </Button>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {heroSlides.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`cursor-pointer transition-all rounded-full ${
                            idx === currentSlide 
                                ? 'w-12 h-3 bg-white' 
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}