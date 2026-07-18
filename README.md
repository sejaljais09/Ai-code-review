# 🤖 AI Code Review Assistant

An AI-powered code review platform built with **Next.js 16**, **TypeScript**, **Prisma**, **Supabase**, **NextAuth**, and **Google Gemini AI**. Users can upload or paste Java code, receive intelligent AI feedback, track previous reviews, analyze coding performance, and manage their account through a modern dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Secure Login & Registration
- Password hashing using bcrypt
- Protected dashboard with NextAuth
- Logout confirmation modal
- Delete account with password verification
- Change password functionality

### 💻 AI Code Review
- Paste Java code
- Upload `.java` files
- AI-powered review using Gemini
- Detect bugs
- Performance suggestions
- Best practice recommendations
- Code quality score

### 📊 Dashboard
- Review history
- Analytics page
- User profile
- Settings
- Notifications UI

### 🎨 Appearance
- Light Theme
- Dark Theme
- System Theme
- Theme persistence using next-themes

### ⚙️ Settings
- Update profile
- Change password
- Appearance settings
- Delete account
- Logout confirmation

### 📄 Documentation Generator
- Generate AI-based documentation for uploaded Java code.

---

# 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons
- Monaco Editor

### Backend
- Next.js Route Handlers
- Prisma ORM
- Supabase PostgreSQL
- NextAuth
- bcryptjs

### AI
- Google Gemini API

---

# 📂 Folder Structure

```text
app/
components/
lib/
prisma/
public/
```

---

# 📸 Screenshots

Add screenshots here.

Example:

- Landing Page
- Dashboard
- AI Review
- Analytics
- History
- Settings
- Dark Theme

---

# ⚡ Installation

Clone the repository

```bash
git clone https://github.com/your-username/ai-code-review-assistant.git
```

Move into the project

```bash
cd ai-code-review-assistant
```

Install dependencies

```bash
npm install
```

Run Prisma

```bash
npx prisma generate
```

Run development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

GOOGLE_API_KEY=
```

---

# Future Improvements

- Multi-language support
- PDF export
- Download review reports
- Email verification
- Forgot password
- Team collaboration
- Review sharing
- Review search & filters
- AI chat assistant
- Code complexity visualization

---

# 👩‍💻 Author

**Sejal Jaiswal**

Computer Science Student

Built with ❤️ using Next.js, Prisma and Google Gemini.
