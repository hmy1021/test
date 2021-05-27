$(function () {
  // 点击去注册链接
  $('#link_reg').on('click', function () {
    // alert(1)
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  //从layui 中获取form 对象
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()

      if (pwd !== value) {
        return '两次密码不一致'
      }
    },
  })

  //监听表单注册的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    }
    // console.log(data)
    $.ajax({
      url: '/api/reguser',
      type: 'post',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 2 })
        }
        layer.msg('注册成功,请登录~', { icon: 1 })
        //模拟人为点击事件
        $('#link_login').click()
      },
    })
  })

  //监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    //阻止默认提交行为
    e.preventDefault()
    console.log($(this).serialize())
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 2 })
        }
        layer.msg('登录成功', { icon: 1 })
        //将登录成功的token 存到localstorage
        console.log(res)
        localStorage.setItem('token', res.token)
        //跳转到首页
        location.href = '/index.html'
      },
    })
  })
})
