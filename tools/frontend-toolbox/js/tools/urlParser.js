export const tools = [
    {
        id: 'url-parser',
        name: 'URL解析器',
        description: '解析URL的各个组成部分',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 3h2v2h-2zm8 0h2v2h-2zm0 4h2v2h-2zm-4-4h2v2h-2zM3 3h2v2H3zm0 4h2v2H3zm0 4h2v2H3zm0 4h2v2H3zm0 4h2v2H3zm4-12h2v2H7zm0 12h2v2H7zm4-12h2v2h-2zm0 12h2v2h-2zm4-12h2v2h-2zm0 8h2v2h-2zm0-4h2v2h-2z"/></svg>',
        category: '网络工具',
        tabs: [
            {
                name: 'URL解析',
                content: `
                    <div class="tool-section">
                        <input type="url" id="urlInput" placeholder="输入URL进行解析..." style="width: 100%">
                        <button id="parseBtn">解析URL</button>
                    </div>
                    <div class="tool-section">
                        <h4>解析结果:</h4>
                        <div class="url-result-grid">
                            <div class="url-result-item">
                                <label>协议:</label>
                                <span id="protocol"></span>
                            </div>
                            <div class="url-result-item">
                                <label>主机:</label>
                                <span id="host"></span>
                            </div>
                            <div class="url-result-item">
                                <label>路径:</label>
                                <span id="path"></span>
                            </div>
                            <div class="url-result-item">
                                <label>查询参数:</label>
                                <div id="queryParams" class="params-container"></div>
                            </div>
                        </div>
                    </div>
                    <style>
                        .url-result-grid {
                            display: grid;
                            grid-template-columns: 1fr 3fr;
                            gap: 10px;
                        }
                        
                        .url-result-item {
                            display: contents;
                        }
                        
                        .url-result-item label {
                            font-weight: bold;
                            padding: 5px;
                            background: var(--bg-color);
                        }
                        
                        .url-result-item span {
                            padding: 5px;
                            word-break: break-all;
                        }
                        
                        .params-container {
                            display: grid;
                            grid-template-columns: 1fr 3fr;
                            gap: 5px;
                        }
                    </style>
                    <script>
                        document.getElementById('parseBtn').addEventListener('click', function() {
                            try {
                                const url = new URL(document.getElementById('urlInput').value);
                                
                                document.getElementById('protocol').textContent = url.protocol;
                                document.getElementById('host').textContent = url.host;
                                document.getElementById('path').textContent = url.pathname;
                                
                                const paramsContainer = document.getElementById('queryParams');
                                paramsContainer.innerHTML = '';
                                
                                url.searchParams.forEach((value, key) => {
                                    const paramDiv = document.createElement('div');
                                    paramDiv.textContent = key;
                                    paramsContainer.appendChild(paramDiv);
                                    
                                    const valueDiv = document.createElement('div');
                                    valueDiv.textContent = value;
                                    paramsContainer.appendChild(valueDiv);
                                });
                            } catch (e) {
                                alert('无效的URL: ' + e.message);
                            }
                        });
                    <\/script>
                `
            }
        ]
    }
];