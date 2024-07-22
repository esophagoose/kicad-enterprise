import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html style="background: rgb(23 23 23)">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-project</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
