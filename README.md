# Ajayeswaran Raja — Portfolio + Admin Panel

React 18 + Firebase + Cloudinary portfolio with full admin CRUD.

## Stack
| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, CSS Modules |
| Routing | React Router v6 |
| Auth | Firebase Authentication |
| Database | Firestore |
| Photos | Cloudinary (unsigned upload) |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Icons | Lucide React |
| Toasts | React Hot Toast |

## Project Structure
```
src/
├── firebase.js               ← Firebase init (reads from .env)
├── main.jsx / App.jsx        ← Entry + router
├── index.css                 ← Global CSS variables
├── data/content.js           ← Static fallback data
├── hooks/
│   ├── useAuth.js            ← Firebase auth state
│   ├── useSessions.js        ← Sessions CRUD hook
│   └── useBlogs.js           ← Blogs CRUD hook
├── services/
│   ├── firestore.js          ← All Firestore operations
│   └── cloudinary.js         ← Cloudinary upload service
├── components/
│   ├── Navbar / Footer
│   └── ui/
│       ├── Modal             ← Animated modal
│       ├── ConfirmDialog     ← Delete confirmation
│       ├── ImageUploader     ← Drag-drop + Cloudinary upload
│       └── FormField         ← Input / Textarea / Select
├── sections/                 ← Public portfolio sections
│   ├── Hero, TechLogos, About, Domains
│   ├── Experience, Contact
│   ├── Sessions.jsx          ← Fetches live from Firestore
│   └── Certifications.jsx    ← Fetches live from Firestore
└── pages/
    ├── Portfolio.jsx
    ├── AdminLogin.jsx
    ├── Dashboard.jsx         ← Sidebar + page switcher
    └── admin/
        ├── SessionsManager.jsx      ← Full CRUD + Cloudinary photo upload
        ├── BlogsManager.jsx         ← Full CRUD + cover image upload
        ├── CertificationsManager.jsx← Full CRUD
        └── AdminPage.module.css     ← Shared admin styles
```

## Setup

### 1. Install
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.example .env
```
Fill in your Firebase and Cloudinary values in `.env`.

### 3. Firebase setup
1. [Firebase Console](https://console.firebase.google.com) → New project
2. Enable **Authentication → Email/Password**
3. Create a **Firestore** database (start in test mode, then apply rules)
4. Copy config into `.env`
5. Create admin user: Authentication → Users → Add user
6. Deploy security rules:
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```
7. Add your admin UID to `firestore.rules`

### 4. Cloudinary setup
1. [Cloudinary Console](https://cloudinary.com) → Settings → Upload
2. Create an **Unsigned** upload preset (e.g. `ar_portfolio`)
3. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` to `.env`

### 5. Run locally
```bash
npm run dev
# → http://localhost:5173
```

### 6. Deploy to Vercel
```bash
npm run build
npx vercel --prod
# Add all VITE_ env vars in Vercel dashboard → Settings → Environment Variables
```

## Routes
| Path | Page | Access |
|------|------|--------|
| `/` | Public Portfolio | Public |
| `/admin` | Admin Login | Public |
| `/dashboard` | Admin Dashboard | Firebase Auth only |

## Admin Features
| Section | Create | Edit | Delete | Photo Upload |
|---------|--------|------|--------|--------------|
| Sessions | ✅ | ✅ | ✅ | ✅ Cloudinary |
| Blog Posts | ✅ | ✅ | ✅ | ✅ Cloudinary |
| Certifications | ✅ | ✅ | ✅ | — |

## Public Portfolio → Live Data
- **Sessions section** fetches from Firestore in real time (falls back to static data if empty)
- **Certifications section** fetches from Firestore in real time

## Next Steps
- [ ] Add Experience CRUD
- [ ] Add Projects CRUD  
- [ ] Add Messages inbox (Firestore contact form submissions)
- [ ] Add Blog public page `/blog/[slug]`
- [ ] Add Analytics (Plausible / Google Analytics)
- [ ] Add image lazy loading and optimization (Cloudinary transforms)
