import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'



const getPersons = () => {
    // return axios.get(baseUrl)
    // .then((response) => {
        
    //     console.log(response.data)
    //     return response.data

    // })

    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const  deletePerson = (id) => {
   

    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)

}



export default {
    getPersons, deletePerson 
}