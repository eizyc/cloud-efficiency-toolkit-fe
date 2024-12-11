import { useQueryState } from "nuqs";

export const useInstanceId = () => {
  return useQueryState("id");
};
