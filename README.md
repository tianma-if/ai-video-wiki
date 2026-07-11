# 🎬 AI 视频制作速查手册 (AI Video Wiki)

这是一个**纯开源、高信息密度、极简黑白风格**的 AI 视频制作提示词与工作流速查手册。定位是 AI 视频创作者的“新华字典”，方便在创作时快速查找和复制运镜、分镜、剪辑、配音等各环节的核心指令与参数。

项目基于现代内容框架 **Astro v5 + MDX** 构建，并采用 **Bun** 作为默认运行时环境，具有极致的加载性能和优异的搜索引擎友好度 (SEO)。

---

## ✨ 核心特性

*   **📖 字典式卡片布局**：参考 Devhints 的高密度平铺设计，大分类一目了然，子词条一页通览，没有多余的废话和层级。
*   **🔍 全局即时检索**：支持毫秒级模糊搜索，输入“运镜”、“推”或“三幕式”，立即浮现匹配词条，一键锚点跳转。
*   **⚡ 一键快速复制**：每个 Prompt 旁均配置 Zero-Click 复制按钮，点击即刻复制，并提供 "Copied!" 状态反馈。
*   **🖼️ 极轻量动效预览**：卡片悬停时按需加载 WebP 运镜动图，平时默认采用内联 SVG 占位符，极致节省首屏加载开销，首屏秒开。
*   **🎨 极简黑白美学**：精心设计的扁平黑白风格（避开刺眼的纯黑色底，采用软白色背景 `#fafafa` + 纯白卡片 `#ffffff`），还原最专注的速查体验。
*   **📝 纯 MDX 内容驱动**：词条全用标准的 Markdown/MDX 文件书写在 `src/content/wiki/` 目录中，支持组件混写，开源共建门槛极低。

---

## 📂 项目目录结构

```text
ai-video-wiki/
├── src/
│   ├── components/
│   │   ├── SEO.astro         # 集中处理 Meta / Open Graph 等 SEO 标签
│   │   ├── Grid.astro        # 响应式多列卡片平铺网格
│   │   └── Card.astro        # 词条卡片（Hover 动图 + 一键复制 + 占位图逻辑）
│   ├── layouts/
│   │   └── WikiLayout.astro  # 通用页面模板（左侧分类、中间卡片、右侧TOC导航、顶部搜索）
│   ├── pages/
│   │   ├── index.astro       # 极简门户首页（带大搜索框与大类引导卡）
│   │   └── wiki/
│   │       └── [category].astro # 动态路由生成器，映射所有 wiki 分类页
│   └── content/
│       └── wiki/             # MDX 词条内容库（大类文件名，内部为子卡片）
│           ├── topic.mdx        # 选题与策划
│           ├── narrative.mdx    # 叙事与脚本
│           ├── framing.mdx      # 分镜设计
│           ├── camera.mdx       # 运镜控制
│           ├── editing.mdx      # 剪辑与后期
│           └── voiceover.mdx    # 配音与音效
├── public/
│   └── assets/
│       └── previews/         # 运镜预览 WebP 动图存放处
├── content.config.ts         # Astro 5 内容集 Glob 载入配置
├── astro.config.mjs          # Astro 项目配置文件（配置了服务器端口 7171 等）
├── package.json              # 依赖与脚本
└── bun.lockb                 # Bun 依赖锁定文件
```

---

## 🚀 本地开发与部署

本项目已完全迁移至 **Bun** 环境。

### 1. 安装依赖
```bash
bun install
```

### 2. 启动本地开发服务
```bash
# 启动本地服务，支持热重载 (默认占用端口 7171)
bun run dev

# 如果你想在后台模式运行服务（根据项目自定义规范）
bun x astro dev --background
```
启动后在浏览器访问 `http://localhost:7171`。

### 3. 构建静态站点
```bash
# 将项目打包为纯 HTML/CSS 静态资源文件
bun run build
```
打包后生成的静态站点将存放于 `dist/` 目录，可直接拖入 Vercel、Cloudflare Pages、GitHub Pages 等平台进行托管部署。

---

## ✍️ 如何参与共建（添加新词条）

本手册对开源社区高度开放。如果你想补充某个新运镜、分镜提示词或工作流，只需修改或新增 `src/content/wiki/` 目录下的 MDX 文件：

### 词条卡片结构示例：

在对应的 `.mdx` 文件（例如 `camera.mdx`）中，调用 `<Card>` 组件即可添加一张速查卡片：

```mdx
import Card from '../../components/Card.astro';
import Grid from '../../components/Grid.astro';

<Grid>
  <Card 
    title="你的词条名称 (如: 推镜头)" 
    desc="这个词条起什么作用的简短描述"
    kling="Kling 工具对应的 Prompt 组合"
    runway="Runway 工具对应的 Prompt 组合"
    luma="Luma 工具对应的 Prompt 组合"
    preview="/assets/previews/your-webp-preview.webp"
  >
    * **适用场景**：这里可以写一些 Markdown 格式的进阶使用心得或工作流备注。
    * **避坑点**：避免镜头运动速度开得过高导致穿模。
  </Card>
</Grid>
```

**`<Card>` 组件接收的属性：**
*   `title` (必填): 卡片标题。
*   `desc` (可选): 一句话功能解释。
*   `kling` / `runway` / `luma` / `midjourney` / `sd` (可选): 对应 AI 视频/图片工具的具体指令，卡片内会自动渲染复制按钮。
*   `preview` (可选): 鼠标悬停时播放的 WebP 动图或图片路径。
*   `previewStatic` (可选): 静止时的缩略图，若不填会自动降级使用内置的高雅 SVG 纯文字灰色占位图。

---

## 📄 开源协议

本项目采用 [MIT](LICENSE) 开源协议。欢迎大家 Fork 并部署属于你自己的个性化 Wiki 手册！
