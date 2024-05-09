import React from 'react'
import { useState} from 'react';
import lock from '../assets/lock.png';
import logo from '../assets/logo.png';
import Header from '../components/Header.jsx';
import Blinking from '../components/Blinking.jsx';
import { Link ,useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Changepassword() {
    const [data, setData] = useState({
        oldPassword:'',
        newPassword:'',
        retypenewpassword:''
    })

    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: {'Access-Control-Allow-Origin': '*'},
        credentials: 'include',
    })
    const changePassword = async (e) => {
        e.preventDefault();
        // console.log(e);
        if(data.newPassword != data.retypenewpassword){
            toast.error("Re-entered password did not match the new password",{autoClose:2000});
            return;
        }
        try {
            await instance.post(`http://localhost:8000/api/v1/users/change-password`,data)
            .then(
                (response) => {
                //  console.log(response);
                 toast.success("Password changed successfully",{autoClose:2000})
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
                <h3 class="text-2xl font-semibold mb-4 text-center text-green-500" ><strong>Change current password</strong></h3>
                <form onSubmit={changePassword} >
                    <div className="mb-8 flex items-center ">
                        <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                        <input type="password" required value={data.oldPassword} onChange={(e)=>setData({...data,oldPassword:e.target.value})} id="password" placeholder='Enter old password' name="password" className="mt-1 p-2 w-full border rounded-sm" />
                    </div>
                    <div className="mb-8 flex items-center ">
                        <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                        <input type="password" required value={data.newPassword} onChange={(e)=>setData({...data,newPassword:e.target.value})} id="newpassword" placeholder='Enter new password' name="newpassword" className="mt-1 p-2 w-full border rounded-sm" />
                    </div>
                    <div className="mb-8 flex items-center ">
                        <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                        <input type="password" required value={data.retypenewpassword} onChange={(e)=>setData({...data,retypenewpassword:e.target.value})} id="retypenewpassword" placeholder='Renter new password' name="retypenewpassword" className="mt-1 p-2 w-full border rounded-sm" />
                    </div>

                    <div className='flex flex-row justify-between'>
                        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-sm hover:bg-blue-600">Update</button>
                        <Link to='/form1'><div  className="bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600">Go back</div></Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Changepassword
