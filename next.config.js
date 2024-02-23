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
  },
};