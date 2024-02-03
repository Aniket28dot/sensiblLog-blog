import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react";
import '../styles/global.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </SessionProvider>
    );
}