export const theme = {
  colors: {
    // 背景色系
    background: {
      primary: '#fdfaf6',    // 主背景色
      secondary: '#ffffff',   // 卡片背景色
      tertiary: '#f0e8d9',   // 边框色
    },
    // 文字色系
    text: {
      primary: '#2c3e50',    // 主标题
      secondary: '#718096',   // 副标题
      tertiary: '#94a3b8',   // 辅助文字
    },
    // 标记色系
    marker: {
      ingredient: '#fbbf24',  // 食材标记
      seasoning: '#34d399',   // 调味料标记
      utensil: '#60a5fa',    // 厨具标记
    },
    // 状态色系
    state: {
      hover: 'rgba(0, 0, 0, 0.05)',
    }
  },
  // 其他主题变量...
} as const; 