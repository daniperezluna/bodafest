import React from 'react'
import QuoteIcon from '@/components/common/icons/QuoteIcon'

const AboutQuote = ({ styleNum }) => {

    // styleNum 0 from home page 3
    // styleNum 1 from home page 6
    let prantClass;
    let sectionDescClass;
    let dateClass
    switch (styleNum) {
        case 0:
            prantClass = "pt-20";
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
        <section id="quote" className={`about-section about-3 ${prantClass} `}>
            <div className="container">
                <div className="row gx-30 gx-xxl-70 gy-lg-0 gy-40 align-items-center">
                    <blockquote className="wp-block-quote my-30 my-lg-50">
                        <div className="d-flex gap-10">
                            <span className="block-quote-icon"> <QuoteIcon /> </span>
                            <div>
                                <h5 className="blog-inner-text custom-jakarta text-primary fw-extra-bold mb-30">Chicos, ¿alguna vez os hemos contado la historia de cómo nos conocimos?</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">No fue en el MacLaren’s, pero podría haberlo sido.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">No hubo un paraguas amarillo, pero sí una canción de Vetusta Morla en un bar que ya no existe.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">No hizo falta un 'we were on a break', porque nunca lo estuvimos.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Fuimos escribiendo nuestra historia entre conciertos, viajes y madrugadas de canciones en bucle.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Hemos sido Ted buscando señales y Marshall apostando por el amor, Ross discutiendo sobre dinosaurios y Monica organizando cada plan.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Y ahora, después de casi 14 años de temporada tras temporada, llega el episodio que siempre quisimos grabar.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Así que aquí está, el final de temporada (que no de serie) que esperábais. ¿Os lo vais a perder?</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Si nuestra historia fuera una serie, vosotros seríais los personajes recurrentes, los que han estado en cada escena importante, en cada giro de guión.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">Y ahora, queremos que estéis en este capítulo especial, no como espectadores, sino como parte de la trama.</h5>
                                <h5 className="blog-inner-text custom-jakarta fw-bold mb-20">¡¡Nos vemos en la boda!!</h5>
                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

export default AboutQuote

