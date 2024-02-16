import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Container from '../components/container'
import Navbar from '../components/navbar';
import HeroPost from '../components/hero-post';
import MoreStories from '../components/more-stories';
import { getAllPostsForHome } from '../lib/graphcms';
import { useSession } from "next-auth/react"

export async function getStaticProps() {
  const allPostsData = await getAllPostsForHome();
  return {
    props: {
      allPostsData,
    },
    revalidate: 10
  };
}

export default function Home({ allPostsData }) {
  const heroPost = allPostsData[0]
  const morePosts = allPostsData.slice(1)

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <Container>
          <Navbar status={status} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage}
              date={heroPost.createdAt}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>

      </Layout>
    </>
  );
}