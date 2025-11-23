# AssetCrate

A simple hub for sharing and discovering game assets like models, textures, sounds, and scripts.

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

