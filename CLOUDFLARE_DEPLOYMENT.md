# Cloudflare Pages Deployment Guide

This guide explains how to deploy the ON3 Studio website to Cloudflare Pages with GitHub integration.

## Overview

The application has been configured to work with:
- **Cloudflare Pages** for frontend hosting
- **Cloudflare Functions** for API routes (replacing Express.js backend)
- **GitHub Integration** for automatic deployments

## Project Structure

```
project-root/
├── functions/               # Cloudflare Functions (API routes)
│   ├── api/
│   │   ├── contact.js      # POST/GET /api/contact
│   │   ├── services.js     # GET /api/services  
│   │   ├── services/
│   │   │   └── [slug].js   # GET /api/services/:slug
│   │   ├── bookings.js     # POST/GET /api/bookings
│   │   ├── availability/
│   │   │   └── [serviceId].js # GET /api/availability/:serviceId
│   │   └── seed-services.js    # POST /api/seed-services
│   └── _middleware.js      # Global middleware (CORS, security)
├── client/                 # Frontend React application
├── _routes.json           # Routing configuration
├── wrangler.toml          # Cloudflare configuration
├── cloudflare-build.js    # Custom build script
└── package.json           # Updated with Cloudflare scripts
```

## Setup Instructions

### 1. Prerequisites

- GitHub repository with this project
- Cloudflare account
- Access to Cloudflare Pages dashboard

### 2. GitHub Repository Setup

1. Push this project to your GitHub repository
2. Ensure all Cloudflare configuration files are committed:
   - `functions/` directory with all API routes
   - `_routes.json` for routing
   - `wrangler.toml` for configuration
   - `cloudflare-build.js` for build process

### 3. Cloudflare Pages Configuration

#### Connect Repository

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Select "Connect to Git"
4. Choose your GitHub repository
5. Configure build settings:

#### Build Settings

- **Project Name**: `on3-studio` (or your preferred name)
- **Production Branch**: `main` (or your default branch)
- **Build Command**: `node cloudflare-build.js` or add `"build:cloudflare": "node cloudflare-build.js"` to package.json scripts
- **Build Output Directory**: `dist/public`
- **Root Directory**: `/` (leave empty for root)

**Note**: If you want to add the build script to package.json, add this line to the "scripts" section:
```json
"build:cloudflare": "node cloudflare-build.js"
```

#### Environment Variables

Configure the following environment variables in Cloudflare Pages:

**Production Environment:**
```
NODE_ENV=production
DATABASE_URL=your-production-database-url
```

**Preview Environment:**
```
NODE_ENV=development  
DATABASE_URL=your-preview-database-url
```

### 4. Database Setup

Since Cloudflare Functions are serverless, you'll need to use a compatible database:

#### Option 1: Keep Current Database (Recommended)
- Continue using your existing PostgreSQL database (Neon, Supabase, etc.)
- Update the Functions to use your database connection
- Set `DATABASE_URL` in Cloudflare Pages environment variables

#### Option 2: Migrate to Cloudflare D1 (Advanced)
- Create a D1 database in Cloudflare
- Update `wrangler.toml` with D1 binding
- Migrate your data to D1
- Update Functions to use D1 API

### 5. API Routes Migration

The Express.js API routes have been converted to Cloudflare Functions:

| Express Route | Cloudflare Function | Description |
|--------------|---------------------|-------------|
| `POST /api/contact` | `functions/api/contact.js` | Contact form submission |
| `GET /api/contact` | `functions/api/contact.js` | Get contact submissions |
| `GET /api/services` | `functions/api/services.js` | Get all services |
| `GET /api/services/:slug` | `functions/api/services/[slug].js` | Get service by slug |
| `POST /api/bookings` | `functions/api/bookings.js` | Create booking |
| `GET /api/bookings` | `functions/api/bookings.js` | Get bookings with filters |
| `GET /api/availability/:serviceId` | `functions/api/availability/[serviceId].js` | Get availability |
| `POST /api/seed-services` | `functions/api/seed-services.js` | Initialize services |

### 6. Deployment Process

#### Automatic Deployment
1. Push changes to your GitHub repository
2. Cloudflare Pages will automatically trigger a build
3. Build will run `npm run build:cloudflare`
4. Site will be deployed to your Cloudflare Pages URL

#### Manual Deployment (Optional)
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy manually
npm run build:cloudflare
wrangler pages deploy dist/public --project-name=on3-studio
```

### 7. Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to "Custom domains" tab
3. Add your domain (e.g., `www.on3studio.com`)
4. Update your domain's DNS to point to Cloudflare
5. SSL certificate will be automatically provisioned

### 8. Testing & Verification

After deployment:

1. **Frontend**: Verify the website loads correctly
2. **API Routes**: Test all API endpoints work
3. **Forms**: Test contact form submission
4. **Booking**: Test booking functionality
5. **Mobile**: Verify responsive design works
6. **Performance**: Check Lighthouse scores

### 9. Monitoring & Logs

- **Real-time Logs**: Available in Cloudflare Pages dashboard
- **Function Logs**: Available in Cloudflare Workers dashboard
- **Analytics**: Built-in analytics in Cloudflare Pages
- **Alerts**: Set up alerts for function errors

## Important Notes

### Database Considerations
- The current Functions use mock data for demonstration
- You MUST update the Functions to connect to your actual database
- Consider using database connection pooling for serverless functions
- Ensure your database supports connection limits for serverless workloads

### Performance Benefits
- **Global CDN**: Cloudflare's global network
- **Edge Functions**: API routes run at the edge
- **Caching**: Automatic static asset caching
- **DDoS Protection**: Built-in security
- **SSL/TLS**: Automatic HTTPS

### Limitations
- **Cold Starts**: Functions may have brief startup latency
- **Execution Time**: Functions have time limits (30 seconds for free plan)
- **Memory**: Standard Workers memory constraints
- **Persistent Connections**: Not supported (use connection pooling)

## Troubleshooting

### Build Failures
- Check build logs in Cloudflare Pages dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

### Function Errors
- Check function logs in Cloudflare Workers dashboard
- Verify environment variables are set correctly
- Test functions locally with Wrangler

### Database Connection Issues
- Verify `DATABASE_URL` environment variable
- Check database connection limits
- Consider using connection pooling

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

---

**Ready to deploy!** Follow the steps above to get your ON3 Studio website running on Cloudflare Pages.