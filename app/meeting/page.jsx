import axios from 'axios';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

export const postFaculty = async () => {
  const facultyData = {
    facultyId:100,
    name: "ay",
    studentServiceNumber: "zvcxczxv",
    numOfYears: 6,
    profHeadName: "vxzcvg",
    departements: null // You might need to modify this if there are departments associated with the new faculty
  };

  try {
    const response = await axios.post(`${API}Faculty/CreateFaculty`, facultyData);
    console.log(response.data); // Log the response data if needed
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to handle it wherever this function is called
  }
};

export default async function Page() {
  try {
    await postFaculty(); // Call the function to send POST request with faculty data
    return (
      <div>
        Faculty created successfully!
      </div>
    );
  } catch (error) {
    // Handle error if needed
    console.error("Error:", error);
    return (
      <div>
        Error occurred: {error.message}
      </div>
    );
  }
}
