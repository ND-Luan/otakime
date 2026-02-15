'use client'

import { useState } from "react";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { TrophyIcon, StarIcon, UsersIcon } from "@heroicons/react/24/solid";

const topRanking = {
    manga: [
        { rank: 1, title: "One Piece", score: 9.8, readers: "2.5M", badge: "👑" },
        { rank: 2, title: "Jujutsu Kaisen", score: 9.2, readers: "1.8M", badge: "🥈" },
        { rank: 3, title: "Chainsaw Man", score: 9.0, readers: "1.5M", badge: "🥉" },
        { rank: 4, title: "My Hero Academia", score: 8.9, readers: "1.3M", badge: "" },
        { rank: 5, title: "Demon Slayer", score: 8.8, readers: "1.2M", badge: "" }
    ],
    anime: [
        { rank: 1, title: "Attack on Titan", score: 9.5, readers: "3.2M", badge: "👑" },
        { rank: 2, title: "Demon Slayer", score: 9.3, readers: "2.8M", badge: "🥈" },
        { rank: 3, title: "Jujutsu Kaisen", score: 9.2, readers: "2.5M", badge: "🥉" },
        { rank: 4, title: "Spy x Family", score: 9.0, readers: "2.1M", badge: "" },
        { rank: 5, title: "Frieren", score: 8.9, readers: "1.9M", badge: "" }
    ]
};

export default function TopRanking() {
    const [selectedTab, setSelectedTab] = useState("manga");

    return (
        <Card className="bg-gradient-to-br from-[#ADF709]/20 to-[#F3ADC3]/20 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-0">
                <div className="w-full">
                    <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                        <TrophyIcon className="w-8 h-8 text-[#ADF709]" />
                        Top Ranking
                    </h2>
                </div>
            </CardHeader>
            <CardBody className="pt-4">
                <Tabs 
                    selectedKey={selectedTab}
                    onSelectionChange={setSelectedTab}
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/20",
                        cursor: "w-full bg-white",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-white text-gray-400 font-bold"
                    }}
                >
                    <Tab key="manga" title="Manga">
                        <div className="space-y-3 pt-4">
                            {topRanking.manga.map((item) => (
                                <Card 
                                    key={item.rank}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                                    onClick={() => {
                                        console.log('Navigate to:', item.title);
                                    }}
                                >
                                    <CardBody className="p-3">
                                        <div className="flex items-center gap-3">
                                            {/* Rank Badge */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                                                item.rank === 1 ? 'bg-gradient-to-br from-[#ADF709] to-[#00CCFF] text-white' :
                                                item.rank === 2 ? 'bg-gradient-to-br from-[#F3ADC3] to-[#ADF709] text-white' :
                                                item.rank === 3 ? 'bg-gradient-to-br from-[#00CCFF] to-[#F3ADC3] text-white' :
                                                'bg-white/10 text-white'
                                            }`}>
                                                {item.badge || item.rank}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-sm line-clamp-1">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <StarIcon className="w-3 h-3 text-[#ADF709]" />
                                                        {item.score}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <UsersIcon className="w-3 h-3" />
                                                        {item.readers}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                    <Tab key="anime" title="Anime">
                        <div className="space-y-3 pt-4">
                            {topRanking.anime.map((item) => (
                                <Card 
                                    key={item.rank}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                                    onClick={() => {
                                        console.log('Navigate to:', item.title);
                                    }}
                                >
                                    <CardBody className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                                                item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                                                item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                                                item.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                                                'bg-white/10 text-white'
                                            }`}>
                                                {item.badge || item.rank}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-sm line-clamp-1">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <StarIcon className="w-3 h-3 text-[#ADF709]" />
                                                        {item.score}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <UsersIcon className="w-3 h-3" />
                                                        {item.readers}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
}