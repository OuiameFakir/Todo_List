import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { URL } from "../types/Variables";

const queryClient = new QueryClient();

export const useTodoQuery = () => {
  const TodoQuery = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const { data } = await axios.get(URL);
      return data;
    },
  });
  const TodoMutation = useMutation({
    mutationFn: async (title) => {
      const newTodo = {
        id: uuidv4(),
        title: "title",
        completed: false,
      };
      TodoQuery.data.push(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
    },
  });
  return { TodoQuery, TodoMutation };
};
