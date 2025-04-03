// 属性面板功能
function initPropertiesPanel() {
    // 元素属性变化监听
    document.getElementById('element-id').addEventListener('change', function() {
        const selected = getSelectedElement();
        if (selected) selected.id = this.value;
    });
    
    document.getElementById('element-class').addEventListener('change', function() {
        const selected = getSelectedElement();
        if (selected) selected.className = this.value;
    });
    
    // 样式属性变化监听
    document.getElementById('style-width').addEventListener('change', function() {
        const selected = getSelectedElement();
        if (selected) selected.style.width = this.value;
    });
    
    document.getElementById('style-height').addEventListener('change', function() {
        const selected = getSelectedElement();
        if (selected) selected.style.height = this.value;
    });
    
    // 其他属性监听...
}

// 更新属性面板
function updatePropertiesPanel(element) {
    // 更新元素属性
    document.getElementById('element-id').value = element.id || '';
    document.getElementById('element-class').value = element.className || '';
    
    // 更新样式属性
    const style = window.getComputedStyle(element);
    document.getElementById('style-width').value = style.width;
    document.getElementById('style-height').value = style.height;
    document.getElementById('style-margin').value = style.margin;
    document.getElementById('style-padding').value = style.padding;
    document.getElementById('style-background').value = rgbToHex(style.backgroundColor);
    document.getElementById('style-border').value = 
        `${style.borderWidth} ${style.borderStyle} ${style.borderColor}`;
    
    // 更新文本样式
    document.getElementById('text-font-family').value = style.fontFamily.replace(/['"]/g, '');
    document.getElementById('text-font-size').value = style.fontSize;
    document.getElementById('text-color').value = rgbToHex(style.color);
    document.getElementById('text-align').value = style.textAlign;
}

// RGB颜色转十六进制
function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return '#ffffff';
    
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return '#000000';
    
    const r = parseInt(rgbValues[0]).toString(16).padStart(2, '0');
    const g = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
    const b = parseInt(rgbValues[2]).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}