"use client";

import { FormEvent, useState } from "react";
import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

const TodoList = ({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) => {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos, // this is the initial data
    refetchOnMount: false,
    refetchOnReconnect: false, // those two lines will save us unnecessary fetching
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting: ", taskTitle);
    addTodo.mutate(taskTitle);
    setTaskTitle("");
  };

  return (
    <>
      <div>
        {/* {JSON.stringify(getTodos.data)} */}
        {getTodos.data?.map((todo, idx) => (
          <div key={idx} className="flex justify-start items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={async () => {
                setDone.mutate({ id: todo.id, done: !todo.completed });
              }}
            />
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default TodoList;
