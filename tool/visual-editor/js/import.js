// 导入功能实现
function initImportFunctions() {
    // 导入HTML功能
    document.getElementById('import-html-btn').addEventListener('click', function() {
        document.getElementById('import-html-modal').style.display = 'flex';
    });
    
    document.getElementById('confirm-import-html').addEventListener('click', function() {
        const fileInput = document.getElementById('html-file-input');
        const codeInput = document.getElementById('html-code-input');
        const previewFrame = document.getElementById('preview-frame');
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewFrame.contentDocument.open();
                previewFrame.contentDocument.write(e.target.result);
                previewFrame.contentDocument.close();
                document.getElementById('import-html-modal').style.display = 'none';
            };
            
            reader.readAsText(file);
        } else if (codeInput.value.trim() !== '') {
            previewFrame.contentDocument.open();
            previewFrame.contentDocument.write(codeInput.value);
            previewFrame.contentDocument.close();
            document.getElementById('import-html-modal').style.display = 'none';
        }
    });
    
    // 关闭模态框
    document.querySelectorAll('.close-modal, .modal-footer button').forEach(btn => {
        if (btn.textContent === '取消' || btn.classList.contains('close-modal')) {
            btn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        }
    });
    
    // 导入CSS和JS功能类似...
}