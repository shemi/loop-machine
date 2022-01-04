import { useCallback, useState } from 'react';

type isInQueue = (id: string) => boolean;
type addToQueue = (id: string) => void;
type removeFromQueue = (id: string) => void;
type emptyQueue = () => void;

type useQueue = {
  queue: string[];
  isInQueue: isInQueue;
  addToQueue: addToQueue;
  removeFromQueue: removeFromQueue;
  emptyQueue: emptyQueue;
};

const useQueue = (): useQueue => {
  const [queue, setQueue] = useState<string[]>([]);

  const isInQueue = useCallback<isInQueue>(
    (id: string) => queue.indexOf(id) >= 0,
    [queue],
  );

  const addToQueue = useCallback<addToQueue>(
    (id: string) => {
      if (!isInQueue(id)) {
        setQueue([...queue, id]);
      }
    },
    [queue, isInQueue],
  );

  const removeFromQueue = useCallback<removeFromQueue>(
    (id) => {
      if (isInQueue(id)) {
        setQueue(queue.filter((itemId) => itemId !== id));
      }
    },
    [queue, isInQueue],
  );

  const emptyQueue = useCallback(() => {
    setQueue([]);
  }, [queue]);

  return {
    queue,
    isInQueue,
    addToQueue,
    removeFromQueue,
    emptyQueue,
  };
};

export default useQueue;
