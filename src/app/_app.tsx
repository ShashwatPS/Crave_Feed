import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import { useRecoilState , useRecoilValue , useSetRecoilState } from 'recoil'
import { useEffect } from 'react';
import Head from 'next/head';
import './globals.css';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Your+Selected+Font&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
