document.addEventListener("DOMContentLoaded", function() {
  fetch('works.json')
    .then(response => response.json())
    .then(data => {
      const worksList = document.getElementById('worksList');
      data.works.forEach(work => {
        const listItem = document.createElement('li');
        listItem.className = 'work-item';

        // 创建iframe嵌入代码
        const iframe = document.createElement('iframe');
        iframe.src = `//player.bilibili.com/player.html?isOutside=true&aid=${work.videoId}&bvid=${work.bvid}&cid=${work.cid}&p=1&high_quality=1&autoplay=0`;
        iframe.width = '100%';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allowFullScreen = true;

        // 创建标题
        const title = document.createElement('h3');
        title.textContent = work.title;

        // 创建查看更多链接
        const moreLink = document.createElement('a');
        moreLink.href = work.link;
        moreLink.textContent = '查看更多';
        moreLink.target = '_blank';

        // 将所有元素添加到列表项中
        listItem.appendChild(title);
        listItem.appendChild(iframe);
        listItem.appendChild(moreLink);

        // 将列表项添加到作品列表中
        worksList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error loading the JSON file:', error));
});