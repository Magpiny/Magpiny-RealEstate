import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";


export const fetchApi = async (url) => {
    const { data } = await axios.get((url),{
         headers: {
        'x-rapidapi-host': 'bayut.p.rapidapi.com',
        'x-rapidapi-key': '33a8130618msh4c3f5c3bc8d5313p104e2cjsnacfd630be5c6'
  }
    });

    return data;
}
