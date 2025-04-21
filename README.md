# RVAF 🚗 Roadside Vehicle Assistance Finder

RVAF is a full-stack web application designed to help users request real-time roadside assistance and connect with service providers nearby. The system is built with **React.js**, **Firebase (Auth + Firestore)**, **Leaflet.js** for maps, and **EmailJS** for email notifications.

---

## 🔧 Features

- 🔐 **User & Provider Authentication**
  - Email/Password and Google Sign-in using Firebase Auth
  - Role selection during signup: "User" or "Provider"
  
- 🆘 **Help Request System**
  - Users can request help using their current GPS coordinates
  - Generates a 4-digit token for fraud protection

- 📍 **Live Provider Tracking**
  - Service providers see unresolved requests
  - View route to the user's location on an interactive Leaflet map

- ✅ **Resolution Verification**
  - Providers must enter the 4-digit token to resolve a request

- 🕓 **History**
  - Users can view their request history
  - Providers can view all resolved cases by them

- 📬 **Email Notifications**
  - Email sent to user confirming request submission using **EmailJS**

- 📄 **Static Informational Pages**
  - About Us, Our Services, Privacy Policy, FAQ – all styled and accessible in the footer

---
