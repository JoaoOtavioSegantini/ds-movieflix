const path = require('path')

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@images': path.resolve(__dirname, 'src/core/assets/images/'),
      '@components': path.resolve(__dirname, 'src/core/components/'),
      '@type': path.resolve(__dirname, 'src/core/types/'),
      '@utils': path.resolve(__dirname, 'src/core/utils/'),
      '@mock': path.resolve(__dirname, 'jest/')
    }
  }
  return config
}
