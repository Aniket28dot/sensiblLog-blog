import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Footer from './footer';
import Meta from './meta';

export const siteTitle = 'sensible logs';

export default function Layout({ children, home }) {
  return (
    <>
    <Meta/>
    <div className="min-h-screen">
        <main>{children}</main>
        {/* {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )} */}
    </div>
    {/* <div className={styles.container}>
      
      
    </div> */}
    <Footer/>
    </>
  );
}