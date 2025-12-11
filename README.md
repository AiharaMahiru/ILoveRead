# I Love Read (ILoveRead)

A Progressive Web Application (PWA) for reading PDF and Markdown files online, featuring a distinct Neobrutalism design style.

## 🌟 Features

*   **Multi-format Support**: Read PDF and Markdown files directly in the browser.
*   **Progressive Web App (PWA)**: Installable on PC and Mobile. Supports offline reading by caching opened books.
*   **Neobrutalism Design**: High contrast, bold typography, hard shadows, and vibrant colors using Tailwind CSS v4.
*   **Responsive**: Optimized for various screen ratios (PC 16:9/16:10, Mobile 19.5:9/21:9).
*   **User Management**: Secure Registration and Login functionality.
*   **Cloud Storage**: Metadata stored in remote MySQL, file content stored securely on the server.

## 🛠 Tech Stack

### Frontend
*   **Framework**: React 19 (via Vite)
*   **Styling**: Tailwind CSS v4 (Alpha/Beta)
*   **PWA**: `vite-plugin-pwa`, `idb` (IndexedDB for caching)
*   **Reader Engines**: `react-pdf`, `react-markdown`

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express
*   **Language**: TypeScript
*   **ORM**: TypeORM
*   **Database**: MySQL (Remote)
*   **Auth**: JWT & Bcrypt

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd iloveread
    ```

2.  **Setup Server**
    ```bash
    cd server
    npm install

    # Configure Database
    # The project is pre-configured to connect to the 'iloveread' remote MySQL database.
    # See server/src/data-source.ts for credentials.

    # Start the Backend
    npm run dev
    # Server runs on http://localhost:3000
    ```

3.  **Setup Client**
    ```bash
    cd client
    npm install

    # Start the Frontend
    npm run dev
    # Client runs on http://localhost:5173
    ```

## 📖 Usage

1.  Open the frontend application.
2.  Register a new account or Login.
3.  Click "**+ UPLOAD BOOK**" to upload a PDF or Markdown file.
4.  Click on a book card to open the reader.
5.  **Offline Mode**: Once a book is opened, it is cached locally. You can read it even without an internet connection.

## 🎨 Design System

The application follows the **Neobrutalism** trend:
*   **Colors**:
    *   Primary: `#FF90E8` (Pink)
    *   Secondary: `#23A094` (Teal)
    *   Background: `#E0E7F1`
*   **Typography**: Monospaced / Courier New
*   **Components**: Thick borders (`4px`), hard shadows, no border-radius smoothing.

## 🔮 Roadmap

*   [ ] Bookmark UI implementation (Backend logic exists).
*   [ ] Theme customization interface.
*   [ ] EPUB support.
