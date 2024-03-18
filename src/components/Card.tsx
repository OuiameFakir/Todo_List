import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ITask } from "../types/Type";
import DeleteTask from "./DeleteTask";
import CardHandle from "./CardHandle";

interface CardNoteProps {
  taskObj: ITask;
}

const CardNote: React.FC<CardNoteProps> = ({ taskObj }) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Store the state of the task
  const [doState, setDoState] = useState<boolean>(true);
  const doTask: string = doState ? "To Do" : "Done";

  const handleDoStateChange = (): void => {
    setDoState(!doState);
  };

  // Function for the color of the task card
  const col = (): string => {
    let colorPriority: string = "";
    if (taskObj.priority === "High") {
      colorPriority = "bg-danger";
    } else if (taskObj.priority === "Medium") {
      colorPriority = "bg-warning";
    } else {
      colorPriority = "bg-success";
    }
    return colorPriority;
  };

  return (
    <Card className={` bg-light`} style={{ width: "19rem", margin: "2px" }}>
      <CardHeader className={` ${col()}`}>
        {/* Display the Task Name */}
        <CardTitle tag="h6" className="text-white">
          {taskObj.name}
        </CardTitle>
      </CardHeader>
      <CardBody>
        {/* Display the Task Description */}
        <CardText>{taskObj.description}</CardText>
      </CardBody>
      <CardFooter>
        <div className="d-flex justify-content-between align-items-baseline">
          <div onClick={() => setEditModal(true)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </div>
          <div onClick={() => setDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </div>
          <label className="d-flex align-items-baseline">
            <input
              className="m-2"
              type="checkbox"
              onClick={handleDoStateChange}
            />
            <div className="fst-italic">{doTask}</div>
          </label>
        </div>
        <CardHandle
          isModal={editModal}
          handleToggle={() => setEditModal(false)}
          taskObj={taskObj}
          isCreated={false}
          isEdited={true}
        />
        <DeleteTask
          modal={deleteModal}
          toggle={() => setDeleteModal(false)}
          task={taskObj}
        />
      </CardFooter>
    </Card>
  );
};

export default CardNote;
