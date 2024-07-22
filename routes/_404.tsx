import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div
        class="px-4 py-8 mx-auto bg-zinc-900 text-zinc-700 flex flex-col"
        style="min-height: 50vh"
      >
        <div class="w-full mx-auto flex-grow flex flex-col items-center justify-center">
          <h1 class="text-9xl font-bold">404</h1>
          <p class="my-4">
            The page you were looking for doesn't exist.
          </p>
        </div>
      </div>
    </>
  );
}
