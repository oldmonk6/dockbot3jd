# DocBot - Virtual Medical Assistant 🚑💻

Empowering Healthcare with AI and NLP  
DocBot is a cutting-edge virtual medical assistant that simplifies healthcare access and decision-making. By leveraging AI, machine learning, and NLP, it bridges the gap between patients and effective healthcare solutions.

---

## 🌟 Key Features

### Static Features
- Document Upload: Upload MRI scans, CT scans, or prescriptions.
- AI-Powered Analysis: Get detailed insights such as:
  - Disease severity.
  - Recommended medication dosages.
  - Prognosis and follow-up advice.

### Dynamic Features
- Symptom Diagnosis: Chatbot interprets symptoms using NLP to suggest possible conditions.
- Geolocation Assistance: Provides recommendations for nearby hospitals and clinics.
- Emergency Guidance: Offers first-level advice during emergencies.

---

## 🩺 Problem Statement

Healthcare systems face challenges such as overloaded facilities, limited access in rural areas, and unorganized health records. Delayed or inaccurate diagnoses often strain resources and impact patient outcomes.  
DocBot tackles these challenges by providing timely and personalized medical assistance.

---

## 📈 Workflow

### 1️⃣ Static Part
1. User uploads a medical document (e.g., MRI, CT scan, or prescription).
2. AI processes the document and provides:
   - Disease severity.
   - Medicine dosage.
   - Prognosis and recommendations.

### 2️⃣ Dynamic Part
1. User interacts with an AI chatbot:
   - Inputs symptoms.
   - Chatbot predicts conditions using NLP.
2. Chatbot suggests:
   - Possible diagnoses.
   - Nearby hospitals or specialists.

---
3.Steps to bootstrap this project:
   # DocBot Backend

This repository contains the backend for the **DocBot** application, a powerful backend service built with Node.js and Express. The backend includes user authentication, file handling, PDF parsing, and integration with AI and database services.
  
  ## Table of Contents
  
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Scripts](#scripts)
  - [Features](#features)
  - [Technologies](#technologies)
  
  ---
  
  ## Requirements
  
  Ensure you have the following installed before running the application:
  
  - **Node.js** (v16 or above recommended)
  - **npm** (comes with Node.js)
  - **MongoDB** (local or hosted instance)
  
  ---
  
  ## Setup
  
### 1.Clone the repository:
     ```bash
     git clone <repository-url>
     cd docbot-backend

    
### 4.Install dependencies:
     npm install

### 5.The dependencies used in this project are:
    @ai-sdk/deepinfra: AI SDK for Deepinfra services.
    @google/generative-ai: Integration for Google Generative AI.
    ai: General AI utilities.
    axios: Promise-based HTTP client for API requests.
    bcrypt: Password hashing for secure user authentication.
    cookie-parser: Parse cookies in incoming requests.
    cors: Enable cross-origin resource sharing.
    dotenv: Load environment variables from .env files.
    express: Web framework for Node.js.
    jsonwebtoken: Token generation and validation.
    mongoose: MongoDB object modeling.
    multer: File upload middleware.
    pdf-parse: PDF file parsing.
    zod: Schema-based validation.
    
### 6.Dev Dependencies:
    nodemon: Monitors files and restarts the server on changes.
    Install dependencies:


### 7.Run the development server with the following command:
    npm run dev

    
