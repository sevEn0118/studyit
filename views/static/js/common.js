$(function () {
    //从cookie中获取用户信息
	
	// 由于不是登录页面，才需要从cookie中获取用户信息
	if(location.pathname !="/dashboard/login"){
		var userinfo = $.cookie("userinfo");
		userinfo = JSON.parse(userinfo);
    // console.log(userinfo);
		//"http://static.botue.com/images/avatar/59d78d5cdb0e9.jpg"
    // tc_name:"前端学院"
    // 根据获取到的info，创建模版，存放在aside的个人信息中
		$("#user-info").html(template("profile-tpl",userinfo));
  }
	
	
	
})