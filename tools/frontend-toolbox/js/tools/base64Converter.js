// Base64转换工具
ToolRegistry.register({
    id: 'base64-converter',
    name: 'Base64转换',
    description: '文本和Base64互相转换',
    icon: 'B64',
    category: '编码解码',
    tabs: [
        {
            name: '文本转Base64',
            content: `
                <div class="tool-section">
                    <textarea id="textToEncode" placeholder="输入要编码的文本..." rows="6"></textarea>
                    <button id="encodeBtn">编码为Base64</button>
                </div>
                <div class="tool-section">
                    <h4>编码结果:</h4>
                    <textarea id="encodedResult" rows="4" readonly></textarea>
                </div>
            `,
            onRender: function(tabContent) {
                tabContent.querySelector('#encodeBtn').addEventListener('click', function() {
                    var text = document.getElementById('textToEncode').value;
                    document.getElementById('encodedResult').value = btoa(unescape(encodeURIComponent(text)));
                });
            }
        },
        {
            name: 'Base64转文本',
            content: `
                <div class="tool-section">
                    <textarea id="base64ToDecode" placeholder="输入要解码的Base64..." rows="6"></textarea>
                    <button id="decodeBtn">解码Base64</button>
                </div>
                <div class="tool-section">
                    <h4>解码结果:</h4>
                    <textarea id="decodedResult" rows="4" readonly></textarea>
                </div>
            `,
            onRender: function(tabContent) {
                tabContent.querySelector('#decodeBtn').addEventListener('click', function() {
                    try {
                        var base64 = document.getElementById('base64ToDecode').value;
                        document.getElementById('decodedResult').value = decodeURIComponent(escape(atob(base64)));
                    } catch (e) {
                        alert('无效的Base64: ' + e.message);
                    }
                });
            }
        }
    ]
});