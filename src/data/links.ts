export interface FriendLink {
  name: string;
  url: string;
  desc: string;
  avatar: string;
  cover: string;
}

export interface LinkCategory {
  name: string;
  list: FriendLink[];
}

// 默认数据
export const defaultLinkData: LinkCategory[] = [
  {
    name: "技术博客",
    list: [
      {
        name: "阮一峰的网络日志",
        url: "https://www.ruanyifeng.com/blog/",
        desc: "阮一峰的技术博客，分享各种技术文章",
        avatar: "https://www.ruanyifeng.com/blog/images/person2_s.jpg",
        cover: "https://www.ruanyifeng.com/blog/images/bg2019031201.jpg"
      },
      {
        name: "酷壳",
        url: "https://coolshell.cn/",
        desc: "陈皓的技术博客，分享编程技术和经验",
        avatar: "https://coolshell.cn/wp-content/uploads/2020/03/coolshell.mini_.png",
        cover: "https://coolshell.cn/wp-content/uploads/2020/03/bg.png"
      }
    ]
  },
  {
    name: "开发工具",
    list: [
      {
        name: "GitHub",
        url: "https://github.com/",
        desc: "全球最大的代码托管平台",
        avatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        cover: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png"
      },
      {
        name: "Vercel",
        url: "https://vercel.com/",
        desc: "云平台，用于静态站点和无服务器功能",
        avatar: "https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/57x57.png",
        cover: "https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg"
      }
    ]
  }
];

// 导出数据加载函数
export async function loadLinkData(): Promise<LinkCategory[]> {
  try {
    const { loadYamlData } = await import('@/lib/yamlUtils');
    const yamlData = await loadYamlData();
    return yamlData.length > 0 ? yamlData : defaultLinkData;
  } catch (error) {
    console.error('Error loading link data:', error);
    return defaultLinkData;
  }
}

// 兼容旧代码
export const linkData = defaultLinkData;
