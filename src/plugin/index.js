import OSS from 'ali-oss';



function setCookie (name, val, path, date) {
  let oDate = new Date()
  oDate.setDate(oDate.getDate() + (date || 30))
  const sDate = ';expires=' + oDate
  const Path = ';path=' + (path || '/')
  document.cookie = name + '=' + val + sDate + Path
}

function getCookie (name) {
  const sCookies = document.cookie
  const arr = sCookies.split('; ')
  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split('=')
    if (arr2[0] === name) {
      return arr2[1]
    }
  }
}

function delCookie (name) {
  setCookie(name, '', '', -1)
}

//判断浏览器的版本 判断是否是微信浏览器
var browser={
  versions:function(){
      var u = navigator.userAgent, app = navigator.appVersion;
      console.log(u)
      return {
          weixin: u.indexOf('MicroMessenger') != -1,
          trident: u.indexOf('Trident') > -1, //IE
          presto: u.indexOf('Presto') > -1, //opera
          webKit: u.indexOf('AppleWebKit') > -1, //webkit
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //firefox
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //mobile
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android or uc
          iPhone: u.indexOf('iPhone') > -1 , //iPhone QQHD
          iPad: u.indexOf('iPad') > -1, //iPad
          webApp: u.indexOf('Safari') == -1
      };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

function AppUrl(){
  let versionType = browser.versions

  // 微信默认打开应用宝
  if (versionType.weixin) {
    window.location.href  = ""
  }

  if (versionType.ios) {
    window.location.href = ""
  } else {
    window.location.href = ""

    let t1 = Date.now();
    let hasApp = true;

    setTimeout(function () {    //t的时间就是出发APP启动的时间，若APP启动了，再次返回页面时t2这行代码执行，hasApp即为true。反之若APP没有启动即为false
      let t2 = Date.now();
      hasApp = !(!t1 || t2 - t1 < 1000 + 150);
      
    } , 1000);

    setTimeout(function () {  //没有安装APP则跳转至应用宝下载，延时时间设置为2秒
      if(!hasApp){
        window.location.href = ""
      }
    } , 2000);
  }
}


/*
*
* 手机号
* GZ
* */
function isPhone (tel) {
  return !!tel.toString().match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
}
/*
*
* 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
* GZ
*
* */
function isCardNo(card){

  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(card.toString());

}

/*
*
*
* OSS 配置
* */

function OSSConfig() {
  return new OSS({
    region:"oss-cn-hangzhou",
    accessKeyId: 'LTAIWdQJ7wCZeAe3',
    accessKeySecret: 'TJvqnChNIqOUREaCb8VPmVZoKUMhSZ',
    // stsToken: '',
    bucket: 'carbinet'
  })

}




/*
*
* 时间大小对比
* */
function TimeSzie(first,last) {
  let datasTime = new Date(first).getTime()
  let valueTime = new Date(last).getTime()
  if(datasTime > valueTime) {
    return true
  }
  return false
}

/*
*
* 数字校验
*
* */

function isNumber(data) {
  return /.*\d.*/.test(data)
}


/*
*
* 中文匹配
* */

function isChinese(data) {
  return /[\u4e00-\u9fa5]/.test(data)
}

/*
*
* 中文与字母匹配
* */
function isW(data) {
  return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(data)
}

/*
* 数字字母匹配
*
* */
function isNumber_AZ(data) {
  return /^[a-zA-Z\d]+$/.test(data)
}

/*数字小数点校验*/
function circleNumber(data) {
  return /^\d+(\.\d+)?$/.test(data)
}



export default {
	card: /^(\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	phone: /^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$/,
	setCookie,
	getCookie,
  delCookie,
  AppUrl,
  isPhone,
  isCardNo,
  OSSConfig,
  TimeSzie,
  isNumber,
  isChinese,
  isW,
  isNumber_AZ,
  circleNumber,
}
