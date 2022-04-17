import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import styles from "../../styles/PostList.module.scss";
import db, { AppWithStringDate, PostWithStringDate } from "../../lib/db";
import { App, prisma } from "@prisma/client";
import { AppComponent } from "../../components/app/AppView";

export default function PostsPage({ apps }: { apps: AppWithStringDate[] }) {
  return (
    <>
      <Head>
        <title>Apps by Uncodeable864</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.blogHero}>
          <h1 className={styles.title}>Apps by Uncodeable864</h1>
        </div>
        <div className={styles.posts}>
          {apps.map((post) => (
            <>
              <AppComponent app={post} key={post.slug} />
            </>
          ))}
        </div>
      </main>
    </>
  );
}

// Get static props from getStaticProps
export const getServerSideProps: GetServerSideProps = async () => {
  const feedBad: App[] = await db.app.findMany({
    where: {
      published: true,
    },
  });
  const apps: AppWithStringDate[] = feedBad.map((post) => ({
    ...post,
    createdAt: post.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return { props: { apps } };
};
