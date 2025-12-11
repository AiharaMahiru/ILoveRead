# I Love Read (ILoveRead)

[English](README_EN.md) | [中文](README.md)

一个在线阅读 PDF 和 Markdown 文件的渐进式 Web 应用程序 (PWA)，采用独特的 Neobrutalism 设计风格。

## 🌟 功能特性

*   **多格式支持**：直接在浏览器中阅读 PDF 和 Markdown 文件。
*   **渐进式 Web 应用 (PWA)**：支持在 PC 和移动设备上安装。支持离线阅读（自动缓存打开的书籍）。
*   **Neobrutalism 设计**：使用 Tailwind CSS v4 构建的高对比度、粗体排版、硬阴影和鲜艳配色。
*   **响应式布局**：适配各种屏幕比例（PC 16:9/16:10，手机 19.5:9/21:9）。
*   **用户管理**：安全的用户注册和登录功能。
*   **云存储**：元数据存储在远程 MySQL 数据库中，文件内容安全地存储在服务器上。

## 🛠 技术栈

### 前端 (Frontend)
*   **框架**：React 19 (via Vite)
*   **样式**：Tailwind CSS v4 (Alpha/Beta)
*   **PWA**：`vite-plugin-pwa`，`idb` (使用 IndexedDB 进行缓存)
*   **阅读引擎**：`react-pdf`，`react-markdown`

### 后端 (Backend)
*   **运行环境**：Node.js
*   **框架**：Express
*   **语言**：TypeScript
*   **ORM**：TypeORM
*   **数据库**：MySQL (远程)
*   **认证**：JWT & Bcrypt

## 🚀 快速开始

### 前置要求
*   Node.js (v18+)
*   npm

### 安装步骤

1.  **克隆仓库**
    ```bash
    git clone <repository-url>
    cd iloveread
    ```

2.  **设置服务器 (Server)**
    ```bash
    cd server
    npm install

    # 数据库配置
    # 项目已预配置连接到 'iloveread' 远程 MySQL 数据库。
    # 详见 server/src/data-source.ts 中的凭据。

    # 启动后端
    npm run dev
    # 服务器将运行在 http://localhost:39301
    ```

3.  **设置客户端 (Client)**
    ```bash
    cd client
    npm install

    # 启动前端
    npm run dev
    # 客户端将运行在 http://localhost:39302
    ```

## 📖 使用说明

1.  打开前端应用程序 (http://localhost:39302)。
2.  注册一个新账号或直接登录。
3.  点击 "**+ UPLOAD BOOK**" 上传 PDF 或 Markdown 文件。
4.  点击书籍卡片进入阅读器。
5.  **离线模式**：书籍一旦打开，就会被自动缓存到本地。即使没有网络连接，您也可以继续阅读。

## 🎨 设计系统

应用程序遵循 **Neobrutalism (新粗野主义)** 风格：
*   **配色**：
    *   主色：`#FF90E8` (粉色)
    *   次色：`#23A094` (青色)
    *   背景：`#E0E7F1`
*   **排版**：等宽字体 / Courier New
*   **组件**：粗边框 (`4px`)，硬阴影，无圆角平滑处理。

## 🔮 路线图

*   [ ] 书签 UI 实现 (后端逻辑已存在)。
*   [ ] 主题自定义接口。
*   [ ] EPUB 格式支持。
