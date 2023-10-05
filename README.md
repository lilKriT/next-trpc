# Learning tRPC

Simple project I will use to learn how tRPC works.
Created by lilKriT.

# Steps

- install necessary packages `pnpm add @trpc/server @trpc/client` (there's more but only install what you need)
- add `@tanstack/react-query` and `@trpc/react-query`
- create `server/trpc.ts`
- create `server/index.ts`
- create `api/trpc/[trpc]/route.ts` (this is where the main difference between pages and app router is.)
- create `_trpc/client.ts`
- create `_trpc/provider.ts`
- add the provider to your layout
- use it in a client component
- add / replace procedures with ones that actually do something
- you can use `zod` to validate input
- add SSR:
  - create `_trpc/serverClient.ts`
  - in your pages, import `serverClient`, turn the page into async
  - fetch your data in a server page
  - pass it to your components (careful, typing it can be tricky!)
  - you might want to disable some refetching
