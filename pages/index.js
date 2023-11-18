import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Container from '../components/container'
import Intro from '../components/intro';
import HeroPost from '../components/hero-post';
import MoreStories from '../components/more-stories';
import { getAllPostsForHome } from '../lib/graphcms';

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = await getAllPostsForHome();
  // const allPostsData = JSON.stringify(postData);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const heroPost = allPostsData[0]
  const morePosts = allPostsData.slice(1)
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <Container>
          <Intro/>
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