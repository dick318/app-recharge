/**
 * 环境检测
 */
const userAppTag = 'MWYBrowser'
const doctorAppTag = 'MWYSBrowser'
const detect = {}
const isBrowser = typeof navigator !== 'undefined'

if (isBrowser) {
  const ua = navigator.userAgent

  detect.ua = ua

  detect.isAndroid = ua.indexOf('Android') > -1

  detect.isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  detect.isWKWebview = !!window.wyjs_is_wkwebview

  detect.isUserApp = ua.indexOf(userAppTag) > -1

  detect.isDoctorApp = ua.indexOf(doctorAppTag) > -1

  detect.isIPhone = ua.indexOf('iPhone') > -1

  detect.isIPhonex = detect.isIPhone && (window.screen.width * window.screen.height === 304500)

  detect.isApp = detect.isUserApp || detect.isDoctorApp

  detect.isWeixin = ua.toLowerCase().indexOf('micromessenger') > -1

  const tag = detect.isUserApp ? userAppTag : detect.isDoctorApp ? doctorAppTag : ''
  detect.appVersion = tag ? parseInt(ua.substr(ua.indexOf(tag) + tag.length + 1, 5).replace(/\./g, '')) : 0
}

export default detect
