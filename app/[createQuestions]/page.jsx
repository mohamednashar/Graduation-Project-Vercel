"use client"
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';

const CreateQuestions = () => {
    const API = process.env.NEXT_PUBLIC_BACKEND_API;

    const searchParams = useSearchParams();
    const examId = searchParams.get('examId');

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
            const response = await axios.post(`${API}MCQ/CreateMCQ`, formData);
            console.log("MCQ created successfully!", response.data); // Log response data
            // You can add further actions here like showing a success message or redirecting
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
            await axios.post(`${API}TFQ/CreateTFQ`, {
                examId: examId,
                ...tfFormData
            });
            console.log("TF question created successfully!");
            // You can add further actions here like showing a success message or redirecting
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
        <div className="flex justify-center items-center my-10">
            <div className="p-8 rounded-lg shadow-md w-full max-w-3xl bg-white">
                <div className="flex justify-center mb-4">
                    {/* Create MCQ button */}
                    <button onClick={() => setShowMCQForm(true)} className="mr-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create MCQ</button>
                    {/* Create TF button */}
                    <button onClick={() => setShowTFForm(true)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Create True/False</button>
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
    );
};

export default CreateQuestions;
