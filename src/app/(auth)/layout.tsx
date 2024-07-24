import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: 'Đăng nhập',
    icons: {
        icon: "/logo.png"
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-center items-center h-screen'>
            {children}
        </div>
    );
}