import axios from 'axios'

const baseURL = '/api/persons'

const getAll =() => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deleteEntry = id => {
    const request = axios.delete(`${baseURL}/${String(id)}`)
    return request.then(repsonse => console.log(`deleted id ${id}`))
}

export default {getAll, create, deleteEntry}