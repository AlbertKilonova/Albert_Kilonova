// 主应用程序逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化编辑器内容
    const previewFrame = document.getElementById('preview-frame');
    const defaultHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>新建文档</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>欢迎使用可视化HTML编辑器</h1>
        <p>从这里开始创建您的内容...</p>
    </div>
</body>
</html>
    `;
    
    // 设置iframe初始内容
    previewFrame.contentDocument.open();
    previewFrame.contentDocument.write(defaultHtml);
    previewFrame.contentDocument.close();
    
    // 初始化拖放功能
    initDragDrop();
    
    // 初始化属性面板
    initPropertiesPanel();
    
    // 初始化导入功能
    initImportFunctions();
    
    // 其他全局事件监听
    document.getElementById('bold-btn').addEventListener('click', function() {
        const selected = getSelectedElement();
        if (selected) {
            document.execCommand('bold', false, null);
        }
    });
    
    // 其他工具栏按钮事件...
});

// 获取当前选中的元素
function getSelectedElement() {
    const previewFrame = document.getElementById('preview-frame');
    return previewFrame.contentDocument.querySelector('.selected');
}