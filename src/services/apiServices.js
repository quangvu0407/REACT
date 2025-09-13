import axios from "..//utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image)
    return axios.post('api/v1/participant', data);
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image)
    return axios.put('api/v1/participant', data);
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', {data: {id}});
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (userEmail, userPassword) => {
    return axios.post('api/v1/login', {email: userEmail, password: userPassword, delay: 3000});
}

const postRegister = (userEmail, userName, userPassword) => {
    return axios.post('api/v1/register', {email: userEmail, username: userName, password: userPassword});
}

export { postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate
    ,postLogin, postRegister
 }