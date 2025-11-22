# Secure User Data Management Interface

A high-performance, secure, and responsive React application developed as a Frontend Case Study. This dashboard enables authorized users to manage large datasets with complex filtering, server-side pagination simulation, and role-based access control.

## 🚀 Project Overview

This project solves the challenge of managing secure user identity and profession data. It features a robust architecture designed for scalability and performance, addressing critical requirements such as:

* **Performance:** Minimized re-renders using Zustand and TanStack Query.
* **State Persistence:** URL synchronization for deep linking and browser history support.
* **Security:** Role-based UI rendering (Admin vs. User).
* **UX:** Real-time validation, debounced searching, and immediate feedback (Toasts).

## 🛠 Technology Stack

* **Core:** React 18, TypeScript, Vite
* **State Management:** Zustand (Global Client State)
* **Data Fetching:** TanStack Query (Server State & Caching)
* **UI Framework:** Material UI (MUI) v5
* **Routing:** React Router DOM v6
* **Forms & Validation:** React Hook Form + Zod
* **Feedback:** Notistack (Toast Notifications)

## ✨ Key Features

### 1. Authentication & Security
* **Mock Login System:** Simulates JWT token handling and session persistence.
* **Role-Based Access Control (RBAC):**
    * **Admins:** Can view data and **Add New Users**.
    * **Standard Users:** Can only view and filter data.
* **Protected Routes:** Prevents unauthorized access to the dashboard.

### 2. Advanced Data Grid
* **Server-Side Simulation:** Mock API handles filtering, sorting, and pagination logic to mimic a real backend.
* **Complex Filtering:**
    * **Debounced Search:** Filters by Name/Surname with a 500ms delay to optimize performance.
    * **TCKN Filtering:** Filters by Identity Number prefix.
    * **Multi-Select Job Group:** Allows filtering by multiple professions simultaneously using Chips.
* **Sorting:** Supports sorting on all columns (Name, Email, TCKN, Job Group, Date).
* **Pagination:** Full server-side pagination support.

### 3. URL Synchronization (Deep Linking)
* The application uses a custom hook (`useUrlSync`) to keep the URL query parameters in sync with the application state.
* **Benefit:** You can share a URL (e.g., `?page=2&search=Ahmet&jobGroup=Engineer,Doctor`) and the application will load exactly in that state.

### 4. Robust Form Management
* **Add User Modal:** A clean modal interface for creating records.
* **Validation:** Strict Zod schemas ensure data integrity (e.g., TCKN must be exactly 11 digits).
* **Error Handling:** Simulates backend errors:
    * **409 Conflict:** Prevents duplicate Emails or TCKN.
    * **400 Bad Request:** Rejects invalid names (e.g., "error").

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🧪 Test Credentials

You can use the following credentials to test the different roles:

| Role | Email | Password | Capabilities |
|------|-------|----------|--------------|
| **Admin** | `admin@test.com` | `password123` | View, Filter, **Add Users** |
| **User** | `user@test.com` | `password123` | View, Filter |

## 📂 Project Structure

```text
src/
├── components/
│   ├── auth/         # Protected Route Guards
│   └── users/        # User-domain components (Table, Filters, Modal)
├── hooks/            # Custom hooks (useDebounce, useUrlSync)
├── pages/            # Page views (Login, Dashboard)
├── services/         # API simulation and mock data
├── store/            # Zustand stores (Auth, UserTable)
├── theme/            # MUI Theme configuration
└── types/            # TypeScript interfaces