---
tag:
  - 芝士
tags:
  - JavaScript
---

# 判断数据类型的四种方法

## 😃 typeof

> `tyepof [value]`

> `typeof` 是 `JavaScript` 中最基本的类型检测操作符。它可以检测基本数据类型（如字符串、数字、布尔值、undefined、Symbol）以及函数类型。

缺点：

- 对于 `null`，`typeof` 返回 `'object'`，不符合直觉。
- 对于数组和对象，`typeof` 都返回 `'object'`，无法区分它们。

::: code-group

```js
typeof undefined; // 'undefined'
typeof '10'; // 'String'
typeof 10; // 'Number'
typeof false; // 'Boolean'
typeof Symbol(); // 'Symbol'
typeof Function; // 'function'
typeof null; // 'Object'
typeof []; // 'Object'
typeof {}; // 'Object'
```

:::

::: tip `typeof null` 为什么是 `Object` ?

因为在 `JavaScript` 中，不同的对象都是使用二进制存储的，如果二进制前三位都是 `0` 的话，系统会判断为是 `Object` 类型，而 `null` 的二进制全是 `0`，自然也就判断为 `Object`。

```js
000 对象
1 整型
010 双精度类型
100 字符串
110 布尔类型
```

:::

## 😃 instanceof

> `实例 instanceof 类`

> `instanceof` 用于检测对象是否是其原型链上的某个构造函数的实例。它可以用于检测自定义对象类型以及内置对象类型（如数组、日期等）。

缺点：

- 只能判断对象是否存在于目标对象的原型链上。
- 基本数据类型的实例是无法检测出来，构造函数创建的就可以检测，字面量方式创建的就不能检测。

::: code-group

```js
function Foo() {}
var f1 = new Foo();
var d = new Number(1);

console.log(f1 instanceof Foo); // true
console.log(d instanceof Number); //true
console.log(123 instanceof Number); //false   -->不能判断字面量的基本数据类型
```

:::

::: tip instanceof 原理实际上就是查找目标对象的原型链。

::: code-group

```js
function myInstance(L, R) {
  // L 代表 instanceof 左边，R 代表右边
  var RP = R.prototype;
  var LP = L.__proto__;
  while (true) {
    if (LP == null) {
      return false;
    }
    if (LP == RP) {
      return true;
    }
    LP = LP.__proto__;
  }
}
console.log(myInstance({}, Object));
```

:::

## 😃 constructor

> `实例.constructor === 类`

> 每个 `JavaScript` 对象都有一个 `constructor` 属性，它指向创建该对象的构造函数。通过检查 `constructor` 属性，我们可以大致了解对象的类型。

缺点：

- 对于基本数据类型（如字符串、数字、布尔值的包装对象），`constructor` 可以工作，但对于原始值（如直接的字符串、数字、布尔值），它们没有 `constructor` 属性。
- 如果对象的原型链被修改过，`constructor` 属性可能不再准确。

::: code-group

```js
var e = 1;
function fn() {
  console.log('ming');
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;

console.log(e.constructor); //ƒ Number() { [native code] }
console.log(e.constructor.name); //Number
console.log(fn.constructor.name); // Function
console.log(date.constructor.name); // Date
console.log(arr.constructor.name); // Array
console.log(reg.constructor.name); // RegExp
```

:::

## 😃 Object.prototype.toString.call()

> `Object.prototype.toString.call(被检测实例)`

> 一种非常可靠的类型检测方法：Object.prototype.toString.call()。它可以区分 null 、 string 、 boolean 、 number 、 undefined 、 array 、 function 、 object 、 date 、 math 数据类型。

缺点：

- 不能细分为谁谁的实例。

::: code-group

```js
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call('abc')); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"

function fn() {
  console.log('ming');
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;
console.log(Object.prototype.toString.call(fn)); // "[object Function]"
console.log(Object.prototype.toString.call(date)); // "[object Date]"
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
console.log(Object.prototype.toString.call(reg)); // "[object RegExp]"
```

:::
