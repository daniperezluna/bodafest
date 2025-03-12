import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import BlogTwo from '@/components/blogs/BlogTwo'
import { blogInfo } from '@/lib/blogInfo'


const Blog = () => {
  return (
    <>
      <PageHeader currentPage={"Info de Interés"} banner={"banner-4"} />
      <BlogTwo data={blogInfo}/>
    </>
  )
}

export default Blog