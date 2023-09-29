import "@/styles/globals.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={notoSansJp.className}>
      <Component {...pageProps} />
    </div>
  );
}
