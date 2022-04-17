/* eslint-disable @next/next/no-html-link-for-pages */
import { Edit2, Smartphone, Youtube } from "lucide-react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Uncodeable864</title>
        <meta name="description" content="A personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Uncodeable864</h1>
        <p className={styles.subtitle}>A collection of stuff I&#39;ve done</p>
        <div className={styles.callToAction}>
          <a href="/posts">
            <button>
              <Edit2 />
              <p>BLOG</p>
            </button>
          </a>
          <a href="/apps">
            <button>
              <Smartphone />
              <p>APPS</p>
            </button>
          </a>
          <a href="https://tinyurl.com/alphaUncodeable">
            <button>
              <Youtube />
              <p>YOUTUBE</p>
            </button>
          </a>
        </div>
      </main>
    </div>
  );
}
