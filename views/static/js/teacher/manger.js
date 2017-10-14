/**
 * Created by sevEn on 2017/10/14.
 */
define(["utils"],function (utils) {
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
  
})