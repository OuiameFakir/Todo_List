// React-Hook-Form
import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import Schema from "../formValidation/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITask } from "../types/Type";
import { FC } from "react";
import { useTaskContext } from "../hooks/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface ICardHandleProps {
  isModal: boolean;
  handleToggle: () => void;
  taskObj: ITask;
  isCreated: boolean;
  isEdited: boolean;
}
interface IMyFormValues {
  name: string;
  description: string;
  priority: string;
}

const PrioritiesMap: Record<string, string> = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

const CardHandle: FC<ICardHandleProps> = ({
  isModal,
  handleToggle,
  taskObj,
  isCreated,
  isEdited,
}) => {
  const { updateTask, addTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: UseFormReturn<IMyFormValues> = useForm<IMyFormValues>({
    resolver: yupResolver(Schema),
    defaultValues: {
      name: taskObj.name,
      description: taskObj.description,
      priority: taskObj.priority,
    },
  });

  const onSubmit: SubmitHandler<IMyFormValues> = (data) => {
    if (isCreated) {
      const newTask = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        priority: data.priority,
      };
      addTask(newTask);
      reset();
    } else if (isEdited) {
      const newTask = {
        id: taskObj.id,
        name: data.name,
        description: data.description,
        priority: data.priority,
      };
      updateTask(taskObj.id, newTask);
    }
    handleToggle();
  };
  const handleCancel = () => {
    if (isCreated) {
      reset();
    }
    handleToggle();
  };

  return (
    <Modal isOpen={isModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader className="text-dark bg-danger bg-opacity-10">
          Create Task
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="">Task Name</label>
            <input {...register("name")} className="form-control" type="text" />
            <small className="text-danger fst-italic">
              {errors.name?.message}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              className="form-control"
            />
            <small className="text-danger fst-italic">
              {errors.description?.message}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="priority"> Priority </label>
            <select
              id="priority"
              {...register("priority")}
              className="form-control"
            >
              <option value="" label="Select Priority" />
              {Object.keys(PrioritiesMap).map((priority) => (
                <option key={priority} value={priority}>
                  {PrioritiesMap[priority]}
                </option>
              ))}
            </select>
            <small className="text-danger fst-italic">
              {errors.priority?.message}
            </small>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" className="bg-success bg-opacity-50">
            Save
          </Button>
          <Button className="bg-danger" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
export default CardHandle;
