window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if(typeof selectorOrArrayOrTemplate === 'string'){
    if(selectorOrArrayOrTemplate[0] === '<'){
      // 创建 div
      elements=[createElement(selectorOrArrayOrTemplate)]
    }else{
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  }else if(selectorOrArrayOrTemplate instanceof Array){
    elements = selectorOrArrayOrTemplate
  }
  //api可以操作element
// return api = {
//   addClass(className){
//    for (let i in Array.from(elements)) {//闭包
//    elements[i].classList.add(className)
//    }
//    return api
//   }
//  }
// }
  return {
    //返回arr(数组)，就不能进行链式操作
    find(selector) {
      let arr = []
      for (let i in Array.from(elements)) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)))
      }
      return jQuery(arr)
    },




    addClass(className) {
      for (let i in Array.from(elements)) {//闭包
        elements[i].classList.add(className)
      }
      return this
    },


  }
}

