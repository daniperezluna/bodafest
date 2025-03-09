import React from 'react'

import SectionName from '@/components/common/sectionTitle/SectionName'
import SectionDesc from '@/components/common/sectionTitle/SectionDesc'
import HighlightCard2 from '@/components/common/cards/HighlightCardTwo'
import SectionTitleTwo from '@/components/common/sectionTitle/SectionTitleTwo'
import { lugaresInfo } from '@/lib/lugaresInfo'


const HighlightThree = ({ styleNum, prantClass }) => {
    return (
        <section className={`highlight-section highlight-2 ${prantClass} pb-lg-100 pb-xxl-120`}>
            <div className="container position-relative">
                <div className="row gy-4 gy-lg-0 align-items-lg-end justify-content-lg-between mb-30 mb-lg-70">
                    <div className="col-lg-5">
                        <div className="section-title wow fadeInRight">
                            <SectionName
                                name={""}
                                className={""}
                            />
                            <SectionTitleTwo
                                title={"Lugares e"}
                                subTitle={"info de interés"}
                                titleClass={""}
                                subTitleClass={"text-primary"}
                            />

                        </div>
                        {/* -- section-title -- */}
                    </div>
                    <div className="col-lg-5">
                        <div className="highlights-text wow fadeInLeft">
                            <SectionDesc
                                desc={"Os hemos recogido una serie de lugares de interés y de información que os pueden ser de utilidad para disfrutar de vuestra estancia en Cabra."}
                                className={"text-lg-end mb-2 custom-jakarta custom-font-style-2"}
                            />

                        </div>
                    </div>
                </div>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-30">
                    {
                        lugaresInfo.map(({ id, desc, icon, title, tel, link }) => <HighlightCard2 key={id} desc={desc} icon={icon} title={title} styleNum={styleNum} link={link} tel={tel} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default HighlightThree


