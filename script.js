// 语音聊天功能
document.getElementById('start-chat').addEventListener('click', async function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN';
    recognition.start();

    recognition.onresult = async function(event) {
        const userInput = event.results[0][0].transcript;
        document.getElementById('chat-output').innerHTML += `<p><strong>你:</strong> ${userInput}</p>`;
        await sendMessageToChatGPT(userInput);
    };

    recognition.onerror = function(event) {
        document.getElementById('chat-output').innerHTML += `<p><strong>错误:</strong> ${event.error}</p>`;
    };
});

// 手动输入文本功能
document.getElementById('send-text').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        document.getElementById('chat-output').innerHTML += `<p><strong>你:</strong> ${userInput}</p>`;
        document.getElementById('user-input').value = ""; // 清空输入框
        await sendMessageToChatGPT(userInput);
    }
});

// 将消息发送到ChatGPT并显示响应
async function sendMessageToChatGPT(userInput) {
    // 显示加载动画
    document.getElementById('loading-spinner').classList.remove('hidden');

    try {
        const response = await fetch('https://sparkling-king-73ae.albert-kilonova.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userInput }]
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败，状态码: ${response.status}`);
        }

        const data = await response.json();
        const chatbotResponse = data.choices[0].message.content;
        document.getElementById('chat-output').innerHTML += `<p><strong>ChatGPT:</strong> ${chatbotResponse}</p>`;
        speakText(chatbotResponse); // 调用文本转语音功能
    } catch (error) {
        document.getElementById('chat-output').innerHTML += `<p><strong>错误:</strong> ${error.message}</p>`;
    } finally {
        // 隐藏加载动画
        document.getElementById('loading-spinner').classList.add('hidden');
    }
}

// 示例的 speakText 函数
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
