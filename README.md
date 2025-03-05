# AI-Powered Signature Verification

## Overview

This is a **web-based signature verification system** using **React + TypeScript** and **TensorFlow.js**. It allows users to **upload or draw signature images**, processes them using a **pretrained AI model (MobileNet)**, and verifies their authenticity **on-device** without needing a backend.

## Features ✅

- **Upload Signature Images** or **drawing on a canvas.**
- **On-Device Processing** using **TensorFlow.js** (no backend required).
- **Feature Extraction** with a **MobileNet model** for signature comparison.
- **Fast & Lightweight** for real-time verification in the browser.

## Tech Stack 🛠️

- **React + TypeScript** (Frontend)
- **TensorFlow.js** (AI model for signature verification)
- **MobileNet** (Pretrained model for feature extraction)

## Installation & Setup ⚙️

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/satyamm14/ai-signature-verification.git
cd ai-signature-verification
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Project

```sh
npm run dev
```

The app will be available at **http://localhost:5173**

---

## How It Works? 🤔

1. **Upload two signature images** or **draw on canvas** .
2. AI processes them and **extracts features**.
3. **Cosine similarity** is used to compare features.
4. **Result:** ✅ "Match" or ❌ "Not a Match".

---

## Future Improvements 🚀

🔹 **Improve Accuracy** → Train a custom **Siamese Network** model instead of MobileNet.  
🔹 **Add Preprocessing** → Convert images to grayscale & remove noise.  
🔹 **Store Signatures** → Save verified signatures in IndexedDB or Firebase.

---

## License 📜

This project is **open-source** and free to use under the MIT License.
