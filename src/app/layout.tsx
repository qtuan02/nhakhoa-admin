import { Inter } from "next/font/google";
import "../styles/globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ReduxProvider } from "@/redux/provider";
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ReduxProvider>
            <div>{children}</div>
            <ToastContainer limit={3} autoClose={1200} />
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
