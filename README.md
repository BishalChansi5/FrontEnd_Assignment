# User Management App (React + TypeScript)

A user management application built with **React**, **TypeScript**,**Formik**, **TanStack Query**, and **Zustand**, supporting CRUD operations, pagination, and search functionality.

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Steps to run locally

1. Clone the repository

````bash
git clone <your-repo-url>
cd FrontEnd_Assignment

2. Install dependencies
npm install
# or
yarn install

3. Start the development server
npm run dev
# or
yarn dev

4. Open the app in your browser
http://localhost:5173

##  Folder Structure

```txt
src/
│
├── users/
│   │
│   ├── components/
│   │   ├── UserForm.tsx          # Form for creating and updating users
│   │   └── UserList.tsx          # User table with edit/delete actions
│   │
│   ├── hook/
│   │   ├── useGetUser.ts         # React Query hooks (paginated & all users)
│   │   ├── useCreateUser.ts     # Create user mutation
│   │   ├── useUpdateUser.ts     # Update user mutation
│   │   └── useDeleteUser.ts     # Delete user mutation
│   │
│   ├── services/
│   │   ├── api.ts               # Axios instance & API functions
│   │   └── user.mapper.ts       # Maps API user model to app user model
│   │
│   ├── type/
│   │   ├── user.api.ts          # API response types (ApiUser, Address)
│   │   └── user.ts              # Application user & form types
│   │
│   └── features/
│       └── feature.ts           # React Query query configurations
│
├── store/
│   └── userStore.ts             # Zustand store (UI state)
│
├── pages/
│   └── UserPages.tsx            # Main page (form, search, list, pagination)
│
├── App.tsx                      # Root application component
├── main.tsx                     # Application entry point




## State Management Decisions

### Server State — TanStack Query
Server-related data such as the user list, pagination, and CRUD operations are managed using **TanStack Query**.

**Reasons for choosing TanStack Query:**
- Automatic caching and background refetching
- Built-in loading and error state management
- Eliminates the need to store API data in local component state
- Simplifies pagination and mutation side effects
- Enables instant UI updates through cache manipulation

**Decision:**
> Server data is treated as the single source of truth and is never duplicated in `useState`.

---

### UI State — Zustand
UI-specific state such as the selected user (edit mode), form visibility, and current page number is managed using **Zustand**.

**Reasons for choosing Zustand:**
- Lightweight and minimal API
- No boilerplate compared to Redux
- Ideal for managing UI-only state
- Easy to share state across components without prop drilling

**Decision:**
> UI state is intentionally separated from server state to maintain a clear separation of concerns.

---

### Derived State — Computed, Not Stored
Derived state such as filtered users based on search input is not stored separately. Instead, it is computed from existing server data.

**Reasons for deriving state:**
- Prevents synchronization issues
- Avoids redundant and duplicated state
- Keeps data flow predictable and easier to maintain

**Decision:**
> Search and filtered results are computed using memoization (`useMemo`) rather than being stored in component state.

---


````
