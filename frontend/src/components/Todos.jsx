import React, { useState } from 'react';

import { CreateTodo } from './CreateTodo';

/* todos = [
   {
    title: "go to gym",
    description: "go to gym",
   } 
   ]
*/
export function Todos({todos, setRefreshKey}) {
    const [showModal, setShowModal] = useState(false);


    const toggleTask = async(id) =>{
        let taskNumber = id.split('-')[1];
        console.log("task id captured>", taskNumber);
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
                id: taskNumber
            }),
            headers: {"Content-Type": "application/json"},
        }
        await fetch('http://localhost:3000/completed', requestOptions);
        setRefreshKey(oldkey => oldkey+1);
    }

    return <div>
        <div className="d-flex d-inline justify-content-center align-items-center">
            <h2>My Tasks</h2>
            <i onClick={()=>setShowModal(true)} className="fa fa-plus fa-2x m-3"></i>
        </div>
        <ul>
        {todos.map((todo, index) => (
            <li key={index} className="d-flex align-items-baseline form-check p-0">
                <input
                className="form-check-input float-none m-3"
                type="checkbox"
                onChange={() => toggleTask(`task-${todo._id}`) }
                id={`task-${todo._id}`}
                checked={todo.completed}
                />
                <label className="form-check-label" htmlFor={`task-${todo._id}}`}>
                <div className="d-flex flex-column m-0">
                    <p className="fs-4">{todo.title}</p>
                    <p className="text-muted">{todo.description}</p>
                </div>
                </label>
            </li>
        ))}
    </ul>
    <CreateTodo showModal={showModal} setShowModal={setShowModal} setRefreshKey={setRefreshKey}/>

    </div>
}