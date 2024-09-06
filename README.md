# Pret - Google Chrome Extension

## Overview

**Pret** is a Google Chrome extension designed to simplify selected text into easy-to-understand language, making content more accessible and improving comprehension for all users.

The project is built using a full-stack setup with a Svelte-based frontend and an Express.js backend. The frontend is powered by Vite, ensuring a fast and efficient development experience, while the backend leverages Express.js with essential middleware to handle API requests.

## Features

### Chrome Extension (Frontend)
- **Simplification of Text**: Highlights and simplifies selected text on any webpage to improve readability and comprehension.
- **Svelte Framework**: A highly efficient, reactive framework for building user interfaces.
- **Vite Build Tool**: Provides a fast development environment with Hot Module Replacement (HMR) for seamless changes during development.

### Backend (Server)
- **Express.js**: Handles API requests to process and simplify text.
- **CORS**: Enables secure handling of cross-origin resource sharing for API requests from the Chrome extension.
- **dotenv**: Manages environment variables securely.
- **Nodemon**: Automatically restarts the server during development for a smoother workflow.

## Tech Stack

- **Frontend**: 
  - Svelte v4.2.18
  - Vite v5.4.1
- **Backend**: 
  - Express.js v4.19.2
  - Nodemon v3.1.4
  - CORS v2.8.5
  - dotenv v16.4.5

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/RhamzThev/Pret
    ```

2. Navigate into the `client` and `server` directories and install dependencies:
    ```bash
    # For client
    cd client
    pnpm install

    # For server
    cd ../server
    pnpm install
    ```

## Running the App

### Client (Frontend)
To start the development server for the frontend:
```bash
cd client
pnpm dev
```

This will start a Vite development server with Hot Module Replacement (HMR) enabled for quick feedback while coding.

### Server (Backend)
To start the backend server:
```bash
cd server
pnpm dev
```

This will start an Express.js server with Nodemon for automatic restarts on file changes, allowing for an efficient development experience.

## Building the Chrome Extension

To build the extension for production:
```bash
cd client
pnpm build
```

This will generate the necessary files to load as a Chrome extension.

## How to Load the Extension in Chrome

1. Run the build command to generate the extension files.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `client/dist` folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

For more information, check out the official documentation for [Svelte](https://svelte.dev), [Vite](https://vitejs.dev/), and [Express.js](https://expressjs.com/).
