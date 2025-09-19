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
    Avatar,
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

// Mock data
const categories = [
    { id: "all", name: "Tất cả", count: 156, icon: "📰", color: "default" },
    { id: "reviews", name: "Review", count: 45, icon: "⭐", color: "warning" },
    { id: "news", name: "Tin tức", count: 38, icon: "📢", color: "primary" },
    { id: "guides", name: "Hướng dẫn", count: 32, icon: "📖", color: "success" },
    { id: "interviews", name: "Phỏng vấn", count: 28, icon: "🎤", color: "secondary" },
    { id: "analysis", name: "Phân tích", count: 13, icon: "🔍", color: "danger" }
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
        readTime: "8 phút đọc",
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
        readTime: "5 phút đọc",
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
        readTime: "6 phút đọc",
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
        readTime: "12 phút đọc",
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
        readTime: "10 phút đọc",
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
        readTime: "4 phút đọc",
        category: "news",
        tags: ["One Piece", "Breaking News", "Arc cuối"],
        views: 25600,
        likes: 567,
        comments: 234,
        featured: false
    },
    {
        id: 7,
        title: "Review Chi Tiết: Jujutsu Kaisen Season 2 - Shibuya Arc",
        excerpt: "Đánh giá toàn diện về arc Shibuya trong Jujutsu Kaisen Season 2, từ animation đến storytelling.",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=250&fit=crop",
        author: "Tung Nguyen",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        publishDate: "2024-01-01",
        readTime: "15 phút đọc",
        category: "reviews",
        tags: ["Jujutsu Kaisen", "Review", "Season 2"],
        views: 18400,
        likes: 387,
        comments: 145,
        featured: false
    },
    {
        id: 8,
        title: "Cách Tìm và Đọc Manga Online An Toàn và Hợp Pháp",
        excerpt: "Hướng dẫn chi tiết về các platform đọc manga hợp pháp và cách bảo vệ bản thân khi đọc manga online.",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=250&fit=crop",
        author: "Linh Pham",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
        publishDate: "2023-12-28",
        readTime: "7 phút đọc",
        category: "guides",
        tags: ["Hướng dẫn", "Online", "Hợp pháp"],
        views: 6800,
        likes: 128,
        comments: 34,
        featured: false
    }
];

const popularTags = [
    { name: "One Piece", count: 45 },
    { name: "Attack on Titan", count: 38 },
    { name: "Jujutsu Kaisen", count: 32 },
    { name: "Demon Slayer", count: 29 },
    { name: "Studio Ghibli", count: 25 },
    { name: "Review", count: 67 },
    { name: "Tin tức", count: 54 },
    { name: "Hướng dẫn", count: 41 }
];

const topAuthors = [
    {
        name: "Minh Tran",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        posts: 23,
        followers: "12.5K",
        specialty: "Manga Reviews",
        verified: true
    },
    {
        name: "Linh Nguyen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
        posts: 18,
        followers: "8.9K",
        specialty: "Anime News",
        verified: true
    },
    {
        name: "Duc Le",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        posts: 15,
        followers: "6.2K",
        specialty: "Guides & Tips",
        verified: false
    }
];

