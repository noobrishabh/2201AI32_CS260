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

function Form6() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })

    const [data, setData] = useState({

        phdthesissupervision: [],
        mastersdegree: [],
        bachelorsdegree: [],
    })
    const [username, setUsername] = useState('');
    const [howmanyp, setHowmanyp] = useState('');
    const [howmanym, setHowmanym] = useState('');
    const [howmanyb, setHowmanyb] = useState('');
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();



    const addRowp = () => {
        const newRow = { id: data.phdthesissupervision.length, data: ['', '', '', '', ''] };
        setData({ ...data, phdthesissupervision: [...data.phdthesissupervision, newRow] });
    };

    const removeRowp = (id) => {
        const updatedRows = data.phdthesissupervision.filter(row => row.id !== id);
        setData({ ...data, phdthesissupervision: updatedRows });
    };
    const addRowm = () => {
        const newRow = { id: data.mastersdegree.length, data: ['', '', '', '', ''] };
        setData({ ...data, mastersdegree: [...data.mastersdegree, newRow] });
    };

    const removeRowm = (id) => {
        const updatedRows = data.mastersdegree.filter(row => row.id !== id);
        setData({ ...data, mastersdegree: updatedRows });
    };
    const addRowb = () => {
        const newRow = { id: data.bachelorsdegree.length, data: ['', '', '', '', '', ''] };
        setData({ ...data, bachelorsdegree: [...data.bachelorsdegree, newRow] });
    };

    const removeRowb = (id) => {
        const updatedRows = data.bachelorsdegree.filter(row => row.id !== id);
        setData({ ...data, bachelorsdegree: updatedRows });
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform6")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            // console.log(dataFromBackend.form6Data);

                            if (dataFromBackend.form6Data) {
                                const form6data = dataFromBackend.form6Data;
                                setData((prev) => ({ ...prev, phdthesissupervision: form6data.phdthesissupervision }));
                                setData((prev) => ({ ...prev, mastersdegree: form6data.mastersdegree }));
                                setData((prev) => ({ ...prev, bachelorsdegree: form6data.bachelorsdegree }));



                                setHowmanyp(form6data.phdthesissupervision.length)
                                setHowmanym(form6data.mastersdegree.length)
                                setHowmanyb(form6data.bachelorsdegree.length)


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


    const form6submit = async (e) => {
        e.preventDefault();
        // console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform6", data)
                .then(
                    (response) => { navigate('/form7') },
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
                <form onSubmit={form6submit}>
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
                            13. Research Supervision:
                        </p>
                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (A) PhD Thesis Supervision
                                </p>

                                <div onClick={() => addRowp()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid border-gray-300 w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                    Name of Student/Research Scholar
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Title of Thesis
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Role
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing/Completed
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing Since/ Year of Completion
                                    </p></div>
                                </th>




                            </tr>

                            {data.phdthesissupervision.map((row, index) => (
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
                                                        const updatedRows = [...data.phdthesissupervision];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, phdthesissupervision: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyp) ? <div className='h-[2.39rem] '></div> : ''}
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
                                                        const updatedRows = [...data.phdthesissupervision];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, phdthesissupervision: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={2}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={2}>
                                                <select key={2} required className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" value={row.data[2]} onChange={(e) => {
                                                    const newData = [...row.data];
                                                    newData[2] = e.target.value;
                                                    const updatedRows = [...data.phdthesissupervision];
                                                    updatedRows[index].data = newData;
                                                    setData({ ...data, phdthesissupervision: updatedRows });
                                                }}>
                                                    <option value="">Select</option>
                                                    <option value="Supervisor with no Co-supervisor">Supervisor with no Co-supervisor</option>
                                                    <option value="Supervisor with Co-supervisor">Supervisor with Co-supervisor</option>
                                                    <option value="Co-supervisor">Co-supervisor</option>
                                                </select>
                                            </div>
                                            {(index >= howmanyp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={3}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white'  key={3}>
                                                <input
                                                key={3}
                                                    type="text"
                                                    value={row.data[3]}
                                                    placeholder="Ongoing/Completed"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[3] = e.target.value;
                                                        const updatedRows = [...data.phdthesissupervision];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, phdthesissupervision: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyp) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={4}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={4}>
                                                <input
                                                key={4}
                                                    type="text"
                                                    value={row.data[4]}
                                                    placeholder="Ongoing Since/ Year of Completion"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[4] = e.target.value;
                                                        const updatedRows = [...data.phdthesissupervision];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, phdthesissupervision: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div>: ''}
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
                                (B). M.Tech/M.E./Master's Degree   
                                </p>

                                <div onClick={() => addRowm()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid border-gray-300 w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                    Name of Student/Research Scholar
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Title of Thesis
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Role
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing/Completed
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing Since/ Year of Completion
                                    </p></div>
                                </th>




                            </tr>

                            {data.mastersdegree.map((row, index) => (
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
                                                    placeholder="Research Scholar"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[0] = e.target.value;
                                                        const updatedRows = [...data.mastersdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, mastersdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanym) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                        <td className='border-2 border-slate-400' key={1}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={1} >
                                                <input
                                                key={1}
                                                    type="text"
                                                    value={row.data[1]}
                                                    placeholder="Title of Thesis"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[1] = e.target.value;
                                                        const updatedRows = [...data.mastersdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, mastersdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanym) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={2}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={2}>
                                                <select key={2} required className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" value={row.data[2]} onChange={(e) => {
                                                    const newData = [...row.data];
                                                    newData[2] = e.target.value;
                                                    const updatedRows = [...data.mastersdegree];
                                                    updatedRows[index].data = newData;
                                                    setData({ ...data, mastersdegree: updatedRows });
                                                }}>
                                                    <option value="">Select</option>
                                                    <option value="Supervisor with no Co-supervisor">Supervisor with no Co-supervisor</option>
                                                    <option value="Supervisor with Co-supervisor">Supervisor with Co-supervisor</option>
                                                    <option value="Co-supervisor">Co-supervisor</option>
                                                </select>
                                            </div>
                                            {(index >= howmanym) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={3}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white'  key={3}>
                                                <input
                                                key={3}
                                                    type="text"
                                                    value={row.data[3]}
                                                    placeholder="Ongoing/Completed"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[3] = e.target.value;
                                                        const updatedRows = [...data.mastersdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, mastersdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanym) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={4}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={4}>
                                                <input
                                                key={4}
                                                    type="text"
                                                    value={row.data[4]}
                                                    placeholder="Ongoing Since/ Year of Completion"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[4] = e.target.value;
                                                        const updatedRows = [...data.mastersdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, mastersdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanym) ? <div className='pl-56 '><img onClick={() => removeRowm(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div>: ''}
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
                                (C) B.Tech/B.E./Bachelor's Degree 
                                </p>

                                <div onClick={() => addRowb()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid border-gray-300 w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                Name of Student
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                    Title of Project
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Role
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing/Completed
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Ongoing Since/ Year of Completion
                                    </p></div>
                                </th>




                            </tr>

                            {data.bachelorsdegree.map((row, index) => (
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
                                                    placeholder="Reseach Scholar"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[0] = e.target.value;
                                                        const updatedRows = [...data.bachelorsdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, bachelorsdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyb) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>

                                        <td className='border-2 border-slate-400' key={1}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={1} >
                                                <input
                                                key={1}
                                                    type="text"
                                                    value={row.data[1]}
                                                    placeholder="Title of Thesis"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[1] = e.target.value;
                                                        const updatedRows = [...data.bachelorsdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, bachelorsdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyb) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={2}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={2}>
                                                <select key={2} required className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" value={row.data[2]} onChange={(e) => {
                                                    const newData = [...row.data];
                                                    newData[2] = e.target.value;
                                                    const updatedRows = [...data.bachelorsdegree];
                                                    updatedRows[index].data = newData;
                                                    setData({ ...data, bachelorsdegree: updatedRows });
                                                }}>
                                                    <option value="">Select</option>
                                                    <option value="Supervisor with no Co-supervisor">Supervisor with no Co-supervisor</option>
                                                    <option value="Supervisor with Co-supervisor">Supervisor with Co-supervisor</option>
                                                    <option value="Co-supervisor">Co-supervisor</option>
                                                </select>
                                            </div>
                                            {(index >= howmanyb) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={3}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white'  key={3}>
                                                <input
                                                key={3}
                                                    type="text"
                                                    value={row.data[3]}
                                                    placeholder="Ongoing/Completed"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[3] = e.target.value;
                                                        const updatedRows = [...data.bachelorsdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, bachelorsdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyb) ? <div className='h-[2.39rem] '></div> : ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>
                                        <td className='border-2 border-slate-400' key={4}>
                                            <div className='p-3  flex-wrap justify-center items-center   w-full bg-white' key={4}>
                                                <input
                                                key={4}
                                                    type="text"
                                                    value={row.data[4]}
                                                    placeholder="Ongoing Since/ Year of Completion"
                                                    required
                                                    onChange={(e) => {
                                                        const newData = [...row.data];
                                                        newData[4] = e.target.value;
                                                        const updatedRows = [...data.bachelorsdegree];
                                                        updatedRows[index].data = newData;
                                                        setData({ ...data, bachelorsdegree: updatedRows });
                                                    }}
                                                    className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                />
                                            </div>
                                            {(index >= howmanyb) ? <div className='pl-56 '><img onClick={() => removeRowb(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div>: ''}
                                            {/* {(index >= howmanyp) ? <div className='pl-56 '><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div> : ''} */}
                                        </td>






                                    </tr>





                                </>
                            ))}
                        </table>
                    </div>




                    









                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form5'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form6
