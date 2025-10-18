# TodoList Application

A full-stack TodoList application with a modern React frontend and Express.js backend, featuring MongoDB for data persistence.

## ✨ Features

- ✅ **Create** - Add new todos
- 📝 **Read** - View all todos with filtering options
- ✏️ **Update** - Edit todo text and toggle completion status
- 🗑️ **Delete** - Remove todos
- 🔍 **Filter** - View All, Active, or Completed tasks
- 📊 **Statistics** - Real-time counts for Total, Active, and Completed tasks
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works seamlessly on all screen sizes

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
TodoList/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    │   └── db.js            # MongoDB connection
    ├── controllers/
    │   └── todoList.controllers.js  # Business logic
    ├── model/
    │   └── todoList.model.js        # Mongoose schema
    ├── routes/
    │   └── todoList.routes.js       # API routes
    ├── server.js            # Express server
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoList
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server** (in `backend` directory)
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend** (in `frontend` directory)
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| GET | `/api/todos` | Get all todos | - |
| POST | `/api/todos` | Create a new todo | `{ text: string, completed: boolean }` |
| PUT | `/api/todos/:id` | Update a todo | `{ text: string, completed: boolean }` |
| DELETE | `/api/todos/:id` | Delete a todo | - |

### Example Requests

**Create Todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy groceries","completed":false}'
```

**Get All Todos:**
```bash
curl http://localhost:5000/api/todos
```

**Update Todo:**
```bash
curl -X PUT http://localhost:5000/api/todos/<todo_id> \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy groceries","completed":true}'
```

**Delete Todo:**
```bash
curl -X DELETE http://localhost:5000/api/todos/<todo_id>
```

## 🗄️ Database Schema

**Todo Model:**
```javascript
{
  text: String (required),
  completed: Boolean (default: false),
  createdAt: Date (default: Date.now)
}
```

## 🎨 UI Features

- **Gradient Header** - Eye-catching purple-to-blue gradient
- **Statistics Dashboard** - Real-time task counts
- **Filter Tabs** - Switch between All/Active/Completed views
- **Inline Editing** - Click edit icon to modify tasks
- **Hover Effects** - Smooth transitions and animations
- **Empty States** - Contextual messages when no tasks exist
- **Keyboard Shortcuts**:
  - `Enter` - Add new todo or save edit
  - `Escape` - Cancel edit

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
```

## 🌐 Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb://localhost:27017/todolist  # or MongoDB Atlas URI
PORT=5000
```

## 📝 Notes

- Frontend uses MongoDB's `_id` field for todo identification
- CORS is enabled to allow frontend-backend communication
- Backend runs on port 5000, frontend on port 5173 (Vite default)
- All API calls include error handling with console logging

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
