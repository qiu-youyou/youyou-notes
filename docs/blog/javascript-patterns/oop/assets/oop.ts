// #region person
class Person {
  // 公共属性
  name: string;
  age: number;

  // 受保护的属性，只能在Person类及其子类中访问
  protected personId: string;

  // 构造函数，用于初始化对象的属性
  constructor(name: string, age: number, personId: string) {
    this.name = name; // 名字属性
    this.age = age; // 年龄属性
    this.personId = personId; // 受保护的属性，通常用于标识人
  }

  // 吃的方法
  eat(): void {
    console.log(`${this.name} 正在吃饭。`);
  }

  // 讲话的方法
  speak(): void {
    console.log(`大家好，我叫${this.name}，今年${this.age}岁。`);
  }

  // 获取personId的方法
  // 虽然是受保护的，但为了演示，这里提供一个公共方法来访问它
  getPersonId(): string {
    return this.personId;
  }
}
// #endregion person

// #region student
class Student extends Person {
  // 私有的属性，只能在Student类内部访问
  private studentId: string;

  // 子类的构造函数需要调用 super() 来初始化从父类继承的属性
  constructor(name: string, age: number, personId: string, studentId: string) {
    super(name, age, personId); // 调用父类的构造函数
    this.studentId = studentId; // 子类特有的私有属性
  }

  // 子类可以添加新的方法
  study(): void {
    console.log(`${this.name} 正在学习。`);
  }

  // 获取学生编号的方法
  // 虽然是私有的，这里提供一个受保护或公共方法来访问它，但在实际封装中应保持私有
  // 注意：通常我们不会从外部直接访问私有属性，这里仅为了演示目的
  getStudentIdForDemo(): string {
    // 在实际项目中，应该避免这种直接暴露私有属性的做法
    // 这里仅作为演示，展示如何定义和使用私有属性
    return this.studentId;
  }
}

// #endregion student

// #region example
const wangWu = new Person("王五", 30, "P12345");
console.log(wangWu.getPersonId()); // 输出: P12345
console.log(wangWu.personId); // 错误：属性 “personId” 受保护，只能在类“Person”及其子类中访问。

const xiaoLi = new Student("小丽", 20, "S54321", "20230001");
console.log(xiaoLi.getPersonId()); // 输出: S54321
console.log(xiaoLi.studentId); // 错误：属性“studentId”为私有属性，只能在类“Student”中访问。
console.log(xiaoLi.getStudentIdForDemo()); // 输出: 20230001（仅为了演示，实际项目中应避免这样做）
xiaoLi.study(); // 输出: 小丽 正在学习。
// #endregion example
