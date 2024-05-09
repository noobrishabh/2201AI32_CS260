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

function Form5() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })

    const [data, setData] = useState({

        professionalsocieties: [],
        professionaltraining: [],
        awardandrecognition: [],
        sponsoredprojects: [],
        consultancyprojects: [],
    })
    const [username, setUsername] = useState('');
    const [howmanys, setHowmanys] = useState('');
    const [howmanyt, setHowmanyt] = useState('');
    const [howmanyr, setHowmanyr] = useState('');
    const [howmanysp, setHowmanysp] = useState('');
    const [howmanyc, setHowmanyc] = useState('');
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();



    const addRows = () => {
        const newRow = { id: data.professionalsocieties.length, data: ['', ''] };
        setData({ ...data, professionalsocieties: [...data.professionalsocieties, newRow] });
    };

    const removeRows = (id) => {
        const updatedRows = data.professionalsocieties.filter(row => row.id !== id);
        setData({ ...data, professionalsocieties: updatedRows });
    };
    const addRowt = () => {
        const newRow = { id: data.professionaltraining.length, data: ['', '', '', ''] };
        setData({ ...data, professionaltraining: [...data.professionaltraining, newRow] });
    };

    const removeRowt = (id) => {
        const updatedRows = data.professionaltraining.filter(row => row.id !== id);
        setData({ ...data, professionaltraining: updatedRows });
    };
    const addRowr = () => {
        const newRow = { id: data.awardandrecognition.length, data: ['', '', ''] };
        setData({ ...data, awardandrecognition: [...data.awardandrecognition, newRow] });
    };

    const removeRowr = (id) => {
        const updatedRows = data.awardandrecognition.filter(row => row.id !== id);
        setData({ ...data, awardandrecognition: updatedRows });
    };
    const addRowsp = () => {
        const newRow = { id: data.sponsoredprojects.length, data: ['', '', '', '', '', ''] };
        setData({ ...data, sponsoredprojects: [...data.sponsoredprojects, newRow] });
    };

    const removeRowsp = (id) => {
        const updatedRows = data.sponsoredprojects.filter(row => row.id !== id);
        setData({ ...data, sponsoredprojects: updatedRows });
    };
    const addRowc = () => {
        const newRow = { id: data.consultancyprojects.length, data: ['', '', '', '', '', ''] };
        setData({ ...data, consultancyprojects: [...data.consultancyprojects, newRow] });
    };

    const removeRowc = (id) => {
        const updatedRows = data.consultancyprojects.filter(row => row.id !== id);
        setData({ ...data, consultancyprojects: updatedRows });
    };


    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                await instance.post("http://localhost:8000/api/v1/users/isloggedin")
                    .then(
                        (response) => {
                            console.log(response);
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform5")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            // console.log(dataFromBackend.form6Data);

                            if (dataFromBackend.form5Data) {
                                const form5data = dataFromBackend.form5Data;
                                setData((prev) => ({ ...prev, professionalsocieties: form5data.professionalsocieties }));
                                setData((prev) => ({ ...prev, professionaltraining: form5data.professionaltraining }));
                                setData((prev) => ({ ...prev, awardandrecognition: form5data.awardandrecognition }));
                                setData((prev) => ({ ...prev, sponsoredprojects: form5data.sponsoredprojects }));
                                setData((prev) => ({ ...prev, consultancyprojects: form5data.consultancyprojects }));



                                setHowmanys(form5data.professionalsocieties.length)
                                setHowmanyt(form5data.professionaltraining.length)
                                setHowmanyr(form5data.awardandrecognition.length)
                                setHowmanysp(form5data.sponsoredprojects.length)
                                setHowmanyc(form5data.consultancyprojects.length)


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


    const form5submit = async (e) => {
        e.preventDefault();
        // console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform5", data)
                .then(
                    (response) => { navigate('/form6') },
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
                <form onSubmit={form5submit}>
                    <div className='mx-3 flex justify-between'>
                        <p className='text-2xl p-2'>
                            Welcome: <span className='font-bold text-red-500'>{username}</span>
                        </p>
                        <div className='mt-3 flex justify-between gap-4'>
                            <Logout />
                        </div>
                    </div>
                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                        9. Membership of Professional Societies
                        </p>
                    </div>

                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                Fill the Details
                                </p>

                                <div onClick={() => addRows()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 w-full border-slate-400 '><div className='p-3 flex justify-center items-center bg-white' ><p className='md:text-nowrap text-lg font-bold'> S.No.
                                </p></div></th>
                                <th className='w-full border-2 border-slate-400'><div className='p-3 flex justify-center items-center  bg-white'><p className='md:text-nowrap text-lg text-nowrap font-bold'>
                                Name of the Professional Society
                                </p></div></th>
                                <th className='border-2 w-full border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  bg-white'><p className=' md:text-nowrap  text-lg font-bold'>
                                    Membership Status (Lifetime/Annual)
                                    </p></div>
                                </th>
                                
                                
                                

                            </tr>

                            {data.professionalsocieties.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                    <td  className='border-2 w-full border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index+1}
                                            </div>
                                           
                                        </td>
                                        {row.data.map((cell, cellIndex) => (
                                            <>
                                                
                                                <td className='border-2 w-full border-slate-400' key={cellIndex}>
                                                    <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' >
                                                        <input
                                                            type="text"
                                                            value={cell}
                                                            placeholder={
                                                                cellIndex === 0 ? 'Name of the Professional Society' :
                                                                    cellIndex === 1 ? 'Membership Status (Lifetime/Annual)' : ''


                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.professionalsocieties];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, professionalsocieties: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanys) ? (cellIndex == 1 ? <div className='pl-72 '><img onClick={() => removeRows(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>
                                </>
                            ))}
                        </table>
                    </div>


                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                        10. Professional Training
                        </p>
                    </div>

                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                Fill the Details
                                </p>

                                <div onClick={() => addRowt()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className='w-full text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='w-full text-lg font-bold'>
                                Type of Training Received
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className='w-full text-lg font-bold'>
                                    Organisation
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className='w-full text-lg font-bold'>
                                    Year
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className='w-full text-lg font-bold'>
                                    Duration (in years & months)
                                    </p></div>
                                </th>
                                
                                
                                

                            </tr>

                            {data.professionaltraining.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                    <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index+1}
                                            </div>
                                           
                                        </td>
                                        {row.data.map((cell, cellIndex) => (
                                            <>
                                                
                                                <td className='border-2 border-slate-400' key={cellIndex}>
                                                    <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' >
                                                        <input
                                                            type="text"
                                                            value={cell}
                                                            placeholder={
                                                                cellIndex === 0 ? 'Sponsoring Agency' :
                                                                    cellIndex === 1 ? 'Title of Project' : 
                                                                    cellIndex === 2 ? 'Amount of Grant' : 
                                                                    cellIndex === 3 ? 'Amount of Grant' : ''


                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.professionaltraining];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, professionaltraining: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyt) ? (cellIndex == 3 ? <div className='pl-[85%] '><img onClick={() => removeRowt(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>
                                </>
                            ))}
                        </table>
                    </div>


                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                        11. Award(s) and Recognition(s)
                        </p>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                Fill the Details
                                </p>

                                <div onClick={() => addRowr()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg w-full font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg w-full font-bold'>
                                Name of Award
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                    Awarded By
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                    Year
                                    </p></div>
                                </th>
                                
                                
                                
                                

                            </tr>

                            {data.awardandrecognition.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                    <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index+1}
                                            </div>
                                           
                                        </td>
                                        {row.data.map((cell, cellIndex) => (
                                            <>
                                                
                                                <td className='border-2 border-slate-400' key={cellIndex}>
                                                    <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' >
                                                        <input
                                                            type="text"
                                                            value={cell}
                                                            placeholder={
                                                                cellIndex === 0 ? '	Name of Award' :
                                                                    cellIndex === 1 ? 'Awarded By' : 
                                                                    cellIndex === 2 ? '	Year' : ''
                                                                    
                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.awardandrecognition];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, awardandrecognition: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyr) ? (cellIndex == 2 ? <div className='pl-[85%]'><img onClick={() => removeRowr(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>
                                </>
                            ))}
                        </table>
                    </div>
                    


                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                        12. Sponsored Projects/ Consultancy Details
                        </p>
                    </div>


                    

                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                (A) Sponsored Projects   
                                </p>

                                <div onClick={() => addRowsp()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid border-gray-300'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                Sponsoring Agency
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                    Title of Project
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                    Sanctioned Amount (₹)
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Period
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Role
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Status (Completed/On-going)
                                    </p></div>
                                </th>




                            </tr>

                            {data.sponsoredprojects.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem]  flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
                                            </div>

                                        </td>



                                        <td className='border-2 border-slate-400' key={0}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={0}>
                                                <input
                                                key={0}
                                                    type="text"
                                                    value={row.data[0]}
                                                    placeholder="Sponsoring Agency"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[0] = e.target.value;
                                                        const updatedRows = [...data.sponsoredprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, sponsoredprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanysp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                        <td className='border-2 border-slate-400' key={1}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={1} >
                                                <input
                                                key={1}
                                                    type="text"
                                                    value={row.data[1]}
                                                    placeholder="Title of Project"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[1] = e.target.value;
                                                        const updatedRows = [...data.sponsoredprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, sponsoredprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanysp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={2}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={2} >
                                                <input
                                                key={2}
                                                    type="text"
                                                    value={row.data[2]}
                                                    placeholder="Amount of grant"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[2] = e.target.value;
                                                        const updatedRows = [...data.sponsoredprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, sponsoredprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanysp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={3}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={3} >
                                                <input
                                                key={3}
                                                    type="text"
                                                    value={row.data[3]}
                                                    placeholder="Period"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[3] = e.target.value;
                                                        const updatedRows = [...data.sponsoredprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, sponsoredprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanysp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>


                                        <td className='border-2 border-slate-400' key={4}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={4}>
                                                <select key={4} required className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" value={row.data[4]} onChange={(e) => {
                                                    const newData = [...row.data];
                                                    newData[4] = e.target.value;
                                                    const updatedRows = [...data.sponsoredprojects];
                                                    updatedRows[index].data = newData;
                                                    setData({ ...data, sponsoredprojects: updatedRows });
                                                }}>
                                                    <option value="">Select</option>
                                                    <option value="Principal investigator">Principal investigator</option>
                                                    <option value="Co-investigator">Co-investigator</option>
                                                    
                                                </select>
                                            </div>
                                            {(index >= howmanysp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={5}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white'  key={5}>
                                                <input
                                                key={5}
                                                    type="text"
                                                    value={row.data[5]}
                                                    placeholder="Status"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[5] = e.target.value;
                                                        const updatedRows = [...data.sponsoredprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, sponsoredprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanysp) ? <div className='pl-[12.8rem] '><img onClick={() => removeRowsp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div>: ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                    </tr>





                                </>
                            ))}
                        </table>
                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                (B) Consultancy Projects  
                                </p>

                                <div onClick={() => addRowc()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid w-full border-gray-300'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                Organization
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                    Title of Project
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                    Amount of Grant
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Period
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Role
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                    Status
                                    </p></div>
                                </th>




                            </tr>

                            {data.consultancyprojects.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem]  flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
                                            </div>

                                        </td>



                                        <td className='border-2 border-slate-400' key={0}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={0}>
                                                <input
                                                key={0}
                                                    type="text"
                                                    value={row.data[0]}
                                                    placeholder="Sponsoring Agency"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[0] = e.target.value;
                                                        const updatedRows = [...data.consultancyprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, consultancyprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyc) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                        <td className='border-2 border-slate-400' key={1}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={1} >
                                                <input
                                                key={1}
                                                    type="text"
                                                    value={row.data[1]}
                                                    placeholder="Title of Project"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[1] = e.target.value;
                                                        const updatedRows = [...data.consultancyprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, consultancyprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyc) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={2}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={2} >
                                                <input
                                                key={2}
                                                    type="text"
                                                    value={row.data[2]}
                                                    placeholder="Amount of grant"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[2] = e.target.value;
                                                        const updatedRows = [...data.consultancyprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, consultancyprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyc) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={3}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={3} >
                                                <input
                                                key={3}
                                                    type="text"
                                                    value={row.data[3]}
                                                    placeholder="Period"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[3] = e.target.value;
                                                        const updatedRows = [...data.consultancyprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, consultancyprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyc) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>


                                        <td className='border-2 border-slate-400' key={4}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={4}>
                                                <select key={4} required className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" value={row.data[4]} onChange={(e) => {
                                                    const newData = [...row.data];
                                                    newData[4] = e.target.value;
                                                    const updatedRows = [...data.consultancyprojects];
                                                    updatedRows[index].data = newData;
                                                    setData({ ...data, consultancyprojects: updatedRows });
                                                }}>
                                                    <option value="">Select</option>
                                                    <option value="Principal investigator">Principal investigator</option>
                                                    <option value="Co-investigator">Co-investigator</option>
                                                    
                                                </select>
                                            </div>
                                            {(index >= howmanyc) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={5}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white'  key={5}>
                                                <input
                                                key={5}
                                                    type="text"
                                                    value={row.data[5]}
                                                    placeholder="Status"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[5] = e.target.value;
                                                        const updatedRows = [...data.consultancyprojects];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, consultancyprojects: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyc) ? <div className='pl-[9.3rem] '><img onClick={() => removeRowc(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div>: ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                    </tr>





                                </>
                            ))}
                        </table>
                    </div>

                    









                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form4'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form5