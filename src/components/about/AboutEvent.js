import React from 'react'
import Image from 'next/image'
import SectionName from '@/components/common/sectionTitle/SectionName';
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo';
import about_img_3 from "@/assets/images/los-angeles.jpg"
import { GrMapLocation } from "react-icons/gr";

const AboutEvent = ({ styleNum }) => {

    // styleNum 0 from home page 3
    // styleNum 1 from home page 6
    let prantClass;
    let sectionDescClass;
    let dateClass
    switch (styleNum) {
        case 0:
            prantClass = "pb-50 pb-lg-100";
            sectionDescClass = "custom-jakarta custom-font-style-2 mt-30";
            dateClass = "custom-jakarta"
            break;
        case 1:
            prantClass = "about-3-bg py-10 py-lg-20";
            sectionDescClass = "custom-jakarta custom-font-style-2 mt-30";
            dateClass = "custom-sans-serif"
            break;

        default:
            break;
    }

    // ----- Change classname define in home page

    return (
        <section id="banquete" className={`about-section about-3 ${prantClass} `}>
            <div className="container">
                <div className="row gx-30 gx-xxl-70 gy-lg-0 gy-40 align-items-center">
                    <div className="col-lg-4 col-xl-5">
                        <div className="about-3-image wow fadeInRight">
                            <Image src={about_img_3} width={"auto"} height={"auto"} className="img-fluid rounded-5" alt="about-image" />
                        </div>
                    </div>
                    {/* <!-- col-5 --> */}
                    <div className="col-lg-8 col-xl-7 wow fadeInLeft">
                        <div className="section-title mb-30 mb-xxl-40">
                            <SectionName
                                name={"Banquete"}
                                className={""}
                            />
                            <SectionTitleTwo
                                title={"Bodegas"}
                                subTitle={"Los Ángeles"}
                                titleClass={""}
                                subTitleClass={"text-primary"}
                            />

                        </div>
                        {/* <!-- section-title --> */}
                        <div className="about-3-text d-flex flex-column flex-lg-row gap-4 justify-content-between align-items-lg-center mb-40 mb-xl-80 mb-xxl-100">
                            <div>
                                <h4 className={`fw-extra-bold ${dateClass}`}>3 de Mayo de 2025</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">14:00 pm</p>
                            </div>
                            <div>
                                <h4 className="text-uppercase fw-extra-bold custom-jakarta">Dirección</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">Av. Antonio Sanchez - Aguilar de la Frontera</p>
                                <div className="d-flex align-items-center gap-10 mt-10">
                                <GrMapLocation />
                                <a href="https://maps.app.goo.gl/g3JHc3nazrgWcLJE7">
                                    <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">Abrir en Goole Maps</p>
                                </a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- about-3-text --> */}
                        {/* <EventCounterOne /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutEvent

