// JSON格式化工具
ToolRegistry.register({
    id: 'json-formatter',
    name: 'JSON格式化',
    description: '格式化、验证和压缩JSON数据',
    icon: '{}',
    category: '数据处理',
    tabs: [
        {
            name: '格式化',
            content: `
                <div class="tool-section">
                    <textarea id="jsonInput" placeholder="输入JSON字符串..." rows="8"></textarea>
                    <div class="button-group">
                        <button id="formatBtn">格式化</button>
                        <button id="minifyBtn" class="secondary">压缩</button>
                        <button id="clearBtn" class="danger">清空</button>
                    </div>
                </div>
                <div class="tool-section">
                    <h4>格式化结果:</h4>
                    <pre id="jsonOutput"></pre>
                </div>
            `,
            onRender: function(tabContent) {
                tabContent.querySelector('#formatBtn').addEventListener('click', function() {
                    try {
                        var input = document.getElementById('jsonInput').value;
                        var parsed = JSON.parse(input);
                        document.getElementById('jsonOutput').textContent = JSON.stringify(parsed, null, 2);
                    } catch (e) {
                        alert('无效的JSON: ' + e.message);
                    }
                });

                tabContent.querySelector('#minifyBtn').addEventListener('click', function() {
                    try {
                        var input = document.getElementById('jsonInput').value;
                        var parsed = JSON.parse(input);
                        document.getElementById('jsonOutput').textContent = JSON.stringify(parsed);
                    } catch (e) {
                        alert('无效的JSON: ' + e.message);
                    }
                });

                tabContent.querySelector('#clearBtn').addEventListener('click', function() {
                    document.getElementById('jsonInput').value = '';
                    document.getElementById('jsonOutput').textContent = '';
                });
            }
        },
        {
            name: '验证',
            content: `
                <div class="tool-section">
                    <textarea id="validateInput" placeholder="输入JSON字符串进行验证..." rows="8"></textarea>
                    <button id="validateBtn">验证JSON</button>
                    <div id="validateResult" class="result-box"></div>
                </div>
            `,
            onRender: function(tabContent) {
                tabContent.querySelector('#validateBtn').addEventListener('click', function() {
                    var resultDiv = document.getElementById('validateResult');
                    try {
                        JSON.parse(document.getElementById('validateInput').value);
                        resultDiv.innerHTML = '<p class="success">✓ 有效的JSON</p>';
                    } catch (e) {
                        resultDiv.innerHTML = '<p class="error">✗ 无效的JSON: ' + e.message + '</p>';
                    }
                });
            }
        }
    ]
});