import type { Metadata } from "next";

import dynamic from "next/dynamic";
const AppLayout = dynamic(() => import("@/components/layout/AppLayout"), { ssr: false });

export const metadata: Metadata = {
    title: "Quản trị - Nha khoa OK-Vip",
    icons: {
        icon: "/logo.png"
    }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <AppLayout>{children}</AppLayout>
    );
}
