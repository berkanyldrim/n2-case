import { useQuery } from "@tanstack/vue-query";
import { userService } from "@/api/services/user";

export const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUsers(),
  });

  return { data, isLoading, error };
};
