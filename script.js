document.addEventListener("DOMContentLoaded", function() {
  fetch('works.json')
    .then(response => response.json())
    .then(data => {
      const worksList = document.getElementById('worksList');
      data.works.forEach(work => {
        const listItem = document.createElement('li');
        listItem.className = 'work-item';

        const iframe = document.createElement('iframe');
        iframe.src = `//player.bilibili.com/player.html?isOutside=true&aid=${work.videoId}&bvid=${work.bvid}&cid=${work.cid}&p=1&high_quality=1&autoplay=0`;
        iframe.width = '100%';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allowFullScreen = true;

        const title = document.createElement('h3');
        title.textContent = work.title;

        const moreLink = document.createElement('a');
        moreLink.href = work.link;
        moreLink.textContent = '查看更多';
        moreLink.target = '_blank';

        listItem.appendChild(title);
        listItem.appendChild(iframe);
        listItem.appendChild(moreLink);

        worksList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error loading the JSON file:', error));
});