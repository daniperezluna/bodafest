import React from 'react'
import Image from 'next/image'
import SectionName from '@/components/common/sectionTitle/SectionName';
import { GrMapLocation } from "react-icons/gr";
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo';
import about_img_3 from "@/assets/images/junquillo-cabra.jpg"

const AboutBus = ({ styleNum }) => {

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
        <section id="bus" className={`about-section about-3 ${prantClass} `}>
            <div className="container">
                <div className="row gx-30 gx-xxl-70 gy-lg-0 gy-40 align-items-center">
                    <div className="col-lg-4 col-xl-5">
                        <div className="about-3-image wow fadeInRight">
                            <Image src={about_img_3} width={"auto"} height={"auto"} className="img-fluid rounded-5" alt="about-image" />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-7 wow fadeInLeft">
                        <div className="section-title mb-30 mb-xxl-40">
                            <SectionName
                                name={"¿Vas en Bus al Banquete?"}
                                className={""}
                            />
                            <SectionTitleTwo
                                title={"Bus"}
                                subTitle={""}
                                titleClass={""}
                                subTitleClass={"text-primary"}
                            />

                        </div>
                        <div className="about-3-text d-flex flex-column flex-lg-row gap-4 justify-content-between align-items-lg-center mb-40 mb-xl-80 mb-xxl-100">
                            <div>
                                <h4 className={`fw-extra-bold ${dateClass}`}>3 de Mayo de 2025</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">13:45 pm (Pendiente de confirmar)</p>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0"> ℹ️ Los horarios de vuelta los anunciaremos más adelante</p>
                            </div>
                            <div>
                                <h4 className="text-uppercase fw-extra-bold custom-jakarta">Dirección</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">C. Junquillo, s/n - Cabra</p>
                                <div className="d-flex align-items-center gap-10 mt-10">
                                <GrMapLocation />
                                <a href="https://maps.app.goo.gl/CNS9ReEs2bZTKL4f9">
                                    <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">Abrir en Goole Maps</p>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutBus

