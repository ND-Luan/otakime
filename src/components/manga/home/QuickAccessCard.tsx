'use client'

import { Card, CardBody } from "@heroui/react";
import { BookOpenIcon, FilmIcon, TvIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

const quickAccess = [
    { 
        icon: BookOpenIcon, 
        label: "Manga", 
        count: "1,250+", 
        color: "primary", 
        gradient: "from-[#ADF709] to-[#00CCFF]" 
    },
    { 
        icon: FilmIcon, 
        label: "Movies", 
        count: "340+", 
        color: "secondary", 
        gradient: "from-[#F3ADC3] to-[#ADF709]" 
    },
    { 
        icon: TvIcon, 
        label: "Anime", 
        count: "890+", 
        color: "success", 
        gradient: "from-[#00CCFF] to-[#F3ADC3]" 
    },
    { 
        icon: DocumentTextIcon, 
        label: "Light Novel", 
        count: "520+", 
        color: "warning", 
        gradient: "from-[#ADF709] via-[#00CCFF] to-[#F3ADC3]" 
    }
];

export default function QuickAccessCard() {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickAccess.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <Card 
                            key={idx}
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all hover:scale-105 cursor-pointer"
                            onClick={() => {
                                console.log('Navigate to:', item.label);
                            }}
                        >
                            <CardBody className="text-center py-8">
                                <div className={`inline-flex items-center justify-center w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br ${item.gradient}`}>
                                    <IconComponent className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-1">{item.label}</h3>
                                <p className="text-gray-400 font-semibold">{item.count}</p>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}