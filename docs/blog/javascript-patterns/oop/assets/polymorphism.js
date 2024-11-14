//#region polymorphism
// 定义基类 Animal
class Animal {
  constructor(name) {
    this.name = name;
  }

  // 提供一个默认实现，但通常基类中的方法会被子类重写
  speak() {}
}

// 定义 Dog 类，继承自 Animal
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  // 重写 speak 方法
  speak() {
    console.log(`${this.name} says: Woof!`);
  }
}

// 定义 Cat 类，继承自 Animal
class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  // 重写 speak 方法
  speak() {
    console.log(`${this.name} says: Meow!`);
  }
}
// #endregion polymorphism

// #region example
// 创建一个 Dog 实例和一个 Cat 实例
const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");

// 调用 speak 方法，展示多态行为
function makeAnimalSpeak(animal) {
  // 这里不需要知道 animal 是 Dog 还是 Cat，它会自动调用正确的 speak 方法
  animal.speak();
}

makeAnimalSpeak(dog); // 输出: Buddy says: Woof!
makeAnimalSpeak(cat); // 输出: Whiskers says: Meow!
// #endregion example
