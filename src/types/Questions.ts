import { Choices } from "./Choices";

export interface Questions {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: Choices;
}