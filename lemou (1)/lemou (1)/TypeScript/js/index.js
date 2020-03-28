$(function () {
  /* 
   *count记录输入手势密码次数
   * pwd1第一次输入的手势密码
   */
  let count = 0,
    pwd1 = null,
    lis = $('li')
  $('.again,.disagree,.limit').hide()

  $("#gesturepwd").GesturePasswd({
    backgroundColor: "white", //背景色
    color: "#E4E4E4", //主要的控件颜色
    roundRadii: 25, //大圆点的半径
    pointRadii: 6, //大圆点被选中时显示的圆心的半径
    space: 30, //大圆点之间的间隙
    width: 240, //整个组件的宽度
    height: 240, //整个组件的高度
    lineColor: "red", //用户划出线条的颜色
    zindex: 100 //整个组件的css z-index属性
  });
  $("#gesturepwd").on("hasPasswd", function (e, passwd) {
    var result;
    count++
    console.log(count)
    if (passwd === "") {
      return
    }
    if (passwd.length < 4) {
      $("#gesturepwd").trigger("passwdWrong");
      $('.limit').show()
      count = 0
      return
    }
    if (localStorage.passwd === "" || localStorage.passwd == undefined) {
      localStorage.passwd = passwd
    } else {
      count = 3
    }
    if (count == 1) {
      if (passwd.length < 4) {
        $("#gesturepwd").trigger("passwdWrong");
        $('.limit').show()
        count = 0
        return
      }
      $('.limit').hide()
      pwd1 = passwd
      lis.each(function (i, ele) {
        if (passwd.indexOf(i + 1) != -1) {
          $(this).css({
            backgroundColor: 'red'
          })
        }
      })
      $("#gesturepwd").trigger("passwdWrong");
    }

    $('.againcn').show()

    if (count >= 2) {
      $('.again').hide()
      if (passwd == localStorage.passwd) {
        result = true;
      } else {
        result = false;
      }
      if (result == true) {
        $("#gesturepwd").trigger("passwdRight");
        $('.disagreecn').hide()
        setTimeout(function () {
          //密码验证正确后的其他操作，打开新的页面等。。。
          alert('密码正确')
        }, 500); //延迟半秒以照顾视觉效果
      } else {
        $("#gesturepwd").trigger("passwdWrong");
        //密码验证错误后的其他操作。。。
        $('.disagreecn').show()
      }
    }

  });
  //重新绘制
  $('.clear_again').click(function () {
    count = 0
    pwd1 = null
    $('.again,.disagree').hide()
    lis.each(function (i, ele) {
      $(this).css({
        backgroundColor: 'white'
      })

    })
  })
})