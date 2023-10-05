import { serverClient } from "./_trpc/serverClient";
import TodoList from "./_components/TodoList";

export default async function Home() {
  const todos = await serverClient.getTodos();

  return (
    <main className="">
      <h1>Learning tRPC!</h1>
      <TodoList initialTodos={todos} />
    </main>
  );
}
