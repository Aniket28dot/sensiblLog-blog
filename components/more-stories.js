import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <h1 class="mb-16 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Seek</span> more.
      </h1>
      <div className="grid-cols-1 sm:grid md:grid-cols-3 md:gap-x-20 lg:gap-x-20 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            coverImage={post.featuredImage}
            date={post.createdAt}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}