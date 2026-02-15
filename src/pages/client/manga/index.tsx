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
  Tabs,
  Tab,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  BookmarkIcon as BookmarkIconOutline,
  EyeIcon,
  BookOpenIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon
} from "@heroicons/react/24/solid";

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
    year: 1997,
    hot: true
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
    year: 2009,
    hot: false
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
    year: 2016,
    hot: true
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
    year: 2018,
    hot: true
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
    year: 2014,
    hot: false
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
    year: 1999,
    hot: false
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

  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
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

  const hotManga = mangaList.filter(m => m.hot).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      
      {/* Compact Hero Section */}
      <div className="relative bg-gradient-to-r from-[#00CCFF]/10 via-[#F3ADC3]/10 to-[#ADF709]/10 border-b border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left - Title & Search */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="w-10 h-10 text-[#00CCFF]" />
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ADF709] via-[#00CCFF] to-[#F3ADC3] bg-clip-text text-transparent">
                  Khám Phá Manga
                </h1>
              </div>
              <p className="text-gray-400 mb-6 max-w-xl">
                Thư viện manga với hàng nghìn bộ truyện chất lượng cao từ Nhật Bản
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl">
                <Input
                  size="lg"
                  placeholder="Tìm kiếm manga, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-white/5 border border-white/10 hover:border-[#00CCFF]/50 focus-within:border-[#00CCFF]"
                  }}
                />
              </div>
            </div>

            {/* Right - Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 rounded-xl p-4 border border-[#ADF709]/20 text-center">
                <div className="text-2xl font-black text-[#ADF709]">3K+</div>
                <div className="text-xs text-gray-400">Manga</div>
              </div>
              <div className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 rounded-xl p-4 border border-[#00CCFF]/20 text-center">
                <div className="text-2xl font-black text-[#00CCFF]">50M+</div>
                <div className="text-xs text-gray-400">Lượt đọc</div>
              </div>
              <div className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 rounded-xl p-4 border border-[#F3ADC3]/20 text-center">
                <div className="text-2xl font-black text-[#F3ADC3]">1M+</div>
                <div className="text-xs text-gray-400">Độc giả</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Left */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Hot This Week */}
            <Card className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 backdrop-blur-xl border border-[#F3ADC3]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FireIcon className="w-5 h-5 text-[#F3ADC3]" />
                  Hot Tuần Này
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {hotManga.map((manga, idx) => (
                    <div key={manga.id} className="flex gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={manga.image}
                          alt={manga.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#F3ADC3] text-white text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-[#00CCFF]">
                          {manga.title}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-1">{manga.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-xs text-[#ADF709]">
                            <StarIcon className="w-3 h-3" />
                            {manga.rating}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{manga.chapters} ch</span>
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
                      trigger: "bg-white/5 border border-white/10 hover:border-[#00CCFF]/50",
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
                  <label className="text-sm text-gray-400 mb-2 block">Trạng thái</label>
                  <Select
                    placeholder="Chọn trạng thái"
                    selectedKeys={selectedStatus === "all" ? [] : [selectedStatus]}
                    onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] || "all")}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#00CCFF]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="all">Tất cả</SelectItem>
                    <SelectItem key="ongoing">Đang tiếp tục</SelectItem>
                    <SelectItem key="completed">Hoàn thành</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Sắp xếp theo</label>
                  <Select
                    placeholder="Chọn sắp xếp"
                    selectedKeys={[sortBy]}
                    onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                    classNames={{
                      trigger: "bg-white/5 border border-white/10 hover:border-[#00CCFF]/50",
                      value: "text-white",
                      popoverContent: "bg-gray-900 border border-white/10"
                    }}
                  >
                    <SelectItem key="rating">Đánh giá cao</SelectItem>
                    <SelectItem key="views">Lượt xem</SelectItem>
                    <SelectItem key="chapters">Số chương</SelectItem>
                    <SelectItem key="title">Tên A-Z</SelectItem>
                    <SelectItem key="year">Năm phát hành</SelectItem>
                  </Select>
                </div>

                <Button 
                  size="sm" 
                  variant="flat"
                  className="w-full bg-white/5 text-gray-400 hover:text-white"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("all");
                    setSelectedStatus("all");
                    setSortBy("rating");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </CardBody>
            </Card>

            {/* Top Authors */}
            <Card className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 backdrop-blur-xl border border-[#ADF709]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#ADF709]" />
                  Tác Giả Nổi Bật
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {topAuthors.map((author, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <Avatar src={author.avatar} alt={author.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold line-clamp-1">{author.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{author.works} tác phẩm</span>
                          <span>•</span>
                          <span>{author.followers}</span>
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
                  {filteredManga.length} <span className="text-gray-400 font-normal">kết quả</span>
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
                  className={viewMode === "grid" ? "bg-gradient-to-r from-[#00CCFF] to-[#ADF709]" : "text-gray-400"}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "flat"}
                  color={viewMode === "list" ? "primary" : "default"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gradient-to-r from-[#00CCFF] to-[#ADF709]" : "text-gray-400"}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Manga Grid/List */}
            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="bg-white/5 backdrop-blur">
                    <CardBody className="p-0">
                      <Skeleton className={viewMode === "grid" ? "h-80 w-full rounded-t-lg" : "h-32 w-full"} />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : filteredManga.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-400 mb-6">Thử thay đổi từ khóa hoặc bộ lọc</p>
                <Button
                  color="primary"
                  className="bg-gradient-to-r from-[#00CCFF] to-[#ADF709]"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("all");
                    setSelectedStatus("all");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                  {getCurrentPageItems().map((manga) => (
                    <Card
                      key={manga.id}
                      className={`bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00CCFF]/50 transition-all group cursor-pointer ${
                        viewMode === "list" ? "flex-row" : ""
                      }`}
                    >
                      <CardBody className={`p-0 ${viewMode === "list" ? "flex flex-row" : ""}`}>
                        
                        {/* Image */}
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 flex-shrink-0" : "h-72"}`}>
                          <Image
                            src={manga.image}
                            alt={manga.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          {/* Bookmark button */}
                          <button
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(manga.id);
                            }}
                          >
                            {manga.bookmark ? (
                              <BookmarkIconSolid className="w-4 h-4 text-[#F3ADC3]" />
                            ) : (
                              <BookmarkIconOutline className="w-4 h-4 text-white" />
                            )}
                          </button>

                          {/* Status badge */}
                          <div className="absolute bottom-3 left-3">
                            <Chip
                              size="sm"
                              className={manga.status === "Ongoing" ? "bg-[#ADF709] text-white" : "bg-[#F3ADC3] text-white"}
                            >
                              {manga.status === "Ongoing" ? "Đang tiếp tục" : "Hoàn thành"}
                            </Chip>
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                          {/* Title & Rating */}
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-bold text-lg line-clamp-2 flex-1 group-hover:text-[#00CCFF] transition-colors">
                              {manga.title}
                            </h3>
                            <div className="flex items-center gap-1 ml-2">
                              <StarIcon className="w-4 h-4 text-[#ADF709] fill-current" />
                              <span className="text-white font-semibold text-sm">{manga.rating}</span>
                            </div>
                          </div>

                          {/* Author */}
                          <p className="text-gray-400 text-sm mb-2">{manga.author}</p>

                          {/* Description */}
                          {viewMode === "grid" && (
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{manga.description}</p>
                          )}

                          {/* Genres */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {manga.genres.slice(0, 3).map((genre) => (
                              <Chip key={genre} size="sm" variant="flat" className="bg-white/5 text-gray-400 text-xs">
                                {genre}
                              </Chip>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpenIcon className="w-4 h-4" />
                              {manga.chapters}
                            </span>
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              {(manga.views / 1000000).toFixed(1)}M
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {manga.year}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-[#00CCFF] to-[#ADF709] text-white font-semibold"
                            >
                              Đọc Ngay
                            </Button>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button 
                                  isIconOnly 
                                  size="sm" 
                                  variant="flat"
                                  className="bg-white/5 text-white"
                                >
                                  ⋮
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu 
                                className="bg-gray-900 border border-white/10"
                                aria-label="Manga actions"
                              >
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
                        cursor: "bg-gradient-to-r from-[#00CCFF] to-[#ADF709] text-white"
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}