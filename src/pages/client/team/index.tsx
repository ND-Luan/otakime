'use client'

import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Chip,
  Image,
  Avatar,
  AvatarGroup,
  Tabs,
  Tab,
  Progress
} from "@heroui/react";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BoltIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon,
  BookmarkIcon
} from "@heroicons/react/24/solid";

// Mock data
const teams = [
  {
    id: 1,
    name: "Dragon Scans",
    avatar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop",
    description: "Team chuyên dịch manga chất lượng cao với tốc độ nhanh nhất",
    memberCount: 15,
    projectsCount: 45,
    followers: 125000,
    status: "active",
    verified: true,
    specialties: ["Action", "Adventure", "Shounen"],
    stats: {
      chaptersReleased: 1250,
      avgQuality: 9.8,
      avgSpeed: 4.5, // days
      completionRate: 95
    },
    members: [
      { name: "Leader", role: "Team Leader", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      { name: "Translator", role: "Translator", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      { name: "Editor", role: "Editor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["One Piece", "Jujutsu Kaisen", "Blue Lock"],
    joinedDate: "2020-01-15",
    socialLinks: {
      discord: "https://discord.gg/dragonscans",
      facebook: "https://facebook.com/dragonscans"
    },
    rating: 9.8,
    trending: true
  },
  {
    id: 2,
    name: "Phoenix Subs",
    avatar: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=300&fit=crop",
    description: "Đội ngũ phụ đề anime chuyên nghiệp, tập trung vào chất lượng",
    memberCount: 12,
    projectsCount: 38,
    followers: 98000,
    status: "active",
    verified: true,
    specialties: ["Romance", "Drama", "Slice of Life"],
    stats: {
      chaptersReleased: 980,
      avgQuality: 9.5,
      avgSpeed: 3.8,
      completionRate: 92
    },
    members: [
      { name: "Admin", role: "Admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { name: "Timer", role: "Timer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["Your Name", "Weathering With You", "Demon Slayer"],
    joinedDate: "2019-06-20",
    socialLinks: {
      discord: "https://discord.gg/phoenixsubs",
      facebook: "https://facebook.com/phoenixsubs"
    },
    rating: 9.5,
    trending: true
  },
  {
    id: 3,
    name: "Thunder Team",
    avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=300&fit=crop",
    description: "Nhóm dịch nhanh, chuyên các series hot trending",
    memberCount: 20,
    projectsCount: 52,
    followers: 156000,
    status: "active",
    verified: true,
    specialties: ["Action", "Supernatural", "Horror"],
    stats: {
      chaptersReleased: 1580,
      avgQuality: 9.2,
      avgSpeed: 2.5,
      completionRate: 88
    },
    members: [
      { name: "Boss", role: "Founder", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["Chainsaw Man", "Hell's Paradise", "Tokyo Ghoul"],
    joinedDate: "2021-03-10",
    socialLinks: {
      discord: "https://discord.gg/thunderteam"
    },
    rating: 9.2,
    trending: true
  },
  {
    id: 4,
    name: "Sakura Fansub",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop",
    description: "Team lâu đời, kinh nghiệm dày dặn trong làng sub Việt",
    memberCount: 18,
    projectsCount: 65,
    followers: 210000,
    status: "active",
    verified: true,
    specialties: ["Romance", "Comedy", "School Life"],
    stats: {
      chaptersReleased: 2100,
      avgQuality: 9.6,
      avgSpeed: 4.0,
      completionRate: 94
    },
    members: [
      { name: "Sakura", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["Kaguya-sama", "Horimiya", "My Dress-Up Darling"],
    joinedDate: "2018-01-05",
    socialLinks: {
      discord: "https://discord.gg/sakurafansub",
      facebook: "https://facebook.com/sakurafansub"
    },
    rating: 9.6,
    trending: false
  },
  {
    id: 5,
    name: "Speed Translators",
    avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=300&fit=crop",
    description: "Tốc độ là thế mạnh, luôn đi đầu với các bản dịch mới nhất",
    memberCount: 25,
    projectsCount: 70,
    followers: 185000,
    status: "active",
    verified: true,
    specialties: ["Action", "Fantasy", "Isekai"],
    stats: {
      chaptersReleased: 2450,
      avgQuality: 8.9,
      avgSpeed: 1.5,
      completionRate: 85
    },
    members: [
      { name: "Speed", role: "Leader", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["Solo Leveling", "The Beginning After The End", "Omniscient Reader"],
    joinedDate: "2020-08-12",
    socialLinks: {
      discord: "https://discord.gg/speedtrans"
    },
    rating: 8.9,
    trending: false
  },
  {
    id: 6,
    name: "Elite Scans",
    avatar: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=800&h=300&fit=crop",
    description: "Chất lượng là ưu tiên hàng đầu, chỉnh sửa tỉ mỉ từng chi tiết",
    memberCount: 10,
    projectsCount: 25,
    followers: 87000,
    status: "active",
    verified: false,
    specialties: ["Drama", "Mystery", "Thriller"],
    stats: {
      chaptersReleased: 650,
      avgQuality: 9.7,
      avgSpeed: 5.5,
      completionRate: 97
    },
    members: [
      { name: "Elite", role: "QC Lead", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }
    ],
    recentProjects: ["Monster", "Death Note", "Erased"],
    joinedDate: "2021-11-20",
    socialLinks: {
      facebook: "https://facebook.com/elitescans"
    },
    rating: 9.7,
    trending: false
  }
];

const achievements = [
  { icon: TrophyIcon, label: "Top Team 2024", color: "text-[#ADF709]" },
  { icon: FireIcon, label: "Most Active", color: "text-[#F3ADC3]" },
  { icon: StarIcon, label: "Highest Quality", color: "text-[#00CCFF]" },
  { icon: BoltIcon, label: "Fastest Release", color: "text-[#ADF709]" }
];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = selectedTab === "all" || 
      (selectedTab === "trending" && team.trending) ||
      (selectedTab === "verified" && team.verified);
    
    return matchesSearch && matchesTab;
  });

  const totalStats = {
    teams: teams.length,
    members: teams.reduce((sum, t) => sum + t.memberCount, 0),
    projects: teams.reduce((sum, t) => sum + t.projectsCount, 0),
    followers: teams.reduce((sum, t) => sum + t.followers, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#ADF709]/10 via-[#00CCFF]/10 to-[#F3ADC3]/10 border-b border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left - Title & Description */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <UserGroupIcon className="w-10 h-10 text-[#00CCFF]" />
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ADF709] via-[#00CCFF] to-[#F3ADC3] bg-clip-text text-transparent">
                  Teams Đang Hoạt Động
                </h1>
              </div>
              <p className="text-gray-400 mb-6 max-w-xl">
                Khám phá và theo dõi các team fansub, scanlation đang hoạt động tích cực
              </p>

              {/* Search */}
              <div className="max-w-xl">
                <Input
                  size="lg"
                  placeholder="Tìm kiếm team, thể loại..."
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

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#ADF709]/20 to-[#ADF709]/5 rounded-xl p-4 border border-[#ADF709]/20 text-center">
                <div className="text-2xl font-black text-[#ADF709]">{totalStats.teams}</div>
                <div className="text-xs text-gray-400">Teams</div>
              </div>
              <div className="bg-gradient-to-br from-[#00CCFF]/20 to-[#00CCFF]/5 rounded-xl p-4 border border-[#00CCFF]/20 text-center">
                <div className="text-2xl font-black text-[#00CCFF]">{totalStats.members}</div>
                <div className="text-xs text-gray-400">Members</div>
              </div>
              <div className="bg-gradient-to-br from-[#F3ADC3]/20 to-[#F3ADC3]/5 rounded-xl p-4 border border-[#F3ADC3]/20 text-center">
                <div className="text-2xl font-black text-[#F3ADC3]">{totalStats.projects}</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="bg-gradient-to-br from-[#ADF709]/20 to-[#00CCFF]/20 rounded-xl p-4 border border-[#00CCFF]/20 text-center">
                <div className="text-2xl font-black text-[#00CCFF]">{(totalStats.followers / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        
        {/* Achievements Banner */}
        <Card className="bg-gradient-to-r from-[#ADF709]/10 via-[#00CCFF]/10 to-[#F3ADC3]/10 border border-white/10 mb-8">
          <CardBody className="p-6">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                    <span className="text-white font-semibold">{achievement.label}</span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Tabs */}
        <div className="mb-8">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            variant="underlined"
            classNames={{
              tabList: "gap-8 border-b border-white/10",
              cursor: "bg-gradient-to-r from-[#00CCFF] to-[#ADF709]",
              tab: "text-gray-400 data-[selected=true]:text-white"
            }}
          >
            <Tab key="all" title={
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-4 h-4" />
                <span>Tất cả ({teams.length})</span>
              </div>
            } />
            <Tab key="trending" title={
              <div className="flex items-center gap-2">
                <FireIcon className="w-4 h-4" />
                <span>Trending ({teams.filter(t => t.trending).length})</span>
              </div>
            } />
            <Tab key="verified" title={
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-4 h-4" />
                <span>Verified ({teams.filter(t => t.verified).length})</span>
              </div>
            } />
          </Tabs>
        </div>

        {/* Teams Grid */}
        {filteredTeams.length === 0 ? (
          <div className="text-center py-20">
            <UserGroupIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy team</h3>
            <p className="text-gray-400">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00CCFF]/50 transition-all group overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={team.coverImage}
                    alt={team.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {team.verified && (
                      <Chip size="sm" className="bg-[#00CCFF] text-white">
                        <CheckBadgeIcon className="w-3 h-3 inline mr-1" />
                        Verified
                      </Chip>
                    )}
                    {team.trending && (
                      <Chip size="sm" className="bg-[#F3ADC3] text-white">
                        <FireIcon className="w-3 h-3 inline mr-1" />
                        Hot
                      </Chip>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="absolute -bottom-10 left-6">
                    <Avatar
                      src={team.avatar}
                      alt={team.name}
                      className="w-20 h-20 border-4 border-gray-900"
                      isBordered
                    />
                  </div>
                </div>

                <CardBody className="pt-14 pb-4">
                  {/* Team Info */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00CCFF] transition-colors">
                        {team.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-[#ADF709] fill-current" />
                        <span className="text-white font-semibold text-sm">{team.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{team.description}</p>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {team.specialties.map((specialty) => (
                        <Chip key={specialty} size="sm" variant="flat" className="bg-white/5 text-gray-400">
                          {specialty}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-[#ADF709] font-bold text-sm">{team.memberCount}</div>
                      <div className="text-gray-500 text-xs">Members</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-[#00CCFF] font-bold text-sm">{team.projectsCount}</div>
                      <div className="text-gray-500 text-xs">Projects</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-[#F3ADC3] font-bold text-sm">{(team.followers / 1000).toFixed(0)}K</div>
                      <div className="text-gray-500 text-xs">Followers</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-[#ADF709] font-bold text-sm">{team.stats.avgSpeed}d</div>
                      <div className="text-gray-500 text-xs">Avg Speed</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Completion Rate</span>
                      <span className="text-white font-semibold">{team.stats.completionRate}%</span>
                    </div>
                    <Progress
                      value={team.stats.completionRate}
                      classNames={{
                        indicator: "bg-gradient-to-r from-[#00CCFF] to-[#ADF709]"
                      }}
                      className="h-2"
                    />
                  </div>

                  {/* Members */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AvatarGroup max={3} size="sm">
                        {team.members.map((member, idx) => (
                          <Avatar key={idx} src={member.avatar} alt={member.name} />
                        ))}
                      </AvatarGroup>
                      <span className="text-gray-400 text-sm">+{team.memberCount - 3} members</span>
                    </div>
                  </div>

                  {/* Recent Projects */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Recent Projects:</p>
                    <div className="flex flex-wrap gap-1">
                      {team.recentProjects.slice(0, 3).map((project, idx) => (
                        <Chip key={idx} size="sm" variant="bordered" className="text-xs text-gray-400 border-gray-700">
                          {project}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardBody>

                <CardFooter className="border-t border-white/10 p-4">
                  <div className="flex gap-2 w-full">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#00CCFF] to-[#ADF709] text-white font-semibold"
                    >
                      Theo dõi
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="bg-white/5 text-white"
                      startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                    >
                      Liên hệ
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="bg-white/5 text-white"
                    >
                      <BookmarkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}