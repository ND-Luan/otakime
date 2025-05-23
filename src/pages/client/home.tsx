'use client'

import ClientLayout from "@/components/client/client_layout";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Divider, Avatar, Badge, Skeleton } from "@heroui/react";
import React, { useEffect, useState } from "react";

// Dummy data
const topManga = [
    { id: 1, title: "One Piece", views: 12000 },
    { id: 2, title: "Jujutsu Kaisen", views: 9500 },
    { id: 3, title: "Attack on Titan", views: 9000 },
];

const topMovies = [
    { id: 1, title: "Your Name", views: 8000 },
    { id: 2, title: "Spirited Away", views: 7500 },
    { id: 3, title: "Demon Slayer: Mugen Train", views: 7000 },
];

const recommendedManga = [
    { id: 1, title: "Blue Lock" },
    { id: 2, title: "Chainsaw Man" },
    { id: 3, title: "Frieren" },
];

const newManga = [
    { id: 1, title: "Oshi no Ko", chapter: "Ch. 150", updatedAt: "1 giờ trước" },
    { id: 2, title: "Kaiju No.8", chapter: "Ch. 110", updatedAt: "2 giờ trước" },
    { id: 3, title: "Dandadan", chapter: "Ch. 99", updatedAt: "3 giờ trước" },
    { id: 4, title: "Sakamoto Days", chapter: "Ch. 170", updatedAt: "5 giờ trước" },
];

const teamLogos = [
    { id: 1, name: "Team Alpha", logo: "/team-alpha.png" },
    { id: 2, name: "Team Beta", logo: "/team-beta.png" },
    { id: 3, name: "Team Gamma", logo: "/team-gamma.png" },
    { id: 4, name: "Team Delta", logo: "/team-delta.png" },
];

