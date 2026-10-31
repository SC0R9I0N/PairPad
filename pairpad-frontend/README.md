# PairPad Frontend

React/Vite client for the PairPad collaborative code editor.

## Prerequisites

- **Node.js** (v18 or newer) and **npm**

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 3. (Optional) Run Tests

```bash
npm test
```

## Notes

- The frontend expects the backend to be running at `http://localhost:5000`. API calls to `/api/*` are proxied to the backend via Vite's dev server configuration.
- Start the backend separately (see `pairpad-backend/README.md`) before using any session features.
