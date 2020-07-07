window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === '<') {
      // 创建 div
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
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
  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  return {
    jquery: true,
    elements: elements,
    get(index) {
      return elements[index]
    },
    appendTo(node) {
      if (node instanceof Element) {
        this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
      } else if (node.jquery === true) {
        this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
      }
    },
    append(children) {
      if (children instanceof Element) {
        this.get(0).appendChild(children)
      } else if (children instanceof HTMLCollection) {
        for (let i = 0; i < children.length; i++) {
          this.get(0).appendChild(children[i])
        }
      } else if (children.jquery === true) {
        children.each(node => this.get(0).appendChild(node))
      }
    },
    //返回arr(数组)，就不能进行链式操作
    find(selector) {
      let arr = []
      for (let i = 0; i < elements.length; i++) {
        arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)))
      }
      arr.oldApi = this //this为旧api
      return jQuery(arr)
    },

    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this //this 就是当前api对象
    },

    parent() {
      const array = []
      this.each(node => {
        if (array.indexOf(node.parentNode) === -1)
          array.push(node.parentNode)
      })
      return jQuery(array)
    },
    children() {
      let array = []
      this.each(node => {
        array.push(...node.children)
      })
      return jQuery(array)
    },

    print() {
      console.log(elements)
    },

    addClass(className) {
      for (let i = 0; i < elements.length; i++) { //闭包
        elements[i].classList.add(className)
      }
      return this
    },

    oldApi: selectorOrArrayOrTemplate.oldApi,
    //返回上一层
    end() {
      return this.oldApi //this为新api
    },


  }
}