const bestTeam = {
    name: "Team Alpha",
    description: "Đóng góp nhiều bộ truyện chất lượng, dịch nhanh và chuẩn.",
    logo: "/team-alpha.png",
};
const upcoming = [
    { id: 1, title: "Solo Leveling", type: "Manga", date: "25/06/2025", image: "/solo-leveling.jpg" },
    { id: 2, title: "Haikyuu!! Movie", type: "Movie", date: "30/06/2025", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=200&q=80" },
    { id: 3, title: "Mashle Season 2", type: "Manga", date: "10/07/2025", image: "https://picsum.photos/200/300?random=1" },
    { id: 4, title: "Spy x Family Movie", type: "Movie", date: "15/07/2025", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&q=80" },
    { id: 5, title: "Blue Box", type: "Manga", date: "20/07/2025", image: "https://picsum.photos/200/300?random=2" },
];

export default function Root() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fake loading with Promise
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ClientLayout>
            <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50 py-8">
                <div className="container mx-auto space-y-12 relative z-10">

                    {/* Banner/Slider */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="col-span-2 bg-blue-50 flex flex-row items-center p-8 shadow-lg">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2 text-indigo-800">OtakuMê - Đọc Manga & Movie</h1>
                                <p className="mb-4 text-gray-600">Khám phá kho truyện tranh và phim hoạt hình chất lượng cao, cập nhật liên tục mỗi ngày!</p>
                                <Button color="primary">Khám phá ngay</Button>
                            </div>
                            <img src="/banner-manga.png" alt="Banner" className="h-40 w-auto hidden md:block" />
                        </Card>
                        <div className="flex flex-col gap-6">
                            <Card className="bg-green-50 p-4 flex-1 shadow">
                                <div className="font-bold text-green-700 mb-2">20% Off</div>
                                <div className="text-lg font-semibold mb-1">Top Manga Tuần</div>
                                <Button size="sm" color="success" variant="flat">Xem ngay</Button>
                            </Card>
                            <Card className="bg-yellow-50 p-4 flex-1 shadow">
                                <div className="font-bold text-yellow-700 mb-2">15% Off</div>
                                <div className="text-lg font-semibold mb-1">Top Movie Tuần</div>
                                <Button size="sm" color="warning" variant="flat">Xem ngay</Button>
                            </Card>
                        </div>
                    </div>

                    {/* Upcoming Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Sắp Ra Mắt</h2>
                            <Button variant="light" size="sm">Xem tất cả →</Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {loading
                                ? Array.from({ length: 5 }).map((_, i) => (
                                    <Card key={i} className="flex flex-col items-center py-4">
                                        <Skeleton className="h-24 w-20 rounded mb-2" />
                                        <Skeleton className="h-5 w-3/4 mb-1" />
                                        <Skeleton className="h-4 w-1/2 mb-2" />
                                        <Skeleton className="h-6 w-2/3" />
                                    </Card>
                                ))
                                : upcoming.map((item) => (
                                    <Card key={item.id} className="flex flex-col items-center py-4 hover:shadow-lg transition">
                                        <img
                                            src={item.image || "https://mangadex.org/img/cover-placeholder.png"}
                                            alt={item.title}
                                            className="h-24 w-20 object-cover rounded mb-2"
                                        />
                                        <span className="font-semibold">{item.title}</span>
                                        <span className="text-xs text-gray-500">{item.type}</span>
                                        <Badge color="warning" variant="flat" className="mt-2">Khởi chiếu: {item.date}</Badge>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* New Manga Updated - Horizontal Scroll */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Truyện mới cập nhật</h2>
                            <Button variant="light" size="sm">Xem tất cả →</Button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <Card key={i} className="min-w-[220px] w-56 flex flex-col items-center py-4">
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2 mb-2" />
                                        <Skeleton className="h-8 w-2/3" />
                                    </Card>
                                ))
                                : newManga.map((manga) => (
                                    <Card key={manga.id} className="min-w-[220px] w-56 shadow hover:scale-105 transition-transform">
                                        <CardHeader>
                                            <div className="font-semibold text-lg">{manga.title}</div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge color="success" variant="flat">{manga.chapter}</Badge>
                                                <span className="text-xs text-gray-500">{manga.updatedAt}</span>
                                            </div>
                                            <Button color="success" className="w-full">Đọc ngay</Button>
                                        </CardBody>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* Recommended Manga - Horizontal Scroll */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Truyện được đề xuất</h2>
                            <Button variant="light" size="sm">Xem tất cả →</Button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {loading
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <Card key={i} className="min-w-[220px] w-56 flex flex-col items-center py-4">
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2 mb-2" />
                                        <Skeleton className="h-8 w-2/3" />
                                    </Card>
                                ))
                                : recommendedManga.map((manga) => (
                                    <Card key={manga.id} className="min-w-[220px] w-56 hover:scale-105 transition-transform shadow-md">
                                        <CardHeader>
                                            <div className="font-semibold text-lg">{manga.title}</div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <Button color="primary" className="w-full">Đọc ngay</Button>
                                        </CardBody>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* Top Manga & Movie Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <h2 className="text-xl font-bold text-indigo-700">Top Manga Đọc Nhiều Nhất Tuần</h2>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-col gap-3">
                                    {loading
                                        ? Array.from({ length: 3 }).map((_, i) => (
                                            <Card key={i} className="flex flex-row items-center justify-between px-4 py-2">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-6 w-6 rounded-full" />
                                                    <Skeleton className="h-4 w-24" />
                                                </div>
                                                <Skeleton className="h-4 w-16" />
                                            </Card>
                                        ))
                                        : topManga.map((manga, idx) => (
                                            <Card
                                                key={manga.id}
                                                className="flex flex-row items-center justify-between px-4 py-2 shadow-sm hover:shadow-md transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Badge color="primary" variant="flat">{idx + 1}</Badge>
                                                    <span className="font-medium">{manga.title}</span>
                                                </div>
                                                <span className="text-gray-500 text-sm">{manga.views} lượt xem</span>
                                            </Card>
                                        ))}
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <h2 className="text-xl font-bold text-pink-700">Top Movie Xem Nhiều Nhất Tuần</h2>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-col gap-3">
                                    {loading
                                        ? Array.from({ length: 3 }).map((_, i) => (
                                            <Card key={i} className="flex flex-row items-center justify-between px-4 py-2">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="h-6 w-6 rounded-full" />
                                                    <Skeleton className="h-4 w-24" />
                                                </div>
                                                <Skeleton className="h-4 w-16" />
                                            </Card>
                                        ))
                                        : topMovies.map((movie, idx) => (
                                            <Card
                                                key={movie.id}
                                                className="flex flex-row items-center justify-between px-4 py-2 shadow-sm hover:shadow-md transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Badge color="secondary" variant="flat">{idx + 1}</Badge>
                                                    <span className="font-medium">{movie.title}</span>
                                                </div>
                                                <span className="text-gray-500 text-sm">{movie.views} lượt xem</span>
                                            </Card>
                                        ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Các Team Dịch - Logo style giống mẫu */}
                    <div className="bg-gray-50 rounded-lg py-8 px-4 flex justify-center items-center my-8">
                        <div className="flex flex-row flex-wrap justify-center items-center gap-12 w-full">
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-28 rounded" />
                                ))
                                : teamLogos.map((team) => (
                                    <img
                                        key={team.id}
                                        src={team.logo}
                                        alt={team.name}
                                        className="h-12 object-contain grayscale opacity-60"
                                        style={{ maxWidth: 120 }}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Best Team of the Month */}
                    <Card className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-white/80 border-l-4 border-yellow-400 p-6 rounded-xl shadow-lg flex items-center gap-6">
                        {loading
                            ? (
                                <Skeleton className="h-24 w-24 rounded-full" />
                            ) : (
                                <Avatar src={bestTeam.logo} alt={bestTeam.name} className="h-24 w-24 border-4 border-yellow-300 shadow" size="xl" />
                            )
                        }
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-yellow-700">Team Xuất Sắc Tháng Này</h2>
                            {loading
                                ? (
                                    <>
                                        <Skeleton className="h-6 w-32 mb-2" />
                                        <Skeleton className="h-4 w-48" />
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold text-lg">{bestTeam.name}</div>
                                        <div className="text-gray-700">{bestTeam.description}</div>
                                    </>
                                )
                            }
                        </div>
                    </Card>
                </div>
                {/* CSS for auto-scroll */}
                <style jsx>{`
                    @keyframes scroll-x {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </div>
        </ClientLayout>
    );
}