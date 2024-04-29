import axios from 'axios';

export const postData = async (link, data) => {
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const response = await axios.post(`${API}${link}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Return the response status
    return response.status;
  } catch (error) {
    // Catch any errors that occur during the fetch request
    console.error('Error:', error.message);

  
  }
};
