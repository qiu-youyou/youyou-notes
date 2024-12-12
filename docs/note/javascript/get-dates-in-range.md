# JS-获取时间段内的所有日期

需求: 获取两个日期之间的所有日期，返回格式为 `YYYY-MM-DD` 的数组。

解决方案: 通过循环迭代，逐日增加，生成所有日期。

::: code-group

```js
/**
 * 获取指定时间段内的所有日期
 * @param {string} startDateStr - 开始日期，格式为 "YYYY-MM-DD"
 * @param {string} endDateStr - 结束日期，格式为 "YYYY-MM-DD"
 * @returns {string[]} 时间段内的所有日期，格式为 "YYYY-MM-DD"
 */
function getDatesInRange(startDateStr, endDateStr) {
  // 检查输入日期是否有效
  if (!startDateStr || !endDateStr) {
    throw new Error("请提供有效的开始日期和结束日期");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // 验证日期是否有效
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("无效的日期格式，请使用 'YYYY-MM-DD'");
  }

  // 验证开始日期是否早于或等于结束日期
  if (startDate > endDate) {
    throw new Error("开始日期不能晚于结束日期");
  }

  const dateArray = [];
  let currentDate = new Date(startDate);

  // 循环生成日期
  while (currentDate <= endDate) {
    // 格式化日期为 "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split("T")[0];
    dateArray.push(formattedDate);
    // 增加一天
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}
```

:::

::: code-group

```js
// 示例使用
try {
  const dates = getDatesInRange("2024-12-12", "2025-02-14");
  console.log(dates);
} catch (error) {
  console.error(error.message);
}

// 输出：[  "2024-12-12", "2024-12-13", ..., "2025-02-14" ]
```

:::
