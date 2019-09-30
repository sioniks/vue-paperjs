module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dist/check/" : "/",
  
  outputDir: 
  process.env.NODE_ENV === "production"
  ? "../../../wwwroot/dist/check/"
  : "dist",
  
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("html").tap(args => {
        //args[0].inject = false;
        args[0].template = "_VueGenerated.cshtml.ejs";
        args[0].filename = "../../../Areas/ComplianceCheck/Views/Check/Index.cshtml";
        args[0].minify = false;
        return args;
      });
    }
  },
  
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/scss/_mixin.scss";
            @import "@/scss/_fonts.scss";
          `
      }
    }
  },
};
