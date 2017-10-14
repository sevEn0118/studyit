/**
 * Created by sevEn on 2017/10/12.
 */
require.config({

  baseUrl:"/views/assets",

  paths:{
    "jquery":"jquery/jquery",
    "cookie":"jquery-cookie/jquery.cookie",
    "template":"artTemplate/template-web",
    "form":"jquery-form/jquery.form",
    "echarts":"echarts/echarts.min",
    "bootstrap":"bootstrap/js/bootstrap",
    "utils":"../static/lib/utils"
  },
  shim:{
    "bootstrap":{
      deps:["jquery"]
    }
  }
})

