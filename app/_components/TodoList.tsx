"use client";

import { trpc } from "../_trpc/client";

const TodoList = () => {
  const getTodos = trpc.getTodos.useQuery();
  return (
    <div>
      {/* {JSON.stringify(getTodos.data)} */}
      {getTodos.data?.map((todo, idx) => (
        <p key={idx}>Todo: {todo}</p>
      ))}
    </div>
  );
};

export default TodoList;
