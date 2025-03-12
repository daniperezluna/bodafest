import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import BlogTwo from '@/components/blogs/BlogTwo'
import { blogRestaurantes } from '@/lib/blogRestauracion'

const Blog = () => {
  return (
    <>
      <PageHeader currentPage={"Restaurantes"} banner={"banner-2"} />
      <BlogTwo data={blogRestaurantes}/>
    </>
  )
}

export default Blog