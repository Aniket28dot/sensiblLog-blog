import Footer from './footer';
import Meta from './meta';

export const siteTitle = 'sensible logs';

export default function Layout({ children }) {
  return (
    <>
    <Meta/>
    <div className="min-h-screen">
        <main>{children}</main>
    </div>
    <Footer/>
    </>
  );
}