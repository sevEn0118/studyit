/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","template","utils","uploadify","jcrop","form"],function ($,template,utils) {
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
        
        // 给裁切插件注册事件
        $(".preview").on('cropstart cropmove cropend',function (e,s,c) {
            // console.log(c);
          // 可以获取到需要裁切的图片的x,y,w,h
          //如何把裁切好的图片的内容传递出去到保存中，可以添加input：hidden，发送ajax请求时直接上传form
          $("input[name='x']").val(c.x);
          $("input[name='y']").val(c.y);
          $("input[name='w']").val(c.w);
          $("input[name='h']").val(c.h);
          
        })
        
        
        //1----给裁切按钮注册插件Jcrop
        $("#crop-btn").click(function () {
          var type= $(this).data("type");
          if(type =="crop"){
            
  
            $(".preview>img").Jcrop({
    
              // 剪切框在的位置
              setSelect:[0,0,200,100],
              boxWidth:400
    
            },function () {
              //1由于缩略小图对于大图是定位，jcrop-thumb的类
              //根据源码，设置缩略图添加在小图thumb中
              //因此可以在小图里添加缩略图
              var jcrop_api = this;
              var thumb = jcrop_api.initComponent('Thumbnailer', { width: 240, height: 120,container:".thumb" });
            })
            //2。点击裁切的之后，按钮改为保存图片
            $(this).text("保存图片");
            $(this).data("type","save");
            // 点击保存图片之后，应该直接发送ajax请求，保存裁切好的图片
            // 给按钮注册data-type=crop，当点击裁切按钮时，修改type
          
          }else{
            //保存功能
            // alert("保存");
            //选择好需要裁切之后，如何判断需要裁切的位置,保存图片
            $("form").ajaxSubmit({
              url:"/api/course/update/picture",
              type:"post",
              data:{
                cs_id:id
              },
              success:function (data) {
                  if(data.code ==200){
                    // console.log(data);
                    // 跳转到第三步，课时管理
                    location.href = "/course/lessons?id="+data.result.cs_id;
                  }
              }
            })
            
            
          }
          
         
  
          
          
        })
        
        
        
      }
     
    }
    
  })
  
  
})