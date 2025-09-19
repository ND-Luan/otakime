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
  Pagination
} from "@heroui/react";
import React, { useState, useEffect } from "react";

// Mock data
const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror",
  "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
];

const mangaList = [
  {
    id: 1,
    title: "One Piece",
    author: "Eiichiro Oda",
    status: "Ongoing",
    rating: 9.8,
    chapters: 1095,
    views: 15000000,
    genres: ["Action", "Adventure", "Comedy"],
    description: "Monkey D. Luffy sails with his Straw Hat Pirates in search of the legendary treasure, the One Piece.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    lastUpdate: "2 giờ trước",
    bookmark: false,
    year: 1997
  },
  {
    id: 2,
    title: "Attack on Titan",
    author: "Hajime Isayama",
    status: "Completed",
    rating: 9.5,
    chapters: 139,
    views: 12000000,
    genres: ["Action", "Drama", "Fantasy"],
    description: "Humanity fights for survival against giant humanoid Titans behind massive walls.",
    image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=300&h=400&fit=crop",
    lastUpdate: "1 ngày trước",
    bookmark: true,
    year: 2009
  },
  {
    id: 3,
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    status: "Completed",
    rating: 9.3,
    chapters: 205,
    views: 10000000,
    genres: ["Action", "Supernatural", "Drama"],
    description: "Tanjiro becomes a demon slayer to save his sister and avenge his family.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=400&fit=crop",
    lastUpdate: "3 giờ trước",
    bookmark: false,
    year: 2016
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    status: "Ongoing",
    rating: 9.2,
    chapters: 245,
    views: 8500000,
    genres: ["Action", "Supernatural", "Horror"],
    description: "Students battle cursed spirits in this dark supernatural adventure.",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=300&h=400&fit=crop",
    lastUpdate: "5 giờ trước",
    bookmark: true,
    year: 2018
  },
  {
    id: 5,
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    status: "Ongoing",
    rating: 8.9,
    chapters: 405,
    views: 9200000,
    genres: ["Action", "Adventure", "Comedy"],
    description: "In a world of superpowers, a quirkless boy dreams of becoming a hero.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
    lastUpdate: "1 giờ trước",
    bookmark: false,
    year: 2014
  },
  {
    id: 6,
    title: "Naruto",
    author: "Masashi Kishimoto",
    status: "Completed",
    rating: 9.0,
    chapters: 700,
    views: 13000000,
    genres: ["Action", "Adventure", "Drama"],
    description: "A young ninja seeks recognition and dreams of becoming Hokage.",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=400&fit=crop",
    lastUpdate: "6 giờ trước",
    bookmark: true,
    year: 1999
  }
];

const featuredManga = [
  {
    id: 1,
    title: "Chainsaw Man",
    description: "Denji becomes Chainsaw Man to pay off his debts",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop",
    rating: 9.1,
    status: "Ongoing"
  },
  {
    id: 2,
    title: "Blue Lock",
    description: "300 strikers compete to become Japan's greatest",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
    rating: 8.8,
    status: "Ongoing"
  }
];

const topAuthors = [
  { name: "Eiichiro Oda", works: 1, followers: "2.5M", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Hajime Isayama", works: 3, followers: "1.8M", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Gege Akutami", works: 2, followers: "1.2M", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }
];

