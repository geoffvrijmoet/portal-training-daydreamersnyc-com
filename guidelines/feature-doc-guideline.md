# Project Overview
Use this guide to build a web app that allows clients to access their Daydreamers Dog Training resources and report cards. It will be hosted at portal.training.daydreamersnyc.com.

# What is the Client Portal?
    The Client Portal is a secure platform where Daydreamers Dog Training clients can access their training materials, report cards, and resources. This portal complements the existing admin dashboard (admin.training.daydreamersnyc.com) and landing page (training.daydreamersnyc.com).

    When Madeline creates a report card or shares resources with a client through the admin dashboard, these materials become available to the client through this portal. Clients can log in using their email address and a secure password, or through their Google account.

    The portal provides a streamlined way for clients to:
    1. View their training session report cards
    2. Access shared training resources and PDFs
    3. View product recommendations from their sessions
    4. Access their shared Google Drive folder

    All data displayed in the portal comes from the same MongoDB database used by the admin dashboard, but with restricted read-only access to ensure security. Clients can only see their own data and cannot modify any information.

# Feature Requirements
    ==Authentication==
    Clients should be able to log in using:
        - Email/password
        - Google account
        - Apple ID
    The first time a client is added through the admin dashboard, they should receive an email invitation to set up their portal account.

    ==Dashboard==
    After logging in, clients should see:
        - Their name and their dog's name
        - A list of their recent report cards
        - Quick access to their shared resources
        - A link to their shared Google Drive folder

    ==Report Cards==
    Clients should be able to:
        - View all their report cards in chronological order
        - Search/filter their report cards by date
        - Download report cards as PDFs
        - View embedded training videos if included in the report card
        
    ==Resources==
    Clients should have access to:
        - Training materials shared by Madeline
        - Product recommendations from their sessions
        - General training resources
        - Direct links to recommended products

    ==Mobile Experience==
    - The portal must be fully responsive and mobile-friendly
    - All features should work seamlessly on mobile devices
    - Documents should be easily readable on small screens

# Technical Requirements
    - Built with Next.js 14+
    - Uses Tailwind CSS for styling
    - Implements Clerk for authentication
    - Connects to MongoDB with read-only access
    - Uses shadcn/ui components
    - Implements proper security measures
    - Optimized for performance
    - Accessible (WCAG 2.1 compliant)

# Security Considerations
    - Clients can only access their own data
    - MongoDB access is restricted to read-only operations
    - All API routes must validate client authentication
    - Implement rate limiting
    - Regular security audits
    - Secure handling of sensitive information

# File Structure
PORTAL-TRAINING-DAYDREAMERS-COM
├── app/
│   ├── dashboard/
│   ├── report-cards/
│   ├── resources/
│   ├── settings/
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   ├── report-cards/
│   └── resources/
├── lib/
│   ├── mongodb.ts
│   └── auth.ts
└── types/
    └── index.ts

# Rules
- All components should follow the same styling patterns as the admin dashboard
- Maintain consistent naming conventions with the admin codebase
- Implement proper error handling and loading states
- Follow accessibility best practices
- Document all new components and features
- All new components should be added to the components folder and be named like example-component.tsx unless otherwise specified
- All new pages should be added to the app folder and be named like example-page.tsx unless otherwise specified