import { kv } from "../components/Database.tsx";

export let config = {};

export enum ProjectSource {
  Git = "git",
  Local = "local",
}

export default interface ProjectInfo {
  name: string;
  location: string;
  lastUpdated: Date;
  source: ProjectSource;
}
