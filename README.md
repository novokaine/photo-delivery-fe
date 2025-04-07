# Photo Delivery (Frontend)

This is the frontend for the **Photo Delivery** platform, built using **React + TypeScript + Redux**. It supports secure user authentication using **access and refresh tokens**, allowing administrators to upload and manage photo drafts securely.

---

## 🔧 Tech Stack

- **React** (with TypeScript)
- **Redux Toolkit** for state management
- **React Router** for routing
- **Custom token-based authentication** (access token in Redux, refresh token in HTTP-only cookie)
- **FormData** support for file uploads
- **Custom retry logic** for auto-refreshing expired access tokens

---

## 🔐 Authentication Architecture

- **Access Token** is stored in Redux and sent via `Authorization` header.
- **Refresh Token** is stored in an **HTTP-only cookie** and used to silently refresh the access token.
- When an access token expires (15 min), the frontend calls the refresh endpoint and retries the original request **without failing the user interaction**.

---

## 📁 Folder Structure

```
src/
├── api/               # API methods (with retry logic)
├── components/        # Reusable UI components
├── pages/             # Route-level views (Login, Dashboard, etc)
├── redux/             # Redux slices and store setup
├── routes/            # Public and private routes
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
├── tests/             # Unit tests (mirroring actual structure)
└── App.tsx            # App entry with route declarations
```

---

## 🚀 Running the App

```bash
# Clone the repo
https://github.com/novokaine/photo-delivery-fe.git

# Install dependencies
npm install

# Start the development server
npm start
```

Make sure the backend is running at `http://localhost:5000` or update the `BASE_URL` in your `api/Const.ts` file.

---

## 📦 API Retry Logic

To prevent failed actions due to expired access tokens:

1. Calls to the backend are wrapped in a `handleWithRetry()` utility.
2. If the server responds with a `419`, a Redux action `getAccessTokenAction` is dispatched.
3. The state waits for the token to refresh.
4. The original request is retried once the new access token is received.

This approach ensures **a seamless user experience** even when tokens expire.

---

## 🧪 Testing

Unit tests are placed in a dedicated `src/tests/` folder to ensure clear separation from core logic.

```bash
npm run test
```

---

## 📤 Deployment

This project is configured for deployment on **Vercel**. You can use GitHub login for Vercel and connect the repo. The `main` branch will be used for production deploys.

---

## 💡 What's Next

- [ ] Finalize deployment on Vercel
- [ ] Add CI/CD (GitHub Actions)
- [ ] Create a clean dashboard UI for photo uploads
- [ ] Add support for user roles & permissions

---

## 🧠 Author

This project is maintained by a seasoned frontend engineer with over 17 years of experience in UI/React, passionate about clean code and simple, scalable architecture.

You're welcome to contribute or reach out for feedback and ideas.

---

## 🔗 Related Repos

- [Backend Repo](https://github.com/novokaine/photo-delivery-be)
