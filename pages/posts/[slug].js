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

export default function Post({ post, morePosts }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
    return (
      <Layout>
        <Container>
          <Header/>
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
              <PostBody content={post.content}/>
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    );
  }