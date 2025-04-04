// 时间戳转换工具
ToolRegistry.register({
    id: 'timestamp-converter',
    name: '时间戳转换',
    description: '在时间戳和日期格式之间转换',
    icon: '⏱️',
    category: '数据处理',
    tabs: [
        {
            name: '时间戳转换',
            content: `
                <div class="tool-section">
                    <div class="grid-2-col">
                        <div>
                            <h4>时间戳 → 日期</h4>
                            <input type="number" id="timestampInput" placeholder="输入时间戳">
                            <button id="toDateBtn">转换为日期</button>
                            <div class="result-box" id="dateResult"></div>
                        </div>
                        <div>
                            <h4>日期 → 时间戳</h4>
                            <input type="datetime-local" id="dateInput">
                            <button id="toTimestampBtn">转换为时间戳</button>
                            <div class="result-box" id="timestampResult"></div>
                        </div>
                    </div>
                </div>
                <div class="tool-section">
                    <h4>当前时间:</h4>
                    <div id="currentTime"></div>
                    <button id="copyCurrentTimestamp">复制当前时间戳</button>
                </div>
            `,
            onRender: function(tabContent) {
                // 更新时间显示
                function updateCurrentTime() {
                    var now = new Date();
                    document.getElementById('currentTime').innerHTML = `
                        <p>日期: ${now.toLocaleString()}</p>
                        <p>时间戳: ${Math.floor(now.getTime() / 1000)} (秒) / ${now.getTime()} (毫秒)</p>
                    `;
                }
                
                setInterval(updateCurrentTime, 1000);
                updateCurrentTime();
                
                tabContent.querySelector('#toDateBtn').addEventListener('click', function() {
                    var timestamp = document.getElementById('timestampInput').value;
                    if (!timestamp) return;
                    
                    var date = new Date(timestamp.length === 10 ? timestamp * 1000 : parseInt(timestamp));
                    document.getElementById('dateResult').innerHTML = `
                        <p>本地时间: ${date.toLocaleString()}</p>
                        <p>UTC时间: ${date.toUTCString()}</p>
                    `;
                });
                
                tabContent.querySelector('#toTimestampBtn').addEventListener('click', function() {
                    var dateString = document.getElementById('dateInput').value;
                    if (!dateString) return;
                    
                    var date = new Date(dateString);
                    document.getElementById('timestampResult').innerHTML = `
                        <p>秒时间戳: ${Math.floor(date.getTime() / 1000)}</p>
                        <p>毫秒时间戳: ${date.getTime()}</p>
                    `;
                });
                
                tabContent.querySelector('#copyCurrentTimestamp').addEventListener('click', function() {
                    var timestamp = new Date().getTime();
                    navigator.clipboard.writeText(timestamp).then(function() {
                        alert('已复制当前时间戳: ' + timestamp);
                    });
                });
            }
        }
    ]
});