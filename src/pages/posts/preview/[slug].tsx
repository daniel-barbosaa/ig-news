import { GetStaticProps } from "next";
import { createClient } from "../../../services/prismicio";
import { RichText } from "prismic-dom";
import Head from "next/head";
import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface PreviewPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PreviewPost({ post }: PreviewPostProps) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && (session as any).activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session, router, post.slug]);

  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/" legacyBehavior>
              <a>Subscribe now 🧐</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }

  const { slug } = params;

  if (slug === "favicon.png") {
    return {
      notFound: true,
    };
  }

  let post;

  try {
    const prismic = createClient();
    const response = await prismic.getByUID("publication", slug, {});

    post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0, 3)),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
