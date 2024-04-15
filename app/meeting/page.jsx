import axios from 'axios';


const API = process.env.NEXT_PUBLIC_BACKEND_API ;

export const postAcademicYear = async () => {
  try {
    const response = await axios.get(`${API}Faculty/GetFaculties`);
    console.log(response.data); // Log the response data if needed
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to handle it wherever  this function is called
  }
};

export default async function Page() {
  try {
    await postAcademicYear(); // Call the function to send POST request
    return (
      <div>
        adlfkjalkg
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
