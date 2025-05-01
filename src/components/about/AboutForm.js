import React from 'react'
import SectionName from '@/components/common/sectionTitle/SectionName';
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo';
import SectionDesc from '@/components/common/sectionTitle/SectionDesc'
import QuoteIcon from '@/components/common/icons/QuoteIcon';
import FestivalForm from '../forms/FestivalForm';
import { FaWhatsapp } from "react-icons/fa";

const AboutForm = ({ styleNum }) => {

    // styleNum 0 from home page 3
    // styleNum 1 from home page 6
    let prantClass;
    let sectionDescClass;
    let dateClass
    switch (styleNum) {
        case 0:
            prantClass = "";
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
        <section id="formSection" className={`about-section about-3 ${prantClass} `}>
            <div className="container">
                <div className="row gx-30 gx-xxl-70 gy-lg-0 gy-40 align-items-center">
                    <div className="col-lg-8 col-xl-7 wow fadeInLeft">
                        {/* <div className="section-title mb-30 mb-xxl-40">
                            <SectionName
                                name={""}
                                className={""}
                            />
                            <SectionTitleTwo
                                title={"¿Nos confirmas que contamos contigo?"}
                                subTitle={""}
                                titleClass={""}
                                subTitleClass={"text-primary"}
                            />

                        </div>                    
                        <FestivalForm /> */}
                        <div className="col-12 mb-30">
                            <div className="blog-left-content">
                                <h2 className="blog-link fs-4 fw-bold">Si tienes alguna duda, contacta con nosotros por whatsapp pulsando uno de los siguientes iconos</h2>
                                <div className="d-flex align-items-center gap-10 mb-20">
                                <a className="btn-whatsapp" href="https://wa.me/34692492741?text=Hola!%20Te%20confirmo%20la%20asistencia%20a%20la%20boda!%20Soy:">
                                    <p className="fw-semibold mb-0"> <FaWhatsapp /> Eli </p>
                                </a>
                                <a className="btn-whatsapp" href="https://wa.me/34655098956?text=Hola!%20Te%20confirmo%20la%20asistencia%20a%20la%20boda!%20Soy:">
                                    <p className="fw-semibold mb-0"> <FaWhatsapp /> Dani </p>
                                </a>
                                </div>
                            </div>
                            {/* -- left-content -- */}
                        </div>
                    </div>
                </div>
                <div className="row gx-30 gx-xxl-70 gy-lg-0 gy-40 align-items-center">
                    <blockquote className="wp-block-quote">
                        <div className="d-flex gap-10">
                            <span className="block-quote-icon"> <QuoteIcon /> </span>
                            <div>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Nuestro club de fans favorito es el de las personas que siempre han estado a nuestro lado.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Si queréis tener un detalle con nosotros,sabed que lo transformaremos en viajes, conciertos y nuevas historias que contar</h5>
                            </div>
                        </div>
                    </blockquote>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-lg-8 highlights-text wow fadeInLeft">
                        <SectionDesc
                            desc={"BIZUM: 655 09 89 56"}
                            className={"text-lg-center fw-extra-bold mb-2 custom-jakarta"}
                        />

                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-lg-8 highlights-text wow fadeInLeft">
                        <SectionDesc
                            desc={"CUENTA: ES97 1563 2626 3432 6801 5205"}
                            className={"text-lg-center fw-extra-bold mb-2 custom-jakarta"}
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutForm

