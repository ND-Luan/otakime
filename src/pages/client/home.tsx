'use client'

import { 
    CTABanner, 
    HeroSlider, 
    QuickAccessCard, 
    RecentUpdate, 
    TopRanking, 
    TrendingToday 
} from "@/components/manga/home";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">

            {/* Hero Section */}
            <HeroSlider />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 py-16 space-y-20">

                {/* Quick Access Cards */}
                <QuickAccessCard />

                {/* Trending Today */}
                <TrendingToday />

                {/* Recent Updates & Top Ranking */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Updates - 2/3 width */}
                    <div className="lg:col-span-2">
                        <RecentUpdate />
                    </div>

                    {/* Top Ranking - 1/3 width */}
                    <div>
                        <TopRanking />
                    </div>
                </section>

                {/* Call to Action Banner */}
                <CTABanner />

            </div>
        </div>
    );
}