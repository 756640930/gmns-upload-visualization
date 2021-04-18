
module.exports = {
  // Base path
  publicPath:  process.env.NODE_ENV === 'production'
  ? '/pagetest/'
  : './',  // Can be set to a relative path, so that all resources will be linked as a relative path, and the typed package can be deployed in any path
}
