// ========== 全局定义 ==========
var ToolRegistry = {
    register: function(tool) {
        if (!window.allTools) window.allTools = [];
        if (Array.isArray(tool)) {
            window.allTools = window.allTools.concat(tool);
        } else {
            window.allTools.push(tool);
        }
    }
};

// 存储相关函数
var Storage = {
    getFavorites: function() {
        var favorites = localStorage.getItem('frontend-toolbox-favorites');
        return favorites ? JSON.parse(favorites) : [];
    },
    saveFavorites: function(favorites) {
        localStorage.setItem('frontend-toolbox-favorites', JSON.stringify(favorites));
    }
};

// ========== 核心函数 ==========
function initCategoryFilter() {
    var categories = {};
    window.allTools.forEach(function(tool) {
        categories[tool.category || '未分类'] = true;
    });
    
    var filter = document.getElementById('categoryFilter');
    if (filter) {
        Object.keys(categories).forEach(function(category) {
            var option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filter.appendChild(option);
        });
    }
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 确保工具已加载
    setTimeout(function() {
        initCategoryFilter();
        renderTools();
    }, 100);
});

// 全局工具集合
var allTools = [];

// 工具注册系统
var ToolRegistry = {
    register: function(tool) {
        if (Array.isArray(tool)) {
            allTools = allTools.concat(tool);
        } else {
            allTools.push(tool);
        }
    },
    getCategories: function() {
        var categories = {};
        allTools.forEach(function(tool) {
            var cat = tool.category || '未分类';
            categories[cat] = true;
        });
        return Object.keys(categories);
    }
};

// 初始化应用
function initApp() {
    // 初始化UI组件
    initCategoryFilter();
    
    // 设置事件监听
    setupEventListeners();
    
    // 渲染工具
    renderTools();
    
    // 初始化辅助功能
    initAccessibility();
    
    // 设置当前年份
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // 检查工具是否加载
    if (allTools.length === 0) {
        showError("没有加载任何工具模块");
    }
}

// 渲染工具列表
function renderTools() {
    var container = document.getElementById('toolsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 获取当前过滤条件
    var searchTerm = (document.getElementById('searchInput').value || '').toLowerCase();
    var selectedCategory = document.getElementById('categoryFilter').value;
    var currentTab = getCurrentTab();
    
    // 过滤工具
    var filteredTools = allTools.filter(function(tool) {
        // 标签页过滤
        if (currentTab === 'favorites' && !isFavorite(tool.id)) return false;
        if (currentTab === 'recent' && !isRecent(tool.id)) return false;
        
        // 搜索和分类过滤
        var matchesSearch = tool.name.toLowerCase().includes(searchTerm) || 
                           tool.description.toLowerCase().includes(searchTerm);
        var matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    // 渲染工具卡片
    if (filteredTools.length === 0) {
        container.innerHTML = '<div class="no-tools">没有找到匹配的工具</div>';
        return;
    }
    
    filteredTools.forEach(function(tool) {
        var card = createToolCard(tool);
        container.appendChild(card);
    });
}

// 创建工具卡片DOM
function createToolCard(tool) {
    var card = document.createElement('div');
    card.className = 'tool-card ' + (isFavorite(tool.id) ? 'favorited' : '');
    card.dataset.id = tool.id;
    
    card.innerHTML = `
        <div class="favorite-icon">${isFavorite(tool.id) ? '★' : '☆'}</div>
        <div class="tool-icon">${tool.icon}</div>
        <h3>${tool.name} <span class="tool-badge">${tool.category}</span></h3>
        <p>${tool.description}</p>
    `;
    
    card.addEventListener('click', function() {
        openToolModal(tool);
    });
    
    return card;
}

// 其他原有函数改造为普通函数形式
function openToolModal(tool) { /* ... */ }
function closeToolModal() { /* ... */ }
function toggleFavorite() { /* ... */ }

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);