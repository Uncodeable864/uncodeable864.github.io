import { marked } from "marked";
import { GetServerSideProps } from "next";
import Head from "next/head";
import db, { PostWithStringDate } from "../../lib/db";
import styles from "../../styles/Post.module.scss";

export default function PostPage({
  post,
  content,
}: {
  post: PostWithStringDate;
  content: string;
}) {
  return (
    <>
      <Head>
        <title>{post.title} | Uncodeable864 Blog</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>{post.title}</h1>
          <p>{post.publishedDate} | by Uncodeable864</p>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const postDirty = await db.post.findUnique({
    where: {
      slug: slug as string,
    },
  });
  const post = {
    ...postDirty,
    publishedDate: postDirty.publishedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const content = await (await fetch(post.content)).text();
  const contentHtml = marked(content);

  return {
    props: { post, content: contentHtml },
  };
};
