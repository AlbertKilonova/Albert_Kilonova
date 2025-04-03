// 拖放功能实现
function initDragDrop() {
    // 组件拖拽功能
    const componentItems = document.querySelectorAll('.component-item');
    componentItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
        });
    });
    
    // 允许iframe接收拖拽
    const previewFrame = document.getElementById('preview-frame');
    previewFrame.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    // 处理组件放置
    previewFrame.addEventListener('drop', function(e) {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('text/plain');
        const iframeDoc = this.contentDocument;
        const iframeWin = this.contentWindow;
        
        // 计算在iframe中的位置
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 创建新元素
        let newElement = createElementByType(componentType, iframeDoc);
        
        // 设置位置
        newElement.style.position = 'absolute';
        newElement.style.left = x + 'px';
        newElement.style.top = y + 'px';
        
        // 添加到文档
        iframeDoc.body.appendChild(newElement);
        
        // 选中新元素
        selectElement(newElement, iframeDoc, iframeWin);
    });
}

// 根据类型创建元素
function createElementByType(type, doc) {
    let element;
    switch(type) {
        case 'text':
            element = doc.createElement('div');
            element.contentEditable = true;
            element.textContent = '双击编辑文本';
            element.style.minHeight = '20px';
            element.style.minWidth = '100px';
            element.style.padding = '5px';
            element.style.border = '1px dashed #ccc';
            break;
        case 'heading':
            element = doc.createElement('h2');
            element.contentEditable = true;
            element.textContent = '标题';
            break;
        case 'button':
            element = doc.createElement('button');
            element.textContent = '按钮';
            break;
        case 'image':
            element = doc.createElement('img');
            element.src = 'https://via.placeholder.com/150';
            element.alt = '图片';
            element.style.maxWidth = '100%';
            break;
        case 'divider':
            element = doc.createElement('hr');
            break;
        case 'container':
            element = doc.createElement('div');
            element.style.border = '1px dashed #999';
            element.style.minHeight = '100px';
            element.style.padding = '10px';
            element.style.margin = '10px 0';
            break;
        default:
            element = doc.createElement('div');
            element.textContent = '新元素';
    }
    return element;
}

// 选中元素
function selectElement(element, doc, win) {
    // 清除之前的选择
    const previousSelected = doc.querySelectorAll('.selected');
    previousSelected.forEach(el => el.classList.remove('selected'));
    
    // 添加选中样式
    element.classList.add('selected');
    
    // 更新属性面板
    updatePropertiesPanel(element);
    
    // 添加可拖动功能
    setupElementDrag(element);
    
    // 添加双击编辑功能
    setupDoubleClickEdit(element);
}

// 设置元素拖动
function setupElementDrag(element) {
    element.draggable = true;
    element.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', 'move');
        this.style.opacity = '0.5';
    });
    
    element.addEventListener('dragend', function() {
        this.style.opacity = '1';
    });
}

// 设置双击编辑
function setupDoubleClickEdit(element) {
    if (element.contentEditable !== 'true') {
        element.addEventListener('dblclick', function() {
            this.contentEditable = true;
            this.focus();
        });
        
        element.addEventListener('blur', function() {
            this.contentEditable = false;
        });
    }
}// 拖放功能实现
function initDragDrop() {
    // 组件拖拽功能
    const componentItems = document.querySelectorAll('.component-item');
    componentItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-type'));
        });
    });
    
    // 允许iframe接收拖拽
    const previewFrame = document.getElementById('preview-frame');
    previewFrame.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    // 处理组件放置
    previewFrame.addEventListener('drop', function(e) {
        e.preventDefault();
        const componentType = e.dataTransfer.getData('text/plain');
        const iframeDoc = this.contentDocument;
        const iframeWin = this.contentWindow;
        
        // 计算在iframe中的位置
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 创建新元素
        let newElement = createElementByType(componentType, iframeDoc);
        
        // 设置位置
        newElement.style.position = 'absolute';
        newElement.style.left = x + 'px';
        newElement.style.top = y + 'px';
        
        // 添加到文档
        iframeDoc.body.appendChild(newElement);
        
        // 选中新元素
        selectElement(newElement, iframeDoc, iframeWin);
    });
}

// 根据类型创建元素
function createElementByType(type, doc) {
    let element;
    switch(type) {
        case 'text':
            element = doc.createElement('div');
            element.contentEditable = true;
            element.textContent = '双击编辑文本';
            element.style.minHeight = '20px';
            element.style.minWidth = '100px';
            element.style.padding = '5px';
            element.style.border = '1px dashed #ccc';
            break;
        case 'heading':
            element = doc.createElement('h2');
            element.contentEditable = true;
            element.textContent = '标题';
            break;
        case 'button':
            element = doc.createElement('button');
            element.textContent = '按钮';
            break;
        case 'image':
            element = doc.createElement('img');
            element.src = 'https://via.placeholder.com/150';
            element.alt = '图片';
            element.style.maxWidth = '100%';
            break;
        case 'divider':
            element = doc.createElement('hr');
            break;
        case 'container':
            element = doc.createElement('div');
            element.style.border = '1px dashed #999';
            element.style.minHeight = '100px';
            element.style.padding = '10px';
            element.style.margin = '10px 0';
            break;
        default:
            element = doc.createElement('div');
            element.textContent = '新元素';
    }
    return element;
}

// 选中元素
function selectElement(element, doc, win) {
    // 清除之前的选择
    const previousSelected = doc.querySelectorAll('.selected');
    previousSelected.forEach(el => el.classList.remove('selected'));
    
    // 添加选中样式
    element.classList.add('selected');
    
    // 更新属性面板
    updatePropertiesPanel(element);
    
    // 添加可拖动功能
    setupElementDrag(element);
    
    // 添加双击编辑功能
    setupDoubleClickEdit(element);
}

// 设置元素拖动
function setupElementDrag(element) {
    element.draggable = true;
    element.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', 'move');
        this.style.opacity = '0.5';
    });
    
    element.addEventListener('dragend', function() {
        this.style.opacity = '1';
    });
}

// 设置双击编辑
function setupDoubleClickEdit(element) {
    if (element.contentEditable !== 'true') {
        element.addEventListener('dblclick', function() {
            this.contentEditable = true;
            this.focus();
        });
        
        element.addEventListener('blur', function() {
            this.contentEditable = false;
        });
    }
}