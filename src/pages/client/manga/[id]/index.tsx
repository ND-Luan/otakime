'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button, Chip, Image, Card, CardBody,
    Progress, Avatar, Tabs, Tab
} from "@heroui/react";
import {
    StarIcon, BookOpenIcon, EyeIcon, HeartIcon,
    BookmarkIcon, ShareIcon, PlayIcon, ClockIcon,
    ChevronDownIcon, ChevronUpIcon, UserIcon,
    FireIcon, ArrowLeftIcon, CheckIcon
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

/* ─── Mock data ─── */
const manga = {
    slug: "one-piece",
    title: "One Piece",
    altTitle: "ワンピース",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=580&fit=crop",
    banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=500&fit=crop",
    rating: 9.8,
    totalVotes: 248500,
    status: "Đang phát hành",
    type: "Manga",
    author: "Eiichiro Oda",
    artist: "Eiichiro Oda",
    publisher: "Shueisha",
    serialized: "Weekly Shōnen Jump",
    released: "1997",
    views: "125.4M",
    followers: "2.5M",
    totalChapters: 1107,
    genres: ["Phiêu lưu", "Hành động", "Hài hước", "Fantasy", "Shounen"],
    description: `Gol D. Roger là Vua hải tặc, người mạnh nhất và khét tiếng nhất từng đi biển. Trước khi bị xử tử, những lời cuối của ông đã thay đổi thế giới: "Kho báu của tôi ư? Ta đã để lại tất cả ở đó. Hãy tìm nó đi!"\n\nNhững lời này đã châm ngòi cho Thời đại hải tặc vĩ đại. Monkey D. Luffy, một cậu bé với ước mơ trở thành Vua hải tặc, bắt đầu hành trình của mình từ East Blue. Cùng với băng Mũ Rơm ngày càng lớn mạnh, Luffy khám phá những bí mật sâu thẳm của thế giới và chiến đấu với những kẻ thù mạnh nhất.`,
    ratingBreakdown: [
        { stars: 5, percent: 82 },
        { stars: 4, percent: 12 },
        { stars: 3, percent: 4 },
        { stars: 2, percent: 1 },
        { stars: 1, percent: 1 },
    ]
};

const chapters = Array.from({ length: 20 }, (_, i) => ({
    id: 1107 - i,
    title: `Chapter ${1107 - i}${i === 0 ? ": Luffy's Dream" : i === 1 ? ": The Final War" : ""}`,
    date: i === 0 ? "2 giờ trước" : i === 1 ? "1 tuần trước" : `${i + 1} tuần trước`,
    isNew: i === 0,
    isRead: i > 4,
}));

const related = [
    { slug: "naruto",        title: "Naruto",         cover: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=200&h=280&fit=crop", rating: 9.1 },
    { slug: "bleach",        title: "Bleach",          cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=280&fit=crop", rating: 8.9 },
    { slug: "fairy-tail",    title: "Fairy Tail",      cover: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=200&h=280&fit=crop", rating: 8.7 },
    { slug: "dragon-ball",   title: "Dragon Ball",     cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=280&fit=crop", rating: 9.3 },
    { slug: "hunter-x-hunter", title: "Hunter x Hunter", cover: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=280&fit=crop", rating: 9.4 },
];

const comments = [
    { id: 1, user: "AnhTuấn99",   avatar: "AT", time: "3 phút trước",  text: "Chapter này đỉnh vãi!! Oda sensei không bao giờ làm fan thất vọng 🔥", likes: 284, color: "#ADF709" },
    { id: 2, user: "MinhKhoa_VN", avatar: "MK", time: "15 phút trước", text: "Cảnh Luffy dùng Gear 5 lần này mới thực sự choáng ngợp. Hype quá trời!", likes: 156, color: "#00CCFF" },
    { id: 3, user: "SakuraChan",  avatar: "SC", time: "1 giờ trước",   text: "Đã theo dõi OP từ hồi nhỏ, đến giờ vẫn hype như ngày đầu 😭❤️",    likes: 98,  color: "#F3ADC3" },
    { id: 4, user: "DragonSlayer", avatar: "DS", time: "2 giờ trước",  text: "Theory: Joy Boy chính là... thôi để mọi người tự đọc nhé haha",    likes: 72,  color: "#ADF709" },
];

/* ─── Sub-components ─── */
function StatPill({ icon: Icon, value, color }: { icon: any; value: string; color: string }) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Icon className="w-3.5 h-3.5" style={{ color }} />
            <span className="text-white text-xs font-semibold">{value}</span>
        </div>
    );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function MangaDetailPage() {
    const router = useRouter();
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showAllChapters, setShowAllChapters] = useState(false);
    const [activeTab, setActiveTab] = useState("chapters");
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

    const displayedChapters = showAllChapters ? chapters : chapters.slice(0, 8);

    return (
        <div className="min-h-screen bg-[#080a0f] text-white" style={{ fontFamily: "system-ui, sans-serif" }}>

            {/* ── HERO BANNER ── */}
            <div className="relative h-[420px] overflow-hidden">
                {/* blurred bg */}
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: `url(${manga.banner})`, filter: "blur(12px) brightness(0.35)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/80 via-transparent to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => router.push("/manga")}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition text-sm font-medium"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Quay lại
                </button>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-6 pb-0">
                    <div className="flex gap-8 items-end">
                        {/* Cover */}
                        <div className="flex-shrink-0 relative -mb-16">
                            <div
                                className="absolute inset-0 rounded-2xl blur-xl opacity-40"
                                style={{ background: "linear-gradient(135deg,#ADF709,#00CCFF)" }}
                            />
                            <Image
                                src={manga.cover}
                                alt={manga.title}
                                className="relative w-36 h-52 object-cover rounded-2xl shadow-2xl border-2 border-white/10"
                            />
                            {/* Status badge */}
                            <div className="absolute -top-2 -right-2">
                                <Chip size="sm" className="bg-[#ADF709] text-black font-black text-[10px]">
                                    {manga.status}
                                </Chip>
                            </div>
                        </div>

                        {/* Title block */}
                        <div className="pb-4 flex-1 min-w-0">
                            <p className="text-white/40 text-sm mb-1 font-medium tracking-widest">{manga.altTitle}</p>
                            <h1
                                className="text-5xl font-black leading-tight mb-3 truncate"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                {manga.title}
                            </h1>
                            <div className="flex items-center gap-3 flex-wrap">
                                <StatPill icon={StarIcon}     value={`${manga.rating} / 10`} color="#ADF709" />
                                <StatPill icon={EyeIcon}      value={manga.views}              color="#00CCFF" />
                                <StatPill icon={HeartIcon}    value={manga.followers}          color="#F3ADC3" />
                                <StatPill icon={BookOpenIcon} value={`${manga.totalChapters} chương`} color="#ADF709" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN LAYOUT ── */}
            <div className="container mx-auto px-6 pt-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ══ LEFT COLUMN (2/3) ══ */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                size="lg"
                                className="font-black px-8 text-black"
                                style={{ background: "linear-gradient(90deg,#ADF709,#00CCFF)", boxShadow: "0 0 30px #ADF70966" }}
                                startContent={<PlayIcon className="w-5 h-5" />}
                                onClick={() => router.push(`/manga/${manga.slug}/1`)}
                            >
                                Đọc Từ Đầu
                            </Button>
                            <Button
                                size="lg"
                                className="font-black px-8 text-white"
                                style={{ background: "linear-gradient(90deg,#00CCFF,#F3ADC3)" }}
                                startContent={<PlayIcon className="w-5 h-5" />}
                                onClick={() => router.push(`/manga/${manga.slug}/${manga.totalChapters}`)}
                            >
                                Đọc Mới Nhất
                            </Button>
                            <Button
                                size="lg"
                                variant="bordered"
                                className={`font-bold px-6 border-2 transition-all ${isFollowing ? "border-[#F3ADC3] text-[#F3ADC3]" : "border-white/30 text-white hover:border-[#F3ADC3]"}`}
                                startContent={isFollowing ? <CheckIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? "Đang Theo Dõi" : "Theo Dõi"}
                            </Button>
                            <Button
                                size="lg"
                                variant="flat"
                                className="bg-white/10 text-white hover:bg-white/20 font-bold px-6"
                                startContent={<BookmarkIcon className="w-5 h-5" />}
                            >
                                Lưu
                            </Button>
                            <Button
                                isIconOnly
                                size="lg"
                                variant="flat"
                                className="bg-white/10 text-white hover:bg-white/20"
                            >
                                <ShareIcon className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {manga.genres.map((g) => (
                                <Chip
                                    key={g}
                                    className="bg-white/5 border border-white/10 text-white/70 hover:border-[#00CCFF]/60 hover:text-[#00CCFF] cursor-pointer transition-all"
                                    onClick={() => router.push(`/category?genre=${encodeURIComponent(g)}`)}
                                >
                                    {g}
                                </Chip>
                            ))}
                        </div>

                        {/* Description */}
                        <Card className="bg-white/[0.03] border border-white/10">
                            <CardBody className="p-6">
                                <h3 className="text-lg font-black mb-4" style={{ fontFamily: "Georgia, serif" }}>
                                    Nội dung
                                </h3>
                                <div className="relative">
                                    <p
                                        className="text-white/60 leading-relaxed text-sm whitespace-pre-line"
                                        style={{ maxHeight: showFullDesc ? "none" : "100px", overflow: "hidden" }}
                                    >
                                        {manga.description}
                                    </p>
                                    {!showFullDesc && (
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d0f15] to-transparent" />
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowFullDesc(!showFullDesc)}
                                    className="mt-3 flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition"
                                    style={{ color: "#00CCFF" }}
                                >
                                    {showFullDesc ? (
                                        <><ChevronUpIcon className="w-4 h-4" /> Thu gọn</>
                                    ) : (
                                        <><ChevronDownIcon className="w-4 h-4" /> Xem thêm</>
                                    )}
                                </button>
                            </CardBody>
                        </Card>

                        {/* Tabs: Chapters / Comments */}
                        <Card className="bg-white/[0.03] border border-white/10">
                            <CardBody className="p-6">
                                <Tabs
                                    selectedKey={activeTab}
                                    onSelectionChange={(k) => setActiveTab(k as string)}
                                    variant="underlined"
                                    classNames={{
                                        tabList: "gap-8 p-0 border-b border-white/10 mb-6 w-full",
                                        cursor: "w-full",
                                        tab: "px-0 h-12 max-w-fit",
                                        tabContent: "group-data-[selected=true]:text-white text-white/40 font-black text-base"
                                    }}
                                    style={{ "--heroui-primary": "#ADF709" } as any}
                                >
                                    {/* ── CHAPTERS TAB ── */}
                                    <Tab key="chapters" title={`Chương (${manga.totalChapters})`}>
                                        <div className="space-y-2">
                                            {displayedChapters.map((ch) => (
                                                <div
                                                    key={ch.id}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer group ${
                                                        ch.isRead
                                                            ? "bg-white/[0.02] border-white/5 opacity-50 hover:opacity-75"
                                                            : "bg-white/5 border-white/10 hover:border-[#ADF709]/40 hover:bg-white/8"
                                                    }`}
                                                    onClick={() => router.push(`/manga/${manga.slug}/${ch.id}`)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                                                            style={{
                                                                background: ch.isNew ? "linear-gradient(135deg,#ADF709,#00CCFF)" : "rgba(255,255,255,0.05)",
                                                                color: ch.isNew ? "#000" : "rgba(255,255,255,0.4)"
                                                            }}
                                                        >
                                                            {ch.isNew ? <FireIcon className="w-4 h-4" /> : ch.id}
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-semibold ${ch.isRead ? "text-white/40" : "text-white group-hover:text-[#ADF709] transition-colors"}`}>
                                                                {ch.title}
                                                            </p>
                                                            <p className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                                                                <ClockIcon className="w-3 h-3" />
                                                                {ch.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {ch.isNew && <Chip size="sm" className="bg-[#ADF709]/20 text-[#ADF709] border border-[#ADF709]/30 text-[10px] font-black">MỚI</Chip>}
                                                        {ch.isRead && <Chip size="sm" className="bg-white/5 text-white/30 text-[10px]">Đã đọc</Chip>}
                                                        <ArrowRightIcon className="w-4 h-4 text-white/20 group-hover:text-[#ADF709] transition-colors" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Show more chapters */}
                                        <button
                                            className="w-full mt-4 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm font-bold flex items-center justify-center gap-2"
                                            onClick={() => setShowAllChapters(!showAllChapters)}
                                        >
                                            {showAllChapters ? (
                                                <><ChevronUpIcon className="w-4 h-4" /> Thu gọn</>
                                            ) : (
                                                <><ChevronDownIcon className="w-4 h-4" /> Xem tất cả {manga.totalChapters} chương</>
                                            )}
                                        </button>
                                    </Tab>

                                    {/* ── COMMENTS TAB ── */}
                                    <Tab key="comments" title={`Bình luận (${comments.length})`}>
                                        {/* Comment input */}
                                        <div className="flex gap-3 mb-6">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 flex-shrink-0">
                                                <UserIcon className="w-4 h-4 text-white/40" />
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    placeholder="Viết bình luận của bạn..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#00CCFF]/50 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Comments list */}
                                        <div className="space-y-4">
                                            {comments.map((c) => (
                                                <div key={c.id} className="flex gap-3">
                                                    <Avatar
                                                        name={c.avatar}
                                                        className="w-9 h-9 text-xs font-black flex-shrink-0"
                                                        style={{ background: c.color + "33", color: c.color, border: `1px solid ${c.color}44` }}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-bold" style={{ color: c.color }}>{c.user}</span>
                                                            <span className="text-white/30 text-xs flex items-center gap-1">
                                                                <ClockIcon className="w-3 h-3" /> {c.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-white/70 text-sm leading-relaxed">{c.text}</p>
                                                        <button
                                                            className="mt-2 flex items-center gap-1.5 text-xs transition"
                                                            style={{ color: likedComments.has(c.id) ? "#F3ADC3" : "rgba(255,255,255,0.3)" }}
                                                            onClick={() => {
                                                                const next = new Set(likedComments);
                                                                next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                                                                setLikedComments(next);
                                                            }}
                                                        >
                                                            <HeartIcon className="w-3.5 h-3.5" />
                                                            {likedComments.has(c.id) ? c.likes + 1 : c.likes}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab>
                                </Tabs>
                            </CardBody>
                        </Card>
                    </div>

                    {/* ══ RIGHT COLUMN (1/3) ══ */}
                    <div className="space-y-6">

                        {/* Info card */}
                        <Card className="bg-white/[0.03] border border-white/10">
                            <CardBody className="p-6 space-y-4">
                                <h3 className="font-black text-lg" style={{ fontFamily: "Georgia, serif" }}>Thông tin</h3>
                                {[
                                    { label: "Tác giả",      value: manga.author },
                                    { label: "Hoạ sĩ",       value: manga.artist },
                                    { label: "Nhà xuất bản", value: manga.publisher },
                                    { label: "Đăng trên",    value: manga.serialized },
                                    { label: "Năm ra mắt",   value: manga.released },
                                    { label: "Thể loại",     value: manga.type },
                                    { label: "Trạng thái",   value: manga.status },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between items-start text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                        <span className="text-white/40 flex-shrink-0 w-28">{label}</span>
                                        <span className="text-white font-medium text-right">{value}</span>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>

                        {/* Rating breakdown */}
                        <Card className="bg-white/[0.03] border border-white/10">
                            <CardBody className="p-6">
                                <h3 className="font-black text-lg mb-5" style={{ fontFamily: "Georgia, serif" }}>Đánh giá</h3>
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="text-center">
                                        <div
                                            className="text-6xl font-black"
                                            style={{ background: "linear-gradient(135deg,#ADF709,#00CCFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Georgia, serif" }}
                                        >
                                            {manga.rating}
                                        </div>
                                        <div className="flex gap-0.5 justify-center mt-1">
                                            {[1,2,3,4,5].map((s) => (
                                                <StarIcon key={s} className="w-3 h-3" style={{ color: s <= Math.round(manga.rating / 2) ? "#ADF709" : "rgba(255,255,255,0.1)" }} />
                                            ))}
                                        </div>
                                        <p className="text-white/30 text-xs mt-1">{(manga.totalVotes / 1000).toFixed(0)}K đánh giá</p>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        {manga.ratingBreakdown.map(({ stars, percent }) => (
                                            <div key={stars} className="flex items-center gap-2">
                                                <span className="text-white/30 text-xs w-3">{stars}</span>
                                                <Progress
                                                    value={percent}
                                                    size="sm"
                                                    className="flex-1"
                                                    classNames={{ indicator: "bg-gradient-to-r from-[#ADF709] to-[#00CCFF]", track: "bg-white/5" }}
                                                />
                                                <span className="text-white/30 text-xs w-7">{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    className="w-full font-bold text-black"
                                    style={{ background: "linear-gradient(90deg,#ADF709,#00CCFF)" }}
                                >
                                    Đánh giá ngay
                                </Button>
                            </CardBody>
                        </Card>

                        {/* Related manga */}
                        <Card className="bg-white/[0.03] border border-white/10">
                            <CardBody className="p-6">
                                <h3 className="font-black text-lg mb-5" style={{ fontFamily: "Georgia, serif" }}>Có thể bạn thích</h3>
                                <div className="space-y-3">
                                    {related.map((r) => (
                                        <div
                                            key={r.slug}
                                            className="flex gap-3 cursor-pointer group"
                                            onClick={() => router.push(`/manga/${r.slug}`)}
                                        >
                                            <div className="relative flex-shrink-0">
                                                <Image
                                                    src={r.cover}
                                                    alt={r.title}
                                                    className="w-14 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <p className="text-white font-bold text-sm line-clamp-2 group-hover:text-[#00CCFF] transition-colors">
                                                    {r.title}
                                                </p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <StarIcon className="w-3 h-3 text-[#ADF709]" />
                                                    <span className="text-white/40 text-xs">{r.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}