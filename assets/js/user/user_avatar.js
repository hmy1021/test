$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //为上传按钮绑定点击事件
  $('#btnChooseImage').click(function () {
    $('#file').click()
  })

  //为文件选择框绑定change 事件
  $('#file').on('change', function (e) {
    //获取用户选择的文件
    var filelist = e.target.files

    // console.log(e)
    if (filelist.length === 0) {
      return layer.msg('请选择照片~', { icon: 5 })
    }
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    // var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    // $image
    //   .cropper('destroy') // 销毁旧的裁剪区域
    //   .attr('src', imgURL) // 重新设置图片路径
    //   .cropper(options) // 重新初始化裁剪区域

    //扩展
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      //   console.log(reader.result)
      $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', reader.result) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    }
  })

  //为确定按钮 绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //2 调用接口  吧头像上传到服务器
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg('更新头像失败', { icon: 5 })
        }
        layer.msg('更换头像成功', { icon: 6 })

        window.parent.getUserInfo()
      },
    })
  })
})
