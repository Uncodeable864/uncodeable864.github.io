import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export default db;

export type PostWithStringDate = {
  slug: string;
  title: string;
  content: string;
  publishedDate: string;
  published: boolean;
  image: string;
  description: string;
};

export type AppWithStringDate = {
  slug: string;
  name: string;
  link: string;
  published: boolean;
  description: string;
  image: string;
  longDescription: string;
  logo: string;
  createdAt: string;
};
