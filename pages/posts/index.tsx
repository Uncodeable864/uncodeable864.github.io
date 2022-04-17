import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../../styles/PostList.module.scss";
import db, { PostWithStringDate } from "../../lib/db";
import { Post, prisma } from "@prisma/client";
import { PostComponent } from "../../components/post/PostView";

export default function PostsPage({ feed }: { feed: PostWithStringDate[] }) {
  return (
    <>
      <Head>
        <title>Uncodeable864&apos;s Blog</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.blogHero}>
          <h1 className={styles.title}>Uncodeable864&apos;s Blog</h1>
        </div>
        <div className={styles.posts}>
          {feed.length == 0 ? (
            <p>No posts yet. Maybe come back soon!</p>
          ) : (
            feed.map((post) => (
              <>
                <PostComponent post={post} key={post.slug} />
              </>
            ))
          )}
        </div>
      </main>
    </>
  );
}

// Get static props from getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  const feedBad: Post[] = await db.post.findMany({
    where: {
      published: true,
    },
  });
  const feed: PostWithStringDate[] = feedBad.map((post) => ({
    ...post,
    publishedDate: post.publishedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return { props: { feed }, revalidate: 86400 };
};
