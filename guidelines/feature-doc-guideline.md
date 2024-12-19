# Project Overview
Use this guide to build a web app that allows me to manage my freelance podcast editing and podcast website creation/management business.

# Feature Requirements
- There should be a way for me to easily create an invoice for a client.
- There should be a way for me to easily edit the invoice template.
- There should be a way for me to easily send the invoice to a client.
- There should be a way for me to easily track the amount of time I spend on a podcast episode, so I can easily see how much I am making per hour.
- The website will be hosted at admin.podcasts.geoffvrijmoet.com.
- The website will be deployed on Vercel.
- The website code will be hosted on GitHub, at my personal account (geoffvrijmoet), on a repository called podcasts-geoffvrijmoet-com-backend.
- The web app should have lightning-fast performance.
- The entire app should be extremely mobile-friendly.
- We will use Next.js, Shadcn, Lucid, Clerk, MongoDB, and Tailwind CSS to build the app.
- The only person able to access the admin dashboard should be me, Geoff Vrijmoet, and I should be able to sign in with any of these Google accounts: geofferyv@gmail.com, hello@geoffvrijmoet.com.

# Relevant Docs
This is the reference documentation for Clerk: https://clerk.com/docs/references/nextjs/

# Current File Structure
📁 PODCASTS-GEOFFVRIJMOET-COM-BACKEND
├── 📁 app
│   ├── 📁 fonts
│   ├── ⭐ favicon.ico
│   ├── 📄 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 guidelines
│   └── 📄 feature-doc-guideline.md
├── 📁 lib
├── 📁 node_modules
├── 📄 .cursorrules
├── 📄 .eslintrc.json
├── 📄 .gitignore
├── 📄 components.json
├── 📄 next-env.d.ts
├── 📄 next.config.mjs
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.mjs
├── 📄 README.md
├── 📄 tailwind.config.ts
└── 📄 tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.