import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import TopUpArrow from '../icons/TopUpArrow'
import { GrMapLocation } from "react-icons/gr";

const BlogCard = ({ img, title, desc, link, tel, parentClass }) => {
    return (
        <div className="blog-content">
            <div className={parentClass}>
                <div className="row gy-4 align-items-center justify-content-between">
                    <div className="col-12">
                        <div className="blog-image">
                            <Image src={img} className="img-fluid" alt="img" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="blog-left-content">

                            <h2 className="blog-link fs-4 fw-bold"><Link className="text-decoration-none" href={`/${link}`}>{title}</Link></h2>
                            <p className="py-20">{desc}</p>
                            <div className="d-flex align-items-center gap-10 mb-20">
                            <GrMapLocation />
                            <a href="https://maps.app.goo.gl/CgPYETvbSr7uUv658">
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0"> Abrir en Goole Maps</p>
                            </a>
                            </div>
                            { tel && 
                                <div className="d-flex align-items-center gap-10 mb-20">
                                    <a href={`tel:${tel}`} className="py-20" aria-label="buttons">
                                        📞 { tel}
                                    </a>
                                </div>
                            }
                            <div>
                                <Link href={`${link}`} className="download-link d-flex align-items-center gap-30" aria-label="buttons">
                                    Web <TopUpArrow className={"ticket-arrow"} height={"32"} width={"32"} />
                                </Link>
                            </div>
                        </div>
                        {/* -- left-content -- */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard