'use client'

import { Button } from "@heroui/button";
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Input, 
    Select, 
    SelectItem,
    Chip,
    Badge,
    Image,
    Skeleton,
    Tabs,
    Tab,
    Progress,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@heroui/react";
import React, { useState, useEffect } from "react";

// Mock data
const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", 
    "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller", "Mecha"
];

const movieList = [
    {
        id: 1,
        title: "Your Name",
        originalTitle: "Kimi no Na wa",
        director: "Makoto Shinkai",
        studio: "CoMix Wave Films",
        year: 2016,
        duration: "106 min",
        rating: 9.5,
        views: 25000000,
        genres: ["Romance", "Drama", "Supernatural"],
        description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer1",
        status: "Released",
        quality: "1080p",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: false,
        watchProgress: 0,
        type: "Movie"
    },
    {
        id: 2,
        title: "Spirited Away",
        originalTitle: "Sen to Chihiro no Kamikakushi",
        director: "Hayao Miyazaki",
        studio: "Studio Ghibli",
        year: 2001,
        duration: "125 min",
        rating: 9.3,
        views: 30000000,
        genres: ["Adventure", "Family", "Fantasy"],
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods.",
        image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer2",
        status: "Released",
        quality: "1080p",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: true,
        watchProgress: 65,
        type: "Movie"
    },
    {
        id: 3,
        title: "Demon Slayer: Mugen Train",
        originalTitle: "Kimetsu no Yaiba Movie",
        director: "Haruo Sotozaki",
        studio: "Ufotable",
        year: 2020,
        duration: "117 min",
        rating: 9.1,
        views: 20000000,
        genres: ["Action", "Supernatural", "Drama"],
        description: "Tanjiro and his friends board the Mugen Train to help the Flame Hashira fight a demon.",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer3",
        status: "Released",
        quality: "4K",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: false,
        watchProgress: 0,
        type: "Movie"
    },
    {
        id: 4,
        title: "Princess Mononoke",
        originalTitle: "Mononoke-hime",
        director: "Hayao Miyazaki",
        studio: "Studio Ghibli",
        year: 1997,
        duration: "134 min",
        rating: 8.9,
        views: 15000000,
        genres: ["Adventure", "Drama", "Fantasy"],
        description: "A prince becomes involved in the struggle between forest gods and humans.",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer4",
        status: "Released",
        quality: "1080p",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: true,
        watchProgress: 100,
        type: "Movie"
    },
    {
        id: 5,
        title: "Akira",
        originalTitle: "アキラ",
        director: "Katsuhiro Otomo",
        studio: "Akira Committee",
        year: 1988,
        duration: "124 min",
        rating: 8.7,
        views: 12000000,
        genres: ["Action", "Sci-Fi", "Thriller"],
        description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath.",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer5",
        status: "Released",
        quality: "4K",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: false,
        watchProgress: 45,
        type: "Movie"
    },
    {
        id: 6,
        title: "Weathering With You",
        originalTitle: "Tenki no Ko",
        director: "Makoto Shinkai",
        studio: "CoMix Wave Films",
        year: 2019,
        duration: "112 min",
        rating: 8.8,
        views: 18000000,
        genres: ["Romance", "Drama", "Fantasy"],
        description: "A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        trailer: "https://example.com/trailer6",
        status: "Released",
        quality: "4K",
        language: "Japanese",
        subtitles: ["Vietnamese", "English"],
        bookmark: false,
        watchProgress: 0,
        type: "Movie"
    }
];

const featuredMovies = [
    {
        id: 1,
        title: "The Boy and the Heron",
        description: "Miyazaki's latest masterpiece about a boy's magical journey",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
        rating: 9.2,
        year: 2023,
        isNew: true
    },
    {
        id: 2,
        title: "Suzume",
        description: "A coming-of-age story about a girl who must close doors to other worlds",
        image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&h=400&fit=crop",
        rating: 8.9,
        year: 2022,
        isNew: true
    }
];

