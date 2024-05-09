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
// import Logout from '../components/Logout.jsx';

function Login() {
    const navigate=useNavigate();
    const [data, setData] = useState({
        email:'',
        password:''
    })
    
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: {'Access-Control-Allow-Origin': '*'},
        credentials: 'include',
    })
    const loginUser = async (e) => {
        e.preventDefault();
        console.log(e);
        try {
            await instance.post("http://localhost:8000/api/v1/users/login",
                data
            )
            .then(
                (response) => {
                //  console.log(response);
                 navigate('/form1'); 
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
            // console.log('Axios error:');
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
                <h3 class="text-2xl font-semibold mb-4 text-center" ><u>LOGIN HERE</u></h3>
                <form onSubmit={loginUser} >
                    <div className="mb-4 flex items-center ">
                        <img src={mail} className=" w-12 h-[42px] mt-1 p-[1.5px]" alt="mail" />
                        <input type="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required autoFocus placeholder='Your Email' id="email" name="email" className="mt-1 p-2 border w-full rounded-sm" />
                    </div>
                    <div className="mb-4 flex items-center">
                        <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                        <input type="password" required value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} id="password" placeholder='Enter your password' name="password" className="mt-1 p-2 w-full border rounded-sm" />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600">Log In</button>
                        <Link to='/resetpassword'><div className="bg-red-500 text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-red-600">Reset Password</div></Link>
                    </div>
                </form>
                <div className="mt-10 text-center"><strong className="text-green-600">NOT REGISTERED? </strong><Link to='/register'> <button className="bg-blue-500 text-white px-2 py-1 rounded-sm hover:bg-blue-600 hover:underline">SIGN UP</button></Link></div>
            </div>
            </div>
        </div>
    )
}

export default Login
