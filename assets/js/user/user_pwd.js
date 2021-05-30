$(function () {
  var form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同~'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次输入的密码不一致~'
      }
    },
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message, { icon: 5 })
        }
        layui.layer.msg('更新密码成功~', { icon: 6 })
        //重置密码
        $('.layui-form')[0].reset()
      },
    })
  })
})
