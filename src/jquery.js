window.jQuery = function (selector) {
 const elements = document.querySelectorAll(selector)
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
 return  {
  addClass(className){
   for (let i in Array.from(elements)) {//闭包
    elements[i].classList.add(className)
   }
   return this
  }
 }
}

