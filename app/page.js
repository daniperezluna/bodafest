import React from 'react'
import BannerThree from '@/components/heroes/BannerThree'
import CountDown from '@/components/common/CountDown'
import AboutCeremonia from '@/components/about/AboutCeremonia'
import AboutEvent from '@/components/about/AboutEvent'
import AboutBus from '@/components/about/AboutBus'
import AboutForm from '@/components/about/AboutForm'
import AboutQuote from '@/components/about/AboutQuote'
import ScrollSection from '@/components/common/ScrollSection'
import Separator from '@/components/common/Separator'
import Gallery from '@/components/gallery/Gallery'
import HighlightThree from '@/components/highlights/HighlightThree'
import logo from "@/assets/images/main-logo-small.png"

import subTitle from "@/assets/images/main-logo1.png"



export const metadata = {
  title: 'BodaFest - Eli y Dani',
  description: 'Bienvenidos al bodafest de vuestras vidas',
  icons: {
    icon: `${logo.src}`,
  },
}

const Home = async () => {

  return (
    <>
      <BannerThree subTitle={subTitle} />
      <CountDown styleNum={2} />
      <ScrollSection prentClass={"py-30 py-lg-50"} />
      <AboutQuote styleNum={0} />
      <AboutCeremonia styleNum={0} />
      <AboutBus styleNum={0} />
      <AboutEvent styleNum={0} />
      <HighlightThree styleNum={0} prantClass={"py-50"} />
      {/* <AboutForm styleNum={0}/> */}
      <ScrollSection prentClass={"py-30 py-lg-50"} />
      <Separator className={"mt-0 mt-lg-0 mt-xxl-0"} />
      <Gallery styleNum={2} />
    </>
  )
}

export default Home