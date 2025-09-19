'use client'

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Divider, Avatar, Badge, Skeleton, Image, Chip } from "@heroui/react";
import React, { useEffect, useState } from "react";

// Enhanced dummy data with more realistic content
const featuredContent = [
    {
        id: 1,
        title: "One Piece",
        type: "Manga",
        description: "Cuộc phiêu lưu của Luffy và băng Mũ Rơm trong hành trình tìm kiếm kho báu One Piece",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        rating: 9.8,
        status: "Đang cập nhật",
        genre: ["Phiêu lưu", "Hành động", "Hài hước"]
    },
    {
        id: 2,
        title: "Your Name",
        type: "Movie",
        description: "Câu chuyện tình yêu kỳ diệu vượt thời gian giữa Mitsuha và Taki",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        rating: 9.5,
        status: "Hoàn thành",
        genre: ["Romance", "Drama", "Supernatural"]
    }
];

const topManga = [
    { id: 1, title: "One Piece", views: 12000, rating: 9.8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=140&fit=crop" },
    { id: 2, title: "Jujutsu Kaisen", views: 9500, rating: 9.2, image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=100&h=140&fit=crop" },
    { id: 3, title: "Attack on Titan", views: 9000, rating: 9.0, image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=100&h=140&fit=crop" },
    { id: 4, title: "Demon Slayer", views: 8500, rating: 8.8, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&h=140&fit=crop" },
    { id: 5, title: "Blue Lock", views: 7800, rating: 8.5, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=140&fit=crop" }
];

const topMovies = [
    { id: 1, title: "Your Name", views: 8000, rating: 9.5, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=140&fit=crop" },
    { id: 2, title: "Spirited Away", views: 7500, rating: 9.3, image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=100&h=140&fit=crop" },
    { id: 3, title: "Demon Slayer Movie", views: 7000, rating: 9.1, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&h=140&fit=crop" },
    { id: 4, title: "Princess Mononoke", views: 6500, rating: 8.9, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=100&h=140&fit=crop" },
    { id: 5, title: "Akira", views: 6000, rating: 8.7, image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&h=140&fit=crop" }
];

const newUpdates = [
    { 
        id: 1, 
        title: "Oshi no Ko", 
        chapter: "Ch. 150", 
        updatedAt: "1 giờ trước",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop",
        type: "Manga",
        rating: 9.1
    },
    { 
        id: 2, 
        title: "Kaiju No.8", 
        chapter: "Ch. 110", 
        updatedAt: "2 giờ trước",
        image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=200&h=280&fit=crop",
        type: "Manga",
        rating: 8.8
    },
    { 
        id: 3, 
        title: "Dandadan", 
        chapter: "Ch. 99", 
        updatedAt: "3 giờ trước",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=200&h=280&fit=crop",
        type: "Manga",
        rating: 8.9
    },
    { 
        id: 4, 
        title: "Sakamoto Days", 
        chapter: "Ch. 170", 
        updatedAt: "5 giờ trước",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=280&fit=crop",
        type: "Manga",
        rating: 8.7
    }
];

const upcomingContent = [
    { 
        id: 1, 
        title: "Solo Leveling", 
        type: "Manga", 
        date: "25/06/2025", 
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop",
        genre: ["Action", "Fantasy"]
    },
    { 
        id: 2, 
        title: "Haikyuu!! Movie", 
        type: "Movie", 
        date: "30/06/2025", 
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=280&fit=crop",
        genre: ["Sports", "Drama"]
    },
    { 
        id: 3, 
        title: "Mashle Season 2", 
        type: "Anime", 
        date: "10/07/2025", 
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=200&h=280&fit=crop",
        genre: ["Comedy", "Magic"]
    },
    { 
        id: 4, 
        title: "Spy x Family Movie", 
        type: "Movie", 
        date: "15/07/2025", 
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=280&fit=crop",
        genre: ["Comedy", "Action"]
    },
    { 
        id: 5, 
        title: "Blue Box", 
        type: "Manga", 
        date: "20/07/2025", 
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=280&fit=crop",
        genre: ["Romance", "Sports"]
    }
];

const categories = [
    { name: "Manga", count: 1250, icon: "📚", color: "primary" },
    { name: "Movie", count: 340, icon: "🎬", color: "secondary" },
    { name: "Anime", count: 890, icon: "📺", color: "success" },
    { name: "Light Novel", count: 520, icon: "📖", color: "warning" }
];

export default function ModernHomePage() {
    const [loading, setLoading] = useState(true);
    const [currentFeatured, setCurrentFeatured] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeatured((prev) => (prev + 1) % featuredContent.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                {/* Background with overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${featuredContent[currentFeatured]?.image})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <div className="mb-4">
                            <Chip 
                                color={featuredContent[currentFeatured]?.type === 'Manga' ? 'primary' : 'secondary'} 
                                variant="flat" 
                                size="lg"
                                className="mb-4"
                            >
                                {featuredContent[currentFeatured]?.type}
                            </Chip>
                        </div>
                        
                        {loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-3/4 rounded" />
                                <Skeleton className="h-6 w-full rounded" />
                                <Skeleton className="h-6 w-2/3 rounded" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-10 w-32 rounded" />
                                    <Skeleton className="h-10 w-24 rounded" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    {featuredContent[currentFeatured]?.title}
                                </h1>
                                
                                <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                                    {featuredContent[currentFeatured]?.description}
                                </p>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400 text-xl">⭐</span>
                                        <span className="font-semibold">{featuredContent[currentFeatured]?.rating}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {featuredContent[currentFeatured]?.genre?.map((g, idx) => (
                                            <Chip key={idx} size="sm" variant="bordered" className="text-white border-white/30">
                                                {g}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button 
                                        size="lg" 
                                        color="primary" 
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform font-semibold"
                                    >
                                        {featuredContent[currentFeatured]?.type === 'Manga' ? '📖 Đọc Ngay' : '🎬 Xem Ngay'}
                                    </Button>
                                    <Button 
                                        size="lg" 
                                        variant="bordered" 
                                        className="border-white text-white hover:bg-white/10"
                                    >
                                        📋 Chi Tiết
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Hero Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {featuredContent.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentFeatured(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                idx === currentFeatured ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 space-y-16 py-16">
                
                {/* Categories Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, idx) => (
                        <Card 
                            key={idx} 
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all cursor-pointer"
                        >
                            <CardBody className="text-center p-6">
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className="text-white font-bold text-lg">{category.name}</h3>
                                <p className="text-gray-300">{category.count} nội dung</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* New Updates */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            🆕 Cập Nhật Mới Nhất
                        </h2>
                        <Button 
                            variant="ghost" 
                            className="text-gray-300 hover:text-white"
                            endContent="→"
                        >
                            Xem tất cả
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <Card key={i} className="bg-white/10 backdrop-blur">
                                    <CardBody className="p-0">
                                        <Skeleton className="h-64 w-full rounded-t-lg" />
                                        <div className="p-4 space-y-2">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-8 w-full" />
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                            : newUpdates.map((item) => (
                                <Card key={item.id} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all group cursor-pointer">
                                    <CardBody className="p-0">
                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <Chip size="sm" color="success" variant="solid">
                                                    {item.chapter}
                                                </Chip>
                                            </div>
                                            <div className="absolute bottom-3 left-3">
                                                <Chip size="sm" variant="solid" className="bg-black/50 text-white">
                                                    ⭐ {item.rating}
                                                </Chip>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                                            <p className="text-gray-400 text-sm mb-3">Cập nhật {item.updatedAt}</p>
                                            <Button 
                                                size="sm" 
                                                color="primary" 
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                                            >
                                                📖 Đọc Ngay
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                </section>

                {/* Top Rankings */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Manga */}
                    <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-lg border border-blue-500/30">
                        <CardHeader className="pb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                🏆 Top Manga Tuần Này
                            </h2>
                        </CardHeader>
                        <Divider className="bg-white/20" />
                        <CardBody>
                            <div className="space-y-4">
                                {loading
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <Skeleton className="w-8 h-8 rounded-full" />
                                            <Skeleton className="h-16 w-12 rounded" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-3 w-1/2" />
                                            </div>
                                        </div>
                                    ))
                                    : topManga.map((manga, idx) => (
                                        <div key={manga.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                                idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-blue-600'
                                            }`}>
                                                {idx + 1}
                                            </div>
                                            <Image src={manga.image} alt={manga.title} className="w-12 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold">{manga.title}</h4>
                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                    <span>👁️ {manga.views.toLocaleString()}</span>
                                                    <span>⭐ {manga.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Top Movies */}
                    <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-lg border border-purple-500/30">
                        <CardHeader className="pb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                🎬 Top Movie Tuần Này
                            </h2>
                        </CardHeader>
                        <Divider className="bg-white/20" />
                        <CardBody>
                            <div className="space-y-4">
                                {loading
                                    ? Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <Skeleton className="w-8 h-8 rounded-full" />
                                            <Skeleton className="h-16 w-12 rounded" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-3 w-1/2" />
                                            </div>
                                        </div>
                                    ))
                                    : topMovies.map((movie, idx) => (
                                        <div key={movie.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                                idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-purple-600'
                                            }`}>
                                                {idx + 1}
                                            </div>
                                            <Image src={movie.image} alt={movie.title} className="w-12 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold">{movie.title}</h4>
                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                    <span>👁️ {movie.views.toLocaleString()}</span>
                                                    <span>⭐ {movie.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardBody>
                    </Card>
                </section>

                {/* Upcoming Content */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            🚀 Sắp Ra Mắt
                        </h2>
                        <Button 
                            variant="ghost" 
                            className="text-gray-300 hover:text-white"
                            endContent="→"
                        >
                            Xem lịch phát hành
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <Card key={i} className="bg-white/10 backdrop-blur">
                                    <CardBody className="p-0">
                                        <Skeleton className="h-56 w-full rounded-t-lg" />
                                        <div className="p-4 space-y-2">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                            <Skeleton className="h-6 w-full" />
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                            : upcomingContent.map((item) => (
                                <Card key={item.id} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all group cursor-pointer">
                                    <CardBody className="p-0">
                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <Chip 
                                                    size="sm" 
                                                    color={item.type === 'Manga' ? 'primary' : item.type === 'Movie' ? 'secondary' : 'success'}
                                                    variant="solid"
                                                >
                                                    {item.type}
                                                </Chip>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{item.title}</h3>
                                            <div className="flex gap-1 mb-2 flex-wrap">
                                                {item.genre.map((g, idx) => (
                                                    <Chip key={idx} size="sm" variant="bordered" className="text-xs text-gray-400 border-gray-600">
                                                        {g}
                                                    </Chip>
                                                ))}
                                            </div>
                                            <Badge color="warning" variant="flat" className="text-xs">
                                                📅 {item.date}
                                            </Badge>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                </section>

                {/* Call to Action */}
                <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-white/20 p-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Khám Phá Thế Giới Manga & Anime 🌟
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Tham gia cộng đồng hơn 1 triệu người yêu thích manga và anime. 
                            Trải nghiệm nội dung chất lượng cao, cập nhật nhanh nhất!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                color="primary" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform font-semibold px-8"
                            >
                                🚀 Bắt Đầu Khám Phá
                            </Button>
                            <Button 
                                size="lg" 
                                variant="bordered" 
                                className="border-white text-white hover:bg-white/10 px-8"
                            >
                                💎 Đăng Ký Premium
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}