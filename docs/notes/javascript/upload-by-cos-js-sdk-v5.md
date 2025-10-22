---
tag:
  - JavaScript

description: 使用腾讯云 COS 的 cos-js-sdk-v5 实现多文件上传功能，完整的 TypeScript 示例代码，适用于前端项目中图片等文件的批量上传场景。

date: 2024-01-10 14:25:00
---

# cos-js-sdk-v5 上传函数

使用腾讯云 `COS` 的 `cos-js-sdk-v5` 实现多文件上传功能，完整的 `TypeScript` 示例代码，适用于前端项目中图片等文件的批量上传场景。

## 📠 完整代码

::: code-group

```ts
import COS from 'cos-js-sdk-v5';

export const upload_imgs = function (files: any) {
  return new Promise((resolve) => {
    var cos = new COS({
      SecretId: 'YourSecretId',
      SecretKey: 'YourSecretKey',
    });

    let upload_files_data = files.map((item: any) => {
      const file_name = item.name;
      const ramdom = Math.random().toString(36).slice(-8);
      const result_file_name = `topic/${ramdom}_${file_name}`;

      return {
        Bucket: 'exam-project-1255639690' /* 填写自己的 bucket，必须字段 */,
        Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
        Key: result_file_name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
        Body: item.originFileObj, // 上传文件对象
        SliceSize:
          1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
      };
    });

    console.log('upload_files_data', upload_files_data);

    cos.uploadFiles(
      {
        files: upload_files_data,
        SliceSize: 1024 * 1024 * 10,
        onFileFinish: function (err, data, options) {
          console.log(options.Key + '上传' + (err ? '失败' : '完成'));
        },
      },
      async function (err, res_data) {
        if (err) {
          console.log('err', err);
        } else {
          console.log('上传成功data', res_data);
          const img_urls = res_data.files.map((item) => {
            return item.data.Location;
          });
          resolve(img_urls);
        }
      }
    );
  });
};
```

:::
