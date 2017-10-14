/**
 * Created by sevEn on 2017/10/14.
 */
define(function () {
  return {
    getUrlObj:function () {
      var kvp = location.search.split("?")[1].split("&");
      // var kvp = location.search.slice(1).split("&");
      var obj={};
      for (var i = 0; i < kvp.length; i++) {
        var kv =kvp[i].split("=");
        obj[kv[0]]=kv[1];
      }
      return obj;
    },
    getUrl:function (key) {
      return this.getUrlObj()[key];
    }
  }
  

})