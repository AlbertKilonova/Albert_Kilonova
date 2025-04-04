import * as Storage from './utils/storage.js';
import * as ThemeSwitcher from './utils/themeSwitcher.js';
import * as A11y from './utils/a11y.js';
import * as PWA from './utils/pwa.js';

// 导入工具模块（确保路径正确）
import { tools as jsonTools } from './tools/jsonFormatter.js';
import { tools as base64Tools } from './tools/base64Converter.js';
import { tools as colorTools } from './tools/colorConverter.js';
import { tools as urlTools } from './tools/urlParser.js';
import { tools as timestampTools } from './tools/timestampConverter.js';

// 定义工具类型
const allTools = [
    ...(jsonTools || []),
    ...(base64Tools || []),
    ...(colorTools || []),
    ...(urlTools || []),
    ...(timestampTools || [])
].map(tool => ({
    ...tool,
    id: String(tool.id || ''),
    icon: String(tool.icon || '')
}));

// 如果没有任何工具，添加默认提示
if (allTools.length === 0) {
    allTools.push({
        id: 'no-tools',
        name: '没有可用工具',
        description: '请检查工具模块是否已正确导入',
        icon: '⚠️',
        category: '系统',
        tabs: [{
            name: '提示',
            content: '<div class="error">没有找到任何工具模块，请检查：<ol><li>工具模块文件是否存在</li><li>模块是否正确导出</li><li>文件路径是否正确</li></ol></div>'
        }]
    });
}

// 工具分类
const categories = [...new Set(allTools.map(tool => tool.category || '未分类'))];

// DOM元素
const toolsContainer = document.getElementById('toolsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const toolModal = document.getElementById('toolModal');
const closeModal = document.getElementById('closeModal');
const modalToolName = document.getElementById('modalToolName');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesToggle = document.getElementById('favoritesToggle');
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tabs .tab-btn');
const currentYear = document.getElementById('currentYear');

// 当前状态
let currentTool = null;
let currentTab = 'all';
let favorites = Storage.getFavorites();
let recentTools = Storage.getRecentTools();

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 设置当前年份
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // 初始化辅助功能
    A11y.initAccessibility();
    
    // 初始化主题
    ThemeSwitcher.init();
    
    // 初始化PWA
    PWA.registerServiceWorker();
    PWA.initInstallPrompt();
    
    // 渲染工具
    renderTools();
    
    // 事件监听
    setupEventListeners();
    
    // 屏幕阅读器通知
    window.announceToScreenReader('前端工具箱已加载');
});

// 初始化分类筛选
function initCategoryFilter() {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// 设置事件监听
function setupEventListeners() {
    // 搜索功能
    searchInput.addEventListener('input', handleSearch);
    
    // 分类筛选
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // 关闭模态框
    closeModal.addEventListener('click', closeToolModal);
    
    // 点击模态框外部关闭
    toolModal.addEventListener('click', (e) => {
        if (e.target === toolModal) {
            closeToolModal();
        }
    });
    
    // 收藏按钮
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    // 收藏夹切换
    favoritesToggle.addEventListener('click', () => {
        setActiveTab('favorites');
    });
    
    // 主题切换
    themeToggle.addEventListener('click', ThemeSwitcher.toggleTheme);
    
    // 标签页切换
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveTab(btn.dataset.tab);
        });
    });
}

// 设置活动标签页
function setActiveTab(tab) {
    currentTab = tab;
    
    // 更新UI
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // 重新渲染工具
    renderTools();
}

// 处理搜索
function handleSearch() {
    renderTools();
}

// 处理分类筛选
function handleCategoryFilter() {
    renderTools();
}

// 渲染工具
function renderTools() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    // 根据当前标签页过滤工具
    let toolsToDisplay;
    switch (currentTab) {
        case 'favorites':
            toolsToDisplay = allTools.filter(tool => favorites.includes(tool.id));
            break;
        case 'recent':
            toolsToDisplay = recentTools.map(id => allTools.find(tool => tool.id === id)).filter(Boolean);
            break;
        default:
            toolsToDisplay = [...allTools];
    }
    
    // 应用搜索和分类筛选
    const filteredTools = toolsToDisplay.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm) || 
                             tool.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    // 清空容器
    toolsContainer.innerHTML = '';
    
    // 如果没有工具显示提示信息
    if (filteredTools.length === 0) {
        const noToolsMsg = document.createElement('div');
        noToolsMsg.className = 'no-tools';
        noToolsMsg.textContent = currentTab === 'favorites' ? 
            '您还没有收藏任何工具' : 
            '没有找到匹配的工具';
        toolsContainer.appendChild(noToolsMsg);
        return;
    }
    
