import Head from 'next/head'
import style from './style.module.scss'

import { createClient } from '../../services/prismicio'
import { GetStaticProps } from 'next'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}

export default  function Posts({posts}: PostsProps) {

    
    return(
        <>
         <Head>
           Posts | Ignews 
         </Head>
         <main className={style.container}>
            <div className={style.post_list}>
               {posts.map(post => (
                <Link href={`/posts/${post.slug}`} key={post.slug} legacyBehavior>
                 <a>
                 <time>
                     {post.updatedAt}
                 </time>
                 <strong>{post.title}</strong>
                 <p>{post.excerpt}</p>
             </a>
             </Link>
               ))}
                </div>
         </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ()  => {
    const prismic = createClient()

    //Buscando os dados da API, com base no documento publication
    const response = await prismic.getAllByType('publication')

    const posts = response.map(post => {

        const excerptNode = post.data.content.find(content => content.type === 'paragraph');
        const excerpt = excerptNode && 'text' in excerptNode ? excerptNode.text : '';
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: excerpt,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    

    return {
        props: {
            posts
        }
    }
}