# 🌱 Impact SaaS Platform (CCF Assignment)

## 🚀 Overview

This project is a prototype of an Impact SaaS Platform built for Climate Collective Foundation (CCF).
It enables climate-tech startups to calculate their greenhouse gas (GHG) emissions avoided and allows investors to monitor aggregated climate impact across portfolios.

---

## 🧠 Problem Statement

Startups currently rely on Excel-based tools to calculate climate impact.
This project converts those workflows into a scalable SaaS platform.

---

## 🏗️ Architecture

### Backend

* Node.js (Express)
* PostgreSQL
* Sequelize ORM
* JWT Authentication

### Frontend

* React (Vite)
* Tailwind CSS

---

## 👥 User Roles

### 🔹 Startup

* Create and manage projects
* Input:

  * Vehicles sold
  * Distance travelled
* View:

  * GHG emissions avoided

### 🔹 Investor

* View all startups
* View:

  * Individual startup impact
  * Aggregated portfolio impact

---

## ⚙️ Core Features

### ✅ Authentication

* JWT-based login/signup
* Role-based access control

### ✅ Impact Calculation Engine

Converted Excel-based logic into backend service:

GHG Avoided = Baseline Emissions − Project Emissions

Where:

* Baseline = Petrol vehicle emissions
* Project = EV emissions (electricity-based)

---

## 🧩 Database Design

Entities:

* Users
* Startups
* Projects
* Project Data
* Impact Results

Designed for scalability and future extensions (portfolios, multi-domain impact).

---

## 📊 APIs

### Auth

* POST /api/auth/signup
* POST /api/auth/login

### Startup

* POST /api/projects/create
* POST /api/projects/data

### Investor

* GET /api/investor/dashboard

---

## 🧪 How to Run

### Backend

Create a `.env` file inside `backend/` with the following values:

```bash
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

Then run:

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ☁️ Deployment Notes

* The backend and frontend can be hosted on Azure cloud services.
* Backend options: Azure App Service or Azure Container Apps.
* Frontend option: Azure Static Web Apps.
* Current database is hosted on Render free-tier PostgreSQL.
* Database can be upgraded to a paid Render plan or migrated to Azure-managed database services as usage grows.

---

## 🌍 Future Improvements

* Investor portfolio management
* CSV/Excel bulk uploads
* Configurable emission factors
* Multi-domain impact (water, waste, energy)
* Advanced dashboards & visualisations
* Scale this exact version into a complete Impact SaaS Platform for CCF

---

## 💡 Key Design Decisions

* Modular service-based backend
* Scalable database relationships
* Clean separation of concerns
* Extensible calculation engine

---

## 🙌 Conclusion

This platform demonstrates how Excel-based climate impact tools can be transformed into scalable SaaS products for startups and investors.

---
