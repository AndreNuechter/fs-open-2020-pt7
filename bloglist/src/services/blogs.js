import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => axios
    .get(baseUrl)
    .then(response => response.data);
const addOne = (newBlog, token) => axios
    .post(baseUrl, newBlog, { headers: { Authorization: `bearer ${token}` } })
    .then(response => response.data);
const like = id => axios
    .put(`${baseUrl}/${id}`)
    .then(response => response.data);
const deleteBlog = (id, token) => axios
    .delete(`${baseUrl}/${id}`, { headers: { Authorization: `bearer ${token}` } })
    .then(response => response.data);

export default { getAll, addOne, like, deleteBlog };