import { BsCheck, BsTrash, BsPencil } from 'react-icons/bs';
import { Card,Button } from 'react-bootstrap';
function TodoCard({ todo, markComplete, deleteTodo, editTodo,openEdit }) {
    function extractDateFromTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    return (
      <Card className={`mb-2 ${todo.completed ? 'completed' : ''}`}>
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div>
            <Card.Text style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{todo.task}</Card.Text>
            <small>Created on: {extractDateFromTimestamp(todo.createdAt)}</small>
          </div>
          <div className="actions">
            {!todo.completed?<Button variant="success" size="sm" className="me-2" onClick={() => markComplete(todo._id)}>
              <BsCheck />
            </Button>:''}
            <Button variant="primary" size="sm" className="me-2" onClick={() => openEdit(todo)}>
              <BsPencil />
            </Button>
            <Button variant="danger" size="sm" onClick={() => deleteTodo(todo._id)}>
              <BsTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
  export default TodoCard;