import {useQuery, useMutation, QueryClient} from '@tanstack/react-query'
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { URL } from '../types/Variables';


const queryClient = new QueryClient();

export const useTodoQuery = () =>{
    const TodoQuery = useQuery({
        queryKey:['todoList'],
        queryFn: async ()=>{
            const {data} = await axios.get(URL)
            return data
        }
    }) 
    const TodoMutation = useMutation({
        mutationFn: async (title)=>{
               const newTodo ={
                   id: uuidv4(),
                   title:"title",
                   completed: false,
               }
               TodoQuery.data.push(newTodo)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] });
        },
    })
    return {TodoQuery, TodoMutation}
}

// function Query(){
//     const queryClient=useQueryClient();
//     const  {data: todos, isLoading, isError, error} = useQuery({
//         queryKey: ['posts'],
//         // queryFn: ()=> Promise.reject('error message'),
//         queryFn: ()=> wait(1000).then (( )=> [...POSTS]),
//     })
  

//     if(isLoading){
//         return <h1>Loading... </h1>
//     }
//     if(isError){
//         return <pre>{JSON.stringify(error)}</pre>
//     }

//     function wait(duration: number){
//         return new Promise(resolve => setTimeout(resolve, duration))
//     }

//     return <div>
//         {todos?.map(post => 
//            <div key={post.id}> {post.id}, {post.title}</div>
//         )}

//     </div>
    
// }