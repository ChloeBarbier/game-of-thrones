import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://anapioficeandfire.com/api',
  headers: { 'Content-type': 'application/json' },
});

/*
 * Search for all books
 */
const getBooks = async () => {
  const response = await apiClient.get('books');
  return response.data;
};
/*
 * Search for a book
 */
const getBook = async (id: string | undefined) => {
  const response = await apiClient.get(`books/${id}`);
  return response.data;
};
/*
 * Search for a character
 */
const getCharacter = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

export { getBook, getBooks, getCharacter };
