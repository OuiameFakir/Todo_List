import CardNote from './Card';
import { useTaskContext } from '../hooks/TaskContext';
import NavBar from './Navbar';
import { Col, Row } from 'reactstrap';


const TodoList: React.FC = () => {
  const { filtredTasks} = useTaskContext();
  let tasks = filtredTasks;

  return (
    <>
      <NavBar />
      <div className="container p-3">
        <Row xs={1} md={3} lg={4} >
          {/* Divide columns for different screen sizes */}
          {tasks.map((task) => (
            <Col key={task.id} className="mb-4 d-flex justify-content-center">
              <CardNote taskObj={task} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default TodoList;