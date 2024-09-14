# Pret - Google Chrome Extension

https://github.com/user-attachments/assets/90c35a8a-5f0f-4ced-9b98-2901085ae985

## Overview

**Pret** is a Google Chrome extension designed to simplify selected text into easy-to-understand language, making content more accessible and improving comprehension for all users.

The project is built using a full-stack setup with a Svelte-based frontend and an Express.js backend. The frontend is powered by Vite, ensuring a fast and efficient development experience, while the backend leverages Express.js with essential middleware to handle API requests.

## Features

- **Enter Input Text for Simplification**: Paste or type your text into Pret, and it will transform it into more accessible language.
- **Copy Output to Clipboard**: Easily copy the simplified text to your clipboard with a single click for convenient use.
- **Character Limits**: Input text is limited to 500 characters per submission, with a daily cap of 1500 characters to ensure fair usage.
- **Text-to-Speech**: Convert the simplified output into speech to listen to the text, enhancing accessibility and comprehension.

## How to Use

1. Enter your text into the input field.
2. Click the button to simplify the text.
3. Copy the simplified text to your clipboard or listen to it using the text-to-speech feature.

## Technology

### Chrome Extension (Frontend)
- **Svelte Framework**: A highly efficient, reactive framework for building user interfaces.
- **Vite Build Tool**: Provides a fast development environment with Hot Module Replacement (HMR) for seamless changes during development.

### Server (Backend)
- **Express.js**: Handles API requests to process and simplify text.
- **CORS**: Enables secure handling of cross-origin resource sharing for API requests from the Chrome extension.
- **dotenv**: Manages environment variables securely.
- **Nodemon**: Automatically restarts the server during development for a smoother workflow.

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
