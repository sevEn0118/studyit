/**
 * Created by sevEn on 2017/10/17.
 */
define(["jquery","form","validate"],function ($) {
  
  //填写愿密码与新密码，修改密码
  //设置表单的验证validate，设置密码的正则，以及判断确认密码与密码一样
  $("form").validate({
    conditional:{
      ispass:function () {
        var repass = $("input[name='tc_new_pass']").val();
        var pass = $("#confpass").val();
        return repass == pass;
      }
    },
    description:{
      pass:{
        required:"密码不能为空",
        pattern:"6-15位的字母或数字"
      },
      repass:{
        required:"密码不能为空",
        pattern:"6-15位的字母或数字",
        conditional:"密码必须一致"
      }
    },

    sendForm:false,
    onBlur:true,
    onChange:true,
    valid:function () {
     this.ajaxSubmit({
        url:"/api/teacher/repass",
        type:"post",
        success:function (data) {
          if(data.code ==200){
            alert("密码修改成功，请重新登录");
            location.href = "/dashboard/login"
          }else{
            alert("密码输入有误")
          }
      
        }
      })
    },
    eachValidField:function () {
      this.parent().addClass("has-success").removeClass("has-error")
    },
    eachInvalidField:function () {
      //不通过验证的时候
      this.parent().addClass("has-error").removeClass("has-success")
    }
    
  
  });
  
  
 
  
})