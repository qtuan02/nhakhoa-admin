import type { Metadata } from "next";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('@/components/layout/Index'), { ssr: false });

export const metadata: Metadata = {
    title: "Quản trị - Nha khoa OK-Vip",
    icons: {
        icon: "/logo.png"
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Layout>{children}</Layout>
    );
}
