import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "@/redux/provider";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <StyledComponentsRegistry>
                        <div>{children}</div>
                        <ToastContainer limit={3} autoClose={1200} position="bottom-right" draggable />
                    </StyledComponentsRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}