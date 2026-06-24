# AR. Portfolio — Ajayeswaran Raja

Personal portfolio and admin dashboard for **Ajayeswaran Raja**, Corporate Trainer specialising in AI, Data Science, Cloud Computing and DevOps.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite 8 |
| Routing | React Router v7 |
| State | Zustand + TanStack Query v5 |
| Animation | Framer Motion v12 |
| Backend | Firebase (Auth + Firestore) |
| Media | Cloudinary |
| Rich text editor | TipTap v3 |
| Error tracking | Sentry |
| Testing | Vitest + Testing Library |
| CI/CD | GitHub Actions → Firebase Hosting |

## Getting started

```bash
# 1. Clone
git clone https://github.com/AjayGitPersonal/port-final.git
cd port-final

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env
# Fill in your Firebase and Cloudinary values in .env

# 4. Run locally
npm run dev

# 5. Run tests
npm run test:run
```

## Project structure

```
src/
├── sections/          Public portfolio sections (Hero, About, Experience…)
├── pages/
│   ├── Portfolio.jsx  Main public page — composes all sections
│   ├── AdminLogin.jsx
│   ├── Dashboard.jsx  Admin dashboard
│   └── admin/         Section managers (Sessions, Blogs, Certs, Messages)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ErrorBoundary.jsx
│   └── seo/           SEO + JSON-LD structured data
├── services/
│   └── firestore.js   All Firestore CRUD — service object pattern
├── store/
│   └── authStore.js   Zustand auth store
├── styles/
│   └── tokens.css     CSS design tokens
└── data/
    └── content.js     Static fallback data
public/
├── robots.txt
└── sitemap.xml
.github/workflows/
└── deploy.yml         CI/CD — build, test, deploy on push to main
```

## Environment secrets (GitHub Actions)

Add these in **GitHub → Settings → Secrets → Actions**:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_SENTRY_DSN` *(optional)*
- `FIREBASE_SERVICE_ACCOUNT` *(JSON key from Firebase → Service accounts)*

## Firestore security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == 'ajayeswaran23@gmail.com';
    }
    match /sessions/{doc}       { allow read: if true; allow write: if isAdmin(); }
    match /blogs/{doc}          { allow read: if true; allow write: if isAdmin(); }
    match /certifications/{doc} { allow read: if true; allow write: if isAdmin(); }
    match /messages/{doc} {
      allow create: if request.resource.data.keys()
        .hasOnly(['name','email','subject','message','createdAt'])
        && request.resource.data.message.size() < 2000;
      allow read, update, delete: if isAdmin();
    }
  }
}
```
