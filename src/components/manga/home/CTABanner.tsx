'use client'

import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";
import { RocketLaunchIcon, SparklesIcon, UserGroupIcon, BookOpenIcon, ClockIcon } from "@heroicons/react/24/solid";

export default function CTABanner() {
    const router = useRouter();

    return (
        <section>
            <Card className="bg-gradient-to-r from-[#00CCFF] via-[#F3ADC3] to-[#ADF709] border-none overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
                        }}
                    />
                </div>

                <CardBody className="relative z-10 py-16 px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <h2 className="text-5xl font-black text-white">
                                Tham Gia Cộng Đồng
                            </h2>
                            <SparklesIcon className="w-12 h-12 text-[#ADF709] animate-pulse" />
                        </div>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Hơn <span className="font-bold text-[#ADF709]">1 triệu người đọc</span> đã tin tưởng.
                            Khám phá hàng ngàn tác phẩm manga, anime, và light novel được cập nhật mỗi ngày!
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                                <UserGroupIcon className="w-8 h-8 text-white mx-auto mb-2" />
                                <div className="text-3xl font-black text-white mb-1">1M+</div>
                                <div className="text-white/80 text-sm">Thành Viên</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                                <BookOpenIcon className="w-8 h-8 text-white mx-auto mb-2" />
                                <div className="text-3xl font-black text-white mb-1">3K+</div>
                                <div className="text-white/80 text-sm">Tác Phẩm</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                                <ClockIcon className="w-8 h-8 text-white mx-auto mb-2" />
                                <div className="text-3xl font-black text-white mb-1">24/7</div>
                                <div className="text-white/80 text-sm">Cập Nhật</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-[#00CCFF] font-black px-10 text-lg hover:scale-105 transition-transform shadow-2xl"
                                startContent={<RocketLaunchIcon className="w-5 h-5" />}
                                onClick={() => router.push("/manga")}
                            >
                                Khám Phá Ngay
                            </Button>
                            <Button
                                size="lg"
                                variant="bordered"
                                className="border-2 border-white text-white font-bold px-10 text-lg hover:bg-white/10 backdrop-blur"
                                startContent={<SparklesIcon className="w-5 h-5" />}
                                onClick={() => router.push("/register")}
                            >
                                Premium
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}