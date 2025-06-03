const translations = {
    en: {
        "home.title": "Home | EdenX",
        "welcome.title": "Welcome to EdenX",
        "welcome.message": "Your trusted partner for innovative solutions",
        "nav.home": "Home",
        "nav.about": "About",
        "nav.services": "Services",
        "nav.products": "Products",
        "nav.download": "Download",
        "nav.contact": "Contact",
        "home.about_title": "About Us",
        "home.about_text": "Learn about our company vision and values",
        "home.services_title": "Our Services",
        "home.services_text": "Discover our professional services",
        "home.products_title": "Our Products",
        "home.products_text": "Explore our innovative products",
        "home.learn_more": "Learn more",
        "about.title": "About Us | EdenX",
        "about.heading": "About Our Company",
        "services.title": "Our Services | EdenX",
        "services.heading": "Our Services",
        "services.description": "Discover the range of services we offer.",
        "contact.title": "Contact Us | EdenX",
        "contact.heading": "Get In Touch",
        "contact.name_label": "Your Name",
        "contact.email_label": "Email Address",
        "contact.message_label": "Your Message",
        "contact.submit_btn": "Send Message"
    },
    zh: {
        "home.title": "首页 | EdenX",
        "welcome.title": "欢迎来到EdenX",
        "welcome.message": "您值得信赖的创新解决方案合作伙伴",
        "nav.home": "首页",
        "nav.about": "关于我们",
        "nav.services": "服务项目",
        "nav.products": "产品展示",
        "nav.download": "下载",
        "nav.contact": "联系我们",
        "home.about_title": "关于我们",
        "home.about_text": "了解我们的公司愿景和价值观",
        "home.services_title": "我们的服务",
        "home.services_text": "探索我们的专业服务",
        "home.products_title": "我们的产品",
        "home.products_text": "了解我们的创新产品",
        "home.learn_more": "了解更多",
        "about.title": "关于我们 | EdenX",
        "about.heading": "关于我们公司",
        "services.title": "我们的服务 | EdenX",
        "services.heading": "我们的服务",
        "services.description": "了解我们提供的服务范围",
        "contact.title": "联系我们 | EdenX",
        "contact.heading": "联系我们",
        "contact.name_label": "您的姓名",
        "contact.email_label": "电子邮箱",
        "contact.message_label": "留言内容",
        "contact.submit_btn": "发送消息"
    }
};

// 保持两种调用方式兼容
// 暴露到全局作用域
window.changeLanguage = switchLanguage;

function switchLanguage(lang) {
    console.log('切换语言至:', lang); // 调试日志
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || key;
    });
    
    // 更新页面标题
    const titleKey = document.querySelector('title').getAttribute('data-i18n');
    if (titleKey) {
        document.title = translations[lang][titleKey] || titleKey;
    }
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM已加载，初始化语言...');
    // 默认语言
    let currentLang = 'en';
    
    // 从本地存储获取语言设置
    const savedLang = localStorage.getItem('language');
    console.log('从本地存储获取的语言设置:', savedLang);
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // 应用语言
    switchLanguage(currentLang);
    
    // 增强语言切换调试
    function debugLanguage() {
        console.group('语言状态调试');
        console.log('当前存储的语言:', localStorage.getItem('language'));
        console.log('文档语言属性:', document.documentElement.lang);
        console.log('已绑定的语言按钮:', document.querySelectorAll('[data-lang]').length);
        console.groupEnd();
    }

    // 增强版语言切换绑定
    function setupLanguageSwitcher() {
        // 确保语言按钮存在
        const langButtons = document.querySelectorAll('[data-lang]');
        if (langButtons.length === 0) {
            console.warn('未找到语言切换按钮，将在1秒后重试');
            setTimeout(setupLanguageSwitcher, 1000);
            return;
        }

        // 事件委托处理所有语言按钮
        document.addEventListener('click', function(e) {
            const button = e.target.closest('[data-lang]');
            if (button) {
                console.group('语言切换事件');
                const lang = button.getAttribute('data-lang');
                console.log('切换语言至:', lang);
                
                // 更新状态
                localStorage.setItem('language', lang);
                document.documentElement.lang = lang;
                
                // 应用翻译
                try {
                    switchLanguage(lang);
                    console.log('语言切换成功');
                } catch (err) {
                    console.error('语言切换失败:', err);
                }
                
                debugLanguage();
                console.groupEnd();
            }
        });

        console.log('语言切换器初始化完成，找到按钮:', langButtons.length);
    }

    // 初始化语言切换
    setupLanguageSwitcher();

    // 初始化时调试
    console.group('语言初始化');
    debugLanguage();
    switchLanguage(localStorage.getItem('language') || 'en');
    console.groupEnd();

    // 每5秒检查语言状态（调试用）
    setInterval(debugLanguage, 5000);
});