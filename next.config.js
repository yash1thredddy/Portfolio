/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        unoptimized: true,
        domains: [
            'res.cloudinary.com',
            'firebasestorage.googleapis.com',
            'img.icons8.com',
            'raw.githubusercontent.com',
            'i.imgur.com',
            'drive.google.com',
            'img.freepik.com',
            'media.geeksforgeeks.org',
            'hub.knime.com',
            'upload.wikimedia.org'
        ]
    },
    basePath: '/Portfolio',
    assetPrefix: '/Portfolio/',
    trailingSlash: true,
    // Add these to improve static generation
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;