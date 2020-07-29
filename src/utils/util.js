/*
 * @version: v 1.0.0
 * @Github: https://github.com/GitHubGanKai
 * @Author: GitHubGanKai
 * @Date: 2019-09-20 14:07:34
 * @LastEditors: gankai
 * @LastEditTime: 2020-03-22 19:54:08
 * @FilePath: /vue-jd-h5/src/utils/util.js
 */
// 存储localStorage
export const setStore = (name, content) => {
  if (!name) return
  localStorage.setItem(name, JSON.stringify(content))
}

// 获取localStorage
export const getStore = name => {
  if (!name) return
  return JSON.parse(localStorage.getItem(name))
}

export function removeSpace (value) {
  return value.replace(/\s+/g, '')
}

export function formValidate (val, type) {
  const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
  const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (val === '') {
    return false
  } else {
    // 非空验证
    if (type === 'require') {
      return !!removeSpace(val)
    }
    if (type === 'phone') {
      return phoneReg.test(val)
    }
    if (type === 'email') {
      return emailReg.test(val)
    }
  }
}

// 获取url参数
export function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

// 数组去重
export function dedupe (array) {
  return Array.from(new Set(array))
}

// 去除重复对象
export function dedupeObject (obj) {
  var uniques = []
  var stringify = {}
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i])
    keys.sort(function (a, b) {
      return (Number(a) - Number(b))
    })
    var str = ''
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j])
      str += JSON.stringify(obj[i][keys[j]])
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i])
      stringify[str] = true
    }
  }
  return uniques
}

export const ModalHelper = ((bodyCls) => {
  let scrollTop
  return {
    afterOpen: function () {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls)
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop
    }
  }
})('dialog-open')
