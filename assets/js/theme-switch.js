class ThemeSwitch {
    constructor() {
        this.themeSelectDesktop = document.getElementById('theme-select-desktop');
        this.themeSelectMobile = document.getElementById('theme-select-mobile');
        this.themeSwitch = document.querySelector('.theme-switch');
        
        // 获取当前主题
        const currentTheme = localStorage.getItem('theme') || 'auto';
        
        // 初始化主题
        this.initializeTheme(currentTheme);
        
        // 绑定事件
        this.bindEvents();
        
        // 监听系统主题变化
        this.initializeSystemThemeListener();
    }

    initializeTheme(theme) {
        // 设置下拉框的值
        if (this.themeSelectDesktop) {
            this.themeSelectDesktop.value = theme;
        }
        if (this.themeSelectMobile) {
            this.themeSelectMobile.value = theme;
        }
        
        // 应用主题
        this.applyTheme(theme);
    }

    bindEvents() {
        // 绑定桌面端主题选择事件
        if (this.themeSelectDesktop) {
            this.themeSelectDesktop.addEventListener('change', (e) => {
                this.handleThemeChange(e.target.value);
            });
        }

        // 绑定移动端主题选择事件
        if (this.themeSelectMobile) {
            this.themeSelectMobile.addEventListener('change', (e) => {
                this.handleThemeChange(e.target.value);
            });
        }

        // 绑定主题切换按钮事件
        if (this.themeSwitch) {
            this.themeSwitch.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.handleThemeChange(newTheme);
            });
        }
    }

    initializeSystemThemeListener() {
        // 监听系统主题变化
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 初始检查
        if (localStorage.getItem('theme') === 'auto') {
            this.applyTheme(mediaQuery.matches ? 'dark' : 'light');
        }
        
        // 添加变化监听
        mediaQuery.addEventListener('change', (e) => {
            if (localStorage.getItem('theme') === 'auto') {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    handleThemeChange(theme) {
        // 保存主题设置
        localStorage.setItem('theme', theme);
        
        // 更新下拉选择框的值
        if (this.themeSelectDesktop) {
            this.themeSelectDesktop.value = theme;
        }
        if (this.themeSelectMobile) {
            this.themeSelectMobile.value = theme;
        }
        
        // 应用主题
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        // 设置主题
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
        
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.add('tw-dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.remove('tw-dark');
        }
        
        // 更新全局变量
        window.theme = isDark ? 'dark' : 'light';
        window.isDark = isDark;
        
        // 触发主题切换事件
        if (window.switchThemeEventSet) {
            window.switchThemeEventSet.forEach(handler => {
                handler();
            });
        }
    }
}

// 当DOM加载完成后初始化主题切换
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitch();
});
