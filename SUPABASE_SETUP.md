# CELTA PREP COURSE - Supabase Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up (free tier is enough)
3. Create a new project called "celta-prep"

### Step 2: Get Your Credentials
1. Go to your project → **Settings** → **API**
2. Copy these 3 values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (click "Reveal" to see it)

### Step 3: Update Your `.env` File
Replace the placeholder values in `/home/z/my-project/.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy ALL content from `/home/z/my-project/supabase-schema.sql`
4. Paste and click **Run**

This creates:
- ✅ `course_modules` table
- ✅ `course_lessons` table
- ✅ `enrollments` table
- ✅ `lesson_progress` table
- ✅ Sample course content (9 modules with YouTube videos)

### Step 5: Restart Your Dev Server
After updating `.env`, the changes will apply automatically.

---

## 📊 How It Works

### Database Tables

| Table | Purpose |
|-------|---------|
| `enrollments` | Student enrollments (email, payment status) |
| `lesson_progress` | Track which lessons students completed |
| `course_modules` | Course sections |
| `course_lessons` | Individual video lessons |

### Enrollment Flow

```
Student pays on WhatsApp
        ↓
You verify payment
        ↓
You go to /admin
        ↓
Create enrollment with their email
        ↓
Set payment_status to 'completed'
        ↓
Student goes to /course
        ↓
Enters email only
        ↓
System checks Supabase database
        ↓
Match found + payment completed → ACCESS GRANTED! ✅
```

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| **Main Landing** | `/` |
| **Course Portal** | `/course` |
| **Admin Panel** | `/admin` |
| **Supabase Dashboard** | `supabase.com/dashboard` |

---

## Admin Password
Default: `celta2024admin`

To change, edit `/src/app/admin/page.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-new-password'
```

---

## 🎬 Update YouTube Videos

After setup, update your actual YouTube video IDs:

1. Go to Supabase Dashboard
2. **Table Editor** → `course_lessons`
3. Edit each lesson's `youtube_id` field

Or use SQL:
```sql
UPDATE course_lessons 
SET youtube_id = 'YOUR_ACTUAL_YOUTUBE_ID' 
WHERE id = 'lesson-1-1';
```

---

## ✅ Testing

1. Go to `/admin` (password: `celta2024admin`)
2. Create a test enrollment with your email
3. Set `payment_status` to `completed`
4. Go to `/course`
5. Enter your email
6. You should see the course dashboard!

---

## 🔒 Security Notes

- **Never commit** `.env` file to git
- The `service_role` key has full database access - keep it secret!
- Supabase Row Level Security (RLS) is configured to protect data
- Users can only see their own enrollment and progress

---

## 💰 Pricing (Optional: Update)

Default price: $80 USD

To change, update the default in:
- `/src/app/admin/page.tsx` - `paidAmount: '80'`
- `/src/app/api/course/enroll/route.ts` - `paidAmount = 80`

---

## 🆘 Troubleshooting

### "No active enrollment found"
- Check if enrollment exists in Supabase → Table Editor → `enrollments`
- Make sure `payment_status` = 'completed'
- Email must match exactly (case-insensitive)

### "Failed to fetch course content"
- Check Supabase credentials in `.env`
- Make sure tables exist (run the SQL schema)
- Check browser console for errors

### Can't see lessons
- Make sure `is_active` = true for modules and lessons
- Run the seed SQL again if needed

---

## 📱 Supabase Dashboard

Access your database anytime at:
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID
```

Useful sections:
- **Table Editor** - View/edit data visually
- **SQL Editor** - Run custom queries
- **Logs** - See API requests
- **Settings** - Manage API keys
