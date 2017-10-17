/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","template","utils","uploadify"],function ($,template,utils) {
  //课程图片的添加
  // 1，先发送ajax请求，获取基本信息，创建模版引擎
  // 2，设置选择图片按钮，使用upload插件
  // 3，裁切图片的插件
  var id = utils.getUrl("id");
  $.ajax({
    url:"/api/course/picture",
    type:"get",
    data:{
      cs_id:id
    },
    success:function (data) {
      if(data.code ==200){
        console.log(data);
        //创建模版
        $(".steps").html(template("course-cover-tpl",data.result));
        
        //给选择图片按钮，添加uploadify
        $("#upload-btn").uploadify({
          swf:"/views/assets/uploadify/uploadify.swf",
          // 发送请求的后台地址
          uploader:"/api/uploader/cover",
          fileObjName:"cs_cover_original",
          buttonText:"选择图片",
          buttonClass:"btn btn-success btn-sm",
          width:70,
          height:30,
          formData:{cs_id:id},
          //去掉进度条
          itemTemplate: "<p></p>",
          onUploadSuccess:function (file,data) {
            
            //data是字符串格式
            data = JSON.parse(data);
            // 把上传的数据更新在图片上
            $(".preview>img").attr("src",data.result.path);
            $(".thumb>img").attr("src",data.result.path);
            //关于裁切按钮,当图片上传之后，启动按钮
            $("#crop-btn").prop("disabled",false);
            
  
          }
          
          
        })
        $("#upload-btn-button").css("line-height",1.5);
        
      }
     
    }
    
  })
  
  
})