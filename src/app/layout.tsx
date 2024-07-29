import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import AntdRegistry from "@/lib/AntdRegistry";

import dynamic from "next/dynamic";
const StoreProvider = dynamic(() => import("@/redux/provider"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AntdRegistry>
                    <StoreProvider>
                        <div>{children}</div>
                        <ToastContainer limit={3} autoClose={1200} position="bottom-right" draggable />
                    </StoreProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
