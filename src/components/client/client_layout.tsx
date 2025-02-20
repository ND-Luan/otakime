"use client"

import React from "react";

import { HeroUIProvider } from '@heroui/react';

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
            <header>Header của Client</header>
            <main>{children}</main>
            <footer>Footer của Client</footer>
        </Providers>
    );
}

type TypeClientLayout = {
    children: React.ReactNode
}