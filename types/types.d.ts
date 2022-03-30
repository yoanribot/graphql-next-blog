export type Post = {
  title: string
  excerpt: string
  featuredImage: {
    url: string
  }
  slug: string
  author: {
    name: string
    photo: {
      url: string
    }
    bio: string
  }
  createdAt: string
  categories: Category[]
  content: {
    raw: {
      children: {
        type: string
        text: string
        children: { text: string }[]
      }[]
    }
  }
}

export type PostsConnection = {
  node: Post
}

export type Category = {
  name: string
  slug: string
}

export type Author = {
  name: string
  photo: {
    url
  }
  bio: string
}

export type TComment = {
  name: string
  email: string
  comment: string
  slug: string
  createdAt?: string
}
