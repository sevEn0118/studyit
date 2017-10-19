/**
 * Created by sevEn on 2017/10/18.
 */
define(["jquery","utils","template","bootstrap","form"],function ($,utils,template) {

  //1,获取url的id值
  var cs_id = utils.getUrl("id");
  
  //2，发送ajax请求，创建模版渲染页面
  $.ajax({
    url:"/api/course/lesson",
    type:"post",
    data:{
      cs_id:cs_id
    },
    success:function (data) {
        if(data.code ==200){
          console.log(data);
          // 创建模版
          $(".steps").html(template("lessons-tpl",data.result));
        }
    }
  })
  
  //3.给添加课时与编辑添加click事件，打开模态框，进行编辑
  $(".steps").on("click",".btn-edit,.btn-add",function () {
    // 由于添加课时与编辑课时，模态框显示的内容不同
    // 所以需要动态渲染模态框
    // 如何判断是哪个按钮呢
    //由于编辑请求数据时需要发送ct_id，因此给编辑添加一个data-id
    // 因此判断是否有data-id，如果有值，则为编辑
    //判断编辑与添加内容的不同点
    var ct_id = $(this).data("id");
    var data = {};
    if(ct_id){
      //编辑.,上传数据时，需要一个ct_id的input
      data.title = "编辑课时";
      data.buttonText = "保 存";
      data.url = "/api/course/chapter/modify";
      // 获取数据渲染
      $.ajax({
        url:"/api/course/chapter/edit",
        type:"get",
        data:{
          ct_id:ct_id
        },
        success:function (msg) {
          console.log(msg);
          // 把msg.result的值赋值给data
          $.extend(data,msg.result);
          //创建模版，渲染
          renderlist();
        }
      })
      
    }else{
      // 添加
      data.title = "添加课时";
      data.buttonText = "添 加";
      data.url = "/api/course/chapter/add";
      renderlist();
      
    }
    function renderlist() {
      // 创建模版
      $(".modal-content").html(template("lessons-edit-tpl",data));
      $("#chapterModal").modal("show");
    }
   
    
    
  })
  
  // 利用form的submit，添加事件委托
  $(".modal-content").on("submit","form",function () {
    $(this).ajaxSubmit({
      data:{
        ct_cs_id:cs_id,
        ct_is_free:$("#isfree").is(":checked")?1:0
      },
      success:function (data) {
          if(data.code ==200){
            // console.log(data);
            // 刷新页面
            //关闭模态框
            $("#chapterModal").modal("hide");
            // 可以局部刷新列表,获取课时列表，遍历lessons
            $.ajax({
              url:"/api/course/lesson",
              type:"get",
              data:{
                cs_id:cs_id
              },
              success:function (data) {
                 $(".lessons").html(template("lesson-list-tpl",data.result));
                  
              }
            })
          }
      }
    
    
    })
      
      return false;
  })

})