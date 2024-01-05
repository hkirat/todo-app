import { useState } from "react";
import { Modal } from 'react-bootstrap';

export function CreateTodo({showModal, setShowModal, setRefreshKey}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleClose = ()=>{
        setShowModal(false);
    }

    return <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
        <input id="title" style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="title" onChange={function(e) {
            const value = e.target.value;
            setTitle(e.target.value);
        }}></input> <br />
    
        <input id="desc" style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="description" onChange={function(e) {
            const value = e.target.value;
            setDescription(e.target.value);
        }}></input> <br />

        <button className="btn btn-success" onClick={() => {
            // axios
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(async function(res) {
                    const json = await res.json();
                    alert("Todo added");
                    setShowModal(false);
                    setRefreshKey(oldkey => oldkey+1);
                })
        }}>Add a todo</button>
    </div>
    </Modal.Body>
  </Modal>
}

