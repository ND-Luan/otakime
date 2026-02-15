'use client'

import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Select,
  SelectItem,
  Chip,
  Image,
  Skeleton,
  Avatar,
  AvatarGroup,
  Divider,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  CheckBadgeIcon,
  EyeIcon,
  HeartIcon as HeartIconOutline,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon as BookmarkIconOutline
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from "@heroicons/react/24/solid";

// Mock data
const categories = [
  { id: "all", name: "Tất cả", count: 156, icon: NewspaperIcon, color: "from-gray-600 to-gray-700" },
  { id: "reviews", name: "Review", count: 45, icon: StarIcon, color: "from-[#ADF709] to-[#00CCFF]" },
  { id: "news", name: "Tin tức", count: 38, icon: FireIcon, color: "from-[#F3ADC3] to-[#ADF709]" },
  { id: "guides", name: "Hướng dẫn", count: 32, icon: BookmarkIconOutline, color: "from-[#00CCFF] to-[#F3ADC3]" },
  { id: "interviews", name: "Phỏng vấn", count: 28, icon: ChatBubbleLeftRightIcon, color: "from-[#ADF709] to-[#00CCFF]" },
  { id: "analysis", name: "Phân tích", count: 13, icon: SparklesIcon, color: "from-[#F3ADC3] to-[#00CCFF]" }
];

const featuredPosts = [
  {
    id: 1,
    title: "Top 10 Manga Hay Nhất 2024: Từ Shonen Đến Seinen",
    excerpt: "Khám phá những bộ manga xuất sắc nhất năm 2024 với những câu chuyện đầy cảm xúc và hình ảnh tuyệt đẹp.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    author: "Minh Tran",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-15",
    readTime: "8 phút",
    category: "reviews",
    tags: ["Top 10", "Manga 2024", "Review"],
    views: 15420,
    likes: 234,
    comments: 89,
    featured: true
  },
  {
    id: 2,
    title: "Studio Ghibli Công Bố Dự Án Phim Mới: 'The Boy and the Heron'",
    excerpt: "Miyazaki trở lại với tác phẩm mới đầy bí ẩn và ma thuật, hứa hẹn mang đến những cảm xúc sâu sắc.",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&h=400&fit=crop",
    author: "Linh Nguyen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-12",
    readTime: "5 phút",
    category: "news",
    tags: ["Studio Ghibli", "Miyazaki", "Tin tức"],
    views: 12800,
    likes: 189,
    comments: 67,
    featured: true
  }
];

const blogPosts = [
  {
    id: 3,
    title: "Hướng Dẫn Bắt Đầu Đọc Manga Cho Người Mới",
    excerpt: "Những lời khuyên hữu ích và danh sách manga dành cho những ai mới bắt đầu hành trình khám phá thế giới manga.",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=250&fit=crop",
    author: "Duc Le",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-10",
    readTime: "6 phút",
    category: "guides",
    tags: ["Hướng dẫn", "Manga", "Người mới"],
    views: 8500,
    likes: 156,
    comments: 43,
    featured: false
  },
  {
    id: 4,
    title: "Phân Tích Sâu: Tại Sao Attack on Titan Lại Gây Tranh Cãi?",
    excerpt: "Khám phá những yếu tố khiến Attack on Titan trở thành bộ manga gây tranh cãi nhất thập kỷ qua.",
    image: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=400&h=250&fit=crop",
    author: "Anh Vu",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-08",
    readTime: "12 phút",
    category: "analysis",
    tags: ["Attack on Titan", "Phân tích", "Tranh cãi"],
    views: 11200,
    likes: 298,
    comments: 156,
    featured: false
  },
  {
    id: 5,
    title: "Phỏng Vấn Độc Quyền: Tác Giả 'Blue Lock' Chia Sẻ Về Tương Lai",
    excerpt: "Cuộc trò chuyện thú vị với Muneyuki Kaneshiro về kế hoạch phát triển Blue Lock và những dự án mới.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    author: "Mai Hoang",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-05",
    readTime: "10 phút",
    category: "interviews",
    tags: ["Blue Lock", "Phỏng vấn", "Tác giả"],
    views: 9800,
    likes: 245,
    comments: 78,
    featured: false
  },
  {
    id: 6,
    title: "Breaking News: One Piece Chính Thức Bước Vào Arc Cuối Cùng",
    excerpt: "Eiichiro Oda xác nhận One Piece sẽ kết thúc trong 3-5 năm tới, khiến fan toàn thế giới dậy sóng.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    author: "Quan Tran",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    publishDate: "2024-01-03",
    readTime: "4 phút",
    category: "news",
    tags: ["One Piece", "Breaking News", "Arc cuối"],
    views: 25600,
    likes: 567,
    comments: 234,
    featured: false
  }
];

