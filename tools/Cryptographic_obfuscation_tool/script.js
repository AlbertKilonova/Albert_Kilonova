document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const encryptionType = document.getElementById('encryption-type');
    const obfuscationType = document.getElementById('obfuscation-type');
    const encryptionKey = document.getElementById('encryption-key');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');

    // 上传文件按钮
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    // 处理文件上传
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                inputText.value = event.target.result;
            };
            reader.readAsText(file);
        }
    });

    // 加密/混淆按钮
    encryptBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (!text) {
            alert('请输入要加密/混淆的文本或上传文件');
            return;
        }

        let result = text;

        // 加密
        switch (encryptionType.value) {
            case 'none':
                break;
            case 'base64':
                result = btoa(result);
                break;
            case 'md5':
                result = CryptoJS.MD5(result).toString();
                break;
            case 'caesar':
                result = caesarCipher(result, 3); // 偏移量为3
                break;
            case 'aes':
                const aesKey = encryptionKey.value || 'secret-key-123';
                result = CryptoJS.AES.encrypt(result, aesKey).toString();
                break;
            case 'xor':
                const xorKey = encryptionKey.value.charCodeAt(0) || 0x55;
                result = xorObfuscate(result, xorKey);
                break;
        }

        // 混淆
        switch (obfuscationType.value) {
            case 'none':
                break;
            case 'replace':
                result = replaceCharacters(result);
                break;
            case 'random-insert':
                result = insertRandomCharacters(result);
                break;
            case 'xor':
                const xorKey2 = encryptionKey.value.charCodeAt(0) || 0x55;
                result = xorObfuscate(result, xorKey2);
                break;
        }

        outputText.value = result;
    });

    // 解密/反混淆按钮
    decryptBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (!text) {
            alert('请输入要解密/反混淆的文本或上传文件');
            return;
        }

        let result = text;

        // 反混淆
        switch (obfuscationType.value) {
            case 'none':
                break;
            case 'replace':
                result = reverseReplaceCharacters(result);
                break;
            case 'random-insert':
                result = removeRandomCharacters(result);
                break;
            case 'xor':
                const xorKey = encryptionKey.value.charCodeAt(0) || 0x55;
                result = xorObfuscate(result, xorKey); // XOR 是对称的
                break;
        }

        // 解密
        switch (encryptionType.value) {
            case 'none':
                break;
            case 'base64':
                try {
                    result = atob(result);
                } catch (e) {
                    alert('无效的 Base64 数据');
                }
                break;
            case 'md5':
                alert('MD5 是哈希算法，无法解密');
                break;
            case 'caesar':
                result = caesarCipher(result, -3); // 偏移量为-3
                break;
            case 'aes':
                const aesKey = encryptionKey.value || 'secret-key-123';
                try {
                    const bytes = CryptoJS.AES.decrypt(result, aesKey);
                    result = bytes.toString(CryptoJS.enc.Utf8);
                } catch (e) {
                    alert('解密失败，请检查密钥是否正确');
                }
                break;
            case 'xor':
                const xorKey2 = encryptionKey.value.charCodeAt(0) || 0x55;
                result = xorObfuscate(result, xorKey2); // XOR 是对称的
                break;
        }

        outputText.value = result;
    });

    // 清空按钮
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        encryptionKey.value = '';
    });

    // 复制按钮
    copyBtn.addEventListener('click', function() {
        outputText.select();
        document.execCommand('copy');
        alert('已复制到剪贴板');
    });

    // 下载按钮
    downloadBtn.addEventListener('click', function() {
        const text = outputText.value;
        if (!text) {
            alert('没有可下载的内容');
            return;
        }

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Caesar Cipher 加密/解密
    function caesarCipher(text, shift) {
        const shiftedText = [];
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) { // 大写字母
                shiftedText.push(String.fromCharCode(((charCode - 65 + shift) % 26 + 26) % 26 + 65));
            } else if (charCode >= 97 && charCode <= 122) { // 小写字母
                shiftedText.push(String.fromCharCode(((charCode - 97 + shift) % 26 + 26) % 26 + 97));
            } else {
                shiftedText.push(text[i]);
            }
        }
        return shiftedText.join('');
    }

    // 字符替换
    function replaceCharacters(text) {
        const replacements = {
            'a': '@',
            'e': '3',
            'i': '1',
            'o': '0',
            's': '$',
            't': '+'
        };
        return text.split('').map(char => replacements[char] || char).join('');
    }

    // 反向字符替换
    function reverseReplaceCharacters(text) {
        const replacements = {
            '@': 'a',
            '3': 'e',
            '1': 'i',
            '0': 'o',
            '$': 's',
            '+': 't'
        };
        return text.split('').map(char => replacements[char] || char).join('');
    }

    // 随机插入字符
    function insertRandomCharacters(text) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            if (Math.random() > 0.5) { // 50% 的概率插入一个随机字符
                const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                result += randomChar;
            }
        }
        return result;
    }

    // 移除随机插入的字符
    function removeRandomCharacters(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            // 简单实现：假设插入的字符是小写字母或数字
            if (text[i].match(/[a-z0-9]/)) {
                // 50% 的概率跳过这个字符
                if (Math.random() > 0.5) continue;
            }
            result += text[i];
        }
        return result;
    }

    // XOR 混淆
    function xorObfuscate(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            result += String.fromCharCode(charCode ^ key);
        }
        return btoa(result);
    }
});
