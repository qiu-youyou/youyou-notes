// #region class
class Person {
  // 构造函数，用于初始化对象的属性
  constructor(name, age) {
    this.name = name; // 名字属性
    this.age = age; // 年龄属性
  }

  // 吃的方法
  eat() {
    console.log(`${this.name} 正在吃饭。`);
  }

  // 讲话的方法
  speak() {
    console.log(`大家好，我叫${this.name}，今年${this.age}岁。`);
  }
}
// #endregion class

// #region object
// 创建一个叫“小明”的对象
let xiaoMing = new Person("小明", 25);

// 调用吃的方法
xiaoMing.eat();
// 输出: 小明 正在吃饭。

// 调用讲话的方法
xiaoMing.speak();
// 输出: 大家好，我叫小明，今年25岁。

// 创建另一个叫“小红”的对象
let xiaoHong = new Person("小红", 20);

// 调用吃的方法
xiaoHong.eat();
// 输出: 小红 正在吃饭。

// 调用讲话的方法
xiaoHong.speak();
// 输出: 大家好，我叫小红，今年20岁。
// #endregion object

// #region student
// 定义派生类（子类）Student，继承自Person
class Student extends Person {
  // 子类的构造函数需要调用 super() 来初始化从父类继承的属性
  constructor(name, age, studentId) {
    super(name, age); // 调用父类的构造函数
    this.studentId = studentId; // 子类特有的属性
  }

  // 子类可以添加新的方法
  study() {
    console.log(`${this.name} 正在学习。`);
  }
}

// 创建一个Student对象并测试
let zhangSan = new Student("张三", 14, "S12345");
zhangSan.eat(); // 输出: 张三 正在吃饭。
zhangSan.study(); // 输出: 张三 正在学习。

const liSi = new Student("李四", 16, "S54321");
liSi.eat(); // 输出: 李四 正在吃饭。
liSi.study(); // 输出: 李四 正在学习。
// #endregion student
