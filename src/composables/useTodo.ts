import { useQuery } from "@tanstack/vue-query";
import { todoService } from "@/api/services/todo";

export const useTodo = (userId?: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: userId ? ["todos", userId] : ["todos"],
    queryFn: () =>
      userId ? todoService.getUserTodos(userId) : todoService.getTodos(),
  });

  return { data, isLoading, error };
};
