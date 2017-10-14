/**
 * Created by sevEn on 2017/10/14.
 */
define(["utils","jquery","template","form","datepicker","datepickerCN"],function (utils,$,template) {
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
    data.result = {};
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
  }
  
  
  
  
  //编辑功能，点击保存按钮，保存修改的信息，发送ajax，需要发送tc_id
  
  // 点击按钮，发送ajax请求
  //填写form表单，根据form的action=url 与method="post",发送不同的ajax请求
  // form必须有name属性才可以提交
  // 由于form是模版动态创建的，需要注册事件委托,给form表单注册submit事件
  $(".body.teacher").on("submit","form",function () {
      $(this).ajaxSubmit({
        success:function (data) {
          if(data.code ==200){
            console.log(data);
            location.href = "/teacher/list"
          }
        }
      })
    return false;
  })
  
})