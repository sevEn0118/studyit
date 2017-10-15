define(["jquery","template","nprogress","cookie"],function ($,template,NProgress) {
  //从cookie中获取用户信息
	
	//页面刚一进来时就显示进步条
  NProgress.start();
  $(function () {
   
  
			NProgress.done();
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
			
			
			//点击菜单项，显示子菜单
			// 找出子菜单，给parent注册点击事件
			$(".navs>ul>li>ul").parent().click(function () {
					$(this).children("ul").stop().slideToggle();
			})
			
			//点击子菜单的时候，给li的a添加active类
			//思路：根据url与a标签的href比较，如果相同，设置a的class,
			// 当点击分类信息时，显示子菜单，当子菜单被选择时，判断ul是否有同级的a
			var activeA = $(".navs a[href='"+ location.pathname +"']");
			activeA.addClass("active");
			
			if(activeA.parent().parent().siblings("a").length >0){
				activeA.parent().parent().show();
			}
			
			//注册ajax全局事件，每次发送ajax时会有进度条，调用Nprogress
		  $(document).ajaxStart(function () {
		      NProgress.start();
		      $(".mask").show();
		  })
		  $(document).ajaxStop(function () {
		      NProgress.done();
		      $(".mask").hide();
		  })
			
  })
	
  
})




// NProgress.start();
//
// NProgress.done();

// $('.navs ul').prev('a').on('click', function () {
//   $(this).next().slideToggle();
// });