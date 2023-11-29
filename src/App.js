import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, ListGroup, Modal,Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import TodoCard from './components/TodoCard';
import { BASE_URL } from './API';
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showNewModal,setShowNewModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)
  const [selected,setSelected] = useState("")
  const [isComplete,setIsComplete] = useState(false)
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get(BASE_URL)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const addTodo = () => {
    if(!newTodo){
      window.alert("Task is Required")
      setShowNewModal(false)
      return
    }
    const payload = { task: newTodo.trim(), completed:false}
    axios.post(BASE_URL,payload)
      .then(res => {
        fetchTodos();
        setNewTodo('');
        setShowNewModal(false)
      })
      .catch(err => {
        console.error(err);
        setShowNewModal(false)
      });
  };

  const deleteTodo = (id) => {
    axios.delete(BASE_URL+`/${id}`)
      .then(() => {
        fetchTodos()
      })
      .catch(err => {
        console.error(err);
      });
  };

  const markComplete = (id)=>{
    const payload = {completed:true}
    axios.patch(BASE_URL+`/${id}`,payload).then(() => {
      fetchTodos()
    }).catch(err => {
      console.error(err);
    });
  }
  const editTodo = ()=>{
    if(!newTodo){
      window.alert("Task is Required")
      setShowEditModal(false)
      return
    }
    const payload = {task:newTodo.trim(),completed:isComplete}
    axios.patch(BASE_URL+`/${selected}`,payload).then(() => {
      fetchTodos()
      setNewTodo("")
      setIsComplete(false)
      setShowEditModal(false)
    }).catch(err => {
      console.error(err);
    });
  }
  const openEdit = (todo)=>{
    setShowEditModal(true)
    setNewTodo(todo.task)
    setSelected(todo._id)
    setIsComplete(todo.completed)
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Todo App</h1>
          <Button variant="primary" onClick={()=>{setShowNewModal(true)}} className="me-2">
            Add Todo
          </Button>
          {todos.length?<ListGroup className="mt-4">
            {todos.map(todo => (
              <TodoCard
                key={todo._id}
                todo={todo}
                markComplete={markComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                openEdit={openEdit}
              />
            ))}
          </ListGroup>:<div style={{justifyContent:"center",alignItems:"center", display:"flex"}}>
            <Image src='https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg'></Image>
            </div>}
        </Col>
      </Row>
      {/* add new modal */}
      <Modal show={showNewModal} onHide={()=>{setShowNewModal(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newTodo">
            <Form.Control
              type="text"
              placeholder="Enter a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShowNewModal(false)}}>
            Cancel
          </Button>
            <Button variant="primary" onClick={addTodo}>
              Add Todo
            </Button>
        </Modal.Footer>
      </Modal>

      {/* update modal */}
      <Modal show={showEditModal} onHide={()=>{setShowEditModal(false)}} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update ToDo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newTodo">
            <Form.Control
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShowEditModal(false)
          setNewTodo("")
          }}>
            Cancel
          </Button>
            <Button variant="primary" onClick={editTodo}>
              Update ToDo
            </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
