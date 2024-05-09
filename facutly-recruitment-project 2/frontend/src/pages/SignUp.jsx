import React, { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header.jsx'
import Blinking from '../components/Blinking.jsx'
import logo from '../assets/logo.png'
import Captcha from '../components/Captcha.jsx'
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })
    // useEffect(() => {
    //     const isLoggedIn = async () => {
    //         try {
    //             await instance.post("http://localhost:8000/api/v1/users/isloggedin")
    //                 .then(
    //                     (response) => {
    //                         console.log(response);
    //                     },
    //                 )
    //                 .catch((error) => {
    //                     navigate('/');
    //                 })
    //         } catch (error) {
    //             navigate('/');
    //         }
    //     };
    //     isLoggedIn();
    // }, []);


    const passAndretype = () => toast.warning("New password and Retype password are not same", { autoClose: 2000 });
    const captchanotValid = () => toast.error("Enter the correct captcha", { autoClose: 2000 });
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        retypepassword: '',
        imagetext: '',
        category: ''
    })
    const [captchaText, setCaptchaText] = useState("");



    function captchaSetting(data) {
        setCaptchaText(String(data));
    }

    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        // console.log(e);

        if (data.password != data.retypepassword) {
            passAndretype();
            return;
        }

        if (data.imagetext != captchaText) {
            captchanotValid();
            return;
        }
        try {
            await axios.post("http://localhost:8000/api/v1/users/register",
                data
            )
                .then(
                    (response) => { navigate('/') },
                    // (error) => { console.log(error) }
                )
                .catch((error) => {
                    const htmlResponse = error.response.data
                    const preContent = String(htmlResponse.match(/<pre>(.*?)<\/pre>/s)[1])
                    const extractedMessage = preContent.split('<br>')[0].trim();
                    console.log('Extracted message:', extractedMessage);
                    toast.error(extractedMessage, { autoClose: 2000 });
                })
        } catch (error) {
            console.log('Axios error:');
            toast.error(String(error), { autoClose: 2000 });
        }
    }

    return (
        <div className='bg-[#d3d3d3] h-screen'>
            <Header />
            <Blinking />
            <ToastContainer />
            <div className='flex flex-wrap justify-between xl:mx-36 bg-white border-2 border-black rounded-lg shadow-xl shadow-blue-300 m-3 xl:p-0'>
                <div className="w-full xl:w-[500px] flex justify-center p-16"><img src={logo} className="h-auto w-[300px] " alt="IITP logo" /></div>
                <div className="bg-white p-8 rounded-lg xl:w-[650px] shadow-md w-full mt-16 xl:mt-0 ">
                    <h3 className="text-2xl font-semibold mb-4 text-center text-green-500" >CREATE YOUR PROFILE</h3>
                    <form onSubmit={registerUser}>
                        <div className="mb-1 flex items-center gap-4">

                            <input type="text" required autoFocus placeholder='First name' id="firstname" name="firstname" className="focus:outline-transparent autofocus focus-visible:ring p-1 border w-full rounded-sm" value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })} />
                            <input type="text" required placeholder='Last name' id="lastname" name="lastname" className=" focus:outline-transparent focus-visible:ring p-1 border w-full rounded-sm" value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })} />
                        </div>
                        <div className="mb-1 flex items-center gap-4">

                            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required id="email" placeholder='Your email' name="emal" className="focus:outline-transparent focus-visible:ring p-1 w-full border rounded-sm" />
                            <select required name='category' className="focus:outline-transparent focus-visible:ring p-1 w-full border rounded-sm" value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })}>
                                <option value="Select Category">Select Category</option>
                                <option value="UR">UR</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="PWD">PWD</option>
                                <option value="EWS">EWS</option>
                            </select>
                        </div>
                        <div className="mb-1 flex items-center gap-4">

                            <input type="password" required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} id="password" placeholder='New password' name="password" className="focus:outline-transparent focus-visible:ring p-1 w-full border rounded-sm" />
                            <input type="password" required id="retypepassword" value={data.retypepassword} onChange={(e) => setData({ ...data, retypepassword: e.target.value })} placeholder='Retype-new password' name="retypepassword" className="focus:outline-transparent focus-visible:ring  p-1 w-full border rounded-sm" />
                        </div>
                        < div className="mb-1 flex items-center gap-4">
                            <div className=' bg-[#043955] w-full border rounded-sm'>
                                <Captcha captcha={captchaSetting} />
                            </div>
                            <input type="text" required id="imagetext" value={data.imagetext} onChange={(e) => setData({ ...data, imagetext: e.target.value })} placeholder='Insert image text' name="imagetext" className="focus:outline-transparent focus-visible:ring p-1 w-full border rounded-sm" />
                        </div>
                        <p className='font-bold text-red-500'>Note:</p>
                        <ul className='list-decimal font-bold'>
                            <li> Applicant should kindly check their email for activation link to access the portal.</li>
                            <li> Please check SPAM folder also, in case activation link is not received in INBOX.</li>
                            <li> Applicant applying for more than one position/ department should use different <span className='text-red-500'>email</span> id for each application.</li>
                        </ul>
                        <div className='flex flex-row justify-between mt-1'>
                            <button type="submit" className="bg-blue-500 text-white px-2 rounded-sm hover:bg-blue-600">Register</button>
                            <div className='flex gap-2 justify-center items-center'><p className='font-bold text-green-500'>If registered </p><Link to='/'>  <div className="bg-green-500 text-white px-2 py-1 rounded-sm hover:bg-green-600 cursor-pointer ">Login Here</div></Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
