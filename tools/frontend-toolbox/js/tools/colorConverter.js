export const tools = [
    {
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
                    <script>
                        function componentToHex(c) {
                            const hex = parseInt(c).toString(16);
                            return hex.length === 1 ? "0" + hex : hex;
                        }
                        
                        function rgbToHex(r, g, b) {
                            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                        }
                        
                        function hexToRgb(hex) {
                            const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                            return result ? {
                                r: parseInt(result[1], 16),
                                g: parseInt(result[2], 16),
                                b: parseInt(result[3], 16)
                            } : null;
                        }
                        
                        document.getElementById('rgbToHexBtn').addEventListener('click', function() {
                            const r = document.getElementById('rgbR').value;
                            const g = document.getElementById('rgbG').value;
                            const b = document.getElementById('rgbB').value;
                            
                            if (r && g && b) {
                                const hex = rgbToHex(r, g, b);
                                document.getElementById('hexInput').value = hex;
                                document.getElementById('colorPreview').style.backgroundColor = hex;
                                document.getElementById('colorResult').textContent = \`HEX值: \${hex}\`;
                            }
                        });
                        
                        document.getElementById('hexToRgbBtn').addEventListener('click', function() {
                            const hex = document.getElementById('hexInput').value;
                            const rgb = hexToRgb(hex);
                            
                            if (rgb) {
                                document.getElementById('rgbR').value = rgb.r;
                                document.getElementById('rgbG').value = rgb.g;
                                document.getElementById('rgbB').value = rgb.b;
                                document.getElementById('colorPreview').style.backgroundColor = hex;
                                document.getElementById('colorResult').textContent = \`RGB值: \${rgb.r}, \${rgb.g}, \${rgb.b}\`;
                            } else {
                                alert('请输入有效的HEX颜色值，例如#RRGGBB');
                            }
                        });
                    <\/script>
                `
            }
        ]
    }
];