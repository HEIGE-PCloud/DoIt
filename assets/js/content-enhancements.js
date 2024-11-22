import ClipboardJS from 'clipboard';
import mediumZoom from 'medium-zoom';
import tippy from 'tippy.js';
import 'lazysizes';
import 'instant.page';

// 代码块复制功能
const initializeCodeCopy = () => {
    const clipboard = new ClipboardJS('.code-copy-btn');
    clipboard.on('success', (e) => {
        const button = e.trigger;
        button.setAttribute('data-tippy-content', 'Copied!');
        button._tippy.show();
        setTimeout(() => {
            button._tippy.hide();
            button.setAttribute('data-tippy-content', 'Copy');
        }, 2000);
    });
};

// 图片点击放大
const initializeImageZoom = () => {
    mediumZoom('.content img:not(.no-zoom)', {
        margin: 24,
        background: 'rgba(0,0,0,0.9)',
        scrollOffset: 40,
    });
};

// 文章阅读时间估算
const calculateReadingTime = () => {
    const content = document.querySelector('.content');
    if (!content) return;
    
    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 假设阅读速度为每分钟200字
    
    const readingTimeElement = document.querySelector('.reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTime} min read`;
    }
};

// 文章目录
const initializeTOC = () => {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('.content h2, .content h3');
    const tocList = document.createElement('ul');
    
    headings.forEach((heading) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // 为标题添加ID
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        }
        
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.className = heading.tagName === 'H3' ? 'pl-4' : '';
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    toc.appendChild(tocList);

    // 滚动时高亮当前标题
    window.addEventListener('scroll', () => {
        const headings = Array.from(document.querySelectorAll('.content h2, .content h3'));
        const scrollPosition = window.scrollY;

        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            if (heading.offsetTop <= scrollPosition + 100) {
                const activeLink = toc.querySelector('.active');
                if (activeLink) {
                    activeLink.classList.remove('active');
                }
                const newActiveLink = toc.querySelector(`a[href="#${heading.id}"]`);
                if (newActiveLink) {
                    newActiveLink.classList.add('active');
                }
                break;
            }
        }
    });
};

// 初始化提示工具
const initializeTooltips = () => {
    tippy('[data-tippy-content]', {
        delay: [200, 0],
        arrow: true,
        theme: 'custom',
    });
};

// 文章分享功能
const initializeShare = () => {
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const platform = button.dataset.platform;
            
            let shareUrl = '';
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
};

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initializeCodeCopy();
    initializeImageZoom();
    calculateReadingTime();
    initializeTOC();
    initializeTooltips();
    initializeShare();
});
