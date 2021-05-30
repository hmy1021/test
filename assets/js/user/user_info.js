$(function () {
  //   alert(1)
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    },
  })

  initUserInfo()
  //初始化 用户基本信息
  function initUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success(res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败!', { icon: 2 })
        }

        //   调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }

  //重置表单数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  //监听表单提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: form.val('formUserInfo'),
      success(res) {
        // console.log(res)
        console.log(form.val('formUserInfo'))
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败', { icon: 2 })
        }
        layer.msg('更新用户信息成功', { icon: 1 })
        //调用父页面中方法,重新渲染用户头像和用户信息
        console.log(window.parent)
        window.parent.getUserInfo()
      },
    })
  })
})
