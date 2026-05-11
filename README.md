# AssetCrate

A simple hub for sharing and discovering free game assets like models, textures, sounds, and scripts.

## Problem
Developers struggle to find free or reliable assets, while creators lack a place to showcase their work.  
AssetCrate connects both sides in one platform.

## Architecture
**Frontend → Backend (API) → Database**

- Next.js + Tailwind CSS  
- Node.js + Express.js  
- MongoDB + Mongoose
- JWT Authentication 
- Hosting: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## Features
- User authentication (login/signup)
- Asset CRUD
- External asset links (Drive, itch.io)
- Image previews
- Filtering and search
- Pagination

## Tech Stack
| Layer | Tools |
|-------|--------|
| Frontend | Next.js, React, Tailwind |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Hosting | Vercel, Render, MongoDB Atlas |

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register user  
- `POST /api/auth/login` — Login user  

### Assets
- `GET /api/assets` — Get all assets (supports filtering, sorting, pagination)
- `GET /api/assets/:id` — Get single asset details
- `POST /api/assets` — Upload new asset (Creator/Admin only)
- `PUT /api/assets/:id` — Update asset (Creator/Admin only)
- `DELETE /api/assets/:id` — Delete asset (Creator/Admin only)

### Dashboard
- `GET /api/dashboard/admin` — Get admin stats
- `GET /api/dashboard/admin/assets` — Get all assets (paginated, sorted)
- `GET /api/dashboard/admin/pending-assets` — Get pending assets (paginated, sorted)
- `PUT /api/dashboard/admin/asset/:assetId/approve` — Approve/Reject asset
- `PUT /api/dashboard/admin/user/:userId/role` — Update user role
- `GET /api/dashboard/creator` — Get creator stats and uploads
- `GET /api/dashboard/developer` — Get user stats and downloads  

## User Roles
- **User**: Can download and favorite assets
- **Creator**: Can download, upload, and manage their own assets
- **Admin**: Supervises asset approval for platform security (admin only)

## Pages

- **Landing** (`/`) - Marketing page with features and CTAs
- **Browse/Store** (`/browse`) - Asset catalog with search, filters, and pagination
- **Asset Detail** (`/asset/:id`) - Individual asset page with download link
- **Profile** (`/profile`) - User profile with editable information
- **Login/Signup** - Authentication pages

## Hosted Urls

- **Frontend** - https://asset-crate.vercel.app/
- **Backend** - https://assetcrate.onrender.com
- **Database** - https://cloud.mongodb.com/v2/69298aac7595835ba3f18b10#/clusters/detail/AsssetCrate