const trendingTopics = [
    { name: "One Piece Final Arc", trend: "+125%" },
    { name: "Studio Ghibli 2024", trend: "+89%" },
    { name: "Manga vs Anime", trend: "+67%" },
    { name: "Best Manga 2024", trend: "+54%" },
    { name: "Jujutsu Kaisen", trend: "+42%" }
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
        const timer = setTimeout(() => setLoading(false), 1200);
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

        // Sort
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

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat?.color || "default";
    };

    const getCategoryIcon = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat?.icon || "📰";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop)"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="text-center text-white mb-8">
                        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            📰 Blog Otaku
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Nơi chia sẻ những câu chuyện, tin tức và kiến thức về thế giới manga và anime. 
                            Khám phá những bài viết chất lượng từ cộng đồng yêu thích văn hóa Nhật Bản.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto w-full">
                        <Input
                            size="lg"
                            placeholder="🔍 Tìm kiếm bài viết, tác giả, thẻ..."
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
                {/* Categories */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        📚 Danh Mục Blog
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <Card 
                                key={category.id}
                                className={`cursor-pointer transition-all hover:scale-105 ${
                                    selectedCategory === category.id 
                                        ? "bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-500" 
                                        : "bg-white/10 backdrop-blur-lg border border-white/20"
                                }`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <CardBody className="text-center p-4">
                                    <div className="text-3xl mb-2">{category.icon}</div>
                                    <h3 className="text-white font-bold text-sm">{category.name}</h3>
                                    <p className="text-gray-300 text-xs">{category.count} bài viết</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Featured Posts */}
                {selectedCategory === "all" && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            ⭐ Bài Viết Nổi Bật
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <Card 
                                    key={post.id} 
                                    className="bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all"
                                    onClick={() => openPostDetail(post)}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        
                                        <div className="absolute top-4 left-4">
                                            <Chip 
                                                color={getCategoryColor(post.category)} 
                                                variant="solid" 
                                                size="sm"
                                                className="font-semibold"
                                            >
                                                {getCategoryIcon(post.category)} {categories.find(c => c.id === post.category)?.name}
                                            </Chip>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <Chip color="danger" variant="solid" size="sm">
                                                🔥 NỔI BẬT
                                            </Chip>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">{post.title}</h3>
                                            <p className="text-gray-200 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={post.authorAvatar} alt={post.author} size="sm" />
                                                    <div>
                                                        <p className="text-white text-sm font-semibold">{post.author}</p>
                                                        <p className="text-gray-300 text-xs">{post.readTime}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-300">
                                                    <span>👁️ {post.views.toLocaleString()}</span>
                                                    <span>❤️ {post.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Filter & Sort */}
                <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
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
                            <SelectItem key="latest" value="latest">📅 Mới nhất</SelectItem>
                            <SelectItem key="popular" value="popular">🔥 Phổ biến</SelectItem>
                            <SelectItem key="likes" value="likes">❤️ Nhiều like</SelectItem>
                            <SelectItem key="comments" value="comments">💬 Nhiều bình luận</SelectItem>
                        </Select>
                    </div>
                    
                    <div className="text-gray-300">
                        Tìm thấy <span className="font-bold text-white">{filteredPosts.length}</span> bài viết
                        {searchQuery && ` cho "${searchQuery}"`}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {loading
                                ? Array.from({ length: itemsPerPage }).map((_, i) => (
                                    <Card key={i} className="bg-white/10 backdrop-blur">
                                        <CardBody className="p-0">
                                            <Skeleton className="h-48 w-full" />
                                            <div className="p-4 space-y-3">
                                                <Skeleton className="h-5 w-3/4" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-2/3" />
                                                <div className="flex gap-2">
                                                    <Skeleton className="h-8 w-12 rounded-full" />
                                                    <div className="space-y-1">
                                                        <Skeleton className="h-3 w-16" />
                                                        <Skeleton className="h-3 w-20" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))
                                : getCurrentPageItems().map((post) => (
                                    <Card 
                                        key={post.id} 
                                        className="bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition-all group cursor-pointer"
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
                                                        color={getCategoryColor(post.category)} 
                                                        variant="solid" 
                                                        size="sm"
                                                    >
                                                        {getCategoryIcon(post.category)} {categories.find(c => c.id === post.category)?.name}
                                                    </Chip>
                                                </div>
                                            </div>
                                            
                                            <div className="p-6">
                                                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                                
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <Chip key={tag} size="sm" variant="bordered" className="text-xs text-gray-400 border-gray-600">
                                                            {tag}
                                                        </Chip>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={post.authorAvatar} alt={post.author} size="sm" />
                                                        <div>
                                                            <p className="text-white text-sm font-semibold">{post.author}</p>
                                                            <p className="text-gray-400 text-xs">{formatDate(post.publishDate)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gray-400 text-xs">{post.readTime}</p>
                                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                            <span>👁️ {(post.views / 1000).toFixed(1)}k</span>
                                                            <span>❤️ {post.likes}</span>
                                                        </div>
                                                    </div>
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Top Authors */}
                        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
                            <CardHeader>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    ✍️ Tác Giả Nổi Bật
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    {topAuthors.map((author, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="relative">
                                                <Avatar src={author.avatar} alt={author.name} size="md" />
                                                {author.verified && (
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold flex items-center gap-1">
                                                    {author.name}
                                                    {author.verified && <span className="text-blue-400">✓</span>}
                                                </h4>
                                                <p className="text-gray-400 text-sm">{author.specialty}</p>
                                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                                    <span>📝 {author.posts} bài</span>
                                                    <span>👥 {author.followers}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Popular Tags */}
                        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
                            <CardHeader>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    🏷️ Thẻ Phổ Biến
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag, idx) => (
                                        <Chip
                                            key={idx}
                                            variant="bordered"
                                            className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300 cursor-pointer transition-colors"
                                            onClick={() => setSearchQuery(tag.name)}
                                        >
                                            {tag.name} ({tag.count})
                                        </Chip>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Trending Topics */}
                        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
                            <CardHeader>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    📈 Xu Hướng
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-3">
                                    {trendingTopics.map((topic, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <div>
                                                <h4 className="text-white font-medium text-sm">{topic.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-green-400 text-xs font-semibold">{topic.trend}</span>
                                                    <div className="w-4 h-4 text-green-400">📈</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Newsletter Signup */}
                        <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-lg border border-blue-500/30">
                            <CardBody className="text-center p-6">
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="text-white font-bold text-lg mb-2">Đăng Ký Newsletter</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Nhận thông báo về bài viết mới và tin tức hot nhất về manga & anime
                                </p>
                                <Input
                                    placeholder="Email của bạn..."
                                    size="sm"
                                    className="mb-4"
                                    classNames={{
                                        input: "text-white",
                                        inputWrapper: "bg-white/10 border border-white/20"
                                    }}
                                />
                                <Button color="primary" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                                    🚀 Đăng Ký Ngay
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😢</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy bài viết nào</h3>
                        <p className="text-gray-400 mb-6">Thử thay đổi từ khóa hoặc danh mục tìm kiếm</p>
                        <Button 
                            color="primary" 
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                        >
                            🔄 Xóa bộ lọc
                        </Button>
                    </div>
                )}
            </div>

            {/* Blog Post Detail Modal */}
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                size="4xl"
                backdrop="blur"
                scrollBehavior="inside"
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
                                <div className="flex items-center gap-3 mb-2">
                                    <Chip 
                                        color={getCategoryColor(selectedPost?.category)} 
                                        variant="solid" 
                                        size="sm"
                                    >
                                        {getCategoryIcon(selectedPost?.category)} {categories.find(c => c.id === selectedPost?.category)?.name}
                                    </Chip>
                                    {selectedPost?.featured && (
                                        <Chip color="danger" variant="solid" size="sm">
                                            🔥 NỔI BẬT
                                        </Chip>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold text-white leading-tight">{selectedPost?.title}</h2>
                                <p className="text-gray-400 text-base">{selectedPost?.excerpt}</p>
                            </ModalHeader>
                            <ModalBody>
                                {selectedPost && (
                                    <div className="space-y-6">
                                        {/* Featured Image */}
                                        <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                                            <Image
                                                src={selectedPost.image}
                                                alt={selectedPost.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Author & Meta Info */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Avatar src={selectedPost.authorAvatar} alt={selectedPost.author} size="md" />
                                                <div>
                                                    <h4 className="text-white font-semibold">{selectedPost.author}</h4>
                                                    <p className="text-gray-400 text-sm">{formatDate(selectedPost.publishDate)} • {selectedPost.readTime}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <span>👁️</span>
                                                    <span className="text-sm">{selectedPost.views.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>❤️</span>
                                                    <span className="text-sm">{selectedPost.likes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>💬</span>
                                                    <span className="text-sm">{selectedPost.comments}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Divider className="bg-white/20" />

                                        {/* Content Preview */}
                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-gray-300 leading-relaxed text-base mb-4">
                                                {selectedPost.excerpt}
                                            </p>
                                            <p className="text-gray-300 leading-relaxed text-base mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                            </p>
                                            <p className="text-gray-300 leading-relaxed text-base mb-4">
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                            </p>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <p className="font-semibold text-white mb-3">Thẻ bài viết:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPost.tags.map((tag) => (
                                                    <Chip key={tag} size="sm" variant="bordered" className="text-gray-300 border-gray-600 hover:border-blue-500 cursor-pointer">
                                                        {tag}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                            <div className="flex items-center gap-4">
                                                <Button size="sm" color="danger" variant="flat" startContent="❤️">
                                                    Yêu thích ({selectedPost.likes})
                                                </Button>
                                                <Button size="sm" color="primary" variant="flat" startContent="💬">
                                                    Bình luận ({selectedPost.comments})
                                                </Button>
                                            </div>
                                            <Button size="sm" variant="ghost" className="text-gray-400" startContent="🔗">
                                                Chia sẻ
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" className="bg-gradient-to-r from-green-600 to-blue-600">
                                    📖 Đọc Bài Viết Đầy Đủ
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Call to Action */}
            <div className="container mx-auto px-6 pb-16">
                <Card className="bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-white/20 p-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Tham Gia Cộng Đồng Blog Otaku 📝
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Chia sẻ kiến thức, trải nghiệm và góc nhìn của bạn về thế giới manga và anime. 
                            Trở thành một phần của cộng đồng yêu thích văn hóa Nhật Bản!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                size="lg" 
                                color="primary" 
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:scale-105 transition-transform font-semibold px-8"
                                startContent="✍️"
                            >
                                Viết Bài Blog
                            </Button>
                            <Button 
                                size="lg" 
                                variant="bordered" 
                                className="border-white text-white hover:bg-white/10 px-8"
                                startContent="👥"
                            >
                                Tham Gia Cộng Đồng
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}