const upcomingMovies = [
    {
        id: 1,
        title: "Studio Ghibli New Project",
        releaseDate: "2025-07-15",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=200&fit=crop",
        studio: "Studio Ghibli"
    },
    {
        id: 2,
        title: "One Piece Film: Red 2",
        releaseDate: "2025-08-20",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        studio: "Toei Animation"
    },
    {
        id: 3,
        title: "Evangelion: Final",
        releaseDate: "2025-09-10",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=200&fit=crop",
        studio: "Studio Khara"
    }
];

const topDirectors = [
    { 
        name: "Hayao Miyazaki", 
        movies: 12, 
        followers: "5.2M", 
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        studio: "Studio Ghibli"
    },
    { 
        name: "Makoto Shinkai", 
        movies: 8, 
        followers: "3.8M", 
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        studio: "CoMix Wave Films"
    },
    { 
        name: "Satoshi Kon", 
        movies: 4, 
        followers: "2.1M", 
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        studio: "Madhouse"
    }
];

export default function MoviePage() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedQuality, setSelectedQuality] = useState("all");
    const [sortBy, setSortBy] = useState("rating");
    const [viewMode, setViewMode] = useState("grid");
    const [filteredMovies, setFilteredMovies] = useState(movieList);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const itemsPerPage = 6;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let filtered = movieList.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                movie.studio.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre === "all" || movie.genres.includes(selectedGenre);
            const matchesYear = selectedYear === "all" || movie.year.toString() === selectedYear;
            const matchesQuality = selectedQuality === "all" || movie.quality === selectedQuality;
            return matchesSearch && matchesGenre && matchesYear && matchesQuality;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rating": return b.rating - a.rating;
                case "views": return b.views - a.views;
                case "year": return b.year - a.year;
                case "title": return a.title.localeCompare(b.title);
                case "duration": return parseInt(b.duration) - parseInt(a.duration);
                default: return 0;
            }
        });

        setFilteredMovies(filtered);
        setCurrentPage(1);
    }, [searchQuery, selectedGenre, selectedYear, selectedQuality, sortBy]);

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMovies.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

    const toggleBookmark = (movieId) => {
        setFilteredMovies(prev => prev.map(movie => 
            movie.id === movieId ? { ...movie, bookmark: !movie.bookmark } : movie
        ));
    };

    const openMovieDetail = (movie) => {
        setSelectedMovie(movie);
        onOpen();
    };

    const getQualityColor = (quality) => {
        switch (quality) {
            case "4K": return "success";
            case "1080p": return "primary";
            case "720p": return "warning";
            default: return "default";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative h-[70vh] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop)"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="text-center text-white mb-8">
                        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            🎬 Thế Giới Anime Movie
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Khám phá bộ sưu tập phim anime tuyệt vời từ những studio nổi tiếng nhất Nhật Bản. 
                            Trải nghiệm chất lượng cao với phụ đề tiếng Việt.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto w-full">
                        <Input
                            size="lg"
                            placeholder="🔍 Tìm kiếm phim, đạo diễn, studio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/10 backdrop-blur-lg"
                            classNames={{
                                input: "text-white placeholder:text-gray-300",
                                inputWrapper: "bg-white/10 backdrop-blur-lg border border-white/20"
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Featured Movies */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        🔥 Phim Nổi Bật
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featuredMovies.map((movie) => (
                            <Card key={movie.id} className="bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden group cursor-pointer" onClick={() => openMovieDetail(movie)}>
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    {movie.isNew && (
                                        <div className="absolute top-4 left-4">
                                            <Chip color="danger" variant="solid" className="animate-pulse">
                                                🆕 MỚI
                                            </Chip>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold text-2xl mb-2">{movie.title}</h3>
                                        <p className="text-gray-200 text-sm mb-3">{movie.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Chip color="warning" variant="solid" size="sm">
                                                    ⭐ {movie.rating}
                                                </Chip>
                                                <Chip color="secondary" variant="flat" size="sm">
                                                    {movie.year}
                                                </Chip>
                                            </div>
                                            <Button size="sm" color="primary" className="bg-gradient-to-r from-red-600 to-pink-600">
                                                ▶️ Xem Ngay
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Upcoming Movies */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        🚀 Sắp Khởi Chiếu
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingMovies.map((movie) => (
                            <Card key={movie.id} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all">
                                <CardBody className="p-0">
                                    <div className="relative">
                                        <Image
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Chip size="sm" color="warning" variant="solid">
                                                📅 Sắp ra mắt
                                            </Chip>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-bold mb-2">{movie.title}</h3>
                                        <p className="text-gray-400 text-sm mb-2">Studio: {movie.studio}</p>
                                        <p className="text-gray-300 text-sm">Khởi chiếu: {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Filter Section */}
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
                    <CardBody className="p-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Select
                                placeholder="Thể loại"
                                selectedKeys={selectedGenre === "all" ? [] : [selectedGenre]}
                                onSelectionChange={(keys) => setSelectedGenre(Array.from(keys)[0] || "all")}
                                className="min-w-40"
                                classNames={{
                                    trigger: "bg-white/10 backdrop-blur border border-white/20",
                                    value: "text-white",
                                    popoverContent: "bg-slate-800 backdrop-blur border border-white/20"
                                }}
                            >
                                <SelectItem key="all" value="all">Tất cả thể loại</SelectItem>
                                {genres.map((genre) => (
                                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                ))}
                            </Select>

                            <Select
                                placeholder="Năm"
                                selectedKeys={selectedYear === "all" ? [] : [selectedYear]}
                                onSelectionChange={(keys) => setSelectedYear(Array.from(keys)[0] || "all")}
                                className="min-w-32"
                                classNames={{
                                    trigger: "bg-white/10 backdrop-blur border border-white/20",
                                    value: "text-white",
                                    popoverContent: "bg-slate-800 backdrop-blur border border-white/20"
                                }}
                            >
                                <SelectItem key="all" value="all">Tất cả năm</SelectItem>
                                <SelectItem key="2023" value="2023">2023</SelectItem>
                                <SelectItem key="2022" value="2022">2022</SelectItem>
                                <SelectItem key="2021" value="2021">2021</SelectItem>
                                <SelectItem key="2020" value="2020">2020</SelectItem>
                                <SelectItem key="2019" value="2019">2019</SelectItem>
                            </Select>

                            <Select
                                placeholder="Chất lượng"
                                selectedKeys={selectedQuality === "all" ? [] : [selectedQuality]}
                                onSelectionChange={(keys) => setSelectedQuality(Array.from(keys)[0] || "all")}
                                className="min-w-32"
                                classNames={{
                                    trigger: "bg-white/10 backdrop-blur border border-white/20",
                                    value: "text-white",
                                    popoverContent: "bg-slate-800 backdrop-blur border border-white/20"
                                }}
                            >
                                <SelectItem key="all" value="all">Tất cả chất lượng</SelectItem>
                                <SelectItem key="4K" value="4K">4K Ultra HD</SelectItem>
                                <SelectItem key="1080p" value="1080p">Full HD 1080p</SelectItem>
                                <SelectItem key="720p" value="720p">HD 720p</SelectItem>
                            </Select>

                            <Select
                                placeholder="Sắp xếp"
                                selectedKeys={[sortBy]}
                                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                                className="min-w-40"
                                classNames={{
                                    trigger: "bg-white/10 backdrop-blur border border-white/20",
                                    value: "text-white",
                                    popoverContent: "bg-slate-800 backdrop-blur border border-white/20"
                                }}
                            >
                                <SelectItem key="rating" value="rating">Đánh giá cao</SelectItem>
                                <SelectItem key="views" value="views">Lượt xem nhiều</SelectItem>
                                <SelectItem key="year" value="year">Năm mới nhất</SelectItem>
                                <SelectItem key="title" value="title">Tên A-Z</SelectItem>
                                <SelectItem key="duration" value="duration">Thời lượng</SelectItem>
                            </Select>

                            <div className="flex gap-2 ml-auto">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    color={viewMode === "grid" ? "primary" : "default"}
                                    variant={viewMode === "grid" ? "solid" : "ghost"}
                                    onClick={() => setViewMode("grid")}
                                    className="text-white"
                                >
                                    ⊞
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    color={viewMode === "list" ? "primary" : "default"}
                                    variant={viewMode === "list" ? "solid" : "ghost"}
                                    onClick={() => setViewMode("list")}
                                    className="text-white"
                                >
                                    ☰
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-300">
                        Tìm thấy <span className="font-bold text-white">{filteredMovies.length}</span> bộ phim
                        {searchQuery && ` cho "${searchQuery}"`}
                    </p>
                    <Chip variant="flat" color="secondary">
                        Trang {currentPage} / {totalPages}
                    </Chip>
                </div>

                {/* Movies Grid/List */}
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                    {loading
                        ? Array.from({ length: itemsPerPage }).map((_, i) => (
                            <Card key={i} className="bg-white/10 backdrop-blur">
                                <CardBody className="p-0">
                                    <Skeleton className={viewMode === "grid" ? "h-96 w-full" : "h-48 w-full"} />
                                    <div className="p-4 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                        : getCurrentPageItems().map((movie) => (
                            <Card 
                                key={movie.id} 
                                className={`bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all group cursor-pointer ${
                                    viewMode === "list" ? "flex-row" : ""
                                }`}
                                onClick={() => openMovieDetail(movie)}
                            >
                                <CardBody className={`p-0 ${viewMode === "list" ? "flex flex-row" : ""}`}>
                                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-40 h-full" : "h-80"}`}>
                                        <Image
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        
                                        {/* Watch Progress Bar */}
                                        {movie.watchProgress > 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1">
                                                <Progress 
                                                    value={movie.watchProgress} 
                                                    color="primary" 
                                                    className="h-full"
                                                />
                                            </div>
                                        )}

                                        <div className="absolute top-3 right-3 flex flex-col gap-1">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                color={movie.bookmark ? "danger" : "default"}
                                                variant="solid"
                                                className={movie.bookmark ? "bg-red-500" : "bg-black/50"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBookmark(movie.id);
                                                }}
                                            >
                                                {movie.bookmark ? "❤️" : "🤍"}
                                            </Button>
                                        </div>

                                        <div className="absolute top-3 left-3">
                                            <Chip 
                                                color={getQualityColor(movie.quality)} 
                                                variant="solid" 
                                                size="sm"
                                                className="font-bold"
                                            >
                                                {movie.quality}
                                            </Chip>
                                        </div>

                                        <div className="absolute bottom-3 left-3">
                                            <Chip color="secondary" variant="solid" size="sm">
                                                🎬 {movie.duration}
                                            </Chip>
                                        </div>
                                    </div>

                                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>
                                            <div className="flex items-center gap-1 text-yellow-400 ml-2">
                                                <span>⭐</span>
                                                <span className="font-semibold">{movie.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-400 text-sm mb-1">Đạo diễn: {movie.director}</p>
                                        <p className="text-gray-400 text-sm mb-1">Studio: {movie.studio}</p>
                                        <p className="text-gray-400 text-sm mb-3">Năm: {movie.year}</p>
                                        
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>
                                        
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {movie.genres.slice(0, 3).map((genre) => (
                                                <Chip key={genre} size="sm" variant="bordered" className="text-xs text-gray-300 border-gray-600">
                                                    {genre}
                                                </Chip>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                            <span>👁️ {(movie.views / 1000000).toFixed(1)}M</span>
                                            <span>🗣️ {movie.language}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button 
                                                color="primary" 
                                                size="sm" 
                                                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Play movie logic
                                                }}
                                            >
                                                ▶️ Xem Phim
                                            </Button>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="ghost" className="text-white" onClick={(e) => e.stopPropagation()}>
                                                        ⋮
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu className="bg-slate-800 border border-white/20">
                                                    <DropdownItem key="trailer">🎬 Xem Trailer</DropdownItem>
                                                    <DropdownItem key="info">📋 Thông tin</DropdownItem>
                                                    <DropdownItem key="download">💾 Tải xuống</DropdownItem>
                                                    <DropdownItem key="share">🔗 Chia sẻ</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <Pagination
                            total={totalPages}
                            page={currentPage}
                            onChange={setCurrentPage}
                            color="primary"
                            showControls
                            className="text-white"
                        />
                    </div>
                )}

                {/* Top Directors Section */}
                <section className="mt-16">
                    <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
                        <CardHeader>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                🎭 Đạo Diễn Hàng Đầu
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {topDirectors.map((director, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                        <Avatar src={director.avatar} alt={director.name} size="lg" className="border-2 border-white/20" />
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-lg">{director.name}</h4>
                                            <p className="text-gray-400 text-sm mb-1">{director.studio}</p>
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <span>🎬 {director.movies} phim</span>
                                                <span>👥 {director.followers}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-blue-400">
                                            Theo dõi
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </section>

                {/* No Results */}
                {filteredMovies.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😢</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy phim nào</h3>
                        <p className="text-gray-400 mb-6">Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm</p>
                        <Button 
                            color="primary" 
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedGenre("all");
                                setSelectedYear("all");
                                setSelectedQuality("all");
                            }}
                        >
                            🔄 Xóa bộ lọc
                        </Button>
                    </div>
                )}
            </div>

            {/* Movie Detail Modal */}
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                size="2xl"
                backdrop="blur"
                classNames={{
                    base: "bg-slate-900/95 backdrop-blur border border-white/20",
                    header: "border-b border-white/20",
                    body: "py-6",
                    footer: "border-t border-white/20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-white">{selectedMovie?.title}</h2>
                                <p className="text-gray-400 text-sm">{selectedMovie?.originalTitle}</p>
                            </ModalHeader>
                            <ModalBody>
                                {selectedMovie && (
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3">
                                            <Image
                                                src={selectedMovie.image}
                                                alt={selectedMovie.title}
                                                className="w-full h-80 object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="md:w-2/3">
                                            <div className="flex items-center gap-4 mb-4">
                                                <Chip color="warning" variant="solid">
                                                    ⭐ {selectedMovie.rating}
                                                </Chip>
                                                <Chip color={getQualityColor(selectedMovie.quality)} variant="solid">
                                                    {selectedMovie.quality}
                                                </Chip>
                                                <Chip color="secondary" variant="flat">
                                                    {selectedMovie.year}
                                                </Chip>
                                            </div>

                                            <div className="space-y-3 text-gray-300">
                                                <p><span className="font-semibold text-white">Đạo diễn:</span> {selectedMovie.director}</p>
                                                <p><span className="font-semibold text-white">Studio:</span> {selectedMovie.studio}</p>
                                                <p><span className="font-semibold text-white">Thời lượng:</span> {selectedMovie.duration}</p>
                                                <p><span className="font-semibold text-white">Ngôn ngữ:</span> {selectedMovie.language}</p>
                                                <p><span className="font-semibold text-white">Phụ đề:</span> {selectedMovie.subtitles.join(", ")}</p>
                                            </div>

                                            <div className="my-4">
                                                <p className="font-semibold text-white mb-2">Thể loại:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedMovie.genres.map((genre) => (
                                                        <Chip key={genre} size="sm" variant="bordered" className="text-gray-300 border-gray-600">
                                                            {genre}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="my-4">
                                                <p className="font-semibold text-white mb-2">Mô tả:</p>
                                                <p className="text-gray-300 leading-relaxed">{selectedMovie.description}</p>
                                            </div>

                                            {selectedMovie.watchProgress > 0 && (
                                                <div className="my-4">
                                                    <p className="font-semibold text-white mb-2">Tiến độ xem:</p>
                                                    <Progress 
                                                        value={selectedMovie.watchProgress} 
                                                        color="primary" 
                                                        className="mb-2"
                                                        label={`${selectedMovie.watchProgress}%`}
                                                    />
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center text-sm text-gray-400">
                                                <span>👁️ {selectedMovie.views.toLocaleString()} lượt xem</span>
                                                <span>📅 Phát hành {selectedMovie.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" className="bg-gradient-to-r from-red-600 to-pink-600">
                                    ▶️ Xem Phim
                                </Button>
                                <Button 
                                    color="secondary" 
                                    variant="flat"
                                    onClick={() => toggleBookmark(selectedMovie?.id)}
                                >
                                    {selectedMovie?.bookmark ? "💔 Bỏ yêu thích" : "❤️ Yêu thích"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}