export const postData = async (link, data) => {
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const response = await fetch(`${API}${link}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response is not OK
    if (!response.ok) {
      // If it's not OK, throw an error with the appropriate message
      throw new Error('Failed to post data');
    }

    // If the response is OK, parse the JSON response
    const responseData = await response.json();
    console.log('Response:', responseData);

    // Return true to indicate success if needed
    return true;
  } catch (error) {
    // Catch any errors that occur during the fetch request
    console.error('Error:', error.message);

    // Re-throw the error for handling elsewhere if needed
    throw error;
  }
};
