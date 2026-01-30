# Job Tracker

A full-stack job application tracker to help users manage, analyze, and organize their job hunt efficiently. Built with **Spring Boot (Java)** for the backend and **React (Vite + Tailwind)** for the frontend.

---

## 🌟 Features

### 📊 Dashboard

* "Quick Access" shortcuts
* Upcoming application and interview deadlines
* Automatically fetched tasks per user

### 📝 Register & Login

* JWT authentication with secure session handling
* Successful registration triggers auto-login and redirects to dashboard

### 📅 Job Applications

* Add new applications (Company, Title, Status, Dates)
* Edit/update existing entries
* Status options: `Interested`, `Applied`, `Interview`, `Offer`, `Rejected`
* Toast notifications for upcoming interviews

### 📊 Analytics

* Status distribution chart
* Applications grouped by company
* Powered by **Recharts**, smooth transitions

### 📓 Interview Notes

* Markdown-based note editor with drag & drop layout
* Smart label generation (e.g., auto-linked with job entries)
* Default label: `Unassigned`
* Supports multiple categorized notes per application

### 🌍 Explore Jobs

* Displays sample job cards (title, company, type, location)
* "Apply now" button for redirection (mocked)

### 🤖 AI Assistant (Experimental)

* Upload a resume to get an auto-generated summary and job-fit analysis
* Due to free-tier API limitations, the analysis is **simulated**

### 👤 Profile

* View and update user email address
* Email is placeholder for future notification support

---

## 🚀 Tech Stack

### Frontend:

* React + Vite
* TailwindCSS
* React Router
* Recharts
* Markdown Editor (react-markdown / textarea)

### Backend:

* Spring Boot
* Spring Security + JWT
* Hibernate + MySQL
* Scheduled tasks with `@Scheduled`
* PDF/txt file parsing (PDFBox)
* HuggingFace API integration (fallback if not available)

---

## 📚 Project Structure

### Frontend (Vite)

```
frontend/
├── src/
│   ├── components/          # Sidebar, Layout
│   ├── pages/               # Dashboard, Analytics, Notes, etc.
│   ├── api.js               # Axios config
│   ├── App.jsx              # Routing logic
```

### Backend (Spring Boot)

```
job-tracker-backend/
├── src/main/java/
│   └── com.example.jobtracker/
│       ├── controller/      # API Controllers (Auth, Job, AI, Notes, etc.)
│       ├── entity/          # JPA entities
│       ├── service/         # Business logic
│       ├── util/            # Helper classes (HuggingFaceClient, JWT, etc.)
│       ├── config/          # Security, CORS, Web config
```

---

## 🎓 How to Run

### Backend

```bash
cd job-tracker-backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Notes

* This is a full-stack academic project for portfolio/demo purposes
* The AI Assistant logic is **mocked** due to HuggingFace API limitations
* JWT secrets and DB credentials should be stored in `.env` or secure config

---

## 📄 License

MIT
