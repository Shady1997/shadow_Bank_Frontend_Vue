# Mobile Banking Dashboard - Vue.js Frontend

A comprehensive banking management system built with Vue 3 and Spring Boot, featuring user management, account management, and transaction handling.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Java**: JDK 17 or higher (for backend)
- **Spring Boot API**: Running on port 8083

## Technology Stack

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Spring Boot REST API

## Project Structure

```
banking-frontend-vue/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── LoginPage.vue
│   │   ├── DashboardLayout.vue
│   │   ├── UsersTab.vue
│   │   ├── AccountsTab.vue
│   │   └── TransactionsTab.vue
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── accountService.js
│   │   └── transactionService.js
│   ├── stores/
│   │   └── auth.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation & Setup

### Step 1: Create Vue Project

```bash
npm create vite@latest banking-frontend-vue -- --template vue
cd banking-frontend-vue
```

### Step 2: Install Dependencies

```bash
npm install
npm install vue-router@4 pinia axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Configure API URL

The application is configured to connect to the Spring Boot API on **port 8083**.

Verify the API URLs in the service files:

- `src/services/userService.js`
- `src/services/accountService.js`
- `src/services/transactionService.js`

All should point to:
```javascript
const API_URL = 'http://localhost:8083/api/[resource]'
```

### Step 5: Start the Backend API

Ensure your Spring Boot application is running on port **8083**:

```bash
# In your Spring Boot project directory
mvn spring-boot:run

# Or with Gradle
./gradlew bootRun
```

Verify the backend is running by visiting:
```
http://localhost:8083/api/users
```

### Step 6: Configure CORS (Backend)

Ensure your Spring Boot `CorsConfig.java` allows requests from Vue:

```java
corsConfiguration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000"  // Vue development server (Vite default)
));
```

### Step 7: Start the Vue Application

```bash
npm run dev
```

The application will start on:
```
http://localhost:3000
```

## Running the Application

1. **Start Spring Boot Backend** (Port 8083)
   ```bash
   mvn spring-boot:run
   ```

2. **Start Vue Frontend** (Port 3000)
   ```bash
   npm run dev
   ```

3. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Login
Credentials

Use the following credentials to access the dashboard:
Username: shady1997
Password: shady1997

## Features

### 1. Authentication
- Secure login page
- Protected routes with navigation guards
- Session management using Pinia store
- Logout functionality

### 2. User Management
- Create new users
- View all users
- Search users by username
- Delete users
- Form validation (username min 3 chars, password min 8 chars)

### 3. Account Management
- Create bank accounts (Savings, Checking, Credit)
- View all accounts
- Search accounts by account number
- Search accounts by user ID
- Set credit limits
- Delete accounts
- View account status and balance

### 4. Transaction Management
- Create transactions (Deposit, Withdrawal, Transfer, Payment)
- View all transactions
- Search by transaction reference
- Search by account ID
- View transaction status and fees
- Color-coded transaction types and statuses

## API Endpoints Used

### Users API
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Accounts API
- `POST /api/accounts` - Create account
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `GET /api/accounts/user/{userId}` - Get accounts by user ID
- `GET /api/accounts/number/{accountNumber}` - Get account by number
- `DELETE /api/accounts/{id}` - Delete account

### Transactions API
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `GET /api/transactions/account/{accountId}` - Get transactions by account
- `GET /api/transactions/reference/{reference}` - Get transaction by reference

## Build for Production
```bash
npm run build

The build artifacts will be stored in the dist/ directory.

## Preview Production Build
npm run preview

Troubleshooting
CORS Errors
If you encounter CORS errors, ensure:

Spring Boot CORS configuration includes http://localhost:3000
Backend is running on port 8083
Restart both frontend and backend

Port Already in Use
If port 3000 is already in use, update vite.config.js:
javascriptexport default defineConfig({
  server: {
    port: 3001, // Change to any available port
  },
})
Update CORS configuration accordingly.
API Connection Failed

Verify backend is running: http://localhost:8083/api/users
Check browser console for error messages
Verify API URLs in service files match your backend port
Check network tab in browser DevTools

Module Not Found Errors
If you get module errors:
bashrm -rf node_modules package-lock.json
npm install
Development Commands
bash# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix files (if ESLint is configured)
npm run lint
Project Setup Tips
1. Alias Configuration
The project uses @ as an alias for the src directory:
javascriptimport { userService } from '@/services/userService'
2. Vue DevTools
Install Vue DevTools browser extension for debugging:

Chrome: Vue.js devtools
Firefox: Vue.js devtools

3. Hot Module Replacement
Vite provides instant HMR. Changes are reflected immediately without page refresh.
Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

Key Differences from React/Angular Versions

State Management: Uses Pinia instead of Context API or Services
Composition API: Uses Vue 3's Composition API with <script setup>
Reactivity: Vue's reactive system automatically tracks dependencies
Template Syntax: Uses Vue template directives (v-if, v-for, v-model)
Build Tool: Uses Vite for faster development and builds

Project Information

Author: Shady Ahmed
LinkedIn: https://www.linkedin.com/in/shady-ahmed97/
Date: 2025-10-03
Vue Version: 3.4.21
Node Version: 18+

Common Issues and Solutions
Issue: Blank page on load
Solution: Check browser console for errors. Ensure all dependencies are installed.
Issue: 404 on refresh
Solution: Configure your server to redirect all routes to index.html.
Issue: Styles not loading
Solution: Verify Tailwind CSS is properly configured in style.css and imported in main.js.
License
This project is for educational and demonstration purposes.

For any issues or questions, please contact the development team.