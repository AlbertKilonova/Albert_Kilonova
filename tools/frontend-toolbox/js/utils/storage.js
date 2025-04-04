const STORAGE_KEYS = {
    FAVORITES: 'frontend-toolbox-favorites',
    RECENT_TOOLS: 'frontend-toolbox-recent-tools',
    THEME: 'frontend-toolbox-theme'
};

// 获取收藏的工具ID数组
export function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
}

// 保存收藏的工具ID数组
export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

// 获取最近使用的工具ID数组
export function getRecentTools() {
    const recentTools = localStorage.getItem(STORAGE_KEYS.RECENT_TOOLS);
    return recentTools ? JSON.parse(recentTools) : [];
}

// 保存最近使用的工具ID数组
export function saveRecentTools(recentTools) {
    localStorage.setItem(STORAGE_KEYS.RECENT_TOOLS, JSON.stringify(recentTools));
}

// 获取当前主题
export function getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
}

// 保存当前主题
export function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}