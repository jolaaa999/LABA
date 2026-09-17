# LABA — Learn AI. Build AI.

武汉科技大学 LABA 品牌官网（Frontend）。

**在线预览（GitHub Pages）：** https://jolaaa999.github.io/LABA/

LABA —— Learn AI, Build AI. 武汉科技大学百度飞桨社团，跟同学们一起学习深度学习，一起学习如何更好的使用 AI，让想要保研的同学能够更好的准备科研，让想要工作就业的同学能够更好的使用 AI 增加做事效率、提高竞争力。

## 本地开发

```bash
cd web
npm install
npm run dev
```

## 构建

```bash
cd web
npm run build
```

## 部署

站点由 `gh-pages` 分支提供，`main` 是源码分支。

推送到 `main` 时，本地 `pre-push` hook（`.git/hooks/pre-push`）会自动构建前端并把产物发布到 `gh-pages` 分支，推送后约 1 分钟生效。日常只需：

```bash
git push
```

新克隆的仓库需要先启用 hook（Git 不把 hook 纳入版本控制）：

```bash
cp .githooks/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```

手动兜底：`cd web && npm run build`，把 `dist/` 的内容推送到 `gh-pages` 分支根目录，并将 `index.html` 复制为 `404.html`（SPA 深链回退）。

## 仓库结构

- `web/` — Vue 3 + Vite 前端（Pages 部署源）
- `backend/` — Go API（Pages 不部署后端）
- `docs/` — 产品 / 架构 / API 文档

## License

见仓库根目录 `LICENSE`。