const popularTags = [
  { name: "One Piece", count: 45 },
  { name: "Attack on Titan", count: 38 },
  { name: "Jujutsu Kaisen", count: 32 },
  { name: "Review", count: 67 },
  { name: "Tin tức", count: 54 }
];

const topAuthors = [
  {
    name: "Minh Tran",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    posts: 23,
    followers: "12.5K",
    verified: true
  },
  {
    name: "Linh Nguyen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
    posts: 18,
    followers: "8.9K",
    verified: true
  },
  {
    name: "Duc Le",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    posts: 15,
    followers: "6.2K",
    verified: false
  }
];

const trendingTopics = [
  { name: "One Piece Final Arc", trend: "+125%" },
  { name: "Studio Ghibli 2024", trend: "+89%" },
  { name: "Manga vs Anime", trend: "+67%" }
];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [filteredPosts, setFilteredPosts] = useState([...featuredPosts, ...blogPosts]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let allPosts = [...featuredPosts, ...blogPosts];
    let filtered = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest": return new Date(b.publishDate) - new Date(a.publishDate);
        case "popular": return b.views - a.views;
        case "likes": return b.likes - a.likes;
        case "comments": return b.comments - a.comments;
        default: return 0;
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openPostDetail = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const getCategoryGradient = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || "from-gray-600 to-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">

      {/* Compact Hero */}
      <div className="relative bg-gradient-to-r from-[#ADF709]/10 via-[#00CCFF]/10 to-[#F3ADC3]/10 border-b border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <NewspaperIcon className="w-10 h-10 text-[#ADF709]" />
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ADF709] via-[#00CCFF] to-[#F3ADC3] bg-clip-text text-transparent">
                  Blog Otaku
                </h1>
              </div>
              <p className="text-gray-400 mb-6 max-w-xl">
                Khám phá tin tức, review và phân tích sâu về thế giới manga & anime
              </p>

              <div className="max-w-xl">
                <Input
                  size="lg"
                  placeholder="Tìm kiếm bài viết, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-white/5 border border-white/10 hover:border-[#ADF709]/50 focus-within:border-[#ADF709]"
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 rounded-xl p-4 border border-[#ADF709]/20 text-center">
                <div className="text-2xl font-black text-[#ADF709]">150+</div>
                <div className="text-xs text-gray-400">Articles</div>
              </div>
              <div className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 rounded-xl p-4 border border-[#00CCFF]/20 text-center">
                <div className="text-2xl font-black text-[#00CCFF]">50K+</div>
                <div className="text-xs text-gray-400">Readers</div>
              </div>
              <div className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 rounded-xl p-4 border border-[#F3ADC3]/20 text-center">
                <div className="text-2xl font-black text-[#F3ADC3]">15</div>
                <div className="text-xs text-gray-400">Authors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        
        {/* Categories */}
        <div className="mb-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} border-2 border-white/30`
                      : "bg-white/5 backdrop-blur-xl border border-white/10"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardBody className="text-center p-3">
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${selectedCategory === category.id ? 'text-white' : 'text-gray-400'}`} />
                    <h3 className={`font-bold text-xs ${selectedCategory === category.id ? 'text-white' : 'text-gray-400'}`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{category.count}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-9">
            
            {/* Featured Posts */}
            {selectedCategory === "all" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FireIcon className="w-7 h-7 text-[#F3ADC3]" />
                  Nổi Bật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#F3ADC3]/50 transition-all group cursor-pointer overflow-hidden"
                      onClick={() => openPostDetail(post)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        <div className="absolute top-3 right-3">
                          <Chip size="sm" className="bg-[#F3ADC3] text-white font-bold">
                            <FireIcon className="w-3 h-3 inline mr-1" />
                            Hot
                          </Chip>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-300">
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-3 h-3" />
                              {(post.views / 1000).toFixed(1)}K
                            </span>
                            <span className="flex items-center gap-1">
                              <HeartIconOutline className="w-3 h-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-semibold">
                  {filteredPosts.length} <span className="text-gray-400 font-normal">bài viết</span>
                  {searchQuery && <span className="text-gray-400 font-normal"> cho "{searchQuery}"</span>}
                </p>
              </div>
              <Select
                placeholder="Sắp xếp"
                selectedKeys={[sortBy]}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                className="min-w-[150px]"
                size="sm"
                classNames={{
                  trigger: "bg-white/5 border border-white/10",
                  value: "text-white",
                  popoverContent: "bg-gray-900 border border-white/10"
                }}
              >
                <SelectItem key="latest">Mới nhất</SelectItem>
                <SelectItem key="popular">Phổ biến</SelectItem>
                <SelectItem key="likes">Nhiều like</SelectItem>
                <SelectItem key="comments">Nhiều bình luận</SelectItem>
              </Select>
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: itemsPerPage }).map((_, i) => (
                  <Card key={i} className="bg-white/5 backdrop-blur">
                    <CardBody className="p-0">
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <NewspaperIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy bài viết</h3>
                <p className="text-gray-400 mb-6">Thử thay đổi từ khóa tìm kiếm</p>
                <Button
                  className="bg-gradient-to-r from-[#ADF709] to-[#00CCFF]"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCurrentPageItems().map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00CCFF]/50 transition-all group cursor-pointer"
                      onClick={() => openPostDetail(post)}
                    >
                      <CardBody className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Chip
                              size="sm"
                              className={`bg-gradient-to-r ${getCategoryGradient(post.category)} text-white font-semibold`}
                            >
                              {categories.find(c => c.id === post.category)?.name}
                            </Chip>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#00CCFF] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Chip key={tag} size="sm" variant="flat" className="bg-white/5 text-gray-400 text-xs">
                                {tag}
                              </Chip>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2">
                              <Avatar src={post.authorAvatar} alt={post.author} size="sm" />
                              <div>
                                <p className="text-white text-xs font-semibold">{post.author}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <CalendarIcon className="w-3 h-3" />
                                  {formatDate(post.publishDate)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <EyeIcon className="w-3 h-3" />
                                  {(post.views / 1000).toFixed(1)}K
                                </span>
                                <span className="flex items-center gap-1">
                                  <HeartIconOutline className="w-3 h-3" />
                                  {post.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>

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
                        cursor: "bg-gradient-to-r from-[#ADF709] to-[#00CCFF] text-white"
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Top Authors */}
            <Card className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 backdrop-blur-xl border border-[#00CCFF]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#00CCFF]" />
                  Tác Giả Nổi Bật
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {topAuthors.map((author, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="relative">
                        <Avatar src={author.avatar} alt={author.name} size="sm" />
                        {author.verified && (
                          <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-4 h-4 text-[#00CCFF]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold line-clamp-1">{author.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{author.posts} bài</span>
                          <span>•</span>
                          <span>{author.followers}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 backdrop-blur-xl border border-[#ADF709]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-[#ADF709]" />
                  Tags Phổ Biến
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      size="sm"
                      variant="flat"
                      className="bg-white/5 text-gray-300 hover:bg-white/10 cursor-pointer"
                      onClick={() => setSearchQuery(tag.name)}
                    >
                      {tag.name} ({tag.count})
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 backdrop-blur-xl border border-[#F3ADC3]/20">
              <CardHeader className="pb-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-[#F3ADC3]" />
                  Trending
                </h3>
              </CardHeader>
              <CardBody className="pt-4">
                <div className="space-y-3">
                  {trendingTopics.map((topic, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white text-sm font-semibold mb-1">{topic.name}</h4>
                      <span className="text-[#ADF709] text-xs font-bold">{topic.trend}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </div>

      {/* Modal */}
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
                  <div className="flex items-center gap-2 mb-2">
                    <Chip
                      size="sm"
                      className={`bg-gradient-to-r ${getCategoryGradient(selectedPost?.category)} text-white`}
                    >
                      {categories.find(c => c.id === selectedPost?.category)?.name}
                    </Chip>
                    {selectedPost?.featured && (
                      <Chip size="sm" className="bg-[#F3ADC3] text-white">
                        <FireIcon className="w-3 h-3 inline mr-1" />
                        Hot
                      </Chip>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedPost?.title}</h2>
                  <p className="text-gray-400 text-sm mt-2">{selectedPost?.excerpt}</p>
                </div>
              </ModalHeader>
              <ModalBody>
                {selectedPost && (
                  <div className="space-y-6">
                    <Image
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-80 object-cover rounded-lg"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={selectedPost.authorAvatar} alt={selectedPost.author} size="md" />
                        <div>
                          <h4 className="text-white font-semibold">{selectedPost.author}</h4>
                          <p className="text-gray-400 text-sm">{formatDate(selectedPost.publishDate)} • {selectedPost.readTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          {selectedPost.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <HeartIconOutline className="w-4 h-4" />
                          {selectedPost.likes}
                        </span>
                      </div>
                    </div>

                    <Divider className="bg-white/10" />

                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">{selectedPost.excerpt}</p>
                      <p className="text-gray-300 leading-relaxed mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2 text-sm">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag) => (
                          <Chip key={tag} size="sm" variant="flat" className="bg-white/5 text-gray-300">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="bg-white/5 text-white">
                  Đóng
                </Button>
                <Button className="bg-gradient-to-r from-[#ADF709] to-[#00CCFF] text-white">
                  Đọc Đầy Đủ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}