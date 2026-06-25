# 后端八股文

后端面试题库前端展示，React + TypeScript + Vite + Tailwind CSS。

## 本地开发

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 构建到 dist/
```

## Docker 部署

```bash
# 服务器上执行
chmod +x deploy.sh
./deploy.sh
```

默认映射端口 `8089`，可在 `deploy.sh` 中修改 `PORT` 变量。

## 手动部署

```bash
docker build -t localhost/backend-interview:latest .
docker stop backend-interview 2>/dev/null; docker rm backend-interview 2>/dev/null
docker run -d --name backend-interview --restart unless-stopped -p 8089:80 localhost/backend-interview:latest
```
