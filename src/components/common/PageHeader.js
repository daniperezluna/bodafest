import React from 'react'

const PageHeader = ({ currentPage, banner }) => {
  return (
    <section className={`banner-section ${banner} position-relative parallax`}>
      <div className="container">
        <div className="banner-wrapper d-flex gap-20 gap-lg-40 justify-content-center align-items-lg-center flex-column">
          <h2 className="banner-heading display-3 fw-extra-bold custom-jakarta mb-0 text-border">{currentPage}</h2>
        </div>
      </div>
    </section>
  )
}

export default PageHeader