import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import BlogTwo from '@/components/blogs/BlogTwo'
import { blogAlojamientos } from '@/lib/blogAlojamientos'


const Blog = () => {
  return (
    <>
      <PageHeader currentPage={"Alojamientos"} banner={"banner-1"} />
      <BlogTwo data={blogAlojamientos}/>
    </>
  )
}

export default Blog