$(function () {
  var layer = layui.layer
  var form = layui.form
  initArtCateList()
  //获取文章分类列表
  function initArtCateList() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取文章分类列表失败', { icon: 5 })
        }
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      },
    })
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    })
  })

  //通过代理行为  为表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msy('新增分类失败~', { icon: 5 })
        }
        initArtCateList()
        layer.msg('新增分类成功', { icon: 6 })
        //根据索引 关闭对应弹出层
        layer.close(indexAdd)
      },
    })
  })

  //通过代理形式 为btn 按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    // alert(1)
    //弹出一个修改文章分类的信息层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    })

    var id = $(this).data('id')
    // console.log($(this).data())

    $.ajax({
      method: 'get',
      url: '/my/article/cates/' + id,
      success(res) {
        form.val('form-edit', res.data)
      },
    })
  })

  //通过代理的形式 修改分类表单 绑定submit事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败', { icon: 2 })
        }
        layer.msg('更新分类数据成功', { icon: 1 })
        layer.close(indexEdit)
        initArtCateList()
      },
    })
  })

  //通过dialing形式 为删除按钮绑定事件
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm(
      '您确定删除吗?',
      { icon: 3, title: '提示' },
      function (index) {
        $.ajax({
          method: 'get',
          url: '/my/article/deletecate/' + id,
          success(res) {
            if (res.status !== 0) {
              return layer.msg(res.message, { icon: 5 })
            }
            layer.msg('删除分类成功!', { icon: 6 })
            layer.close(index)
            initArtCateList()
          },
        })
      }
    )
  })
})
