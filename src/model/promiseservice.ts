import { Post } from "./post";

export interface PromiseService {
  posts?: Post[],
  archives?: string[],
  tags?: string[],
  post?: Post,
  slug?: string,
}
