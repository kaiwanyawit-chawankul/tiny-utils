nextjs

page router
store in postgres
component based
deploy to vercel
js, not typescript

Help me

Create nice home page
Login using auth0
Create paste-bin
- Password protected
- Burn after read
- Share with link
- Expired date
Create tiny-url
- QR code
- history



- [ ] Create paste-bin
  - [ ] Password protected
  - [ ] Burn after read
  - [ ] Share with link
- [ ] Create tiny-url
  - [ ] QR code
  - [ ] history
- [ ] Login with auth0
- [ ] Login with google
- [ ] Login with facebook



/pages
  index.tsx          ← Home page
  api/
    auth/[...auth0].ts   ← Auth0 login/callback
    paste/create.js      ← Create paste API
    tiny/create.js       ← Create tiny-url API
  paste/[id].jsx     ← View paste (handles password, burn after read)
  tiny/[id].jsx      ← Redirect to original URL + QR code page
/components
  Header.jsx
  PasteForm.jsx
  TinyForm.jsx
  PasteViewer.jsx
  QRDisplay.jsx


You're building a **Pastebin + TinyURL** app with the following stack:

* **Next.js (Page Router, JavaScript)**
* **PostgreSQL**
* **Auth0 for login**
* **Vercel for deployment**
* Pastebin features:

  * Password protection
  * Burn after read
  * Share with link
  * Expiry date
* TinyURL features:

  * QR code
  * History tracking

Let’s break it into **milestones**, then I’ll start scaffolding the code with **a nice homepage and Auth0 login integration**.

---

## 🧱 Project Stack

* **Frontend**: Next.js (Page Router, JS)
* **Auth**: Auth0
* **Database**: PostgreSQL (Supabase / Railway / local)
* **Deployment**: Vercel

---

## ✅ Milestones

### 1. Setup

* [ ] Create Next.js app with Page Router (`npx create-next-app`)
* [ ] Install dependencies (Auth0, pg, QR code lib, etc.)
* [ ] Set up PostgreSQL (local/dev)
* [ ] Connect Auth0 login
* [ ] Deploy to Vercel

### 2. UI Pages

* [ ] `/` – Home Page (Hero, Login, CTA buttons)
* [ ] `/dashboard` – Logged-in user dashboard (history of pastes/URLs)
* [ ] `/paste/[id]` – Pastebin view
* [ ] `/short/[code]` – TinyURL redirect

### 3. Pastebin Features

* [ ] Create paste form
* [ ] Store with metadata (password, expiry, burn-after-read)
* [ ] Access via shareable link
* [ ] View logic: verify password, auto-delete if burned

### 4. TinyURL Features

* [ ] Create short URL with QR code
* [ ] Store original + short code + user ID + timestamp
* [ ] History for logged-in user
* [ ] Redirection handler

---

Let me know which feature you want to build next:

* [ ] Pastebin form + storage
* [ ] TinyURL + QR
* [ ] Dashboard/history UI
* [ ] PostgreSQL schema setup
* [ ] Deploy to Vercel

Want me to generate a **PostgreSQL schema** for pastes + shortened URLs next?
