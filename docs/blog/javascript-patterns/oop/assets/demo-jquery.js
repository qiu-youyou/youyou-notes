// region DOMManipulator
class DOMManipulator {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
  }

  // 私有方法，用于遍历元素并应用操作
  _applyToElements(callback) {
    this.elements.forEach((element) => callback(element));
  }

  // 公共方法，添加CSS类
  addClass(className) {
    this._applyToElements((element) => {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    });
    return this; // 支持链式调用
  }

  // ... 其他DOM操作方法（如css, removeClass等）可以类似地实现
}

// endregion DOMManipulator

// region DemoJQuery
class DemoJQuery extends DOMManipulator {
  // 可以添加一些特定的方法或重写父类的方法
  // 例如，重写addClass方法以添加日志记录功能
  addClass(className) {
    console.log(
      `Adding class '${className}' to ${this.elements.length} elements.`
    );
    super.addClass(className); // 调用父类的方法
    return this; // 支持链式调用
  }

  // 添加一个特定于DemoJQuery的方法，比如绑定事件
  on(event, handler) {
    this._applyToElements((element) => {
      element.addEventListener(event, handler);
    });
    return this; // 支持链式调用
  }

  // ... 可以添加更多特定于DemoJQuery的方法
}

// endregion DemoJQuery

// region window
window.$ = function (selector) {
  // 工厂模式
  return new DemoJQuery(selector);
};
// endregion window
