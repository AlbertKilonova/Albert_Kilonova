// 辅助功能增强
export function initAccessibility() {
    // 为所有交互元素添加键盘导航
    document.addEventListener('keydown', function(e) {
        // 回车键触发按钮点击
        if (e.key === 'Enter' && e.target.matches('[role="button"]')) {
            e.target.click();
        }
        
        // ESC键关闭模态框
        if (e.key === 'Escape' && document.getElementById('toolModal').classList.contains('show')) {
            closeToolModal();
        }
    });
    
    // 为图片图标添加alt文本
    document.querySelectorAll('img[src*=".svg"]').forEach(img => {
        if (!img.alt) {
            img.alt = img.id ? `${img.id} icon` : 'icon';
        }
    });
    
    // 动态内容更新通知屏幕阅读器
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-9999px';
    document.body.appendChild(liveRegion);
    
    window.announceToScreenReader = (message) => {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

// 焦点管理
export function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}