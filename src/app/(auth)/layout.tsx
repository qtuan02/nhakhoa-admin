import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    icons: {
        icon: "/logo.png"
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen">
            {children}
        </div>
    );
}