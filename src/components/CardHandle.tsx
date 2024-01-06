// React-Hook-Form
import {UseFormReturn, useForm, SubmitHandler} from 'react-hook-form';
import Schema from '../formValidation/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Task } from '../types/Type';
import { FC, useEffect } from 'react';
import { useTaskContext } from '../hooks/TaskContext';
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


interface ICardHandleProps{
  isModal: boolean;
  handleToggle: ()=> void;
  taskObj: Task;
  isCreated: boolean;
  isEdited: boolean;
}
interface IMyFormValues {
  name: string;
  description: string;
  priority: string;
};

const PrioritiesMap: Record<string, string> = {
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
};


const CardHandle:FC<ICardHandleProps> = ({isModal, handleToggle,taskObj, isCreated, isEdited}) =>{
  const {updateTask, addTask} = useTaskContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  }: UseFormReturn<IMyFormValues> = useForm<IMyFormValues>({
    resolver: yupResolver(Schema),
    // defaultValues: {
    //   name: taskObj.name,
    //   description: taskObj.description,
    //   priority: taskObj.priority,
    // },
  });
  // useEffect(() => {
  //   setValue('name', taskObj.name);
  //   setValue('description', taskObj.description);
  //   setValue('priority', taskObj.priority);
  // }, [taskObj, setValue]);
  const onSubmit: SubmitHandler<IMyFormValues> = (data) => {
    if(isCreated){
      const newTask = {
          id: uuidv4(),
          name: data.name,
          description: data.description,
          priority: data.priority,
        };
        addTask(newTask)
  }else if(isEdited){
      const newTask = {
          id: taskObj.id,
          name: taskObj.name,
          description: taskObj.description,
          priority: taskObj.priority,
      };
      updateTask(taskObj.id,newTask);
  }
  handleToggle();
  }
  const handleCancel =()=>{
    reset();
    handleToggle();
  }
  
  return (
      <Modal isOpen={isModal} >
        <form onSubmit={handleSubmit(onSubmit)} >
        <ModalHeader  
          className='text-dark bg-danger bg-opacity-10'>
            Create Task
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
              <label htmlFor="">Task Name</label>
              <input 
                  {...register("name")}
                  className='form-control' 
                  type="text"  
              />
              <small className='text-danger fst-italic'>{errors.name?.message}</small>
          </div>
          <div className='form-group'>
                <label htmlFor="" >Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className='form-control' 
                />
               <small className='text-danger fst-italic'>{errors.description?.message}</small>
            </div>

            <div className='form-group'>
              <label htmlFor="priority"> Priority </label>
              <select  
                id='priority' 
                {...register("priority")}
                className='form-control'>
                <option value='' label='Select Priority' />
                    {Object.keys(PrioritiesMap).map((priority) => (
                        <option key={priority} value={priority}>
                            {PrioritiesMap[priority]}
                        </option>
                    ))}
             </select>
             <small className='text-danger fst-italic'>{errors.priority?.message}</small>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            type='submit'
            className="bg-success bg-opacity-50" 
            >
             Save
          </Button>
          <Button 
            className="bg-danger"  
            onClick={handleCancel}
            >
              Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default CardHandle;


//   // FORMIK :
// import React from 'react'
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
// import { useTaskContext } from '../hooks/TaskContext';
// import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikHelpers} from 'formik';
// import Schema from '../formValidation/Schema';
// import { v4 as uuidv4 } from "uuid";
// import { Task } from '../types/Type';
// import { FC } from 'react';

// interface CardHandleProps{
//   modal: boolean;
//   toggle: ()=> void;
//   taskObj: Task;
//   create: boolean;
//   edit: boolean;
// }

// interface MyFormValues {
//   name: string;
//   description: string;
//   priority: string;
// }


// const prioritiesMap: Record<string, string> = {
//     High: 'High',
//     Medium: 'Medium',
//     Low: 'Low',
//   };

// const CardHandle: FC<CardHandleProps> = ({modal, toggle,taskObj, create, edit}) => {
//   const { updateTask, addTask } = useTaskContext();
  // const handleSubmit = (values: MyFormValues, { resetForm, setErrors }: FormikHelpers<MyFormValues> ) => {

  //   if(create){
  //       const newTask = {
  //           id: uuidv4(),
  //           name: values.name,
  //           description: values.description,
  //           priority: values.priority,
  //         };
  //         addTask(newTask)
  //         resetForm({
  //           values: {
  //             name: '',
  //             description: '',
  //             priority:'',
  //           },
  //         });
  //   }else if(edit){
  //       const newTask = {
  //           id: taskObj.id,
  //           name: values.name,
  //           description: values.description,
  //           priority: values.priority,
  //       };
  //       updateTask(taskObj.id,newTask);
  //       console.log('edit', edit, 'newTask', newTask)
  //   }
  //   setErrors({});
  //   toggle();
  //   }
  //   const handleCancel = (formikProps: { setErrors: (errors: FormikErrors<MyFormValues>) => void }) => {
  //       formikProps.setErrors({});
  //       toggle();
  //     };

// return (
//   <div>
//     <Formik  
//       initialValues={{
//         name: taskObj.name,
//         description: taskObj.description,
//         priority: taskObj.priority,
//       }}
//       validationSchema={Schema}
//       onSubmit={handleSubmit}
    
      
//     >
//        {({ submitForm, errors, handleChange, handleSubmit, touched, values, setErrors }) => (
    // <Form >
    //   <Modal isOpen={modal} >
    //     <ModalHeader  
    //       className='text-dark bg-danger bg-opacity-10'>
    //         Create Task
    //     </ModalHeader>
    //     <ModalBody>
          
    //         <div className='form-group'>
    //             <label htmlFor="">Task Name</label>
    //             <Field
    //               className='form-control' 
    //               type="text"  
    //               name='name'
    //             />
                // <ErrorMessage name='name' component='small' className='text-danger fw-bold fst-italic' />
    //         </div>
    //         <div className='form-group'>
    //             <label htmlFor="" >Description</label>
    //             <Field
    //               as='textarea' 
    //               rows='3' 
    //               className='form-control' 
    //               name='description'
    //             />
    //             <ErrorMessage name='description' component='small' className='text-danger fw-bold fst-italic' />
    //         </div>

    //         <div className='form-group'>
    //           <label htmlFor="priority"> Priority </label>
    //           <Field 
    //             as='select' 
    //             id='priority' 
    //             name='priority' 
    //             className='form-control'>
    //             <option value='' label='Select Priority' />
    //                 {Object.keys(prioritiesMap).map((priority) => (
    //                     <option key={priority} value={priority}>
    //                         {prioritiesMap[priority]}
    //                     </option>
    //                 ))}
    //          </Field>
    //           <ErrorMessage name='priority' component='small' className='text-danger fw-bold fst-italic' />
    //         </div>
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button 
    //         className="bg-success bg-opacity-50" 
    //         onClick={submitForm}
    //         >
    //          Save
    //       </Button>

    //       <Button 
    //         className="bg-danger"  
    //         onClick={() => handleCancel({setErrors})}
    //         >
    //           Cancel
    //       </Button>
        
    //     </ModalFooter>
    //   </Modal>
    // </Form>
//        )}
//     </Formik>
//   </div>
//   );
// }

// export default CardHandle;


