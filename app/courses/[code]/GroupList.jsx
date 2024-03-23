// QuizList.js
import React from "react";
import GroupCard from "./GroupCard";

const GroupList = () => {
  const quizzes = [
    {
      group: "1",
    },
    {
      group: "2",
    },

    {
      group: "3",
    },
    {
      group: "4",
    },
    {
      group: "5",
    },
    {
      group: "6",
    },
    {
      group: "7",
    },
    {
      group: "8",
    },
    {
      group: "9",
    },
    {
      group: "10",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-5 mx-auto">
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <GroupCard {...quiz} />
        </div>
      ))}
    </div>
  );
};

export default GroupList;
