import axios from 'axios';

export const updateData = async (link, data , id = null) => {
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

   // Construct the headers object
   const headers = {
    'Content-Type': 'application/json'
  };

  // Add the id to the headers if it's not null
  if (id !== null) {
    headers['id'] = id;
  }

  try {
    const response = await axios.put(`${API}${link}`, data, {
      headers: headers
    });

    // Return the response status
    return response.status;
  } catch (error) {
    // Catch any errors that occur during the fetch request
    console.error('Error:', error.message);

  
  }
};
