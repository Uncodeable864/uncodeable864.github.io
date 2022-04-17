import { App } from "@prisma/client";
import { marked } from "marked";
import { GetServerSideProps } from "next";
import Head from "next/head";
import db, { AppWithStringDate, PostWithStringDate } from "../../lib/db";
import styles from "../../styles/Post.module.scss";
import Image from "next/image";

export default function PostPage({
  app,
  content,
}: {
  app: AppWithStringDate;
  content: string;
}) {
  return (
    <>
      <Head>
        <title>{app.name} | an App by Uncodeable</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>{app.name}</h1>
          <p>{app.description}</p>
          <button className={"arrow-right"}>
            <a target={"_blank"} rel="noreferrer" href={`${app.link}`}>
              OPEN
            </a>
          </button>
        </div>
        <div className={styles.content}>
          <h1>The Creation of: {app.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params);
  const slug = context.params?.slug;
  console.log(slug as string);
  const postDirty: App = await db.app.findUnique({
    where: {
      slug: slug as string,
    },
  });
  const app: AppWithStringDate = {
    ...postDirty,
    createdAt: postDirty.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  const rawText = await (await fetch(app.longDescription)).text();
  const content = marked(rawText);
  return {
    props: { app, content },
  };
};
