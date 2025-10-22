---
tag:
  - JavaScript

description: 在浏览器中通过二进制流方式预览 PDF 文件，并提供完整的 React 组件实现代码。

date: 2024-04-01 15:03:21
---

# 浏览器预览 PDF 文件流

在浏览器中通过二进制流方式预览 `PDF` 文件，并提供完整的 `React` 组件实现代码。

## 🎉 完整代码

::: code-group

```tsx
import { Tooltip } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { businessDocumentPlay } from './services';

type Props = { moduleKey: string };

export default (props: Props) => {
  if (!props.moduleKey) return <></>;

  // 获取 PDF 文件的二进制流数据
  const handleClickToGuideDocuments = async () => {
    const res: any = await businessDocumentPlay({ fileType: props.moduleKey });
    if (!res) return;
    const pdfUrl = window.URL.createObjectURL(res?.data);
    const linka = document.createElement('a');
    linka.href = pdfUrl;
    linka.target = '_blank';
    linka.click();
  };

  const trigger = (
    <Tooltip placement="top" title="帮助文档">
      <FileTextOutlined className="ant-pro-table-list-toolbar-setting-item" onClick={handleClickToGuideDocuments} />
    </Tooltip>
  );

  return trigger;
};
```

:::
