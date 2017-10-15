/**
 * Created by sevEn on 2017/10/14.
 */
define(["utils","jquery","template","form","datepicker","datepickerCN","validate"],function (utils,$,template) {
    //设置讲师管理，添加与编辑讲师
    // 由于添加与编辑在同一个页面显示，
  // 不同点：
  //  添加:url:teacher/manger
  //      二级导航：讲师添加
  //      密码框：有
  //      添加按钮：发送ajax请求，/teacher/add
  //  编辑:url:teacher/manger?id=20
  //直接发送ajax请求，获取id的讲师信息，渲染到页面上
  // 由于url已经传入了id，直接获取url中的id值
  //      二级导航：讲师编辑
  //      密码框：没有
  //      保存按钮/teacher/update
  
  // 点击按钮后跳转到teacher/list
  
  // 获取url的id值,封装函数
  //   如果没有这个值为undefind
  // console.log(utils.getUrlObj());
  var id = utils.getUrl("id");
  console.log(id);
  var data={};
  if(id){
    //编辑功能
    // alert("编辑功能");
    data.title ="讲师编辑";
    data.button="保 存";
    // 点击按钮后，发送ajax请求的地址
    data.url ="/api/teacher/update";
    // 需要发送ajax请求，填充内容
    $.ajax({
      url:"/api/teacher/edit",
      type:"get",
      data:{
        tc_id:id
      },
      success:function (msg) {
        if(msg.code == 200){
          data.result = msg.result;
          renderData();
          // console.log(data);
        }
        
      }
      
    })
    //点击保存按钮，保存修改的信息，发送ajax
    
    
  
  }else{
    //添加功能
    // alert("添加功能");
    data.title ="讲师添加";
    data.button ="添 加";
    data.url ="/api/teacher/add";
    data.result = {
      tc_gender : "0"
    };
    renderData();
    
    
  }
  // 知道是哪个功能后，如何显示在页面上
  //自己定义data数据，使用模版，渲染到页面上
  function renderData() {
    $(".body.teacher").html(template("mange-tpl",data));
    // 模版创建好之后，设置日期的插件
    $("input[name='tc_join_date']").datepicker({
      format:"yyyy-mm-dd",
      language:"zh-CN",
      autoclose: true
    
    })
    
    //使用validate对表单进行验证
    $("form").validate({
      conditional:{
        isweb:function (value) {
            return value != "前端学院";
        }
      },
      description:{
        name:{
          required:"用户名不能为空",
          conditional:"不能为前端学院"
          
        },
        pass:{
          required:"密码不能为空",
          pattern:"6-15位的字母或数字"
          
        },
        joindate:{
           required:"不能为空"
        }
      },
      
      //表单验证是否提交表单
      sendForm:false,
      onBlur:true,
      onChange:true,
      valid:function () {
          //表单全部通过验证后，调用此函数，
        // 可以再发送ajax请求，this指向form的jquery对象
        this.ajaxSubmit({
          success:function (data) {
            if(data.code ==200){
              console.log(data);
              location.href = "/teacher/list"
            }
          }
        })
      },
      eachValidField:function () {
          //当表单通过验证时，表单变为绿色，加上类样式，has-success
        // this指向这个input,给form添加样式
        this.parent().addClass("has-success").removeClass("has-error")
      },
      eachInvalidField:function () {
          //不通过验证的时候
        this.parent().addClass("has-error").removeClass("has-success")
      }
    });
    
  }
  
  
  //编辑功能，点击保存按钮，保存修改的信息，发送ajax，需要发送tc_id
  
  // 点击按钮，发送ajax请求
  //填写form表单，根据form的action=url 与method="post",发送不同的ajax请求
  // form必须有name属性才可以提交
  // 由于form是模版动态创建的，需要注册事件委托,给form表单注册submit事件
  //
  //由于通过validate插件已经发送了ajax请求
  // $(".body.teacher").on("submit","form",function () {
  //     $(this).ajaxSubmit({
  //       success:function (data) {
  //         if(data.code ==200){
  //           console.log(data);
  //           location.href = "/teacher/list"
  //         }
  //       }
  //     })
  //   return false;
  // })
  
})