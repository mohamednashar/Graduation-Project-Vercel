import axios from 'axios';

async function getData(link) {
  const API = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const response = await axios.get(`${API}${link}`);
    
    // Check if the response status is not OK
    if (!response.status === 200) {
      throw new Error('Failed to fetch data');
    }

    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export default getData;
