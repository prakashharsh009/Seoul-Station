import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://seoul-backend.herokuapp.com/api'
})

export default instance;