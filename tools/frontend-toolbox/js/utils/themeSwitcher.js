import { getTheme, saveTheme } from './storage.js';

// 可用主题
const THEMES = ['light', 'dark', 'high-contrast'];

// 初始化主题
export function init() {
    const currentTheme = getTheme();
    setTheme(currentTheme);
}

// 切换主题
export function toggleTheme() {
    const currentTheme = getTheme();
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setTheme(nextTheme);
}

// 设置主题
function setTheme(theme) {
    // 保存到存储
    saveTheme(theme);
    
    // 更新HTML属性
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新主题样式表
    const themeStyle = document.getElementById('theme-style');
    if (theme === 'light') {
        themeStyle.href = 'css/themes.css';
    } else {
        themeStyle.href = `css/themes.css?theme=${theme}`;
    }
    
    // 更新按钮标题
    const themeToggle = document.getElementById('themeToggle');
    const themeNames = {
        'light': '浅色',
        'dark': '深色',
        'high-contrast': '高对比度'
    };
    themeToggle.title = `切换主题 (当前: ${themeNames[theme]})`;
}