export default function MangaPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredManga, setFilteredManga] = useState(mangaList);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = mangaList.filter(manga => {
      const matchesSearch = manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manga.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "all" || manga.genres.includes(selectedGenre);
      const matchesStatus = selectedStatus === "all" || manga.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesGenre && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "views": return b.views - a.views;
        case "chapters": return b.chapters - a.chapters;
        case "title": return a.title.localeCompare(b.title);
        case "year": return b.year - a.year;
        default: return 0;
      }
    });

    setFilteredManga(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, selectedStatus, sortBy]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredManga.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredManga.length / itemsPerPage);

  const toggleBookmark = (mangaId) => {
    setFilteredManga(prev => prev.map(manga =>
      manga.id === mangaId ? { ...manga, bookmark: !manga.bookmark } : manga
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-center text-white mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              📚 Khám Phá Manga
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Thư viện manga khổng lồ với hàng nghìn bộ truyện từ Nhật Bản.
              Tìm kiếm, đọc và theo dõi manga yêu thích của bạn.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto w-full">
            <Input
              size="lg"
              placeholder="🔍 Tìm kiếm manga, tác giả..."
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
        {/* Featured Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            ⭐ Manga Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredManga.map((manga) => (
              <Card key={manga.id} className="bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={manga.image}
                    alt={manga.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-2xl mb-2">{manga.title}</h3>
                    <p className="text-gray-200 text-sm">{manga.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Chip color="warning" variant="solid" size="sm">
                        ⭐ {manga.rating}
                      </Chip>
                      <Chip color="primary" variant="flat" size="sm">
                        {manga.status}
                      </Chip>
                    </div>
                  </div>
                </div>
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
                }}s
              >
                <SelectItem key="all" value="all">Tất cả thể loại</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </Select>

              <Select
                placeholder="Trạng thái"
                selectedKeys={selectedStatus === "all" ? [] : [selectedStatus]}
                onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] || "all")}
                className="min-w-40"
                classNames={{
                  trigger: "bg-white/10 backdrop-blur border border-white/20",
                  value: "text-white",
                  popoverContent: "bg-slate-800 backdrop-blur border border-white/20"
                }}
              >
                <SelectItem key="all" value="all">Tất cả trạng thái</SelectItem>
                <SelectItem key="ongoing" value="ongoing">Đang tiếp tục</SelectItem>
                <SelectItem key="completed" value="completed">Hoàn thành</SelectItem>
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
                <SelectItem key="chapters" value="chapters">Nhiều chương</SelectItem>
                <SelectItem key="title" value="title">Tên A-Z</SelectItem>
                <SelectItem key="year" value="year">Năm phát hành</SelectItem>
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
            Tìm thấy <span className="font-bold text-white">{filteredManga.length}</span> kết quả
            {searchQuery && ` cho "${searchQuery}"`}
          </p>
          <Chip variant="flat" color="secondary">
            Trang {currentPage} / {totalPages}
          </Chip>
        </div>

        {/* Manga Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur">
                <CardBody className="p-0">
                  <Skeleton className={viewMode === "grid" ? "h-80 w-full" : "h-40 w-full"} />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardBody>
              </Card>
            ))
            : getCurrentPageItems().map((manga) => (
              <Card
                key={manga.id}
                className={`bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all group cursor-pointer ${viewMode === "list" ? "flex-row" : ""
                  }`}
              >
                <CardBody className={`p-0 ${viewMode === "list" ? "flex flex-row" : ""}`}>
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 h-full" : "h-80"}`}>
                    <Image
                      src={manga.image}
                      alt={manga.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        color={manga.bookmark ? "danger" : "default"}
                        variant="solid"
                        className={manga.bookmark ? "bg-red-500" : "bg-black/50"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(manga.id);
                        }}
                      >
                        {manga.bookmark ? "❤️" : "🤍"}
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Chip
                        color={manga.status === "Ongoing" ? "success" : "warning"}
                        variant="solid"
                        size="sm"
                      >
                        {manga.status === "Ongoing" ? "Đang tiếp tục" : "Hoàn thành"}
                      </Chip>
                    </div>
                  </div>
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-bold text-lg line-clamp-2">{manga.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span>⭐</span>
                        <span className="font-semibold">{manga.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-2">Tác giả: {manga.author}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{manga.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {manga.genres.slice(0, 3).map((genre) => (
                        <Chip key={genre} size="sm" variant="bordered" className="text-xs text-gray-300 border-gray-600">
                          {genre}
                        </Chip>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>📖 {manga.chapters} chương</span>
                      <span>👁️ {(manga.views / 1000000).toFixed(1)}M</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        📖 Đọc Ngay
                      </Button>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="ghost" className="text-white">
                            ⋮
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="bg-slate-800 border border-white/20">
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

        {/* Sidebar Content - Top Authors */}
        <section className="mt-16">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                👑 Tác Giả Hàng Đầu
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {topAuthors.map((author, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <Avatar src={author.avatar} alt={author.name} size="md" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{author.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>📚 {author.works} tác phẩm</span>
                        <span>👥 {author.followers}</span>
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
        {filteredManga.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-400 mb-6">Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm</p>
            <Button
              color="primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
                setSelectedStatus("all");
              }}
            >
              🔄 Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}