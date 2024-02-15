import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.GRAPHCMS_PROJECT_API;

export const getAllPostsWithSlug = async () => {
  const query = gql`
    query MyQuery {
      posts {
            slug
      }
    }
  `
  const result = await request(graphqlAPI, query);

  return result.posts;
}

export const getPostAndMorePosts = async (slug) => {
  const query = gql`
  query PostBySlug($slug: String!) {
    post(where: {slug: $slug}) {
      title
      slug
      content {
        html
      }
      createdAt
      ogImage: featuredImage {
        url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
      }
      featuredImage {
        url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
      }
      author {
        name
        profilePic {
          url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
        }
      }
    }
    morePosts: posts(
      orderBy: createdAt_DESC
      first: 2
      where: {slug_not_in: [$slug]}
    ) {
      title
      excerpt
      slug
      createdAt
      featuredImage {
        url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
      }
      author {
        name
        profilePic {
          url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
        }
      }
    }
  }
  `

  const result = await request(graphqlAPI, query, { slug });

  return result;
}

export const getAllPostsForHome = async () => {
  const query = gql`
        query MyQuery {
            posts(orderBy: createdAt_DESC, first: 20) {
                title
                slug
                excerpt
                createdAt
                featuredImage {
                  url(transformation: {
                    image: {
                      resize: {
                        fit:crop,
                        width:2000,
                        height:1000
                      }
                    }
                  })
                }
                author {
                  name
                  profilePic {
                    url(transformation: {
                      image: {
                        resize: {
                          width:100,
                          height:100,
                          fit:crop
                        }
                      }
                    })
                  }
                }
            }
        }
    `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) 
    {
      comments(where: {post: {slug: $slug}})
      {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug }).then(response => {
    console.log(response);
  }).catch(error => {
    console.error("Error: ", error);
  })

  return result.comments;
};