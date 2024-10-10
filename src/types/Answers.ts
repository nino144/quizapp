import { Choices } from "./Choices";

export interface Answers {
  id: string;
  questionId: string;
  optionChoosed?: Choices;
  isRightAnswer: boolean;
}