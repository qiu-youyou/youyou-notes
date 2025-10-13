// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node';
import tooltip from './tooltip';
import comment from './giscus';
import friend from './friend';
import footer from './footer';
import home from './home';

const sugaratTheme = getThemeConfig({
  author: 'Yòuyou',
  mermaid: true,
  ...tooltip,
  comment,
  // friend,
  footer,
  home,
});

export { sugaratTheme };
