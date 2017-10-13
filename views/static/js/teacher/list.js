/**
 * Created by sevEn on 2017/10/13.
 */
define(["jquery","template","bootstrap"],function ($,template) {
  
  //引用过滤器，设置讲师年龄
  template.defaults.imports.getage = function(value){
    return new Date().getFullYear()-new Date(value).getFullYear();
  };
  
  
  //首先发送ajax，请求教师列表数据
  // 通过模版引擎，渲染到页面上
  $.ajax({
    url:"/api/teacher",
    type:"get",
    success:function (data) {
      if(data.code ==200){
        console.log(data);
        // 判断年龄
        // 遍历result，把获取到的结果存在result中，在模版中获取
        // data.result.forEach(function (v,i) {
        //     v.age = new Date().getFullYear()-new Date(v.tc_birthday).getFullYear();
        // })
  
        // 创建模版
        $("#teacher-list").html(template("teacher-list-tpl",data));
      }
      
    }
  })
  
  //给所有的查看按钮注册点击事件，显示模态框
  //由于按钮都是模版动态获取的，因此需要注册事件委托
  $("#teacher-list").on("click",".btn-check",function () {
    //发送ajax请求，获取信息，创建模态框的模版
    var id =$(this).parent().data("id");
    console.log(id);
    $.ajax({
      url:"/api/teacher/view",
      type:"get",
      data:{
        tc_id:id
      },
      success:function (data) {
        if(data.code ==200){
          console.log(data);
          //设置模态框的模版
          $("#teacher-info").html(template("teacher-info-tpl",data.result));
          //点击查看按钮，模态框显示
          $("#teacherModal").modal("show");
        }
       
      }
    })
    
    
  })
  
  
  
})