// 渲染工具卡片
    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = `tool-card ${favorites.includes(tool.id) ? 'favorited' : ''}`;
        toolCard.dataset.id = tool.id;
        toolCard.innerHTML = `
            <div class="favorite-icon">${favorites.includes(tool.id) ? '★' : '☆'}</div>
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name} <span class="tool-badge">${tool.category}</span></h3>
            <p>${tool.description}</p>
        `;
        toolsContainer.appendChild(toolCard);
        
        // 添加点击事件
        toolCard.addEventListener('click', () => {
            openToolModal(tool);
        });
    });
}

// 打开工具模态框
function openToolModal(tool) {
    currentTool = tool;
    
    // 更新工具名称
    modalToolName.textContent = tool.name;
    
    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 记录最近使用
    addToRecentTools(tool.id);
    
    // 清空现有内容
    const tabButtonsContainer = document.getElementById('tabButtons');
    const tabContentsContainer = document.getElementById('tabContents');
    tabButtonsContainer.innerHTML = '';
    tabContentsContainer.innerHTML = '';
    
    // 添加标签页按钮和内容
    tool.tabs.forEach((tab, index) => {
        // 添加标签按钮
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        tabBtn.textContent = tab.name;
        tabBtn.dataset.tabIndex = index;
        tabButtonsContainer.appendChild(tabBtn);
        
        // 添加标签内容
        const tabContent = document.createElement('div');
        tabContent.className = `tab-content ${index === 0 ? 'active' : ''}`;
        tabContent.innerHTML = tab.content;
        tabContentsContainer.appendChild(tabContent);
        
        // 添加标签切换事件
        tabBtn.addEventListener('click', () => {
            // 移除所有active类
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 添加active类到当前标签
            tabBtn.classList.add('active');
            tabContent.classList.add('active');
        });
    });
    
    // 显示模态框
    toolModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭工具模态框
function closeToolModal() {
    toolModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // 添加关闭动画
    setTimeout(() => {
        toolModal.style.display = 'none';
    }, 300);
}

// 更新收藏按钮状态
function updateFavoriteButton() {
    if (!currentTool) return;
    
    const isFavorited = favorites.includes(currentTool.id);
    favoriteBtn.innerHTML = `<span class="icon">${isFavorited ? '★' : '☆'}</span>`;
    favoriteBtn.title = isFavorited ? '从收藏中移除' : '添加到收藏';
}

// 切换收藏状态
function toggleFavorite() {
    if (!currentTool) return;
    
    const toolId = currentTool.id;
    const index = favorites.indexOf(toolId);
    
    if (index === -1) {
        // 添加到收藏
        favorites.push(toolId);
    } else {
        // 从收藏中移除
        favorites.splice(index, 1);
    }
    
    // 保存到存储
    Storage.saveFavorites(favorites);
    
    // 更新UI
    updateFavoriteButton();
    renderTools();
}

// 添加到最近使用
function addToRecentTools(toolId) {
    // 如果已经存在，先移除
    const index = recentTools.indexOf(toolId);
    if (index !== -1) {
        recentTools.splice(index, 1);
    }
    
    // 添加到开头
    recentTools.unshift(toolId);
    
    // 限制数量
    if (recentTools.length > 5) {
        recentTools = recentTools.slice(0, 5);
    }
    
    // 保存到存储
    Storage.saveRecentTools(recentTools);
}
// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 检查工具是否加载
    if (allTools.length === 1 && allTools[0].id === 'no-tools') {
        console.error('没有加载任何工具模块');
        // 显示错误提示
        const toolsContainer = document.getElementById('toolsContainer');
        if (toolsContainer) {
            toolsContainer.innerHTML = `
                <div class="error-box">
                    <h3>工具加载失败</h3>
                    <p>可能的原因：</p>
                    <ul>
                        <li>工具模块文件缺失</li>
                        <li>模块导出格式不正确</li>
                        <li>文件路径错误</li>
                    </ul>
                    <p>请检查控制台获取更多信息</p>
                </div>
            `;
        }
    }
    
    // 继续正常初始化流程
    currentYear.textContent = String(new Date().getFullYear());
    A11y.initAccessibility();
    ThemeSwitcher.init();
    PWA.registerServiceWorker();
    PWA.initInstallPrompt();
    initCategoryFilter();
    renderTools();
    setupEventListeners();
});
// 初始化应用
document.addEventListener('DOMContentLoaded', init);