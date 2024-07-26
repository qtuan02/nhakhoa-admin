import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import { ReduxProvider } from "@/redux/provider";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Đang tải...",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <Head>
				<link
					rel='preload'
					href='/app/layout.css'
					as='style'
				/>
				<link
					rel='preload'
					href='/app/(route)/layout.css'
					as='style'
				/>
			</Head>
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <ReduxProvider>
                        <div>{children}</div>
                        <ToastContainer limit={3} autoClose={1200} position="bottom-right" draggable />
                    </ReduxProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
