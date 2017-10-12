/**
 * Created by sevEn on 2017/10/12.
 */
define(['jquery',"cookie"],function ($) {
  
    //设置登录按钮，由于form表单submit事件可以提交数据，并且通过enter可以提交数据
    $("form").submit(function () {
      //判断输入的用户名与密码为空时，提醒用户
      if($("input[name=tc_name]").val().trim() ==""){
        alert("请输入用户名");
        return false;
      }
      if($("input[name=tc_pass]").val().trim() ==""){
        alert("请输入密码");
        return false;
      }

//        表单序列化，获取用户输入的表单信息
      var data = $(this).serialize();
//        发送ajax请求
      $.ajax({
        url:"/api/login",
        type:"post",
        data:data,
        success:function (data) {
          console.log(data);
          if(data.code == 200){
//              由于返回的数据中result中有aside里的讲师用户信息
//              需要把信息存在cookie中，方便首页显示
//              由于cookie中只能存储字符串，因此需要把对象转为字符串，获取的时候在转回对象
            $.cookie("userinfo",JSON.stringify(data.result),{path:"/",expires: 365});

//              登录成功，跳转到首页，直接修改url
            location.pathname = "/";
          }
        }
      })
      
      //阻止form的默认事件，通过ajax获取后台数据
      return false;
    })
    
  
})


