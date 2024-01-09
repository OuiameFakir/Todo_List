
import React, { useEffect, useState, useRef } from 'react';
import { Row } from 'reactstrap';

const URL='https://jsonplaceholder.typicode.com/todos';

interface ITodos{
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

function Fetch() {
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState();
  const [todos, setTodos]=useState<ITodos[]>([]);
  const abortControllerRef =useRef<AbortController | null>(null);
  useEffect(() => {
    const fetchTodos= async ()=>{
      // to cancel an old fetch request (race conditions)
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try{
          const response = await fetch(`${URL}`,{ signal: abortControllerRef.current?.signal});
          const todos = await response.json() as ITodos[];
          setTodos(todos);
      }catch(err: any){
        if(err.name ==='AbortError'){
          console.log('Aborted');
          return;
        }
        setError(err);
      }finally{
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);

  if(isLoading){
    return <div>Loading ...</div>;
  }

  if(error){
    return <div>Something Went Wrong! Please try again</div>
  }
  return (
    <div className='container'>
      <Row xs={1} md={3} lg={4} >
        {todos.map((todo)=>{
          return<div className="card m-2" style={{width: "16rem"}} key={todo.id}>
              <div className="card-body">
                <h5 className="card-title">Title of todo : {todo.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">ID of todo : {todo.id}</h6>
                <p className="card-text">Completed : {todo.completed}</p>
              </div>
            </div>
        })}
      </Row>
    </div>
  )
}

export default Fetch


