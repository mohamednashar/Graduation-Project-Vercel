import axios from 'axios';

// Function to make a DELETE request
export const deleteData = async (url, headers, bodyData) => {
  try {
    const API = process.env.NEXT_PUBLIC_BACKEND_API;

    const response = await axios.delete(`${API}${url}`, {
      headers: headers,
      data: bodyData
    });

    console.log('Delete request successful', response.data);
    // Handle response data or state update as needed
  } catch (error) {
    console.error('Error making delete request', error);
    // Handle error as needed
  }
};
