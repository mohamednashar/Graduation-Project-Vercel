export const  deleteData = async(link , id)=> {
  try {
    const API =process.env.NEXT_PUBLIC_BACKEND_API

    const response = await fetch(`${API}${link}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // You can add more headers if needed
      },
      // You can include a body if required for your API
       body: JSON.stringify({ id: id }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // If the response is successful, you can handle it here
    console.log('Data deleted successfully');
  } catch (error) {
    // Handle errors here
    console.error('There was a problem with the delete request:', error.message);
  }
}
