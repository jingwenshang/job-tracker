# Job Tracker

A full-stack job application tracker to help users manage, analyze, and organize their job hunt efficiently. Built with **Spring Boot (Java)** for the backend and **React (Vite + Tailwind)** for the frontend.

---

## 📷 Screenshoot

<img width="2560" height="1223" alt="image" src="https://github.com/user-attachments/assets/93dacbdb-af6c-4a08-9cdb-361d598aba71" />
<img width="2560" height="1173" alt="image" src="https://github.com/user-attachments/assets/47a78c42-92c2-4522-a20b-3720135b22ee" />
<img width="2560" height="1269" alt="9f5a020c-6055-4e51-8a49-99d6c6b2e438" src="https://github.com/user-attachments/assets/87e5287d-54f3-499e-a84d-38f6d183d639" />
<img width="2560" height="1270" alt="image" src="https://github.com/user-attachments/assets/ce665676-c16c-490a-a88a-d3d692c4f727" />
<img width="2560" height="1272" alt="image" src="https://github.com/user-attachments/assets/46ff878c-63ad-4b5f-b903-bb82f634a767" />
<img width="2559" height="1267" alt="image" src="https://github.com/user-attachments/assets/6d87eccb-89c9-437d-ad00-17022c6a2e5d" />
<img width="2560" height="1271" alt="image" src="https://github.com/user-attachments/assets/f5e407ec-2611-463f-980d-70ba8d358bfa" />
<img width="2560" height="1269" alt="image" src="https://github.com/user-attachments/assets/65ac8b19-394f-456c-9021-4ee32e0ad060" />
<img width="2560" height="1272" alt="image" src="https://github.com/user-attachments/assets/228ad1e9-4e8e-4377-99e4-21ff4f872414" />
<img width="2560" height="1266" alt="image" src="https://github.com/user-attachments/assets/750bd305-6200-4a6b-b3b9-765213aa10d0" />











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
* JWT secrets and DB credentials should be stored in `.env` or secure config

---

## 📄 License

MIT
