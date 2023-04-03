const path = require('path')
import mkcert from 'vite-plugin-mkcert'

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  plugins: [ 
    mkcert()
  ],
  server: {
    port: 8085,
    hot: true,
    https: true
  }
}
