import Date from '../components/date'
import Link from 'next/link'
import CoverImage from './cover-image';

export default function HeroPost({
  title,
  date,
  slug
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} />
      </div>
      <div className="mb-20 md:grid md:grid-cols-1 md:gap-x-16 lg:gap-x-8 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        {/* <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture.url} />
        </div> */}
      </div>
    </section>
  )
}