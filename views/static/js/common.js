define(["jquery","template","cookie"],function ($,template) {
  //从cookie中获取用户信息
  
  // 由于不是登录页面，才需要从cookie中获取用户信息
  if(location.pathname !="/dashboard/login"){
  	// 判断用户是否已经登录
  	// 注意：工作中，判断用户是否登录，是后台提供接口，前端向后台发送请求，后台会返回登录状态信息
		//先根据cookie中是否有PHPSESSID
		if(!$.cookie("PHPSESSID")){
			location.href = "/dashboard/login";
			
		}
  	
    var userinfo = $.cookie("userinfo");
    userinfo = JSON.parse(userinfo);
    // console.log(userinfo);
    //"http://static.botue.com/images/avatar/59d78d5cdb0e9.jpg"
    // tc_name:"前端学院"
    // 根据获取到的info，创建模版，存放在aside的个人信息中
    $("#user-info").html(template("profile-tpl",userinfo));
  }
  
  // 设置退出按钮,注册点击事件
	$("#btn-logout").click(function () {
	 
		//退出时，需要给后台发送ajax请求，后台删除cookie，session
		$.ajax({
			url:"/api/logout",
			type:"post",
			success:function (data) {
        // console.log(data);
        if(data.code ==200){
        	// 跳回到登录页面
          location.href = "/dashboard/login";
				}
      }
		})
		
	})
	
  
})




// NProgress.start();
//
// NProgress.done();

// $('.navs ul').prev('a').on('click', function () {
//   $(this).next().slideToggle();
// });