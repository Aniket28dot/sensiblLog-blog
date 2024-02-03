import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/graphcms';
import Container from '../../components/container';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import PostBody from '../../components/post-body';
import PostTitle from '../../components/post-title';
import MoreStories from '../../components/more-stories';
import SectionSeparator from '../../components/section-separator';
import { useSession, signIn } from 'next-auth/react';

export default function Post({ post, morePosts }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "authenticated") {
    if (!router.isFallback && !post?.slug) {
      return <ErrorPage statusCode={404} />
    }
    return (
      <Layout>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>{post.title}</title>
                </Head>
                <PostHeader
                  title={post.title}
                  date={post.createdAt}
                  coverImage={post.featuredImage}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </article>
              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    );
  }
  else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-between gap-4">
          <p>Sign In to access content!</p>
          <button onClick={() => signIn()} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg">Sign in</button>
        </div>
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostAndMorePosts(params.slug)
  return {
    props: {
      post: postData.post,
      morePosts: postData.morePosts || [],
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug();

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}