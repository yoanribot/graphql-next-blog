import Head from 'next/head'
import Image from 'next/image'
import { PostCard, CategoriesWidget, PostWidget } from '../components'
import { getPosts } from '../services'
import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Post } from '../types/types'
import { FeaturedPosts } from '../sections'

interface Props {
  posts: {
    node: Post
  }[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS BLOG using GRAPHQL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPosts />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={post.node.title} post={post.node} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = (await getPosts()) || []

  return {
    props: {
      posts,
    },
  }
}

export default Home
