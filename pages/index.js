import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Container from '../components/container'
import Intro from '../components/intro';
import HeroPost from '../components/hero-post';
import MoreStories from '../components/more-stories';

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData();
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
          {/* <h2 className={utilStyles.headingLg}>Makes Sense.</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            ))}
          </ul> */}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              // coverImage={heroPost.coverImage}
              date={heroPost.date}
              // author={heroPost.author}
              slug={heroPost.id}
              // excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>

      </Layout>
    </>
  );
}