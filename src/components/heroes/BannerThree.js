import React from 'react'
import Image from 'next/image'

import Star from '@/components/common/icons/Star'
import RoundText from '@/components/common/RoundText'


const BannerThree = ({subTitle}) => {
    
    return (
        <section className="hero-section hero-3 position-relative">
            <div className="hero-wrapper mx-auto position-relative parallax">
                <div className="hero-inner-text position-relative">
                    <div className="hero-6-texts">
                        <Image src={subTitle}   className="musicfest-image mb-10" alt="img" />
                        {/* <h1 className="custom-poppins extra-huge-text-1 text-primary fw-extra-huge-bold text-uppercase mb-0">Cabra</h1> */}
                        <h1 className="custom-poppins extra-huge-text-2 fw-extra-bold text-border">2025</h1>
                    </div>
                    <div className="circle-wrapper hero-3-circle">
                        <div className="star-icon">
                            <span><Star height={"42"} width={"42"} /></span>
                        </div>
                        <div className="circle-bg"></div>
                        <div className="rotate-text text-uppercase">
                            <RoundText style={""} text={" - Lo mejor está por llegar - "} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerThree


