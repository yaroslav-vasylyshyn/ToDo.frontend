import axios from "axios";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

const agent = axios.create({
    baseURL: 'http://localhost:5276/api'
})

agent.interceptors.response.use(async response => {
    try{
        await sleep(100)
        return response
    }catch(error){
        console.log(error)
        return Promise.reject(error)
    }
})

export default agent;