import axios from 'axios';

const appclient = axios.create({
    headers: {
       'Content-Type': 'application/json'
    }
})

const appRequest = (options) => {
    return appclient(options)
    .then(res=>res.data)
    .catch(err=>err)
}


export default appRequest;