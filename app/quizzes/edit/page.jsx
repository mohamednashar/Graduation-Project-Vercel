"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from 'react-select';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

function Page() {
  const axiosAuth=useAxiosAuth()
  const { data: session } = useSession();
  const userName = session?.user?.userName;
  const searchParams = useSearchParams();
  const courseCycleId = searchParams.get("courseCycleId");
  const examId = searchParams.get("examId");
  const [questions, setQuestions] = useState({ tfQs: [], mcQs: [] });
  const [openDialogId, setOpenDialogId] = useState(null);
  const [openDialogDeleteId, setOpenDialogDeleteId] = useState(null);
  const [openDialogUpdateMCQId, setOpenDialogUpdateMCQId] = useState(null);
  const [openDialogDeleteMCQId, setOpenDialogDeleteMCQId] = useState(null);
  const [doneUpdate, setDoneUpdate] = useState(0);
  const [TFQuestion, setTFQuestion] = useState({
    examId: examId,
    text: "",
    degree: 0,
    isTrue: true,
  });

  const [MCQuestion, setMCQuestion] = useState({
    examId: examId,
    text: "",
    degree: 0,
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosAuth.get(`${API}Exam/GetAllQuestionsOfExam`, {
          params: { ExamId: examId, ExamCreatorUserName: userName },
        });
        setQuestions(response.data);
        response.status === 200
          ? console.log("request done with status 200")
          : console.log(
              "failed to fetch questions with status " + response.status
            );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (examId && userName) {
      fetchQuestions();
    }
  }, [examId, userName, API, doneUpdate]);

  const handleRadioChange = (e, questionId) => {
    const value = e.target.value === "true";
    setQuestions((prevState) => ({
      ...prevState,
      tfQs: prevState.tfQs.map((question) =>
        question.questionId === questionId
          ? { ...question, userResponse: value }
          : question
      ),
    }));
  };
  const handleDelete = async (questionId) => {
    console.log(questionId);
    const data = questionId;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axiosAuth.delete(`${API}TFQ/DeleteTFQ`, {
        headers: headers,
        data: data,
      });
      setOpenDialogDeleteId(null);
      if (response.status === 200) {
        console.log("Delete done");
        setDoneUpdate(doneUpdate + 1);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleDeleteMCQ = async (questionId) => {
    console.log(questionId);
    const data = questionId;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axiosAuth.delete(`${API}MCQ/DeleteMCQ`, {
        headers: headers,
        data: data,
      });
      setOpenDialogDeleteId(null);
      if (response.status === 200) {
        console.log("Delete done");
        setDoneUpdate(doneUpdate + 1);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = async (question) => {
    try {
      const response = await axiosAuth.put(`${API}TFQ/UpdateTFQ`, TFQuestion, {
        headers: { TFQId: question.questionId },
      });
      setOpenDialogId(null);
      response.status === 200
        ? console.log("update done")
        : console.log("failed to update");
      setDoneUpdate(doneUpdate + 1);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleUpdateMCQ = async (question) => {
    console.log(MCQuestion);
    try {
      const response = await axiosAuth.put(`${API}MCQ/UpdateMCQ`, MCQuestion, {
        headers: { MCQId: question.questionId },
      });
      setOpenDialogUpdateMCQId(null);
      response.status === 200
        ? console.log("update done")
        : console.log("failed to update");
      setDoneUpdate(doneUpdate + 1);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };



  
    // Form state for MCQ
    const [mcqFormData, setMCQFormData] = useState({
      text: "",
      degree: 0,
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: { value: "OptionA", label: "Option A" }
  });

  // Form state for True/False (TF)
  const [tfFormData, setTFFormData] = useState({
      text: "",
      degree: 0,
      isTrue: true
  });

  // Show/hide forms
  const [showMCQForm, setShowMCQForm] = useState(false);
  const [showTFForm, setShowTFForm] = useState(false);

  // Handle input change for MCQ
  const handleMCQInputChange = (e) => {
      const { name, value } = e.target;
      setMCQFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  // Handle input change for TF
  const handleTFInputChange = (e) => {
      const { name, value } = e.target;
      setTFFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  // Handle select change for MCQ
  const handleMCQSelectChange = (selectedOption) => {
      setMCQFormData(prevState => ({
          ...prevState,
          correctAnswer: selectedOption
      }));
  };

  // Handle select change for TF
  const handleTFSelectChange = (selectedOption) => {
      setTFFormData(prevState => ({
          ...prevState,
          isTrue: selectedOption.value === "true"
      }));
  };

  // Handle form submit for MCQ
  const handleMCQSubmit = async (e) => {
      e.preventDefault();
      try {
          // Extracting data from mcqFormData
          const { text, degree, optionA, optionB, optionC, optionD, correctAnswer } = mcqFormData;
  
          // Transforming data to match desired structure
          const formData = {
              examId: examId,
              text: text,
              degree: degree,
              optionA: optionA,
              optionB: optionB,
              optionC: optionC,
              optionD: optionD,
              correctAnswer: correctAnswer.value // Extracting value from correctAnswer object
          };
  
          // Sending transformed data to the backend
          const response = await axiosAuth.post(`${API}MCQ/CreateMCQ`, formData);
          console.log("MCQ created successfully!", response.data); // Log response data
          // You can add further actions here like showing a success message or redirecting
          setDoneUpdate(doneUpdate + 1);
          setShowMCQForm(false)

      } catch (error) {
          console.error("Error creating MCQ:", error);
          // You can handle error scenarios here
      }
  };

  // Handle form submit for TF
  const handleTFSubmit = async (e) => {
      console.log(tfFormData)
      e.preventDefault();
      try {
          await axiosAuth.post(`${API}TFQ/CreateTFQ`, {
              examId: examId,
              ...tfFormData
          });
          console.log("TF question created successfully!");
          // You can add further actions here like showing a success message or redirecting
          setDoneUpdate(doneUpdate + 1);
          setShowTFForm(false);

      } catch (error) {
          console.error("Error creating TF question:", error);
          // You can handle error scenarios here
      }
  };

  // Options for MCQ correct answer
  const mcqOptions = [
      { value: "OptionA", label: "Option A" },
      { value: "OptionB", label: "Option B" },
      { value: "OptionC", label: "Option C" },
      { value: "OptionD", label: "Option D" }
  ];

  // Options for TF
  const tfOptions = [
      { value: "true", label: "True" },
      { value: "false", label: "False" }
  ];


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Exam</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">
        True/False Questions:
      </h2>
      <ul>
        {questions?.tfQs?.map((question, index) => (
          <li
            key={index}
            className="mb-8 p-4 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-full">
                <p className="text-lg break-words mb-4">
                  {index + 1}. {question.text}
                </p>
                <div className="flex items-center gap-5">
                  <input
                    type="radio"
                    id={`true_${question.questionId}`}
                    name={`question_${question.questionId}`}
                    value="true"
                    checked={question.userResponse === true}
                    onChange={(e) => handleRadioChange(e, question.questionId)}
                  />
                  <label
                    htmlFor={`true_${question.questionId}`}
                    className="text-lg font-semibold cursor-pointer mr-3"
                  >
                    True
                  </label>
                  <input
                    type="radio"
                    id={`false_${question.questionId}`}
                    name={`question_${question.questionId}`}
                    value="false"
                    checked={question.userResponse === false}
                    onChange={(e) => handleRadioChange(e, question.questionId)}
                  />
                  <label
                    htmlFor={`false_${question.questionId}`}
                    className="text-lg font-semibold cursor-pointer"
                  >
                    False
                  </label>
                </div>
                <p className="my-2">Degree: {question.degree}</p>
                <p className="my-2">
                  Correct Answer:{" "}
                  <span className="font-semibold">
                    {question.isTrue ? "True" : "False"}
                  </span>{" "}
                </p>
              </div>
              <div className="flex items-center gap-3 ">
                <button
                  onClick={() => {
                    setOpenDialogId(question.questionId);
                    setTFQuestion({
                      examId: examId,
                      text: question.text,
                      degree: question.degree,
                      isTrue: question.isTrue,
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setOpenDialogDeleteId(question.questionId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                >
                  Delete
                </button>
              </div>
            </div>
            {/* modal for update T/F question */}
            <Dialog
              open={openDialogId === question.questionId}
              handler={() => setOpenDialogId(null)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              className=" bg-white dark:bg-[#282828] text-black dark:text-white"
            >
              <DialogHeader className=" text-black dark:text-white">
                Update Question
              </DialogHeader>
              <DialogBody>
                <div className="mb-4  text-black dark:text-white">
                  <label htmlFor="text" className="block text-lg font-semibold">
                    Question:
                  </label>
                  <input
                    type="text"
                    id="text"
                    name="text"
                    value={TFQuestion.text || ""}
                    onChange={(e) =>
                      setTFQuestion({ ...TFQuestion, text: e.target.value })
                    }
                    className="w-full p-2 border-2"
                  />
                </div>
                <div className="mb-4  text-black dark:text-white">
                  <label
                    htmlFor="degree"
                    className="block text-lg font-semibold"
                  >
                    Degree:
                  </label>
                  <input
                    type="number"
                    id="degree"
                    name="degree"
                    value={TFQuestion.degree || ""}
                    onChange={(e) =>
                      setTFQuestion({ ...TFQuestion, degree: e.target.value })
                    }
                    className="w-full p-2 border-2"
                  />
                </div>
                <div className="mb-4 flex items-center gap-3 flex-wrap">
                  <label className="block text-lg font-semibold  text-black dark:text-white">
                    Correct Answer:
                  </label>
                  <div className="flex items-center gap-2  text-black dark:text-white">
                    <input
                      type="radio"
                      id="true"
                      name="isTrue"
                      value="true"
                      checked={TFQuestion.isTrue === true}
                      onChange={(e) =>
                        setTFQuestion({ ...TFQuestion, isTrue: true })
                      }
                      className="mr-1"
                    />
                    <label
                      htmlFor="true"
                      className="text-lg font-semibold cursor-pointer"
                    >
                      True
                    </label>
                  </div>
                  <div className="flex items-center gap-2  text-black dark:text-white">
                    <input
                      type="radio"
                      id="false"
                      name="correctAnswer"
                      value="false"
                      checked={TFQuestion.isTrue === false}
                      onChange={(e) =>
                        setTFQuestion({ ...TFQuestion, isTrue: false })
                      }
                      className="mr-1"
                    />
                    <label
                      htmlFor="false"
                      className="text-lg font-semibold cursor-pointer"
                    >
                      False
                    </label>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpenDialogId(null)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate(question);
                  }}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>

            {/* modal for delete T/F question */}

            <Dialog
              open={openDialogDeleteId === question.questionId}
              handler={() => setOpenDialogDeleteId(null)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              className=" bg-white dark:bg-[#282828]"
            >
              <DialogHeader className="text-red-900 text-xl font-bold">
                Delete Question
              </DialogHeader>
              <DialogBody>
                <h2 className="text-red-800 font-semibold text-lg">
                  Are you sure deleting this question ?{" "}
                </h2>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpenDialogDeleteId(null)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="red"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(question.questionId);
                  }}
                >
                  <span>Delete</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Multiple Choice Questions:
      </h2>
      <ul>
        {questions?.mcQs?.map((question, index) => (
          <li
            key={index}
            className="mb-8 p-4 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-full">
                <p className="text-lg break-words mb-4">
                  {index + 1}. {question.text}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-5">
                    <input
                      type="radio"
                      id={`optionA_${question.questionId}`}
                      name={`question_${question.questionId}`}
                      value="OptionA"
                      // Handle checked logic
                    />
                    <label
                      htmlFor={`optionA_${question.questionId}`}
                      className="text-lg font-semibold cursor-pointer"
                    >
                      {" "}
                      {question.optionA}
                    </label>
                  </div>
                  <div className="flex items-center gap-5">
                    <input
                      type="radio"
                      id={`optionB_${question.questionId}`}
                      name={`question_${question.questionId}`}
                      value="OptionB"
                      // Handle checked logic
                    />
                    <label
                      htmlFor={`optionB_${question.questionId}`}
                      className="text-lg font-semibold cursor-pointer"
                    >
                      {" "}
                      {question.optionB}
                    </label>
                  </div>
                  <div className="flex items-center gap-5">
                    <input
                      type="radio"
                      id={`optionC_${question.questionId}`}
                      name={`question_${question.questionId}`}
                      value="OptionC"
                      // Handle checked logic
                    />
                    <label
                      htmlFor={`optionC_${question.questionId}`}
                      className="text-lg font-semibold cursor-pointer"
                    >
                      {" "}
                      {question.optionC}
                    </label>
                  </div>
                  <div className="flex items-center gap-5">
                    <input
                      type="radio"
                      id={`optionD_${question.questionId}`}
                      name={`question_${question.questionId}`}
                      value="OptionD"
                      // Handle checked logic
                    />
                    <label
                      htmlFor={`optionD_${question.questionId}`}
                      className="text-lg font-semibold cursor-pointer"
                    >
                      {" "}
                      {question.optionD}
                    </label>
                  </div>
                </div>
                <p className="my-2">
                  Correct Answer:{" "}
                  <span className="font-semibold">
                    {question.correctAnswer}
                  </span>{" "}
                </p>
                <p className="my-2">Degree: {question.degree}</p>
              </div>
              <div className="flex gap-3 items-end">
                <button
                  onClick={() => {
                    setOpenDialogUpdateMCQId(question.questionId);
                    setMCQuestion({
                      examId: examId,
                      text: question.text,
                      degree: question.degree,
                      optionA: question.optionA,
                      optionB: question.optionB,
                      optionC: question.optionC,
                      optionD: question.optionD,
                      correctAnswer: question.correctAnswer,
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                    onClick={() => setOpenDialogDeleteMCQId(question.questionId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* modal for update MCQ question */}
            <Dialog
              open={openDialogUpdateMCQId === question.questionId}
              handler={() => setOpenDialogUpdateMCQId(null)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              className=" bg-white dark:bg-[#282828] text-black dark:text-white"
            >
              <DialogHeader className=" text-black dark:text-white">
                Update Question
              </DialogHeader>
              <DialogBody>
                <div className="mb-4  text-black dark:text-white">
                  <label htmlFor="text" className="block text-lg font-semibold">
                    Question:
                  </label>
                  <input
                    type="text"
                    value={MCQuestion.text}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, text: e.target.value })
                    }
                    className="w-full p-2 border-2"
                  />
                </div>
                <div className="mb-4  text-black dark:text-white">
                  <label
                    htmlFor="degree"
                    className="block text-lg font-semibold"
                  >
                    Degree:
                  </label>
                  <input
                    type="number"
                    id="degree"
                    name="degree"
                    value={MCQuestion.degree || ""}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, degree: e.target.value })
                    }
                    className="w-full p-2 border-gray-300 rounded-md border-2"
                  />
                </div>

                <div className="flex flex-col w-full gap-3">
                  <input
                    type="text"
                    value={MCQuestion.optionA}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, optionA: e.target.value })
                    }
                    className="p-2 text-lg text-black dark:text-white dark:bg-[#282828] border-2"
                  />
                  <input
                    type="text"
                    value={MCQuestion.optionB}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, optionB: e.target.value })
                    }
                    className="p-2 text-lg text-black dark:text-white dark:bg-[#282828] border-2"
                  />
                  <input
                    type="text"
                    value={MCQuestion.optionC}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, optionC: e.target.value })
                    }
                    className="p-2 text-lg text-black dark:text-white dark:bg-[#282828] border-2"
                  />
                  <input
                    type="text"
                    value={MCQuestion.optionD}
                    onChange={(e) =>
                      setMCQuestion({ ...MCQuestion, optionD: e.target.value })
                    }
                    className="p-2 text-lg text-black dark:text-white dark:bg-[#282828] border-2"
                  />
                </div>

                <div>
                  <span>Correct Answer : </span>{" "}
                  <span className="font-bold text-lg">
                    {MCQuestion.correctAnswer}
                  </span>
                </div>

                <div>
                  <label htmlFor="storeSelector">Correct Answer</label>
                  <select
                    id="storeSelector"
                    value={MCQuestion.correctAnswer}
                    onChange={(e) =>
                      setMCQuestion({
                        ...MCQuestion,
                        correctAnswer:
                          e.target.options[e.target.selectedIndex].getAttribute(
                            "data-value"
                          ),
                      })
                    }
                  >
                    <option value="optionA" data-value="optionA">
                    optionA
                    </option>
                    <option value="optionB" data-value="optionB">
                    optionB
                    </option>
                    <option value="optionC" data-value="optionC">
                    optionC
                    </option>
                    <option value="optionD" data-value="optionD">
                    optionD
                    </option>
                  </select>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpenDialogUpdateMCQId(null)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateMCQ(question);
                  }}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>



              {/* modal for delete MCQ question */}

              <Dialog
              open={openDialogDeleteMCQId === question.questionId}
              handler={() => setOpenDialogDeleteId(null)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              className=" bg-white dark:bg-[#282828]"
            >
              <DialogHeader className="text-red-900 text-xl font-bold">
                Delete Question
              </DialogHeader>
              <DialogBody>
                <h2 className="text-red-800 font-semibold text-lg">
                  Are you sure deleting this question ?{" "}
                </h2>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setOpenDialogDeleteMCQId(null)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="red"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteMCQ(question.questionId);
                  }}
                >
                  <span>Delete</span>
                </Button>
              </DialogFooter>
            </Dialog>



          </li>
        ))}
      </ul>





      <div className="flex justify-center items-center my-10">
            <div className="p-8 rounded-lg shadow-md w-full max-w-3xl bg-white dark:bg-[#282828]">
                <div className="flex justify-center mb-4">
                    {/* Create MCQ button */}
                    <button onClick={() =>{ setShowMCQForm(!showMCQForm) ; setShowTFForm(false)}} className="mr-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add MCQ</button>
                    {/* Create TF button */}
                    <button onClick={() => {setShowTFForm(!showTFForm);  setShowMCQForm(false)}} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add True/False</button>
                </div>
                {/* MCQ form */}
                {showMCQForm && (
                    <form onSubmit={handleMCQSubmit} className='mb-10'>
                        <div className="mb-4 ">
                            <label className="block mb-2">Question Text:</label>
                            <input type="text" name="text" value={mcqFormData.text} onChange={handleMCQInputChange} placeholder="Enter question text" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        {/* MCQ options */}
                        <div className="mb-4 justify-center flex flex-wrap">
                            {["A", "B", "C", "D"].map((option, index) => (
                                <input key={index} type="text" name={`option${option}`} value={mcqFormData[`option${option}`]} onChange={handleMCQInputChange} placeholder={`Option ${option}`} required className="mr-2 mb-2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            ))}
                        </div>

                        <div className="mb-4 ">
                            <label className="block mb-2">Degree</label>
                            <input type="text" name="degree" value={mcqFormData.degree} onChange={handleMCQInputChange} placeholder="Enter Degree of question" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        {/* Correct Answer select */}
                        <div className="mb-4">
                            <label className="block mb-2">Correct Answer:</label>
                            <Select
                                options={mcqOptions}
                                value={mcqFormData.correctAnswer}
                                onChange={handleMCQSelectChange}
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit MCQ</button>
                    </form>
                )}

                {/* TF form */}
                {showTFForm && (
                    <form onSubmit={handleTFSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2">Question Text:</label>
                            <input type="text" name="text" value={tfFormData.text} onChange={handleTFInputChange} placeholder="Enter TF question text" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500" />
                        </div>
                        <div className="mb-4 ">
                            <label className="block mb-2">Degree</label>
                            <input type="text" name="degree" value={tfFormData.degree} onChange={handleTFInputChange} placeholder="Enter Degree of question" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500" />
                        </div>
                        {/* TF select */}
                        <div className="mb-4">
                            <label className="block mb-2">Select Correct Answer:</label>
                            <Select
                                options={tfOptions}
                                value={tfFormData.isTrue ? tfOptions[0] : tfOptions[1]}
                                onChange={handleTFSelectChange}
                            />
                        </div>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Submit TF</button>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
}

export default Page;
