import { Choices } from "../types/Choices";

const questionData = [
  {
    id: "1",
    title: "Tuple 1",
    description: "simple description 1",
    dateCreated: "9/25/2024, 11:23:09 AM",
    questions: [
      {
        id: "2",
        question: "1 + 1 = ?",
        option1: "2",
        option2: "3",
        option3: "4",
        option4: "5",
        rightAnswer: "1" as Choices,
      },
      {
        id: "3",
        question: "2 + 2 = ?",
        option1: "3",
        option2: "4",
        option3: "5",
        option4: "6",
        rightAnswer: "2" as Choices,
      },
      {
        id: "4",
        question: "9 + 10 = ?",
        option1: "19",
        option2: "5",
        option3: "4",
        option4: "2",
        rightAnswer: "1"  as Choices,
      }
    ]
  },
  {
    id: "5",
    title: "Tuple 2",
    description: "simple description 2",
    dateCreated: "9/25/2024, 11:23:09 AM",
    questions: [
      {
        id: "6",
        question: "10 + 10 = ?",
        option1: "20",
        option2: "30",
        option3: "40",
        option4: "50",
        rightAnswer: "1" as Choices,
      },
      {
        id: "7",
        question: "20 + 20 = ?",
        option1: "30",
        option2: "40",
        option3: "50",
        option4: "60",
        rightAnswer: "2" as Choices,
      },
      {
        id: "8",
        question: "90 + 100 = ?",
        option1: "190",
        option2: "50",
        option3: "40",
        option4: "20",
        rightAnswer: "1"  as Choices,
      }
    ]
  },
  {
    id: "9",
    title: "tuple 3",
    description: "simple description 3",
    dateCreated: "9/25/2024, 11:23:09 AM",
    questions: [
      {
        id: "10",
        question: "100 + 100 = ?",
        option1: "200",
        option2: "300",
        option3: "400",
        option4: "500",
        rightAnswer: "1" as Choices,
      },
      {
        id: "11",
        question: "200 + 200 = ?",
        option1: "300",
        option2: "400",
        option3: "500",
        option4: "600",
        rightAnswer: "2" as Choices,
      },
      {
        id: "12",
        question: "900 + 1000 = ?",
        option1: "1900",
        option2: "500",
        option3: "400",
        option4: "200",
        rightAnswer: "1"  as Choices,
      }
    ]
  },
  {
    id: "13",
    title: "tuple 4",
    description: "simple description 4",
    dateCreated: "9/25/2024, 11:23:09 AM",
    questions: [
      {
        id: "14",
        question: "1000 + 1000 = ?",
        option1: "2000",
        option2: "3000",
        option3: "4000",
        option4: "5000",
        rightAnswer: "1" as Choices,
      },
      {
        id: "15",
        question: "2000 + 2000 = ?",
        option1: "3000",
        option2: "4000",
        option3: "5000",
        option4: "6000",
        rightAnswer: "2" as Choices,
      },
      {
        id: "16",
        question: "9000 + 10000 = ?",
        option1: "19000",
        option2: "5000",
        option3: "4000",
        option4: "2000",
        rightAnswer: "1"  as Choices,
      }
    ]
  }
];

export default questionData;
