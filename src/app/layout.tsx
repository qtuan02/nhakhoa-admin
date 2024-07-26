import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import { ReduxProvider } from "@/redux/provider";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ReduxProvider>
            <html lang="en">
                <body className={inter.className}>
                    <StyledComponentsRegistry>
                        <div>{children}</div>
                        <ToastContainer limit={3} autoClose={1200} position="bottom-right" draggable />
                    </StyledComponentsRegistry>
                </body>
            </html>
        </ReduxProvider>
    );
}
