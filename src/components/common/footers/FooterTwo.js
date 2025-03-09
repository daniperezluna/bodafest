import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import yellow_logo from "@/assets/images/main-logo-small.png"
import yellow_logo_dark from "@/assets/images/main-logo-small.png"

import landing_logo from "@/assets/images/global/logo-landing-light.png"
import landing_logo_dark from "@/assets/images/global/logo-secondary.png"

const FooterTwo = ({ styleNum }) => {
    // styleNum 3 from home page 3 layout and home page 6 layout
    // styleNum 4 from home page 4 layout

    let currentLogo = ""
    let currentLogoDark = ""

    switch (styleNum) {
        case 3:
            currentLogo = yellow_logo
            currentLogoDark = yellow_logo_dark
            break;
        case 4:
            currentLogo = landing_logo
            currentLogoDark = landing_logo_dark
            break;

        default:
            break;
    }

    // ----- Change logo define in home page
    const year = new Date().getFullYear()
    
    return (
        <footer className="footer-section footer-1 py-lg-50 py-40 mt-auto">
            <div className="container">
                <div className="row gy-lg-0 gy-10 justify-content-between align-items-center text-center text-lg-start">
                    <div className="col-lg-4 order-3 order-lg-1">
                        <p className="mb-0  custom-jakarta custom-font-style-2 footer-nav">&copy; <span className="current-year" >{year}</span></p>
                        <p className="mb-0  custom-jakarta custom-font-style-2 footer-nav">Hecho con ❤️ por Eli y Dani.</p>
                    </div>
                    <div className="col-lg-4 order-1 order-lg-2">
                        <Link className="navbar-brand d-flex justify-content-center" href="/home-1/" aria-label="nav-brands">
                            <Image src={currentLogo} className="logo-light" alt="logo" />
                            <Image src={currentLogoDark} className="logo-dark" alt="logo" />
                        </Link>
                    </div>
                </div>
                {/* <!-- row --> */}
            </div>
            {/* <!-- container -->			 */}
        </footer>
    )
}

export default FooterTwo