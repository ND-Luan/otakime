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
  Image,
  Skeleton,
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
  useDisclosure,
  Progress
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  BookmarkIcon as BookmarkIconOutline,
  EyeIcon,
  ClockIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  UserGroupIcon,
  CalendarIcon,
  PlayIcon,
  FilmIcon
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon
} from "@heroicons/react/24/solid";

// Mock data (same as before, just adding hot property)
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
    hot: true
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
    hot: true
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
    hot: true
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
    hot: false
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
    hot: false
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
    hot: false
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
    const timer = setTimeout(() => setLoading(false), 1000);
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
      case "4K": return "from-[#ADF709] to-[#00CCFF]";
      case "1080p": return "from-[#00CCFF] to-[#F3ADC3]";
      case "720p": return "from-[#F3ADC3] to-[#ADF709]";
      default: return "from-gray-600 to-gray-700";
    }
  };

  const hotMovies = movieList.filter(m => m.hot).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">

      {/* Compact Hero Section */}
      <div className="relative bg-gradient-to-r from-[#F3ADC3]/10 via-[#00CCFF]/10 to-[#ADF709]/10 border-b border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left - Title & Search */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <FilmIcon className="w-10 h-10 text-[#F3ADC3]" />
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#F3ADC3] via-[#00CCFF] to-[#ADF709] bg-clip-text text-transparent">
                  Anime Movies
                </h1>
              </div>
              <p className="text-gray-400 mb-6 max-w-xl">
                Bộ sưu tập phim anime tuyệt vời từ các studio nổi tiếng Nhật Bản
              </p>

              {/* Search Bar */}
              <div className="max-w-xl">
                <Input
                  size="lg"
                  placeholder="Tìm kiếm phim, đạo diễn, studio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-white/5 border border-white/10 hover:border-[#F3ADC3]/50 focus-within:border-[#F3ADC3]"
                  }}
                />
              </div>
            </div>

            {/* Right - Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 rounded-xl p-4 border border-[#F3ADC3]/20 text-center">
                <div className="text-2xl font-black text-[#F3ADC3]">500+</div>
                <div className="text-xs text-gray-400">Movies</div>
              </div>
              <div className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 rounded-xl p-4 border border-[#00CCFF]/20 text-center">
                <div className="text-2xl font-black text-[#00CCFF]">100M+</div>
                <div className="text-xs text-gray-400">Views</div>
              </div>
              <div className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 rounded-xl p-4 border border-[#ADF709]/20 text-center">
                <div className="text-2xl font-black text-[#ADF709]">4K</div>
                <div className="text-xs text-gray-400">Ultra HD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar - Left */}
          <aside className="lg:col-span-3 space-y-6">

            {/* Hot Movies */}
            <Card className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 backdrop-blur-xl border border-[#F3ADC3]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FireIcon className="w-5 h-5 text-[#F3ADC3]" />
                  Hot Tuần Này
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {hotMovies.map((movie, idx) => (
                    <div 
                      key={movie.id} 
                      className="flex gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                      onClick={() => openMovieDetail(movie)}
                    >
                      <div className="relative flex-shrink-0">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#F3ADC3] text-white text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-[#00CCFF]">
                          {movie.title}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-1">{movie.director}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-xs text-[#ADF709]">
                            <StarIcon className="w-3 h-3" />
                            {movie.rating}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Filters Card */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-[#00CCFF]" />
                  Bộ Lọc
                </h3>
              </CardHeader>
              <CardBody className="pt-4 space-y-4">

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Thể loại</label>
                  <Select
                    placeholder="Chọn thể loại"
                    selectedKeys={selectedGenre === "all" ? [] : [selectedGenre]}
                    onSelectionChange={(keys) => setSelectedGenre(Array.from(keys)[0] || "all")}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#F3ADC3]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="all">Tất cả</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre}>{genre}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Năm phát hành</label>
                  <Select
                    placeholder="Chọn năm"
                    selectedKeys={selectedYear === "all" ? [] : [selectedYear]}
                    onSelectionChange={(keys) => setSelectedYear(Array.from(keys)[0] || "all")}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#F3ADC3]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="all">Tất cả</SelectItem>
                    <SelectItem key="2023">2023</SelectItem>
                    <SelectItem key="2022">2022</SelectItem>
                    <SelectItem key="2021">2021</SelectItem>
                    <SelectItem key="2020">2020</SelectItem>
                    <SelectItem key="2019">2019</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Chất lượng</label>
                  <Select
                    placeholder="Chọn chất lượng"
                    selectedKeys={selectedQuality === "all" ? [] : [selectedQuality]}
                    onSelectionChange={(keys) => setSelectedQuality(Array.from(keys)[0] || "all")}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#F3ADC3]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="all">Tất cả</SelectItem>
                    <SelectItem key="4K">4K Ultra HD</SelectItem>
                    <SelectItem key="1080p">Full HD 1080p</SelectItem>
                    <SelectItem key="720p">HD 720p</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Sắp xếp theo</label>
                  <Select
                    placeholder="Chọn sắp xếp"
                    selectedKeys={[sortBy]}
                    onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#F3ADC3]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="rating">Đánh giá cao</SelectItem>
                    <SelectItem key="views">Lượt xem</SelectItem>
                    <SelectItem key="year">Năm mới nhất</SelectItem>
                    <SelectItem key="title">Tên A-Z</SelectItem>
                    <SelectItem key="duration">Thời lượng</SelectItem>
                  </Select>
                </div>

                <Button
                  size="sm"
                  variant="flat"
                  className="w-full bg-white/5 text-gray-400 hover:text-white"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("all");
                    setSelectedYear("all");
                    setSelectedQuality("all");
                    setSortBy("rating");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </CardBody>
            </Card>

            {/* Upcoming Movies */}
            <Card className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 backdrop-blur-xl border border-[#ADF709]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#ADF709]" />
                  Sắp Chiếu
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {upcomingMovies.map((movie) => (
                    <div key={movie.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white text-sm font-semibold mb-1 line-clamp-1">{movie.title}</h4>
                      <p className="text-xs text-gray-400 mb-1">{movie.studio}</p>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3 text-[#ADF709]" />
                        <span className="text-xs text-gray-400">
                          {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Top Directors */}
            <Card className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 backdrop-blur-xl border border-[#00CCFF]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#00CCFF]" />
                  Đạo Diễn Nổi Bật
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {topDirectors.map((director, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <Avatar src={director.avatar} alt={director.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold line-clamp-1">{director.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{director.movies} phim</span>
                          <span>•</span>
                          <span>{director.followers}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-semibold">
                  {filteredMovies.length} <span className="text-gray-400 font-normal">bộ phim</span>
                  {searchQuery && <span className="text-gray-400 font-normal"> cho "{searchQuery}"</span>}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant={viewMode === "grid" ? "solid" : "flat"}
                  color={viewMode === "grid" ? "primary" : "default"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF]" : "text-gray-400"}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "flat"}
                  color={viewMode === "list" ? "primary" : "default"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF]" : "text-gray-400"}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Movies Grid/List */}
            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="bg-white/5 backdrop-blur">
                    <CardBody className="p-0">
                      <Skeleton className={viewMode === "grid" ? "h-96 w-full rounded-t-lg" : "h-32 w-full"} />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy phim</h3>
                <p className="text-gray-400 mb-6">Thử thay đổi từ khóa hoặc bộ lọc</p>
                <Button
                  color="primary"
                  className="bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF]"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("all");
                    setSelectedYear("all");
                    setSelectedQuality("all");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                  {getCurrentPageItems().map((movie) => (
                    <Card
                      key={movie.id}
                      className={`bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#F3ADC3]/50 transition-all group cursor-pointer ${viewMode === "list" ? "flex-row" : ""
                        }`}
                      onClick={() => openMovieDetail(movie)}
                    >
                      <CardBody className={`p-0 ${viewMode === "list" ? "flex flex-row" : ""}`}>

                        {/* Image */}
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 flex-shrink-0" : "h-96"}`}>
                          <Image
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* Progress bar */}
                          {movie.watchProgress > 0 && (
                            <div className="absolute bottom-0 left-0 right-0">
                              <Progress
                                value={movie.watchProgress}
                                className="h-1"
                                classNames={{
                                  indicator: "bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF]"
                                }}
                              />
                            </div>
                          )}

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* Bookmark button */}
                          <button
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(movie.id);
                            }}
                          >
                            {movie.bookmark ? (
                              <BookmarkIconSolid className="w-4 h-4 text-[#F3ADC3]" />
                            ) : (
                              <BookmarkIconOutline className="w-4 h-4 text-white" />
                            )}
                          </button>

                          {/* Quality badge */}
                          <div className="absolute top-3 left-3">
                            <Chip
                              size="sm"
                              className={`bg-gradient-to-r ${getQualityColor(movie.quality)} text-white font-bold`}
                            >
                              {movie.quality}
                            </Chip>
                          </div>

                          {/* Duration badge */}
                          <div className="absolute bottom-3 left-3">
                            <Chip size="sm" className="bg-black/60 text-white backdrop-blur">
                              <ClockIcon className="w-3 h-3 inline mr-1" />
                              {movie.duration}
                            </Chip>
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                          {/* Title & Rating */}
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-bold text-lg line-clamp-2 flex-1 group-hover:text-[#F3ADC3] transition-colors">
                              {movie.title}
                            </h3>
                            <div className="flex items-center gap-1 ml-2">
                              <StarIcon className="w-4 h-4 text-[#ADF709] fill-current" />
                              <span className="text-white font-semibold text-sm">{movie.rating}</span>
                            </div>
                          </div>

                          {/* Director & Studio */}
                          <p className="text-gray-400 text-sm mb-1">{movie.director}</p>
                          <p className="text-gray-400 text-sm mb-2">{movie.studio}</p>

                          {/* Description */}
                          {viewMode === "grid" && (
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{movie.description}</p>
                          )}

                          {/* Genres */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {movie.genres.slice(0, 3).map((genre) => (
                              <Chip key={genre} size="sm" variant="flat" className="bg-white/5 text-gray-400 text-xs">
                                {genre}
                              </Chip>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              {(movie.views / 1000000).toFixed(1)}M
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {movie.year}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF] text-white font-semibold"
                              startContent={<PlayIcon className="w-4 h-4" />}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              Xem Phim
                            </Button>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="flat"
                                  className="bg-white/5 text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  ⋮
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                className="bg-gray-900 border border-white/10"
                                aria-label="Movie actions"
                              >
                                <DropdownItem key="trailer">Xem Trailer</DropdownItem>
                                <DropdownItem key="info">Thông tin chi tiết</DropdownItem>
                                <DropdownItem key="download">Tải xuống</DropdownItem>
                                <DropdownItem key="share">Chia sẻ</DropdownItem>
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
                  <div className="flex justify-center mt-8">
                    <Pagination
                      total={totalPages}
                      page={currentPage}
                      onChange={setCurrentPage}
                      showControls
                      classNames={{
                        wrapper: "gap-2",
                        item: "bg-white/5 text-white",
                        cursor: "bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF] text-white"
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Movie Detail Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-gray-900/95 backdrop-blur-xl border border-white/10",
          header: "border-b border-white/10",
          body: "py-6",
          footer: "border-t border-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedMovie?.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{selectedMovie?.originalTitle}</p>
                </div>
              </ModalHeader>
              <ModalBody>
                {selectedMovie && (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <Image
                        src={selectedMovie.image}
                        alt={selectedMovie.title}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Chip className="bg-gradient-to-r from-[#ADF709] to-[#00CCFF] text-white">
                          <StarIcon className="w-4 h-4 inline mr-1" />
                          {selectedMovie.rating}
                        </Chip>
                        <Chip className={`bg-gradient-to-r ${getQualityColor(selectedMovie.quality)} text-white`}>
                          {selectedMovie.quality}
                        </Chip>
                        <Chip variant="flat" className="bg-white/10 text-white">
                          {selectedMovie.year}
                        </Chip>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">
                          <span className="font-semibold text-white">Đạo diễn:</span> {selectedMovie.director}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-semibold text-white">Studio:</span> {selectedMovie.studio}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-semibold text-white">Thời lượng:</span> {selectedMovie.duration}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-semibold text-white">Ngôn ngữ:</span> {selectedMovie.language}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-semibold text-white">Phụ đề:</span> {selectedMovie.subtitles.join(", ")}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-white mb-2 text-sm">Thể loại:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedMovie.genres.map((genre) => (
                            <Chip key={genre} size="sm" variant="flat" className="bg-white/10 text-gray-300">
                              {genre}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-white mb-2 text-sm">Mô tả:</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{selectedMovie.description}</p>
                      </div>

                      {selectedMovie.watchProgress > 0 && (
                        <div>
                          <p className="font-semibold text-white mb-2 text-sm">Tiến độ xem:</p>
                          <Progress
                            value={selectedMovie.watchProgress}
                            className="mb-2"
                            classNames={{
                              indicator: "bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF]"
                            }}
                          />
                          <p className="text-sm text-gray-400">{selectedMovie.watchProgress}% hoàn thành</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-400 pt-2">
                        <span className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          {selectedMovie.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {selectedMovie.year}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={onClose}
                  className="bg-white/5 text-white"
                >
                  Đóng
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#F3ADC3] to-[#00CCFF] text-white"
                  startContent={<PlayIcon className="w-4 h-4" />}
                >
                  Xem Phim
                </Button>
                <Button
                  variant="flat"
                  className="bg-white/5 text-white"
                  onClick={() => {
                    toggleBookmark(selectedMovie?.id);
                    setSelectedMovie(prev => prev ? { ...prev, bookmark: !prev.bookmark } : null);
                  }}
                  startContent={selectedMovie?.bookmark ? <BookmarkIconSolid className="w-4 h-4 text-[#F3ADC3]" /> : <BookmarkIconOutline className="w-4 h-4" />}
                >
                  {selectedMovie?.bookmark ? "Đã lưu" : "Lưu"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}