# Job Tracker

A full-stack job application tracker to help users manage, analyze, and organize their job hunt efficiently. Built with **Spring Boot (Java)** for the backend and **React (Vite + Tailwind)** for the frontend.

---
## 👀 Deployed App



https://job-tracker-bice-one.vercel.app



This project uses Render’s free tier to host the backend. As a result, the **first request to the backen**d after a period of inactivity may experience **a cold start delay**.

💡 For example, when registering a new account, it may take about 60-90 seconds for the page to respond or redirect, especially if the backend has been idle.

This is expected behavior for serverless platforms with automatic sleep/wake cycles on free plans. Once the backend has "woken up," subsequent requests will be fast and responsive.

If you encounter **a long wait after clicking register**, just give it a moment. The service is spinning up in the background.


**⚠️ Note on AI Features and Model Access**

This project includes AI features (such as summarization or job suggestions), **but the deployed version does not connect to any real AI model or API key** — to avoid usage-based billing from model providers.

💡 To use AI features, users are encouraged to **plug in their own model endpoints and access tokens**, depending on the provider of their choice (e.g., Hugging Face, OpenAI, etc.)

This makes the project **fully customizable**, while keeping the deployed version cost-free.


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
📁 frontend
├── 📁 node_modules
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   ├── 📁 components
│   │   ├── 📄 MainLayout.jsx
│   │   └── 📄 Sidebar.jsx
│   ├── 📁 pages
│   │   ├── 📄 AiAssistantPage.jsx
│   │   ├── 📄 AnalyticsPage.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 InterviewNotesPage.jsx
│   │   ├── 📄 JobApplicationPage.jsx
│   │   ├── 📄 JobBoard.jsx
│   │   ├── 📄 JobDetailModal.jsx
│   │   ├── 📄 JobDetailModal.css
│   │   ├── 📄 JobList.jsx
│   │   ├── 📄 JobNotesPage.jsx
│   │   ├── 📄 LoginPage.jsx
│   │   ├── 📄 Profile.jsx
│   │   └── 📄 RegisterPage.jsx
│   ├── 📄 api.js
│   ├── 📄 App.jsx
│   └── 📄 index.css

```

### Backend (Spring Boot)

```
📁 job-tracker-backend
├── 📁 .mvn
├── 📁 src
│   └── 📁 main
│       ├── 📁 java
│       │   └── 📁 com.example.jobtracker
│       │       ├── 📁 advice
│       │       │   └── 📄 GlobalExceptionHandler.java
│       │       ├── 📁 config
│       │       │   ├── 📄 CorsConfig.java
│       │       │   ├── 📄 FilterConfig.java
│       │       │   ├── 📄 JobDataLoader.java
│       │       │   ├── 📄 SecurityConfig.java
│       │       │   └── 📄 WebConfig.java
│       │       ├── 📁 controller
│       │       │   ├── 📄 AIController.java
│       │       │   ├── 📄 AuthController.java
│       │       │   ├── 📄 JobController.java
│       │       │   ├── 📄 JobReminderController.java
│       │       │   ├── 📄 TaskController.java
│       │       │   └── 📄 UserController.java
│       │       ├── 📁 dto
│       │       │   ├── 📄 AISummaryResponse.java
│       │       │   └── 📄 JobReminderResponse.java
│       │       ├── 📁 entity
│       │       │   ├── 📄 Job.java
│       │       │   ├── 📄 JobStatus.java
│       │       │   ├── 📄 Task.java
│       │       │   └── 📄 User.java
│       │       ├── 📁 filter
│       │       │   └── 📄 JwtFilter.java
│       │       ├── 📁 repository
│       │       │   ├── 📄 JobRepository.java
│       │       │   ├── 📄 TaskRepository.java
│       │       │   └── 📄 UserRepository.java
│       │       ├── 📁 service
│       │       │   ├── 📄 AIService.java
│       │       │   ├── 📄 AIServiceImpl.java
│       │       │   ├── 📄 AuthService.java
│       │       │   ├── 📄 AuthServiceImpl.java
│       │       │   ├── 📄 JobService.java
│       │       │   ├── 📄 JobServiceImpl.java
│       │       │   ├── 📄 TaskService.java
│       │       │   └── 📄 TaskServiceImpl.java
│       │       ├── 📁 util
│       │       │   ├── 📄 HuggingFaceClient.java
│       │       │   ├── 📄 JobReminderScheduler.java
│       │       │   ├── 📄 JwtUtil.java
│       │       │   └── 📄 UserContext.java
│       │       └── 📄 JobTrackerAppApplication.java
│       └── 📁 resources


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
