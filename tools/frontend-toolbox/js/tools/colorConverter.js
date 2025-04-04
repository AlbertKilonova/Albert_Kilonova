// 颜色转换工具
ToolRegistry.register({
    id: 'color-converter',
    name: '颜色转换',
    description: '在不同颜色格式之间转换',
    icon: '🎨',
    category: '设计工具',
    tabs: [
        {
            name: 'RGB ↔ HEX',
            content: `
                <div class="tool-section">
                    <div class="grid-2-col">
                        <div>
                            <h4>RGB</h4>
                            <div class="input-group">
                                <input type="number" id="rgbR" min="0" max="255" placeholder="R">
                                <input type="number" id="rgbG" min="0" max="255" placeholder="G">
                                <input type="number" id="rgbB" min="0" max="255" placeholder="B">
                            </div>
                            <button id="rgbToHexBtn">转换为HEX</button>
                        </div>
                        <div>
                            <h4>HEX</h4>
                            <input type="text" id="hexInput" placeholder="#RRGGBB">
                            <button id="hexToRgbBtn">转换为RGB</button>
                        </div>
                    </div>
                </div>
                <div class="tool-section">
                    <h4>颜色预览:</h4>
                    <div id="colorPreview" class="color-preview"></div>
                    <div id="colorResult" class="result-box"></div>
                </div>
            `,
            onRender: function(tabContent) {
                function componentToHex(c) {
                    var hex = parseInt(c).toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }
                
                function rgbToHex(r, g, b) {
                    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                }
                
                function hexToRgb(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                }
                
                tabContent.querySelector('#rgbToHexBtn').addEventListener('click', function() {
                    var r = document.getElementById('rgbR').value;
                    var g = document.getElementById('rgbG').value;
                    var b = document.getElementById('rgbB').value;
                    
                    if (r && g && b) {
                        var hex = rgbToHex(r, g, b);
                        document.getElementById('hexInput').value = hex;
                        document.getElementById('colorPreview').style.backgroundColor = hex;
                        document.getElementById('colorResult').textContent = 'HEX值: ' + hex;
                    }
                });
                
                tabContent.querySelector('#hexToRgbBtn').addEventListener('click', function() {
                    var hex = document.getElementById('hexInput').value;
                    var rgb = hexToRgb(hex);
                    
                    if (rgb) {
                        document.getElementById('rgbR').value = rgb.r;
                        document.getElementById('rgbG').value = rgb.g;
                        document.getElementById('rgbB').value = rgb.b;
                        document.getElementById('colorPreview').style.backgroundColor = hex;
                        document.getElementById('colorResult').textContent = 'RGB值: ' + rgb.r + ', ' + rgb.g + ', ' + rgb.b;
                    } else {
                        alert('请输入有效的HEX颜色值，例如#RRGGBB');
                    }
                });
                
                // 限制RGB输入范围
                ['rgbR', 'rgbG', 'rgbB'].forEach(function(id) {
                    tabContent.querySelector('#' + id).addEventListener('change', function() {
                        var val = Math.min(255, Math.max(0, this.value));
                        this.value = val;
                    });
                });
            }
        }
    ]
});