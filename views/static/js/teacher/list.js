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
    // console.log(id);
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
  
  //设置注销与启用
  // tc_status  0 已启用状态，按钮显示的是注销，颜色是黄色
  // tc_status  1 已注销状态，按钮显示的是启用，颜色是绿色
  // 当点击按钮，需要修改tc_status，向后台发送请求，修改状态
  // 给按钮住的事件委托
  
  $("#teacher-list").on("click",".btn-status",function () {
    $this = $(this);
    var id =$this.parent().data("id");
    var status=$this.data("status");
    var that =$this;
    $.ajax({
      url:"/api//teacher/handle",
      type:"post",
      data:{
        tc_id:id,
        tc_status:status
      },
      success:function (data) {
        console.log(data);
        if(data.code == 200){
          // 如果请求成功，需要直接修改状态，而不是再重新刷新
          // 1.需要修改data-status的状态值
          // 2.修改按钮与颜色
          // tc_status  0 已启用状态，按钮显示的是注销，颜色是黄色
          // tc_status  1 已注销状态，按钮显示的是启用，颜色是绿色
          
          // 第一种方法，if else
          // var tc_status = data.result.tc_status;
          // that.data("status",tc_status);
          // if(tc_status == 0 ){
          //   that.removeClass("btn-success").addClass("btn-warning");
          //   that.text("注 销");
          //
          // }else{
          //   that.removeClass("btn-warning").addClass("btn-success");
          //   that.text("启 用");
          // }
  
          // 使用三元表达式
          var isTrue = data.result.tc_status == 0;
          console.log(isTrue);
          that.text(isTrue ? "注 销":"启 用");
          that.removeClass(isTrue ? "btn-success":"btn-warning")
              .addClass(isTrue ? "btn-warning":"btn-success")
              .data("status",data.result.tc_status);
          
          
          
        }
        
        
      }
      
    })
    
  })
  
  
  
  
})