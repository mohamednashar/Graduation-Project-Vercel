/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/@babel\/runtime/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }],
      });
      
    }
    return config;
  }, images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
       
      },

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
       
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7052',
       
      },
    ],

  },
};