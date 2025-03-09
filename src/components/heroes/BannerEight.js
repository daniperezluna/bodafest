
import Image from 'next/image'
import React from 'react'

import EventDate from '@/components/common/EventDate'
import BannerSponsor from '@/components/common/BannerSponsor'
import { VideoBg } from '../common/videoBG'

// import hero_img_8 from "@/assets/images/hero-8-image.png"
import musicfest_2 from "@/assets/images/global/musicfest-2.png"

const BannerEight = () => {
    return (
        <section className="hero-section hero-8 hero-video bg-dark position-relative">
            <div class="video-wrapper position-absolute w-100 h-100 top-0 start-0 z-0">
                <VideoBg/>
            </div>
            <div className="hero-wrapper mx-auto position-relative">
                {/* <!-- hero-8-image --> */}

                <div className="container">
                    <div className="hero-video-inner">
                        <Image src={musicfest_2}   className="musicfest-image mb-20 mb-xxl-30" alt="img" />
                        <h1 className="custom-poppins text-stroke-line fs-120 text-white fw-extra-huge-bold text-uppercase mb-20">Aural Euphoria</h1>
                        <BannerSponsor parentClass={"mb-40 mb-lg-0 hero-brand-images"} />
                    </div>
                    {/* <!-- hero-inner-text --> */}
                </div>
                {/* <!-- container --> */}

                <EventDate styleNum={0} />
                {/* <!-- event-info --> */}
            </div>
        </section>
    )
}

export default BannerEight




