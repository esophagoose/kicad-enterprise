// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $about from "./routes/about.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $home_layout from "./routes/home/_layout.tsx";
import * as $home_projects from "./routes/home/projects.tsx";
import * as $index from "./routes/index.tsx";
import * as $project_name_ from "./routes/project/[name].tsx";
import * as $project_layout from "./routes/project/_layout.tsx";
import * as $project_schematic from "./routes/project/schematic.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Link from "./islands/Link.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/about.tsx": $about,
    "./routes/api/joke.ts": $api_joke,
    "./routes/home/_layout.tsx": $home_layout,
    "./routes/home/projects.tsx": $home_projects,
    "./routes/index.tsx": $index,
    "./routes/project/[name].tsx": $project_name_,
    "./routes/project/_layout.tsx": $project_layout,
    "./routes/project/schematic.tsx": $project_schematic,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/Link.tsx": $Link,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
