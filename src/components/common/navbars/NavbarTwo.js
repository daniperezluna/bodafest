"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '@/components/common/icons/MenuIcon'
import useStickyHeader from '@/hooks/useStickyHeader'
import NavbarOffcanvas from './NavbarOffcanvas'

import logo from "@/assets/images/main-logo-small.png"
import logo_dark from "@/assets/images/main-logo-small.png"
import { usePathname } from 'next/navigation'

const NavbarTwo = () => {
  const pathName = usePathname()
  useStickyHeader(pathName)
  return (
    <>
      <header className="header-section header-3 transparent-header sticky-navbar">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <Link className="navbar-brand brand-logo" href="/" aria-label="nav-brands">
                <Image src={logo} className="logo-custom-light" alt="logo" />
                <Image src={logo_dark} className="logo-custom-dark" alt="logo" />
              </Link>
              {/* <div className="d-flex align-items-center gap-20">
                  <button className="navbar-toggler offcanvas-menu-icon" type="button" data-bs-toggle="offcanvas" data-bs-target="#navContentmenu" aria-controls="navContentmenu" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="text-black"><MenuIcon height={"24"} width={"24"} /> </span>
                </button>
              </div> */}


              <div className="d-none d-lg-block">
                {/* <div className="d-flex gap-40 gap-xxl-60 align-items-center">
                    <Link href="#" className="offcanvas-menu-icon" data-bs-toggle="offcanvas" data-bs-target="#navContentmenu" aria-controls="navContentmenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="text-black"> <MenuIcon height={"44"} width={"44"} /> </span>
                  </Link>
                </div> */}

              </div>
            </div>
          </nav>
        </div>
      </header>

     {/* <NavbarOffcanvas img={logo} /> */}
    </>
  )
}

export default NavbarTwo