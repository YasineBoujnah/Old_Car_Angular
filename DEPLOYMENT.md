# Deployment Guide

This project is configured to be deployed easily to **Vercel** or **GitHub Pages**.

## 1. Backend Configuration
Your application uses `json-server` for data.
- **Locally**: It connects to `http://localhost:3000` (run `npx json-server --watch db.json`).
- **Production (Live)**: Since `json-server` is local-only, we have configured the app to use [My JSON Server](https://my-json-server.typicode.com/) for the live version.
    - This allows people to view your data from `db.json` directly from your GitHub repository.
    - **Note**: The live version is **Read-Only**. Changes (adding/editing products) will appear to work on the screen but won't be saved permanently to the database. This is normal for a demo.

## 2. Deploying to Vercel (Recommended)
Vercel is the easiest way to host Angular apps.

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [Vercel.com](https://vercel.com) and Sign Up/Log In.
3.  Click **"Add New Project"**.
4.  Select **"Import"** next to your GitHub repository `Old_Car_Angular`.
5.  Vercel will detect it's an Angular project.
6.  Click **"Deploy"**.
7.  Wait a minute, and you will get a live URL (e.g., `old-car-angular.vercel.app`).

## 3. Configuration Details
- **Environments**:
    - `src/environments/environment.ts`: Used locally (`http://localhost:3000`).
    - `src/environments/environment.prod.ts`: Used in production (`https://my-json-server.typicode.com/...`).
- **Angular Config**:
    - `angular.json` is configured to swap these environment files when building for production.
