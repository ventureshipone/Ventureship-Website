# Deploying to Netlify

This document provides instructions for deploying the Ventureship application to Netlify.

## Prerequisites

- A Netlify account
- Git repository with your code

## Deployment Steps

### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account
2. Click "New site from Git"
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login to Netlify: `netlify login`
3. Initialize your site: `netlify init`
4. Follow the prompts to configure your site
5. Deploy your site: `netlify deploy --prod`

## Environment Variables

Make sure to set the following environment variables in Netlify:

- `VITE_SUPABASE_URL`: Your Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

You can set these in the Netlify UI under Site settings > Build & deploy > Environment > Environment variables.

## Troubleshooting

### Routing Issues

If you experience routing issues with your SPA, ensure that:

1. The `netlify.toml` file is in the root of your project with the correct redirects configuration
2. The `_redirects` file is in the `public` directory

### Build Failures

If your build fails, check:

1. The build logs in Netlify
2. Ensure all dependencies are correctly installed
3. Verify that the build command and publish directory are correctly set

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [Supabase Environment Variables](https://supabase.com/docs/guides/auth/env-variables)