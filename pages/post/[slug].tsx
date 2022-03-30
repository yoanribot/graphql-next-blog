import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import {
  PostDetail,
  CategoriesWidget,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components'
import { getPosts, getPostDetails } from '../../services'
import { Post } from '../../types/types'
import { AdjacentPosts } from '../../sections'

interface Props {
  post: Post
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const PostDetails: NextPage<Props> = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post?.author} />
          <AdjacentPosts slug={post?.slug} createdAt={post?.createdAt} />
          <CommentsForm slug={post?.slug} />
          <Comments slug={post?.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget
              slug={post?.slug}
              categories={post?.categories.map((category) => category.slug)}
            />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const slug = context.params!.slug
  const data = await getPostDetails(slug)

  return {
    props: {
      post: data || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}

export default PostDetails
