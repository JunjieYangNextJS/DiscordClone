/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },
};

module.exports = nextConfig;
// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     config.externals.push({
//       "utf-8-validate": "commonjs utf-8-validate",
//       bufferutil: "commonjs bufferutil",
//     });
//     return config;
//   },
//   images: {
//     domains: ["uploadthing.com", "utfs.io"],
//   },
// };
