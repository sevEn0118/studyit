/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","template","utils","ckeditor","form"],function ($,template,utils,CKEDITOR) {
    //设置课程添加的基本信息
   //发送ajax请求，获取课程信息，然后模版引擎，渲染到页面上
  //点击保存按钮，通过form的submit发送ajax请求，更改数据，并且跳转到课程图片的页面
  
  //通过url获取到id
  var id = utils.getUrl("id");
  $.ajax({
    url:"/api/course/basic",
    type:"get",
    data:{
      cs_id:id
    },
    success:function (data) {
        if(data.code ==200){
          console.log(data);
          //通过模版渲染到页面上
          $(".steps").html(template("course-basic-tpl",data.result));
          //设置课程描述的富文本ckeditor
          CKEDITOR.replace("cs_brief");
        }
    }
  })
  //基本信息更新完成，点击保存，发送ajax请求，保存数据，并且跳转到课程图片
  $(".steps").on("submit","form",function () {
    $(this).ajaxSubmit({
      url:"/api/course/update/basic",
      type:"post",
      data:{
        cs_id:id
      },
      success:function (data) {
          if(data.code ==200){
            // console.log(data);
            location.href = "/course/cover?id="+data.result.cs_id;
          }
      }
    })

      return false;
  })
  
  
})