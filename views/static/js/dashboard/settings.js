/**
 * Created by sevEn on 2017/10/15.
 */
define(["jquery","ckeditor","template","uploadify","cookie","datepicker","datepickerCN","region","form"],function ($,CKEDITOR,template) {
  $(function () {
    //设置个人中心
    // 1，先发送ajax请求，获取个人中心的信息,通过模版引擎渲染到页面上
    $.ajax({
      url:"/api/teacher/profile",
      type:"get",
      success:function (data) {
          if(data.code ==200){
            console.log(data);
            $(".settings").html(template("setting-tpl",data.result));
            
            //加载头像上传插件,异步上传头像
            $("#upfile").uploadify({
              //插件的flash文件
              "swf":"/views/assets/uploadify/uploadify.swf",
              // 文件上传的地址
              "uploader":"/api/uploader/avatar",
              //需要的参数data
              "fileObjName":"tc_avatar",
              width:120,
              height:120,
              buttonText: "",
              itemTemplate: "<p></p>",
              onUploadSuccess:function (file,data) {
                data = JSON.parse(data);
                if(data.code ==200){
                  $(".preview>img").attr("src",data.result.path);
                  // 更新头像
                  var str = JSON.parse($.cookie('userinfo'));
                  str.tc_avatar = data.result.path;
                  str = JSON.stringify(str);
                  $.cookie('userinfo',str,{
                    path:"/",
                    expires:365
                  })
                  $(".avatar.img-circle>img").attr("src",data.result.path);
                }
              }
            })
            
            // 2.设置日期的插件
            $("input[name='tc_join_date'],input[name='tc_birthday']").datepicker({
              format: 'yyyy-mm-dd',
              language:"zh-CN",
              autoclose: true
              
            })
            
            // 3,设置省市级三级联动
            // 使用jquery-validate
            // 1,获取select父元素
            //2,给select设置id = p c d
            //3.由于需要设置默认选中项，可以使用data-id来指定选中的内容
            $("#region").region({
              url:"/views/assets/jquery-region/region.json"
            })
            
            //4,设置富文本编辑
            CKEDITOR.replace("tc_introduce",{
              toolbarGroups: [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                { name: 'links' },
                { name: 'insert' },
                // { name: 'forms' },
                // { name: 'tools' },
                { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                // { name: 'others' },

                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                // { name: 'styles' },
                // { name: 'colors' },
                // { name: 'about' }
              ]
            });
            
            
            
            
            
          }
      }
    })
    
    
    //点击保存按钮，发送ajax请求，保存更改的数据
    // 给form注册submit事件,由于form动态获取的，需要注册事件委托
    $(".settings").on("submit","form",function () {
        //设置form提交插件
      $(this).ajaxSubmit({
        url:"/api/teacher/modify",
        type:"post",
        data:{
          tc_hometown:$("#p>option:selected").text()+"|"+$("#c>option:selected").text()+"|"+$("#d>option:selected").text(),
        },
        success:function (data) {
          console.log(data);
        }
        
      })
      return false;
    })
    
   
   
  })
  

})