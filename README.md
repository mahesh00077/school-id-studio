# School ID Studio

Build the foundation of a production-oriented School Photo ID Card Management System.

The application will be used by a software owner to manage multiple schools and by school staff to generate student photo ID cards.

Technology

Frontend:

React

TypeScript

Vite

Lightweight responsive UI

Use a clean modern component architecture

Backend will later be:

Python

FastAPI

MySQL

For this phase, focus on the frontend foundation and API-ready architecture.

Do NOT introduce:

Docker

Redis

Microservices

Unnecessary heavy libraries

Fake secure backend logic

LocalStorage-based credits or authentication

Application Roles

There will eventually be three roles:

OWNER

SCHOOL_ADMIN

SCHOOL_STAFF

Do not fully implement authentication in this phase. Prepare the routing and UI structure for these roles.

Main Application Areas

Owner Portal

Routes:

/owner/dashboard
/owner/schools
/owner/users
/owner/designs
/owner/credits
/owner/history
/owner/settings

Owner dashboard should show placeholders/cards for:

Total schools

Active schools

Total users

Total available credits

Total generated ID cards

Recent activity

School Portal

Routes:

/school/dashboard
/school/id-cards
/school/id-cards/create
/school/history
/school/designs
/school/users

School dashboard should show:

Available credits

Assigned ID card designs

Total IDs generated

Recent ID generation activity

Generate ID Card button

School Staff should eventually have access only to ID generation, assigned designs, preview, generation history and allowed school features.

School Admin will eventually have additional user-management permissions.

UI Requirements

Create a professional but lightweight admin application.

Use:

Responsive sidebar navigation

Top header

Cards

Tables

Forms

Modal/dialog components where useful

Toast/notification system

The UI should work well on:

Desktop

Tablet

Mobile

Do not over-design the application.

Keep spacing, typography and components consistent.

Important Future Feature

The core application will generate student photo ID cards.

The future flow will be:

Select Design
→ Dynamic Student Form
→ Upload Student Photo
→ Background Removal
→ White Background
→ Preview
→ Auto-fit / Manual Adjustment
→ Front + Back ID Card
→ Server-side Credit Validation
→ Generate Clean JPEG
→ Deduct 1 Credit
→ Download

Do not implement this complete flow yet.

Prepare the frontend structure so these modules can be added cleanly later.

API Architecture

Create a centralized API service layer.

For example:

src/services/api.ts

Do not put API calls directly throughout UI components.

Prepare the application for REST APIs provided later by FastAPI.

Use environment variables for the API base URL.

Example:

VITE_API_BASE_URL

Do not hard-code production API URLs.

State Management

Do not introduce a large state-management library unless necessary.

Use React state/context where appropriate.

Keep the architecture simple.

Security Preparation

Do not store:

passwords

credits

authorization decisions

sensitive student data

in localStorage.

Authentication and authorization will later be implemented securely through the FastAPI backend.

Design Architecture

Create reusable components and keep business logic separate from presentation.

Suggested structure:

src/
components/
layouts/
pages/
owner/
school/
auth/
services/
hooks/
types/
utils/
routes/
assets/

Important

Do not create fake backend implementations that pretend to be secure.

For dashboard statistics, use clearly marked temporary mock data only where necessary for UI development.

Keep mock data isolated so it can easily be replaced with FastAPI API calls later.

Do not modify unrelated project configuration unnecessarily.

After implementation, provide:

Project structure

Files created

Files modified

Routes created

Dependencies added

How to run the project

Any assumptions made

The result should be a clean foundation for the next phases.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d2fd674c-6c6b-4949-bace-583d9a6da318).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
