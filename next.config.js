/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/movie/:id',
            destination: '/movie/[id]',
          },
        ];
      }
}

module.exports = nextConfig
