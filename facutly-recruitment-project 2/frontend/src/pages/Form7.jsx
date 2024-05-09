import React, { useState, useEffect } from 'react'
import Blinking from '../components/Blinking.jsx'
import Header from '../components/Header.jsx'
import remove from '../assets/remove.png'
import Logout from '../components/Logout.jsx'
import back from '../assets/back.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Form7() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })

    const [data, setData] = useState({

        significantresearch:'' ,
        significantteaching:'',
        relevantinformation: '',
        professionalservice: '',
        journalpublications: '',
        conferencepublications: '',
    })
    const [username, setUsername] = useState('');
    
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();



    
    

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                await instance.post("http://localhost:8000/api/v1/users/isloggedin")
                    .then(
                        (response) => {
                            // console.log(response);
                        },
                    )
                    .catch((error) => {
                        navigate('/');
                    })
            } catch (error) {
                navigate('/');
            }
        };
        isLoggedIn();
    }, []);


    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform7")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            

                            if (dataFromBackend.form7Data) {
                                const form7data = dataFromBackend.form7Data;
                                setData((prev) => ({ ...prev, significantresearch: form7data.significantresearch }));
                                setData((prev) => ({ ...prev, significantteaching: form7data.significantteaching }));
                                setData((prev) => ({ ...prev, relevantinformation: form7data.relevantinformation }));
                                setData((prev) => ({ ...prev, professionalservice: form7data.professionalservice }));
                                
                                setData((prev) => ({ ...prev, journalpublications: form7data.journalpublications }));
                                setData((prev) => ({ ...prev, conferencepublications: form7data.conferencepublications }));


                            }
                        },
                    )
                    .catch((error) => {
                        const htmlResponse = error.response.data
                        const preContent = String(htmlResponse.match(/<pre>(.*?)<\/pre>/s)[1])
                        const extractedMessage = preContent.split('<br>')[0].trim();
                        // console.log('Extracted message:', extractedMessage);
                        toast.error(extractedMessage, { autoClose: 2000 });
                    })
            } catch (error) {
                // console.log('Axios error:');
                toast.error(String(error), { autoClose: 2000 });
            }
        }
        formdata();
    }, []);


    const form7submit = async (e) => {
        e.preventDefault();
        // console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform7", data)
                .then(
                    (response) => { navigate('/form8') },
                )
                .catch((error) => {
                    const htmlResponse = error.response.data
                    const preContent = String(htmlResponse.match(/<pre>(.*?)<\/pre>/s)[1])
                    const extractedMessage = preContent.split('<br>')[0].trim();
                    // console.log('Extracted message:', extractedMessage);
                    toast.error(extractedMessage, { autoClose: 2000 });
                })
        } catch (error) {
            // console.log('Axios error:');
            toast.error(String(error), { autoClose: 2000 });
        }
    }



    return (
        <div className='bg-[#D3D3D3]'>
            <Header />
            <Blinking />
            <ToastContainer />
            <div className=' xl:mx-36 bg-white border-2 border-black rounded-lg shadow-xl shadow-blue-300 m-3 xl:p-0 mb-10'>
                <form onSubmit={form7submit}>
                    <div className='mx-3 flex justify-between'>
                        <p className='text-2xl p-2'>
                            Welcome: <span className='font-bold text-red-500'>{username}</span>
                        </p>
                        <div className='mt-3 flex justify-between gap-4'>
                            <Logout />
                        </div>
                    </div>
                    
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                14. Significant research contribution and future plans *
                                </p>
                                <p className='text-[#3C766A] text-base font-semibold'>
                                (not more than 500 words)
                                </p>
                            </div>
                            <p className='text-[#3C766A] text-sm font-semibold mx-3'>
                            (Please provide a Research Statement describing your research plans and one or two specific research projects to be conducted at IIT Indore in 2-3 years time frame)
                            </p>
                        </div>
                        
                        <textarea name="significantresearch" required value={data.significantresearch} onChange={(e) => setData({ ...data, significantresearch: e.target.value })}  id="significantresearch" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                15. Significant teaching contribution and future plans *
                                </p>
                                <p className='text-[#3C766A] text-base font-semibold'>
                                (not more than 500 words)
                                </p>
                            </div>
                            <p className='text-[#3C766A] text-sm font-semibold mx-3'>
                            (Please list UG/PG courses that you would like to develop and/or teach at IIT Indore)                            </p>
                        </div>
                        
                        <textarea name="significantteaching" required value={data.significantteaching} onChange={(e) => setData({ ...data, significantteaching: e.target.value })} id="significantteaching" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>



                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                16. Any other relevant information.
                                </p>
                                <p className='text-[#3C766A] text-base font-semibold'>
                                (not more than 500 words)
                                </p>
                            </div>
                            
                        </div>
                        
                        <textarea name="relevantinformation" value={data.relevantinformation} onChange={(e) => setData({ ...data, relevantinformation: e.target.value })} id="relevantinformation" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>



                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                17. Professional Service : Editorship/Reviewership
                                </p>
                                <p className='text-[#3C766A] text-base font-semibold'>
                                (not more than 500 words)
                                </p>
                            </div>
                            
                        </div>
                        
                        <textarea name="professionalservice" value={data.professionalservice} onChange={(e) => setData({ ...data, professionalservice: e.target.value })} id="professionalservice" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                18. Detailed List of Journal Publications
                                </p>
                                
                            </div>
                            <p className='text-[#3C766A] text-lg font-semibold mx-3'>
                            (Including Sr. No., Author's Names, Paper Title, Volume, Issue, Year, Page Nos., Impact Factor (if any), DOI, Status[Published/Accepted] )                            </p>
                        </div>
                        
                        <textarea name="journalpublications" value={data.journalpublications} onChange={(e) => setData({ ...data, journalpublications: e.target.value })} id="journalpublications" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                19. Detailed List of Conference Publications
                                </p>
                                
                            </div>
                            <p className='text-[#3C766A] text-lg font-semibold mx-3'>
                            (Including Sr. No., Author's Names, Paper Title, Name of the conference, Year, Page Nos., DOI [If any] )                            </p>
                        </div>
                        
                        <textarea name="conferencepublications" value={data.conferencepublications} onChange={(e) => setData({ ...data, conferencepublications: e.target.value })} id="conferencepublications" className='h-56 m-3 p-3 border-2 rounded border-slate-400 shadow-lg w-full'></textarea>
                    </div>

                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form6'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form7