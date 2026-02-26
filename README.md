# 🎓 Blockchain Certificate Verification System

A full-stack web application that enables universities to issue tamper-proof digital certificates, students to access and download them, and verifiers to instantly authenticate them — secured with JWT authentication, QR codes, and role-based access control.

---

## 🚀 Overview

The **Blockchain Certificate Verification System** solves the problem of fake or forged academic certificates. Each certificate is assigned a unique **Certificate ID** and a **QR code** for instant public verification. PDF generation happens fully on the client side — no certificate is stored on the server, ensuring privacy and reducing storage costs.

---

## 🏗️ System Architecture

```
Browser → Netlify (React UI)
React   → Render (API calls)
Render  → MongoDB Atlas (data storage)
```

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Frontend Hosting | Netlify |
| Backend Hosting | Render |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with token-based authorization
- 👥 **Role-Based Dashboards** — Separate dashboards for University, Student, and Verifier
- 🏛️ **Certificate Issuance** — Universities issue certificates to students
- ✅ **Certificate Approval Flow** — Admin reviews and approves certificates before they go live
- 🎓 **Student Certificate Access** — Students view and download their approved certificates
- 📄 **Client-Side PDF Generation** — Certificate PDFs generated in browser using `html2canvas` + `jsPDF`
- 📱 **QR Code Generation** — Each certificate has a scannable QR code for instant verification
- 🔍 **Public Verification** — Anyone can verify a certificate via QR scan or direct link
- 🔒 **No PDF stored on server** — Improves privacy and reduces storage cost

---

## 👥 User Roles

### 🏛️ University
- Login to university dashboard
- Issue certificates by filling student details (name, course, issue date, certificate ID)
- View all issued certificates

### 🎓 Student
- Login to student dashboard
- View all approved certificates
- Download certificate as PDF (generated in browser)
- Share certificate via QR code

### 🔍 Verifier
- Scan QR code or visit verification link
- Instantly verify if a certificate is valid or not
- No login required for verification

---

## 🔐 Authentication Flow

```
User enters email + password
        ↓
Backend validates credentials
        ↓
JWT token generated and sent to frontend
        ↓
Frontend stores token in localStorage
        ↓
All API requests include: Authorization: Bearer <token>
        ↓
Backend verifies token → extracts role → allows/denies access
```

---

## 📜 Certificate Issuance Flow

```
University fills certificate form
        ↓
Backend validates and stores in MongoDB (status = "Pending")
        ↓
Admin reviews and approves (status = "Approved")
        ↓
Certificate appears in Student dashboard
        ↓
Student clicks Download → PDF generated in browser
        ↓
QR code embedded → points to public verification URL
```

---

## 📄 PDF Generation (Client-Side)

When a student clicks **"Download Certificate"**:

1. A styled HTML template is created dynamically
2. Template includes: Institution name, Student name, Course title, Issue date, Certificate ID, QR code, Signature & Logo
3. `html2canvas` converts HTML → image
4. `jsPDF` converts image → PDF
5. Browser downloads the file

> ✅ No PDF is stored on the server — 100% client-side generation

---

## 🔍 Public Verification Flow

```
Verifier scans QR code or visits:
https://your-backend.onrender.com/api/verify/<certificateId>
        ↓
Backend searches MongoDB for certificateId
        ↓
Found + Approved → ✅ Valid Certificate
Not Found        → ❌ Invalid / Not Found
```

---

## 🔒 Security Model

| Feature | Implementation |
|---------|---------------|
| Authentication | JWT (JSON Web Token) |
| Authorization | Role-based middleware |
| Data Validation | Server-side validation |
| CORS | Restricted to Netlify domain |
| Sensitive Configs | Environment variables |
| QR Code | Contains only Certificate ID (no private data) |

---

## ⚙️ Environment Variables

**Frontend (.env)**
```
VITE_API_URL=https://your-backend.onrender.com
```

**Backend (.env)**
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

---

## 📁 Project Structure

```
BlockchainCertificateVerificationSystem/
├── frontend/                  # React.js (Vite) frontend
│   └── src/
│       ├── pages/             # Role-based dashboards
│       ├── components/        # Reusable UI components
│       └── utils/             # PDF & QR generation logic
├── backend/                   # Node.js + Express backend
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   └── middleware/            # JWT & role-based auth
└── README.md
```

---

## ⚠️ Current Limitations

- Certificate data is stored in MongoDB (centralized), not on a public blockchain
- This is a **blockchain-inspired** system — not fully decentralized
- Trust model: Users trust the backend and database
- Future improvement: Store SHA-256 hash of certificate data on-chain for full decentralization

---

## 🙋‍♂️ Author

**Jitesh Kumar**
- GitHub: [@JiteshKumar9](https://github.com/JiteshKumar9)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
