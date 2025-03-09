# MediMart 💊 - Medicine E-Commerce Shop

Welcome to **MediMart**, an online platform for purchasing medicines. This platform offers a seamless shopping experience with secure login, medicine browsing, prescription upload, and order tracking. The system is designed for both customers and admins, ensuring a secure, user-friendly interface and full compliance with prescription-based purchase regulations.

---

## Key Features

- **User Authentication**: JWT for secure login, bcrypt for password hashing.
- **User Roles**: 
  - **Customers**: Browse, add medicines to cart, place orders, track orders.
  - **Admins**: Manage medicines, orders, and users.
- **Medicine Listings & Search**: Search by name, category, or symptoms.
- **Cart & Checkout**: Add/edit cart items, upload prescriptions, secure payment (Stripe/ShurjoPay).
- **Order Management**: Customers can track orders; admins manage orders and prescriptions.
- **Admin Dashboard**: Manage medicines, orders, users, and payments.

---

## Tech Stack

### Frontend
- **Next.js**: Server-side rendering and static site generation.
- **TypeScript**: Type safety for enhanced maintainability.
- **React**: For building dynamic user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Node.js with Express**: REST API to handle requests.
- **MongoDB (Mongoose)**: For storing user, product, and order data.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.

---

## Routes

### Customer Routes
- **Home**: Featured medicines, search bar, reviews.
- **Register/Login**: User authentication.
- **Shop**: Medicine listings with filters and infinite scrolling.
- **Medicine Details**: Detailed information and 'Add to Cart'.
- **Cart & Checkout**: Modify cart, upload prescriptions, choose payment.
- **Order History**: Track past orders.
- **Profile**: Update personal details.

### Admin Routes
- **Admin Dashboard**: Overview of orders, stock, prescriptions.
- **Manage Medicines**: Add, update, remove medicines.
- **Manage Orders**: Approve/reject prescription orders, update statuses.
- **Manage Users**: View customer details and order history.

---

## Setup Instructions

### Prerequisites:
- **Node.js** (v18.x or later)
- **MongoDB** for database

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Shakiqurrahman/mediMart-client.git
   cd medimart

2. Install dependencies:

```js
npm install
```

<!-- 3. Set up environment variables:

```js

``` -->

#### Usage

- Run the development server:

```js
npm run dev
```

- build for production:

```js
npm run build
```

### Thank You