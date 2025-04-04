// PWA服务工作者注册
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker 注册成功: ', registration.scope);
            }).catch(err => {
                console.log('ServiceWorker 注册失败: ', err);
            });
        });
    }
}

// 安装提示
export function initInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        const installBtn = document.createElement('button');
        installBtn.id = 'installBtn';
        installBtn.className = 'floating-btn';
        installBtn.innerHTML = '安装应用';
        installBtn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('用户接受了安装提示');
                }
                deferredPrompt = null;
            });
        });
        
        document.body.appendChild(installBtn);
    });
    
    window.addEventListener('appinstalled', () => {
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.remove();
        }
    });
}