import axios from 'axios';

// Function to make a DELETE request
export const deleteData = async (url, headers) => {
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
   
    const response = await axios.delete(`${API}${url}`, {
      headers: headers,
    });

    console.log('Delete request successful', response.data);
    return response.status; // Return status code

    // Handle response data or state update as needed
  } catch (error) {
    console.error('Error making delete request', error);
    // Handle error as needed
  }
};
