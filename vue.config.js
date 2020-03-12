module.exports = {
  lintOnSave: false,
  devServer: {
    host: "localhost",
  	port: 8080, // 端口号
  	https: false, // https:{type:Boolean}
  	open: true, //配置自动启动浏览器
  	proxy: {
  		'/v1': { //代理api
  			target: 'http://127.0.0.1:8888/api/private/v1/',//服务器api地址
  			ws: true,// proxy websockets
  			changeOrigin: true,//是否跨域
  			pathRewrite: { //重写路径
  				// '^/v1': ''
  			}
  		}
  	}
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}