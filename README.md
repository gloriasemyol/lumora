# ✨ Lumora

> A full stack MERN portfolio platform with a custom-built CMS: manage your projects, skills, blog and more from your own admin panel, and publish them on a beautiful animated site.

---

## ✨ Features

- 🔐 **Custom Admin Panel**: Secure JWT-protected dashboard to manage all portfolio content, built from scratch with no third-party CMS
- 🗂️ **Full Content Management**: Create, edit and delete About, Skills, Projects, Blog posts, Experience, Testimonials and Services
- 🖼️ **Image Uploads**: Upload photos and screenshots straight from the admin, stored permanently on Cloudinary
- 📬 **Contact Form**: Visitor messages are saved to the database and emailed to the site owner
- 📝 **Blog**: Draft and publish posts with auto-generated URL slugs
- 🎨 **Beautiful Dark UI**: Glassmorphism design, smooth Framer Motion animations, fully responsive on every screen size
- 🛡️ **Secure by Default**: Password hashing, rate limiting, security headers, input validation and CORS protection

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🎞️ Framer Motion, React Router, Axios, Lucide Icons, React Hot Toast

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🔑 JWT Authentication, bcryptjs, Multer
- 🛡️ Helmet, Express Rate Limit
- ☁️ Cloudinary (image storage), Resend (email delivery)

### Database & Tools
- 🍃 MongoDB Atlas
- 🔗 Mongoose ODM

---

## 🚀 Live Demo & Deployment

- 🔺 **Frontend Live App (Vercel)**: https://lumora-amber-chi.vercel.app
- 🟣 **Backend Live Service (Render)**: https://lumora-api-l2lw.onrender.com

> ⏳ The backend runs on Render's free tier, so the first request after a period of inactivity can take 30 to 60 seconds to wake up.

---

## 📁 Project Structure

Lumora is split into two repositories: `lumora-backend` and `lumora-frontend`.

```text
lumora/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   └── crudFactory.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── About.js
│   │   ├── Blog.js
│   │   ├── Experience.js
│   │   ├── Media.js
│   │   ├── Message.js
│   │   ├── Project.js
│   │   ├── Service.js
│   │   ├── Skill.js
│   │   ├── Testimonial.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aboutRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── contentRoutes.js
│   │   └── uploadRoutes.js
│   ├── package.json
│   ├── seedAdmin.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── FormField.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── public/
│   │   │       ├── AboutSection.jsx
│   │   │       ├── BlogCard.jsx
│   │   │       ├── BlogPreview.jsx
│   │   │       ├── ContactSection.jsx
│   │   │       ├── ExperienceSection.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── Hero.jsx
│   │   │       ├── Navbar.jsx
│   │   │       ├── ProjectsSection.jsx
│   │   │       ├── Section.jsx
│   │   │       ├── ServicesSection.jsx
│   │   │       ├── SkillsSection.jsx
│   │   │       └── TestimonialsSection.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useFetch.js
│   │   ├── layouts/
│   │   │   └── PublicLayout.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── formUtils.js
│   │   │   └── resources.js
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AboutEditor.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── ResourcePage.jsx
│   │   │   └── public/
│   │   │       ├── BlogList.jsx
│   │   │       ├── BlogPost.jsx
│   │   │       └── Home.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
└── README.md
```

---

## 💻 Local Installation & Setup

### 📋 Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [Cloudinary](https://cloudinary.com) account (image uploads)
- A free [Resend](https://resend.com) account (contact form emails)

### 1. Clone the repositories
```bash
git clone https://github.com/gloriasemyol/lumora-backend.git
git clone https://github.com/gloriasemyol/lumora-frontend.git
```

### 2. Setup Backend
```bash
cd lumora-backend
npm install
```

Create a `.env` file inside the backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_REFRESH_SECRET=another_long_random_secret
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=your_strong_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=email_that_receives_messages
```

Create your admin account (run once), then start the backend server:
```bash
npm run seed
npm run dev
```

### 3. Setup Frontend
```bash
cd ../lumora-frontend
npm install
```

Create a `.env` file inside the frontend folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser! 🚀

The admin panel is at `http://localhost:5173/admin/login`. Sign in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your backend `.env`.

---

## 🌐 Production Deployment Steps

### 🟣 Backend Deployment (Render)
1. Create a new Web Service on Render and connect your `lumora-backend` repository.
2. Root Directory: leave empty
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Set Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CLIENT_URL` = https://lumora-amber-chi.vercel.app

### 🔺 Frontend Deployment (Vercel)
1. Create a new Project on Vercel and import your `lumora-frontend` repository.
2. Framework Preset: `Vite`
3. Root Directory: leave empty
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variable:
   - `VITE_API_URL` = https://lumora-api-l2lw.onrender.com

The included `vercel.json` makes page refreshes work on routes like `/admin` and `/blog/my-post`.

---

## ⚙️ Environment Variables

| Variable | Location | Description |
| :--- | :--- | :--- |
| `PORT` | backend/.env | Port number for the Express server |
| `MONGO_URI` | backend/.env / Render | MongoDB Atlas connection string |
| `JWT_SECRET` | backend/.env / Render | Secret used to sign access tokens |
| `JWT_REFRESH_SECRET` | backend/.env / Render | Secret used to sign refresh tokens |
| `CLIENT_URL` | backend/.env / Render | Frontend URL(s) allowed for CORS (comma separated, no trailing slash) |
| `ADMIN_EMAIL` | backend/.env | Email for the admin account created by `npm run seed` |
| `ADMIN_PASSWORD` | backend/.env | Password for the admin account created by `npm run seed` |
| `CLOUDINARY_CLOUD_NAME` | backend/.env / Render | Cloudinary cloud name for image storage |
| `CLOUDINARY_API_KEY` | backend/.env / Render | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | backend/.env / Render | Cloudinary API secret |
| `RESEND_API_KEY` | backend/.env / Render | API key for sending contact form emails |
| `CONTACT_TO_EMAIL` | backend/.env / Render | Inbox that receives contact form messages |
| `VITE_API_URL` | frontend/.env / Vercel | Backend URL (no `/api`, no trailing slash) |

---

## 📝 License

Distributed under the MIT License.
