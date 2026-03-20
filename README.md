# CELTA Prep Morocco

A comprehensive CELTA preparation course platform with LMS functionality, built with Next.js 16.

## Features

- **Landing Page**: Professional landing page with course information
- **Course Platform**: Full LMS with video lessons and progress tracking
- **Admin Panel**: Manage enrollments and student progress
- **Booklet Downloads**: Secure PDF downloads via Supabase Storage
- **Mobile Responsive**: Fully responsive design for all devices
- **Email-Only Login**: Simple authentication - users log in with just their email

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **Storage**: Supabase Storage

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Database (SQLite for local dev)
DATABASE_URL="file:./db/custom.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## Local Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard

### 3. Deploy

Vercel will automatically deploy when you push to main branch.

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/
│   │   ├── admin/         # Admin panel
│   │   ├── api/           # API routes
│   │   ├── course/        # Course platform
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   └── lib/               # Utilities
├── public/                # Static assets
└── .env.example           # Environment template
```

## Admin Panel

Access the admin panel at `/admin` with the password: `celta2024admin`

To change the password, edit `/src/app/admin/page.tsx`.

## Enrollment Flow

1. Student pays on WhatsApp
2. Admin creates enrollment with student's email in `/admin`
3. Admin sets `payment_status` to `completed` after verification
4. Student goes to `/course` and enters their email
5. If email exists with completed payment → Access granted!

## License

Private - All rights reserved
