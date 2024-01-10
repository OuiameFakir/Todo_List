
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTaskContext } from '../hooks/TaskContext';
import { ITask } from '../types/Type';

interface DeleteTaskProps{
  modal: boolean;
  toggle: ()=> void;
  task: ITask;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({modal, toggle, task}) => {
    const { deleteTask } = useTaskContext();

    const handleDelete =(): void=>{
        deleteTask(task.id);
        toggle();
    };
  return ( 
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
            {task.name}
        </ModalHeader>
        <ModalBody className='secondary'>
          Are sure you would like to delete this task from your Todo List !
        </ModalBody>
        <ModalFooter>
          <Button className="bg-danger" onClick={handleDelete}>
            Yes
          </Button>{' '}
          <Button className="bg-secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  );
}

export default DeleteTask;