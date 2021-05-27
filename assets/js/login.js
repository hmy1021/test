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
})
