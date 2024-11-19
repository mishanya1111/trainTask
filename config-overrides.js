import path from 'path';

/**
 * Overrides the Webpack configuration to set custom aliases.
 * @param {object} config - The Webpack configuration object.
 * @returns {object} The modified Webpack configuration.
 */
export default function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@components': path.resolve(process.cwd(), 'src/components'),
        '@assets': path.resolve(process.cwd(), 'src/assets'),
        '@pages': path.resolve(process.cwd(), 'src/pages'),
        '@utils': path.resolve(process.cwd(), 'src/utils'),
        '@constants': path.resolve(process.cwd(), 'src/constants'),
        '@api': path.resolve(process.cwd(), 'src/api')
    };
    return config;
}
