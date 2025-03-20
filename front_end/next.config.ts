/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, 
    
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'scontent.fccj5-1.fna.fbcdn.net',
      'localhost', 
      '127.0.0.1', 
      '127.0.0.1:8000'
    ],
  },
};

module.exports = nextConfig;
