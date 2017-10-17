/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","template"],function ($,template) {
  //设置课程列表
  //获取ajax请求，获取课程列表的信息，然后通过模版引擎渲染到页面中
  $.ajax({
    url:"/api/course",
    type:"get",
    success:function (data) {
        if(data.code ==200){
          console.log(data);
          $(".courses").html(template("course-list-tpl",data));
        }
    }
  })

})