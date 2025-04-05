// 嵌入信息
function embed() {
    const carrierInput = document.getElementById('carrier');
    const secretInput = document.getElementById('secret');
    const resultDiv = document.getElementById('embedResult');
    
    if (!carrierInput.files.length || !secretInput.value) {
        resultDiv.textContent = "请上传载体文件并输入要隐藏的文本";
        return;
    }
    
    const carrierFile = carrierInput.files[0];
    const secretText = secretInput.value;
    
    // 读取载体文件
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            // 处理载体文件（图片或视频）
            if (carrierFile.type.startsWith('image/')) {
                handleImageEmbed(e.target.result, secretText);
            } else if (carrierFile.type.startsWith('video/')) {
                handleVideoEmbed(e.target.result, secretText);
            } else {
                resultDiv.textContent = "不支持的文件类型";
            }
        } catch (error) {
            resultDiv.textContent = "嵌入失败: " + error.message;
        }
    };
    reader.readAsDataURL(carrierFile);
}

// 提取信息
function extract() {
    const stegoInput = document.getElementById('stego');
    const resultDiv = document.getElementById('extractResult');
    
    if (!stegoInput.files.length) {
        resultDiv.textContent = "请选择隐写文件";
        return;
    }
    
    const stegoFile = stegoInput.files[0];
    
    // 读取隐写文件
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            // 处理隐写文件（图片或视频）
            if (stegoFile.type.startsWith('image/')) {
                handleImageExtract(e.target.result);
            } else if (stegoFile.type.startsWith('video/')) {
                handleVideoExtract(e.target.result);
            } else {
                resultDiv.textContent = "不支持的文件类型";
            }
        } catch (error) {
            resultDiv.textContent = "提取失败: " + error.message;
        }
    };
    reader.readAsDataURL(stegoFile);
}

// 图片隐写处理
function handleImageEmbed(dataUrl, secretText) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 将秘密文本转换为二进制
        const secretBin = textToBinary(secretText);
        const secretLength = secretBin.length;
        
        if (secretLength > data.length * 0.5) {
            document.getElementById('embedResult').textContent = "秘密信息过长，无法嵌入";
            return;
        }
        
        // 嵌入秘密信息长度
        for (let i = 0; i < 32; i++) {
            const bit = (secretLength >> (31 - i)) & 1;
            data[i] = setLSB(data[i], bit);
        }
        
        // 嵌入秘密信息
        for (let i = 0; i < secretLength; i++) {
            const bit = secretBin.charCodeAt(i) & 1;
            data[32 + i] = setLSB(data[32 + i], bit);
        }
        
        // 更新图像数据
        ctx.putImageData(imageData, 0, 0);
        
        // 下载嵌入后的图片
        canvas.toBlob(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = "stego_" + new Date().getTime() + ".png";
            a.click();
            document.getElementById('embedResult').textContent = "嵌入成功，图片已下载";
        }, 'image/png');
    };
    img.src = dataUrl;
}

// 视频隐写处理
function handleVideoEmbed(dataUrl, secretText) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // 创建视频帧数组
        const frames = [];
        const extractFrame = function() {
            if (video.currentTime >= video.duration) {
                // 处理所有帧
                processFrames(frames, secretText);
                return;
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            video.currentTime += 0.1;
            requestAnimationFrame(extractFrame);
        };
        extractFrame();
    };
    video.src = dataUrl;
}

// 处理视频帧并嵌入信息（补充）
function processFrames(frames, secretText) {
    const secretBin = textToBinary(secretText);
    const secretLength = secretBin.length;
    
    // 嵌入秘密信息到帧中
    let bitIndex = 0;
    for (const frame of frames) {
        const data = frame.data;
        for (let i = 0; i < data.length && bitIndex < secretLength; i++) {
            const bit = secretBin.charCodeAt(bitIndex) & 1;
            data[i] = setLSB(data[i], bit);
            bitIndex++;
        }
        if (bitIndex >= secretLength) break;
    }
    
    // 重新组合视频（简化版本，实际需要更复杂的处理）
    // 这里我们只是将处理后的帧转换为Base64字符串并下载
    const canvas = document.createElement('canvas');
    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    const ctx = canvas.getContext('2d');
    
    // 将处理后的帧转换为Base64字符串
    const videoBlob = new Blob([frames.map(frame => {
        ctx.putImageData(frame, 0, 0);
        return canvas.toDataURL('image/png');
    })], { type: 'video/mp4' });
    
    // 下载处理后的视频
    const a = document.createElement('a');
    a.href = URL.createObjectURL(videoBlob);
    a.download = "stego_" + new Date().getTime() + ".mp4";
    a.click();
    document.getElementById('embedResult').textContent = "嵌入成功，视频已下载";
}

// 提取视频中的信息（补充）
function handleVideoExtract(dataUrl) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // 创建视频帧数组
        const frames = [];
        const extractFrame = function() {
            if (video.currentTime >= video.duration) {
                // 处理所有帧
                processExtractedFrames(frames);
                return;
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            video.currentTime += 0.1;
            requestAnimationFrame(extractFrame);
        };
        extractFrame();
    };
    video.src = dataUrl;
}

// 处理提取的视频帧并提取信息（补充）
function processExtractedFrames(frames) {
    // 提取秘密信息
    let secretBin = '';
    let bitIndex = 0;
    const secretLength = 256; // 假设秘密信息长度为256字节
    
    for (const frame of frames) {
        const data = frame.data;
        for (let i = 0; i < data.length && bitIndex < secretLength * 8; i++) {
            secretBin += String.fromCharCode(getLSB(data[i]));
            bitIndex++;
        }
        if (bitIndex >= secretLength * 8) break;
    }
    
    const secretText = binaryToText(secretBin);
    document.getElementById('extractResult').textContent = "提取的信息: " + secretText;
}

// 提取图片中的信息
function handleImageExtract(dataUrl) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 提取秘密信息长度
        let secretLength = 0;
        for (let i = 0; i < 32; i++) {
            secretLength |= (getLSB(data[i]) << (31 - i));
        }
        
        // 提取秘密信息
        let secretBin = '';
        for (let i = 0; i < secretLength; i++) {
            secretBin += String.fromCharCode(getLSB(data[32 + i]));
        }
        
        const secretText = binaryToText(secretBin);
        document.getElementById('extractResult').textContent = "提取的信息: " + secretText;
    };
    img.src = dataUrl;
}

// 辅助函数
function textToBinary(text) {
    return text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function binaryToText(binary) {
    const bytes = binary.match(/.{8}/g);
    return bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('');
}

function setLSB(byte, bit) {
    return (byte & 0xFE) | bit;
}

function getLSB(byte) {
    return byte & 0x01;
}