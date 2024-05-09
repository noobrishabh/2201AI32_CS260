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

function Form3() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })

    const [data, setData] = useState({
        position: '',
        organization: '',
        status: '',
        dateofjoining: '',
        dateofleaving: '',
        duration: '',
        areasofspecialization: '',
        currentareaofresearch: '',
        experience: '',
        employmenthistory: [],
        teachingexperience: [],
        researchexperience: [],
        industrialexperience: [],
    })
    const [username, setUsername] = useState('');
    const [howmanye, setHowmanye] = useState('');
    const [howmanyt, setHowmanyt] = useState('');
    const [howmanyr, setHowmanyr] = useState('');
    const [howmanyi, setHowmanyi] = useState('');
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();



    const addRowe = () => {
        const newRow = { id: data.employmenthistory.length, data: ['', '', '', '', ''] };
        setData({ ...data, employmenthistory: [...data.employmenthistory, newRow] });
    };

    const removeRowe = (id) => {
        const updatedRows = data.employmenthistory.filter(row => row.id !== id);
        setData({ ...data, employmenthistory: updatedRows });
    };
    const addRowt = () => {
        const newRow = { id: data.teachingexperience.length, data: ['', '', '', '', '', '', '', ''] };
        setData({ ...data, teachingexperience: [...data.teachingexperience, newRow] });
    };

    const removeRowt = (id) => {
        const updatedRows = data.teachingexperience.filter(row => row.id !== id);
        setData({ ...data, teachingexperience: updatedRows });
    };
    const addRowr = () => {
        const newRow = { id: data.researchexperience.length, data: ['', '', '', '', '', ''] };
        setData({ ...data, researchexperience: [...data.researchexperience, newRow] });
    };

    const removeRowr = (id) => {
        const updatedRows = data.researchexperience.filter(row => row.id !== id);
        setData({ ...data, researchexperience: updatedRows });
    };
    const addRowi = () => {
        const newRow = { id: data.industrialexperience.length, data: ['', '', '', '', ''] };
        setData({ ...data, industrialexperience: [...data.industrialexperience, newRow] });
    };

    const removeRowi = (id) => {
        const updatedRows = data.industrialexperience.filter(row => row.id !== id);
        setData({ ...data, industrialexperience: updatedRows });
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform3")
                    .then(
                        (response) => {
                            console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            console.log(dataFromBackend.form3Data);

                            if (dataFromBackend.form3Data) {
                                const form3data = dataFromBackend.form3Data;
                                setData((prev) => ({ ...prev, position: form3data.position }));
                                setData((prev) => ({ ...prev, organization: form3data.organization }));
                                setData((prev) => ({ ...prev, status: form3data.status }));
                                setData((prev) => ({ ...prev, dateofjoining: form3data.dateofjoining }));
                                setData((prev) => ({ ...prev, dateofleaving: form3data.dateofleaving }));
                                setData((prev) => ({ ...prev, duration: form3data.duration }));
                                setData((prev) => ({ ...prev, areasofspecialization: form3data.areasofspecialization }));
                                setData((prev) => ({ ...prev, currentareaofresearch: form3data.currentareaofresearch }));
                                setData((prev) => ({ ...prev, experience: form3data.experience }));
                                setData((prev) => ({ ...prev, employmenthistory: form3data.employmenthistory }));
                                setData((prev) => ({ ...prev, teachingexperience: form3data.teachingexperience }));
                                setData((prev) => ({ ...prev, researchexperience: form3data.researchexperience }));
                                setData((prev) => ({ ...prev, industrialexperience: form3data.industrialexperience }));


                                setHowmanye(form3data.employmenthistory.length)
                                setHowmanyt(form3data.teachingexperience.length)
                                setHowmanyr(form3data.researchexperience.length)
                                setHowmanyi(form3data.industrialexperience.length)


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


    const form3submit = async (e) => {
        e.preventDefault();
        console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform3", data)
                .then(
                    (response) => { navigate('/form4') },
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
                <form onSubmit={form3submit}>
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
                            3. Employment Details
                            </p>
                        </div>
                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                            (A) Present Employment
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="position"><div className=' text-nowrap w-48 font-semibold'>Position</div></label>
                                    <input value={data.position} onChange={(e) => setData({ ...data, position: e.target.value })} type="text" required placeholder='Position' id="position" name="position" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="status"><div className=' w-48 font-semibold'>Status</div></label>

                                    <select required name='status' className="focus:outline-transparent focus-visible:ring p-1 w-full border rounded-sm" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}>
                                        <option value="">Select</option>
                                        <option value="Central Govt.">Central Govt.</option>
                                        <option value="State Government">State Government</option>
                                        <option value="Quasi Govt.">Quasi Govt.</option>
                                        <option value="Private">Private</option>
                                        <option value="Other">Other</option>
                                        <option value="EWS">EWS</option>
                                    </select>
                                </div>


                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dateofleaving"><div className=' w-48 font-semibold'>Date of Leaving
(Mention Continue if working)</div></label>
                                    <input value={data.dateofleaving} onChange={(e) => setData({ ...data, dateofleaving: e.target.value })} type="text" required placeholder='Date of Leaving' id="dateofleaving" name="dateofleaving" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>



                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="organization"><div className=' w-48 font-semibold'>Organization/Institution</div></label>
                                    <input value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} type="text" required placeholder="Organization/Institution" id="organization" name="organization" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>


                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dateofjoining"><div className=' w-48 font-semibold'>Date of Joining</div></label>
                                    <input value={data.dateofjoining} onChange={(e) => setData({ ...data, dateofjoining: e.target.value })} type="text" required placeholder='Date of Joining' id="dateofjoining" name="dateofjoining" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="duration"><div className=' w-48 font-semibold'>Duration (in years & months)</div></label>
                                    <input value={data.duration} onChange={(e) => setData({ ...data, duration: e.target.value })} type="text" required placeholder='Duration' id="duration" name="duration" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                            </div >

                        </div>


                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (B) Employment History (After PhD, Starting with Latest)
                                </p>

                                <div onClick={() => addRowe()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3  flex-wrap justify-center items-center  w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'> <div className='p-3  flex justify-center items-center  w-full bg-white'><p className='text-lg font-bold'>
                                    Position
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Organization/Institution
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Date of Joining
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Leaving
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Duration (in years & months)
                                    </p></div>
                                </th>

                            </tr>

                            {data.employmenthistory.map((row, index) => (
                                <>
                                    <tr  key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem]  flex-wrap justify-center items-center text-lg w-full bg-white' >
                                                {index+1}
                                            </div>
                                            
                                        </td>
                                        {row.data.map((cell, cellIndex) => (


                                            <td key={cellIndex} className='border-2 border-slate-400'>
                                                <div className='p-3 flex-wrap justify-center items-center   w-full bg-white' >
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        placeholder={
                                                            cellIndex === 0 ? 'Position' :
                                                                cellIndex === 1 ? 'Organization/Institution' :
                                                                    cellIndex === 2 ? 'DD/MM/YYYY' :
                                                                        cellIndex === 3 ? 'DD/MM/YYYY' :
                                                                            cellIndex === 4 ? 'Duration' : ''

                                                        }
                                                        required
                                                        onChange={(e) => {
                                                            const newData = [...row.data];
                                                            newData[cellIndex] = e.target.value;
                                                            const updatedRows = [...data.employmenthistory];
                                                            updatedRows[index].data = newData;
                                                            setData({ ...data, employmenthistory: updatedRows });
                                                        }}
                                                        className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                    />
                                                </div>

                                                {(index >= howmanye) ? (cellIndex == 4 ? <div className='pl-56 '><img onClick={() => removeRowe(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                            </td>

                                        ))}
                                    </tr>





                                </>
                            ))}
                        </table>


                        <div className='mx-3 w-full flex items-center border-2 rounded-md bg-slate-200 mt-3 mb-2 p-2'>
                            <p className='text-red-500 text-base font-semibold'>
                            Experience : Minimum 10 years’ experience of which at least 4 years should be at the level of Associate Professor in IITs, IISc Bangalore, IIMs, NITIE Mumbai and IISERs.
                            </p>
                        </div>

                        <div className='mx-3 w-full flex items-center mb-2'>
                            <label>
                                <input
                                    type="radio"
                                    name="answer"
                                    value="yes"
                                    checked={data.experience === 'yes'}
                                    onChange={(e) => setData({ ...data, experience: e.target.value })}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="answer"
                                    value="no"
                                    checked={data.experience === 'no'}
                                    onChange={(e) => setData({ ...data, experience: e.target.value })}
                                />
                                No
                            </label>
                        </div>


                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (C) Teaching Experience (After PhD)
                                </p>

                                <div onClick={() => addRowt()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg font-bold'>
                                    Position
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Employer
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Course Taught
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        UG/PG
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        No. of Students
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Joining the Institute
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Leaving the Institute
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Duration (in years & months)
                                    </p></div>
                                </th>

                            </tr>

                            {data.teachingexperience.map((row, index) => (
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
                                                                cellIndex === 0 ? 'Position' :
                                                                    cellIndex === 1 ? 'Employer' :
                                                                        cellIndex === 2 ? 'Courses' :
                                                                            cellIndex === 3 ? 'UG/PG' :
                                                                                cellIndex === 4 ? 'No. of Students' :
                                                                                    cellIndex === 5 ? 'DD/MM/YYYY' :
                                                                                        cellIndex === 6 ? 'DD/MM/YYYY' :
                                                                                            cellIndex === 7 ? 'Duration' : ''


                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.teachingexperience];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, teachingexperience: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyt) ? (cellIndex == 7 ? <div className='pl-36 '><img onClick={() => removeRowt(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>
                                </>
                            ))}
                        </table>
                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (D) Research Experience (Post PhD, including Post Doctoral)
                                </p>

                                <div onClick={() => addRowr()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p ></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center w-full bg-white'><p className='text-lg font-bold'>
                                    Position
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Institute
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white' ><p className=' text-lg font-bold'>
                                        Supervisor
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Joining
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Leaving
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center w-full bg-white'><p className=' text-lg font-bold'>
                                        Duration (in years & months)
                                    </p></div>
                                </th>



                            </tr>

                            {data.researchexperience.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                    <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem]  flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index+1}
                                            </div>
                                           
                                        </td>
                                        {row.data.map((cell, cellIndex) => (
                                            <>
                                                
                                                <td className='border-2 border-slate-400' key={cellIndex}>
                                                    <div className='p-3  flex-wrap justify-center items-center  w-full bg-white' >
                                                        <input
                                                            type="text"
                                                            value={cell}
                                                            placeholder={
                                                                cellIndex === 0 ? 'Position' :
                                                                    cellIndex === 1 ? 'Institute' :
                                                                        cellIndex === 2 ? 'Supervisor' :
                                                                            cellIndex === 3 ? 'UG/PG' :
                                                                                cellIndex === 4 ? 'DD/MM/YYYY' :
                                                                                    cellIndex === 5 ? 'Duration' : ''
                                                                                        


                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.researchexperience];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, researchexperience: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyr) ? (cellIndex == 5 ? <div className='pl-48 '><img onClick={() => removeRowr(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>





                                </>
                            ))}
                        </table>
                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (E) Industrial Experience
                                </p>

                                <div onClick={() => addRowi()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto border border-solid border-gray-300 w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center border-slate-400 w-full bg-white'><p className='text-lg font-bold'>
                                    Organization
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Work Profile
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Date of Joining
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Date of Leaving
                                    </p></div>
                                </th >
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Duration (in years & months)
                                    </p></div>
                                </th>




                            </tr>

                            {data.industrialexperience.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                    <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem]  flex-wrap justify-center items-center  text-lg w-full bg-white' >
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
                                                                cellIndex === 0 ? 'Organization' :
                                                                    cellIndex === 1 ? 'Work Profile' :
                                                                        cellIndex === 2 ? 'DD/MM/YYYY' :
                                                                            cellIndex === 3 ? 'DD/MM/YYYY' :
                                                                                cellIndex === 4 ? 'Duration' : ''



                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.industrialexperience];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, industrialexperience: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyi) ? (cellIndex == 4 ? <div className='pl-56 '><img onClick={() => removeRowi(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                                </td>
                                            </>
                                        ))}

                                    </tr>





                                </>
                            ))}
                        </table>
                    </div>




                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                            <p className='text-[#6739BB] text-lg font-bold'>
                                4. Area(s) of Specialization and Current Area(s) of Research
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full  m-3 shadow-xl'>
                                <div className='font-bold'>
                                    Areas of specialization
                                </div>
                                <textarea  value={data.areasofspecialization} onChange={(e) => setData({ ...data, areasofspecialization: e.target.value })} name="areasofspecialization" id="areasofspecialization" rows="7" className='w-full  border-gray-600 border-2 rounded-lg p-2'></textarea>


                            </div >

                            <div className=' w-full m-3 shadow-xl'>
                                <div className='font-bold'>
                                Current Area of research
                                </div>
                                <textarea value={data.currentareaofresearch} onChange={(e) => setData({ ...data, currentareaofresearch: e.target.value })} name="currentareaofresearch" id="currentareaofresearch" rows="7" className='w-full border-gray-600 border-2 rounded-lg p-2'></textarea>

                            </div >

                        </div>


                    </div>






                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form2'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form3
