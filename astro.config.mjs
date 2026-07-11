// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: '🎬 AI Video Hints',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/tianma-if/ai-video-hints' },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: '速查分类',
          items: [
            { label: '选题与策划', link: '/topic' },
            { label: '叙事与脚本', link: '/narrative' },
            { label: '分镜设计', link: '/framing' },
            { label: '运镜控制', link: '/camera' },
            { label: '剪辑与后期', link: '/editing' },
            { label: '配音与音效', link: '/voiceover' },
          ],
        },
      ],
    }),
  ],
  server: {
    port: 7171,
  }
});