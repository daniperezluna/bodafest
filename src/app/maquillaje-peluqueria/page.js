import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import BlogTwo from '@/components/blogs/BlogTwo'
import { blogMaquillaje } from '@/lib/blogMaquillaje'

const Blog = () => {
  return (
    <>
      <PageHeader currentPage={"Maquillaje - Peluquería"} banner={"banner-3"} />
      <BlogTwo data={blogMaquillaje}/>
    </>
  )
}

export default Blog