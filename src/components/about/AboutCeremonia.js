import React from 'react'
import Image from 'next/image'
import SectionName from '@/components/common/sectionTitle/SectionName';
import SectionDesc from '@/components/common/sectionTitle/SectionDesc';
import { GrMapLocation } from "react-icons/gr";
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo';
import about_img_3 from "@/assets/images/iglesia_cerro.jpg"

const AboutCeremonia = ({ styleNum }) => {

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
            prantClass = "about-3-bg py-50 py-lg-80";
            sectionDescClass = "custom-jakarta custom-font-style-2 mt-30";
            dateClass = "custom-sans-serif"
            break;

        default:
            break;
    }

    // ----- Change classname define in home page

    return (
        <section id="ceremonia" className={`about-section about-3 ${prantClass} `}>
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
                                name={"La misa será en"}
                                className={""}
                            />
                            <SectionTitleTwo
                                title={"Iglesia"}
                                subTitle={"San Juan Bautista"}
                                titleClass={""}
                                subTitleClass={"text-primary"}
                            />
                            <SectionDesc
                                desc={"El templo más antiguo de la ciudad. Fundada en el s.VII por el obispo de Egabro, Bacauda (prelado egabrense participante en el VIII Concilio de Toledo), nos ofrece en su interior una peculiar pieza. Se trata de un ara (piedra en forma de pilastra) que, en caracteres góticos, consagra la iglesia a Santa María el 30 de mayo de la era 688 (650 d.C.). Se trata de la manifestación epigráfica de la devoción mariana más antigua de la diócesis de Córdoba y una de las pocas de Andalucía."}
                                className={sectionDescClass}
                            />

                        </div>
                        {/* <!-- section-title --> */}
                        <div className="about-3-text d-flex flex-column flex-lg-row gap-4 justify-content-between align-items-lg-center mb-40 mb-xl-80 mb-xxl-100">
                            <div>
                                <h4 className={`fw-extra-bold ${dateClass}`}>3 de Mayo de 2025</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">12:30 pm</p>
                            </div>
                            <div>
                                <h4 className="text-uppercase fw-extra-bold custom-jakarta">Dirección</h4>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">Plaza Sta María La Mayor s/n</p>
                                <p className="custom-jakarta custom-font-style-2 fw-semibold mb-0">Preferiblemente acceso a pie</p>
                                <div className="d-flex align-items-center gap-10 mt-10">
                                <GrMapLocation />
                                <a href="https://maps.app.goo.gl/CgPYETvbSr7uUv658">
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

export default AboutCeremonia

