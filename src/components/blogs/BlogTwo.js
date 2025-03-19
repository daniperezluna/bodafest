import React from 'react'
import BlogCard from '@/components/common/cards/BlogCard'

const BlogTwo = ({data}) => {
    return (
        <section className="blog-content-section py-50 py-lg-80 py-xxl-100">
            <div className="container">
                <div className="blog-wrapper">
                    <div className="row g-4">
                        {
                            data.map(({ id, date, desc, img, link, title, tel, author_img, address }) =>
                                <div key={id} className="col-md-6 col-xl-4">
                                    <BlogCard date={date} desc={desc} img={img} link={link} title={title} blogPage={true} author_img={author_img} tel={tel} address={address} parentClass={'blog-content-2 custom-inner-bg'} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogTwo