// 全局主题配置
var THEMES = ['light', 'dark', 'high-contrast'];

function initTheme() {
  var currentTheme = getTheme();
  setTheme(currentTheme);
}

function toggleTheme() {
  var currentTheme = getTheme();
  var currentIndex = THEMES.indexOf(currentTheme);
  var nextIndex = (currentIndex + 1) % THEMES.length;
  setTheme(THEMES[nextIndex]);
}

function setTheme(theme) {
  // 保存到存储
  saveTheme(theme);
  
  // 更新HTML属性
  document.documentElement.setAttribute('data-theme', theme);
  
  // 更新主题样式表
  var themeStyle = document.getElementById('theme-style');
  themeStyle.href = 'css/themes.css?theme=' + theme;
  
  // 更新按钮标题
  var themeNames = {
    'light': '浅色',
    'dark': '深色',
    'high-contrast': '高对比度'
  };
  document.getElementById('themeToggle').title = '切换主题 (当前: ' + themeNames[theme] + ')';
}

// 暴露全局函数
window.ThemeSwitcher = {
  init: initTheme,
  toggle: toggleTheme
};