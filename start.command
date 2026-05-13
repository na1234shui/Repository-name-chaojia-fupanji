#!/bin/bash

# ============================================
#  吵架复盘机 — AI 情绪关系助手 一键启动
# ============================================

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║     🧠  吵架复盘机  ✨               ║"
echo "  ║     AI 情绪关系操作系统              ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

cd "$PROJECT_DIR" || { echo "❌ 无法进入项目目录"; exit 1; }

# 检查 node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 正在安装依赖..."
  npm install --legacy-peer-deps
  echo ""
fi

echo "🚀 启动开发服务器..."
echo ""

# 启动并自动打开浏览器
npm run dev &
DEV_PID=$!

# 等待服务器就绪
for i in {1..30}; do
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

open http://localhost:3000

echo ""
echo "  ✅ 服务器已启动 → http://localhost:3000"
echo ""
echo "  📱 手机预览（同Wi-Fi）：http://$(ipconfig getifaddr en0):3000"
echo ""
echo "  ⏹  按 Ctrl+C 停止服务器"
echo ""

wait $DEV_PID
