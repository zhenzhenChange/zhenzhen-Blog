module.exports = {
  // 网站配置
  title: 'zhenzhenChange',
  locales: { '/': { lang: 'zh-CN' } },
  description: 'Awakening The Unknown ...',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  // 主题配置
  theme: 'reco',
  themeConfig: {
    // 站点配置
    type: 'blog',
    logo: '/avatar.jpg',

    // 导航栏
    nav: [
      { text: '首页', icon: 'reco-home', link: '/' },
      { text: '时间轴', icon: 'reco-date', link: '/timeline/' },
      { text: 'JavaScript', icon: 'reco-coding', link: '/docs/knowledge-systems/' },
      /* 
        {
          text: '知识体系',
          icon: 'reco-message',
          items: [
            { text: '每日学习', link: '/docs/DailyStudy/' },
            { text: '面试经历', link: '/docs/InterviewExperiences/' }
          ]
        }, 
      */
      {
        text: '掘金',
        icon: 'reco-juejin',
        link: 'https://juejin.im/user/3650034336296232'
      },
      {
        text: 'GitHub',
        icon: 'reco-github',
        link: 'https://github.com/zhenzhenChange'
      }
    ],

    // 侧边栏
    sidebar: {
      '/docs/': [
        {
          title: 'JavaScript - 数据类型',
          collapsable: false,
          children: [
            '/docs/knowledge-systems/data-type/type-category',
            '/docs/knowledge-systems/data-type/type-detection',
            '/docs/knowledge-systems/data-type/type-conversion',
            '/docs/knowledge-systems/data-type/type-storage',
            '/docs/knowledge-systems/data-type/type-packaging'
          ]
        },
        {
          title: 'JavaScript - 变量声明',
          collapsable: false,
          children: ['/docs/knowledge-systems/variable-statement']
        },
        {
          title: 'JavaScript - 手写代码',
          collapsable: false,
          children: [
            {
              // 数组相关
              title: 'Array',
              children: ['/docs/knowledge-systems/handwritten-code/array-prototype-foreach']
            },
            {
              // 函数相关
              title: 'Function',
              children: [
                '/docs/knowledge-systems/handwritten-code/function-prototype-apply',
                '/docs/knowledge-systems/handwritten-code/function-prototype-call',
                '/docs/knowledge-systems/handwritten-code/function-prototype-bind'
              ]
            },
            {
              // 对象相关
              title: 'Object',
              children: ['/docs/knowledge-systems/handwritten-code/object-static-create']
            },
            {
              // 字符串相关
              title: 'String',
              children: ['/docs/knowledge-systems/handwritten-code/string-prototype-replace']
            },
            {
              // 关键字
              title: 'KeyWords',
              children: [
                '/docs/knowledge-systems/handwritten-code/keyword-new',
                '/docs/knowledge-systems/handwritten-code/keyword-instanceof'
              ]
            },
            {
              // 工具函数
              title: 'Utils',
              children: [
                '/docs/knowledge-systems/handwritten-code/util-after',
                '/docs/knowledge-systems/handwritten-code/util-before',
                '/docs/knowledge-systems/handwritten-code/util-current-time',
                '/docs/knowledge-systems/handwritten-code/util-debounce',
                '/docs/knowledge-systems/handwritten-code/util-parse-query-string',
                '/docs/knowledge-systems/handwritten-code/util-throttle',
                '/docs/knowledge-systems/handwritten-code/util-type-detection'
              ]
            }
          ]
        }
      ]
    },
    subSidebar: 'auto',
    sidebarDepth: 2,

    // 博客配置
    blogConfig: {
      category: {
        text: '分类',
        location: 3
      },
      tag: {
        text: '标签',
        location: 2
      }
    },

    // 友情链接
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      }
    ],

    // 搜索栏
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '最新修改时间',

    // 作者信息
    author: 'zhenzhenChange',
    authorAvatar: '/avatar.jpg',

    // 备案相关
    startYear: '2020',
    record: '备案保留',
    recordLink: 'ICP 备案指向链接',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接'
  },

  // MarkDown 配置
  markdown: {
    lineNumbers: true
  }
}
