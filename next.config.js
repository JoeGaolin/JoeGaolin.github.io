/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 移除basePath，因为github.io仓库不需要
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig