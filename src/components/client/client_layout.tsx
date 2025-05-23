"use client"
import React from "react";

import { HeroUIProvider } from '@heroui/react';

import Footer from "./footer";
import Header from "./header";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}

export default function ClientLayout({ children }: TypeClientLayout) {
    return (
        <Providers>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </Providers>
    );
}

type TypeClientLayout = {
    children: React.ReactNode
}