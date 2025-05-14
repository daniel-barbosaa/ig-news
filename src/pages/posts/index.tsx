import Head from "next/head";
import style from "./style.module.scss";

import { createClient } from "../../services/prismicio";
import { GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleStartLoader = (url: string) => {
      if (url.startsWith("/posts/")) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };

    function handleCompleteLoader() {
      setIsLoading(false);
    }
    router.events.on("routeChangeStart", handleStartLoader);
    router.events.on("routeChangeComplete", handleCompleteLoader);

    return () => {
      router.events.off("routeChangeStart", handleStartLoader);
      router.events.off("hashChangeComplete", handleCompleteLoader);
    };
  });

  return (
    <>
      <Head>Posts | Ignews</Head>
      <main className={style.container}>
        <div className={style.post_list}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
        <Loader isLoading={isLoading} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  //Buscando os dados da API, com base no documento publication
  const response = await prismic.getAllByType("publication");

  const posts = response.map((post) => {
    const excerptNode = post.data.content.find(
      (content) => content.type === "paragraph"
    );
    const excerpt =
      excerptNode && "text" in excerptNode ? excerptNode.text : "";
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: excerpt,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
