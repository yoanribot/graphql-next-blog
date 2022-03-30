import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { Post, Category } from '../types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '../services/index'

interface Props {
  categories?: string[]
  slug?: string
}

const PostWidget: NextPage<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result: Post[]) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result: Post[]) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <Image
              // loader={grpahCMSImageLoader}
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="rounded-full align-middle"
              src={post.featuredImage.url}
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
