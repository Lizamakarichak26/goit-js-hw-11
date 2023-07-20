import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34953502-8ef38512a94cd04017b22184b';

export async function fetchImage(name, page = 1, limit = 40) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation =horizontal&safesearch =true&page=${page}&per_page=${limit}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}