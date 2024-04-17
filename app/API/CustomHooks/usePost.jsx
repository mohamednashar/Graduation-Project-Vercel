export const postData = async (link , data) => {
  const API =process.env.NEXT_PUBLIC_BACKEND_API
  try {
    const response = await fetch(`${API}${link}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to post data');
    }

    const responseData = await response.json();
    console.log('Response:', responseData);
    return responseData; // Optional: return response data if needed
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
};