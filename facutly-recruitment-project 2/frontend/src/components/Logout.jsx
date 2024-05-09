import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Logout() {
    const navigate=useNavigate();
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: {'Access-Control-Allow-Origin': '*'},
        credentials: 'include',
    })
    const handleOnclick = () => {
        try {
            // console.log(document.cookie);
            instance.post("http://localhost:8000/api/v1/users/logout").
            then((res) => navigate('/') )
            .catch((error) => {
                const htmlResponse = error.response.data
                const preContent =String(htmlResponse.match(/<pre>(.*?)<\/pre>/s)[1])
                const extractedMessage = preContent.split('<br>')[0].trim();
                console.log('Extracted message:', extractedMessage);
                toast.error(extractedMessage,{autoClose:2000});
            })
        } catch (error) {
            console.log('Axios error:');
            toast.error(String(error),{autoClose:2000});
        }
    }
  return (
    <div>
      <button onClick={handleOnclick} className="bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600">Logout</button>
    </div>
  )
}

export default Logout
