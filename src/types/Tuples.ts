import { Questions } from "./Questions";

export interface Tuples {
  id: string;
  title: string;
  description: string;
  dateCreated: string; // 9/25/2024, 11:23:09 AM
  questions: Questions[];
}