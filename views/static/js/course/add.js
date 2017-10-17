/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","form"],function ($) {
  //设置课程添加
  // 点击课程添加，跳转到创建课程页面
  // 给form注册submit事件
  $("form").submit(function () {
      //获取写的课程名称，发送ajax请求，跳转到basic页面
    $(this).ajaxSubmit({
      url:"/api/course/create",
      type:"post",
      success:function (data) {
          if(data.code ==200){
            console.log(data);
            location.href = "/course/basic?id="+data.result.cs_id;
          }
      }
    })
    return false;
  })
  
})