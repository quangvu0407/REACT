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
    return axios.delete('api/v1/participant', { data: { id } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (userEmail, userPassword) => {
    return axios.post('api/v1/login', { email: userEmail, password: userPassword, delay: 3000 });
}

const postRegister = (userEmail, userName, userPassword) => {
    return axios.post('api/v1/register', { email: userEmail, username: userName, password: userPassword });
}

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description)
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image)
    return axios.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`)
}

const deleteQuiz = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`)
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id)
    data.append('description', description)
    data.append('name', name)
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage)
    return axios.put(`/api/v1/quiz`, data)
}

const postCreacteNewQuestionForQuiz = (quiz_id, description, Image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id)
    data.append('description', description)
    data.append('questionImage', Image)
    return axios.post(`/api/v1/question`, data)
}

const postCreacteNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post(`/api/v1/answer`, {description, correct_answer, question_id})
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post(`/api/v1/quiz-assign-to-user`, {quizId, userId})
}

const getQuizWithQA = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, {...data})
}

const logOut = (email, refresh_token) => {
    return axios.post(`/api/v1/logout`, {
        email, refresh_token
    })
}

const getOverview = () => {
    return axios.get(`/api/v1/overview`)
}

const changeProfile = (username, userImage) => {
    const data = new FormData();
    data.append("username", username)
    data.append("userImage", userImage)
    return axios.post(`/api/v1/profile`, data)
}

const changePassword = (current_password, new_password) => {
    return axios.post(`/api/v1/change-password`, {current_password, new_password})
}

const getHistory = () => {
    return axios.get(`/api/v1/history`)
}

export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUserWithPaginate, 
    postLogin, postRegister, getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz,
    getAllQuizForAdmin, deleteQuiz, putUpdateQuiz, postCreacteNewQuestionForQuiz, postCreacteNewAnswerForQuestion,
    postAssignQuiz, getQuizWithQA, postUpsertQA, logOut, getOverview, changeProfile, changePassword, getHistory
}