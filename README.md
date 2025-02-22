# 🔑🏢 User Access Management System

## 📝 Overview
This 📌 project is a 🌐 web-based 📲 application designed to manage 👥 user 🔑 access to specific 🏢 company 📍 locations. It includes 🔐 authentication, 🎭 user roles, 📋 location assignments, and ⏳ access scheduling.

## 🎯 Objectives
- Enable the ✨ creation and 🛠️ management of 👥 user 🔑 access to 🏢 company 📍 locations.
- Implement an 🚪 access control system for 🏢 company 📍 locations.

## 🏗️ Technologies Used
- **🖥️ Frontend:** ⚛️ React.js
- **🖥️ Backend:** 🏗️ ASP.NET C#
- **💾 Database:** 🐘 PostgreSQL

## 🚀 Features
### 🖥️ Web App (Frontend)
- **🔐 User Authentication**
    - ✅ Validate 👥 user existence and 🔑 password correctness.
- **🏠 Home Page**
    - 🏢 Display company 📍 access points in a 📊 paginated grid (5 📄 results per page) for 👑 administrators.
- **⚙️ Management (CRUD Operations)**
    - 👥 Users
    - 🏢 Company Locations
    - ⏳ Schedule assignments for 👷 employees
- **📜 Application Rules**
    - 👑 Administrators can ➕ create 👥 users with 🎭 Administrator or 👷 Employee roles.
    - 👑 Administrators 🛠️ manage 🏢 company 📍 locations.
    - 👑 Administrators can ✉️ invite 👷 employees via 📧 email for 📋 registration.
    - 👷 Employees are assigned to 📍 locations with specific ⏰ access times.
    - 👑 Administrators can ✅ activate or ❌ deactivate 📍 location access.
    - 📞 Phone and 📧 email validation is required for 👥 users.
    - 🔑 Passwords must be 💪 strong (8+ 🔢 characters, 1 🔠 uppercase letter, 1 🔢 number, 1 💥 special character).

### 🌐 REST API (Backend)
- ✅ Validate 👥 user 🔑 access permissions for 🏢 company 📍 locations based on ⏳ time and 📍 location.
- 🔄 Return `✔️ True` or `❌ False` for 🔑 access validation.
- 📊 Consider 🟢 Active/🔴 Inactive status in validation.

## 📦 Data Models
### 👥 User Model (CRUD)
- 🏷️ First Name
- 🏷️ Last Name
- 📍 Address
- 📞 Phone Number
- 📧 Email
- 🌎 Country, 🏙️ City
- 🎭 User Type (👑 Administrator, 👷 Employee)

### 🏢 Company Location Model (CRUD)
- 🏷️ Name
- 📍 Address
- 📊 Status
- ⏳ Access Schedule

### 📅 Schedule Model (CRUD)
- 🏢 Company 📍 Location
- 👥 User
- ⏳ Initial Time
- ⏳ Final Time

## ⚙️ Installation
### 🔧 Prerequisites
- 🟢 Node.js and 📦 npm
- 🏗️ .NET SDK 8.0+
- 🐘 PostgreSQL

### 🏗️ Backend Setup
1. 📂 Clone the repository:
   ```sh
   git clone https://github.com/FelipeSarmiento/PruebaTecnicaCityLending.git
   cd PruebaTecnicaFelipe.Server
   ```
2. ⚙️ Configure the 💾 database connection in `appsettings.json`. 
3. 🚀 Run the backend server:
   ```sh
   dotnet run
   ```

### 🎨 Frontend Setup
1. 📂 Navigate to the frontend directory:
   ```sh
   cd pruebatecnicafelipe.client
   ```
2. 📦 Install dependencies:
   ```sh
   npm install
   ```
3. 🚀 Start the development server:
   ```sh
   npm run dev
   ```

## 📜 License
📄 This project is licensed under the 🆓 MIT License.

## 📞 Contact
For any inquiries, please reach out to ✉️ acharris@citylendinginc.com.





