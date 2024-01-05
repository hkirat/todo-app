import { useEffect, useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(()=>{
    const getTodos = ()=>{
      fetch("http://localhost:3000/todos")
        .then(async function(res) {
          const json = await res.json();
          setTodos(json.todos);
        })
    }
    getTodos();
  },[refreshKey]);

  return (
    <div className='d-flex align-items-center m-5 justify-content-center'>
      <Todos todos={todos} setRefreshKey={setRefreshKey}></Todos>
    </div>
  )
}

export default App
