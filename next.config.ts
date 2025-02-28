import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com', 'plus.unsplash.com', 'lh3.googleusercontent.com']
  },
  env: {
    CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
  },
}
 
export default nextConfig