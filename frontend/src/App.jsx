import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Check, X, Circle, CheckCircle2 } from 'lucide-react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [apiUrl] = useState('https://todolist-production-cae3.up.railway.app/') // Update this to your backend URL

  // Fetch todos from backend on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    if (inputValue.trim() === '') return

    const newTodo = {
      text: inputValue,
      completed: false
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      })
      const data = await response.json()
      setTodos([...todos, data])
      setInputValue('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id)
    const updatedTodo = { ...todo, completed: !todo.completed }

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
      })
      const data = await response.json()
      setTodos(todos.map(t => t._id === id ? data : t))
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo._id)
    setEditValue(todo.text)
  }

  const saveEdit = async (id) => {
    if (editValue.trim() === '') return

    const todo = todos.find(t => t._id === id)
    const updatedTodo = { ...todo, text: editValue }

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
      })
      const data = await response.json()
      setTodos(todos.map(t => t._id === id ? data : t))
      setEditingId(null)
      setEditValue('')
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id)
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              filter === 'active'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-2">
                <Circle size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">
                {filter === 'all' ? 'No tasks yet. Add one to get started!' : 
                 filter === 'active' ? 'No active tasks!' : 
                 'No completed tasks yet!'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleTodo(todo._id)}
                    className="flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className="text-gray-400 hover:text-purple-500" />
                    )}
                  </button>

                  {/* Todo Text */}
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleEditKeyPress(e, todo._id)}
                      className="flex-1 px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 text-lg ${
                        todo.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {editingId === todo._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition"
                          title="Save"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(todo)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                          title="Edit"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {stats.active} {stats.active === 1 ? 'task' : 'tasks'} remaining
          </div>
        )}
      </div>
    </div>
  )
}

export default App