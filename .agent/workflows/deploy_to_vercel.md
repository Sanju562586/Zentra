---
description: How to deploy the application to Vercel
---

This guide explains how to deploy the omniorder-frontend to Vercel.

### Prerequisites

1.  **Vercel Account**: You need an account at [vercel.com](https://vercel.com).
2.  **Vercel CLI** (Optional but recommended for manual deploys):
    ```powershell
    npm install -g vercel
    ```

### Option 1: Git Integration (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
3.  Import your Git repository.
4.  Vercel will auto-detect **Vite**.
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./`
    *   **Build Command**: `vite build` (or `npm run build`)
    *   **Output Directory**: `dist`
5.  Click **Deploy**.

### Option 2: Vercel CLI (Manual)

1.  Open your terminal in the project root (`c:\ProgFiles\RCB_Frontend\omniorder-frontend`).
2.  Log in to Vercel:
    ```powershell
    vercel login
    ```
3.  Deploy the project:
    ```powershell
    vercel
    ```
4.  Follow the prompts:
    *   Set up and deploy? **Y**
    *   Which scope? (Select your account)
    *   Link to existing project? **N**
    *   Project name? (Press Enter)
    *   Directory? (Press Enter for `./`)
    *   Want to modify settings? **N** (Auto-detection usually works)

5.  **Production Deployment**:
    To deploy to production (live URL):
    ```powershell
    vercel --prod
    ```

### Environment Variables

If your app uses environment variables (like `VITE_API_URL`), make sure to add them in Vercel:
*   **Settings** -> **Environment Variables**
*   Add `VITE_API_URL` with your backend URL.
