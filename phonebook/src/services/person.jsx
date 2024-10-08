import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then (response => response.data)
}

const getPersons = () => {
  

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const  deletePerson = (id) => {
   

    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)

}


const updatePerson = (id, updatedPerson) => {

    const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
    return request.then(response => response.data)

}





export default {
    getPersons, deletePerson, updatePerson, createPerson
}