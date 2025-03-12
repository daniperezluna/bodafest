const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { unoptimized: true },
    optimizeFonts: false,
    trailingSlash: true,
}

module.exports = nextConfig
