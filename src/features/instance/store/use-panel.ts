import { useInstanceId } from "./use-instnace-id";
export const usePanel = () => {
  const [instanceId, setInstanceId] = useInstanceId();

  const onSelect = (id: string) => {
    setInstanceId(id);
  };

  const onClose = () => {
    setInstanceId(null);
  };

  return {
    instanceId,
    onSelect,
    onClose
  };
};
