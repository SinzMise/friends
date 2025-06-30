# 潮汐有人帐 2.0

全新更新！潮汐友人帐 2.0全新采用React+Tailwind CSS编写，并且同时支持Vercel、Netlify和Deno Deploy部署！

## 想要添加屋主的友链？

请看：https://friends.storical.space/add

## 想要部署属于自己的友链？

### Vercel 部署
1. 将项目导入Vercel
2. 无需额外配置，vercel.json已包含所需配置
3. 部署即可

### Netlify 部署
1. 将项目导入Netlify
2. 构建命令: `pnpm build`
3. 发布目录: `dist/static`
4. 其他配置已包含在netlify.toml中

### Deno Deploy 部署
1. 确保已安装Deno
2. 运行 `deno task build`
3. 部署构建后的dist/static目录

## 想要开发？
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build
```