import React from 'react'
import { useState} from 'react';
import mail from '../assets/mail.png';
import lock from '../assets/lock.png';
import logo from '../assets/logo.png';
import Header from '../components/Header.jsx';
import Blinking from '../components/Blinking.jsx';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate=useNavigate();
    const [data, setData] = useState({
        email:''
    })
    const resetPassword = async (e) => {
        e.preventDefault();
        console.log(e);
        
        try {
            await axios.post("http://localhost:8000/api/v1/users/reset-password",
                data
            )
            .then(
                (response) => {
                 console.log(response);
                 toast.success("We have sent a link to your email to reset the password");
            },
            )
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
        <div className='bg-[#d3d3d3] h-screen'>
            <Header/>
            <Blinking/>
            <ToastContainer/>
            <div   className='flex flex-wrap justify-between  xl:mx-60 bg-white border-2 border-black rounded-lg shadow-xl shadow-blue-300 m-3 xl:p-0'>
                <div className="p-8  w-full xl:w-[500px] flex justify-center"><img src={logo}  className="h-auto w-[300px] " alt="IITP logo" /></div>
                <div class="bg-white p-8 rounded-lg xl:w-[450px] shadow-md w-full mt-16 xl:mt-0 ">
                <h3 class="text-2xl font-semibold mb-4 text-center text-red-500" ><strong>FORGOT PASSWORD</strong></h3>
                <form onSubmit={resetPassword} >
                    <div className="mb-8 flex items-center ">
                        <img src={mail} className=" w-12 h-[42px] mt-1 p-[1.5px]" alt="mail" />
                        <input type="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required autoFocus placeholder='Your Email' id="email" name="email" className="mt-1 p-2 border w-full rounded-sm" />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded-sm hover:bg-red-600">Submit</button>
                        <Link to='/'><div className="bg-green-500 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-green-600">Login Area</div></Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login
