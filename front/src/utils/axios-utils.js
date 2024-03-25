import axios from 'axios'

const client = axios.create({baseURL: `${import.meta.env.VITE_API_KEY}/api`})

export const request = ({...options}) => {
  const accessToken = localStorage.getItem("accessToken");
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const onSuccess = response => response
  const onError = error => {
    // like go to loggin page
    return error;
  }
  return client({...options}).then(onSuccess).catch(onError);
}