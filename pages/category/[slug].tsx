import React from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { getCategories, getCategoryPost } from '../../services'
import { PostCard, CategoriesWidget, Loader } from '../../components'
import { GetStaticProps, NextPage } from 'next'
import { Post, PostsConnection } from '../../types/types'

interface Props {
  posts: PostsConnection[]
}

const CategoryPost: NextPage<Props> = ({ posts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
          {!posts.length && (
            <p className="m-20 text-center text-xl font-semibold text-white">
              There arent Posts for this category created yet. Be the first one
              to create one{' '}
            </p>
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

// Fetch data at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string
  const posts = await getCategoryPost(slug)

  return {
    props: { posts },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}

export default CategoryPost
