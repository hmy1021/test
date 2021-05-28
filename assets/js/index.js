$(function () {
  //调用用户的基本信息
  getUserInfo()

  //退出
  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    //提示用户是否退出
    layer.confirm(
      '您确定退出吗?',
      { icon: 3, title: '提示' },
      function (index) {
        //清空本地存储的token
        localStorage.removeItem('token')
        //从新跳转到首页
        location.href = '/login.html'
        //关闭confirm 询问框
        layer.close(index)
      }
    )
  })
})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success(res) {
      console.log(localStorage.getItem('token'))
      console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败~', { icon: 5 })
      }
      //调用renderAvatar 渲染用户头像
      renderAvatar(res.data)
    },
  })
}

//渲染用户头像
function renderAvatar(user) {
  //   console.log(user)
  var name = user.nickname || user.username

  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

  if (user.user_pic !== null) {
    $('.layui-nav-img').prop('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    console.log(name)
    $('.text-avatar').html(first).show()
  }
}
