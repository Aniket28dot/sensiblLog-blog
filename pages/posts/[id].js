import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import Container from '../../components/container';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import PostBody from '../../components/post-body';
import styles from '../../components/layout.module.css';
import Link from 'next/link';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Container>
          <Header/>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article>
            <PostHeader
              title={postData.title}
              date={postData.date}
            />
            {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div> */}
            <PostBody content={postData.contentHtml}/>
            {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
            <div className={styles.backToHome}>
              <Link href="/">← Back to home</Link>
            </div>
          </article>
        </Container>
      </Layout>
    );
  }