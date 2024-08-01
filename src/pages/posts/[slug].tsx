import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { createClient } from "../../services/prismicio";
import { RichText } from "prismic-dom";
import Head from "next/head";
import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

interface ActiveSubscribe {
  ref: { "@ref": any };
  ts: number;
  data: {
    id: string;
    userId: any;
    status: string;
    priceId: string;
  };
}

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
  activeSubscription?: ActiveSubscribe;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = ((await getSession({ req })) as Session) ?? {};

  if (!params || !params.slug || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }
  const { slug } = params;
  if (!session.activeSubscription) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
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
      content: RichText.asHtml(response.data.content),
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
  };
};
