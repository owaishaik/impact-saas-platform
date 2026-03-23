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

## 🌍 Future Improvements

* Investor portfolio management
* CSV/Excel bulk uploads
* Configurable emission factors
* Multi-domain impact (water, waste, energy)
* Advanced dashboards & visualisations

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
