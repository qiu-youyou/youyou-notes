---
tag:
  - JavaScript

description: 本文介绍了 JavaScript 中数组排序的三种常见算法：冒泡排序、选择排序和插入排序，并对每种算法的原理和实现进行了详细说明。同时，还补充了原生 `sort` 方法的用法和注意事项，帮助理解不同排序方式的适用场景。

date: 2024-01-17 22:03:38
---

# 数组排序的三种方法

## 📡 冒泡排序

冒泡排序是一种简单的排序算法。它的工作原理是通过重复遍历要排序的数组，比较相邻元素的大小，并在必要时交换它们的位置。这个过程一直重复，直到没有需要交换的元素为止。具体步骤如下：

- 1、从数组的第一个元素开始，比较相邻的两个元素。如果第一个元素比第二个元素大，就交换它们。

- 2、继续这个过程，对每一对相邻元素进行比较和交换，直到数组的末尾。这样，最大的元素会“冒泡”到数组的最后一个位置。

- 3、重复上述步骤，但每次都要忽略已经排序好的最后一个元素。

- 4、继续这个过程，直到整个数组有序。

::: code-group

```js
const arr = [1, 5, 7, 9, 16, 2, 4];

function bubbleSort(arr) {
  const len = arr.length;
  // 外层循环用户控制比较的趟数
  for (let i = 0; i < len - 1; i++) {
    // 内层循环用于控制每趟比较的次数
    for (let j = 0; j < len - i - 1; j++) {
      // 如果前面一个数比后一个数大，就互换位置
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
```

:::

## 📡 选择排序

选择排序也是一种简单的排序算法。它的工作原理是每次从未排序的部分中选择最小（或最大）的元素，将其放到已排序部分的末尾。具体步骤如下：

- 1、首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。

- 2、再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

- 3、重复第二步，直到整个数组有序。

::: code-group

```js
const arr = [1, 5, 7, 9, 16, 2, 4];

function selectionSort(arr) {
  const len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 找到最小的数
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
```

:::

## 📡 插入排序

插入排序是一种基于比较的排序算法，它的工作原理是将数组分为已排序和未排序两部分，然后逐个将未排序部分的元素插入到已排序部分的适当位置。具体步骤如下：

- 1、将数组的第一个元素视为已排序部分，其余元素视为未排序部分。

- 2、从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。(如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面)。

::: code-group

```js
const arr = [1, 5, 7, 9, 16, 2, 4];

function insertionSort(arr) {
  const len = arr.length;
  let preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
```

:::

::: tip 自带的 sort，该方法会改变原始数组。

除了上述三种排序算法，`JavaScript` 还提供了一个内置的 `sort` 方法，可以对数组进行排序。需要注意的是，`sort` 方法会直接修改原始数组，并返回排序后的数组。默认情况下，`sort` 方法会将数组元素转换为字符串，然后按照字符串的 `Unicode` 码点进行排序。因此，对于数字数组，需要提供一个比较函数来确保正确的排序顺序。

::: code-group

```js
const arr = [1, 5, 7, 9, 16, 2, 4];

// x - y > 0 则是递增
arr.sort((x, y) => x - y);

// x - y < 0 则是递减
arr.sort((x, y) => y - x);
```

:::
