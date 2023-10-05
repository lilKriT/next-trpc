import { usePrisma } from "@/lib/hooks/usePrisma";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await usePrisma.task.findMany({ orderBy: { id: "asc" } });
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (options) => {
    const addedTask = await usePrisma.task.create({
      data: { title: options.input },
    });
    return addedTask;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      })
    )
    .mutation(async (options) => {
      const updatedTask = await usePrisma.task.update({
        where: { id: options.input.id },
        data: { completed: options.input.done },
      });
      return updatedTask;
    }),
});

export type AppRouter = typeof appRouter;
