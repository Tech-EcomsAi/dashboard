/** @type {import('next').NextConfig} */

const path = require('path');

// module.exports = {
//     reactStrictMode: false,
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'lh3.googleusercontent.com',
//                 port: '',
//                 pathname: '/a/**',
//             },
//         ],
//     },
// }

if (process.env.NODE_ENV === 'development') {
    module.exports = {
        sassOptions: {
            includePaths: [path.join(__dirname, 'app/styles')],
        },
        typescript: {
            //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
            ignoreBuildErrors: false,
        },
        images: {
            disableStaticImages: true,
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                    port: '',
                    pathname: '/a/**',
                },
            ],
        },
        webpack(config) {
            config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' });
            config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

            return config;
        },
        reactStrictMode: false
    }
} else {
    module.exports = {
        // config
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        typescript: {
            //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
            ignoreBuildErrors: false,
        },
        images: {
            disableStaticImages: true,
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                    port: '',
                    pathname: '/a/**',
                },
            ],
        },
        reactStrictMode: false
    }
}



// /** @type {import('next').NextConfig} */
// const path = require('path');
// const runtimeCaching = require('next-pwa/cache');

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     scope: '/',
//     runtimeCaching,
// })
// if (process.env.NODE_ENV === 'development') {
//     const withBundleAnalyzer = require('@next/bundle-analyzer')({
//         enabled: process.env.ANALYZE === 'true',
//     })

//     module.exports = withBundleAnalyzer({
//         sassOptions: {
//             includePaths: [path.join(__dirname, 'app/styles')],
//         },
//         typescript: {
//             //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
//             ignoreBuildErrors: false,
//         },
//         images: {
//             disableStaticImages: true
//         },
//         webpack(config) {
//             config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' });
//             config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

//             return config;
//         },
//         reactStrictMode: false
//     })
// } else {
//     module.exports = withPWA({
//         // config
//         sassOptions: {
//             includePaths: [path.join(__dirname, 'styles')],
//         },
//         typescript: {
//             //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
//             ignoreBuildErrors: false,
//         },
//         images: {
//             disableStaticImages: true
//         },
//         // experimental: {
//         //   appDir: true,
//         // },
//         // webpack(config) {
//         //   config.module.rules.push({
//         //     test: /\.svg$/,
//         //     use: ["@svgr/webpack"]
//         //   });

//         //   return config;
//         // },
//         reactStrictMode: false
//     })
// }