const axios = require('axios').default;
const perPage = 40;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
const searchConfig =
  '?key=27144751-892a725032099e3eb90bcbf85&image_type=photo&orientation=horizontal&safesearch=true';
async function getData(query, page = 1) {
  try {
    return await axios.get(`/${searchConfig}&per_page=${perPage}&page=${page}&q=${query}`);
  } catch (error) {
    console.error(error);
  }
}

export { getData, perPage };
