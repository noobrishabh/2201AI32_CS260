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

function Form2() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })

    const [data, setData] = useState({
        universityinstitute: '',
        department: '',
        nameofphdsupervisor: '',
        yearofjoining: '',
        dateofsuccessfulthesis: '',
        dateofaward: '',
        titleofphdthesis: '',
        degreecertificateb: '',
        degreecertificatec: '',
        universityinstituteb: '',
        universityinstitutec: '',
        branchstreamb: '',
        branchstreamc: '',
        yearofjoiningb: '',
        yearofjoiningc: '',
        yearofcompletionb: '',
        yearofcompletionc: '',
        durationb: '',
        durationc: '',
        percentageb: '',
        percentagec: '',
        divisionb: '',
        divisionc: '',
        school12: '',
        school10: '',
        yearofpassing12: '',
        yearofpassing10: '',
        percentage12: '',
        percentage10: '',
        division12: '',
        division10: '',
        additionaleducationqualification: [],
    })
    const [username, setUsername] = useState('');
    const [howmany, setHowmany] = useState('');
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();

    // const [rows, setRows] = useState(coldata);
    // console.log(coldata);
    console.log(data.additionaleducationqualification.length);

    const addRow = () => {
        const newRow = { id: data.additionaleducationqualification.length, data: ['', '', '', '', '', '', '', ''] };
        setData({ ...data, additionaleducationqualification: [...data.additionaleducationqualification, newRow] });
    };
    // console.log('Current Rows Data:');
    // console.log(rows); 
    const removeRow = (id) => {
        const updatedRows = data.additionaleducationqualification.filter(row => row.id !== id);
        setData({ ...data, additionaleducationqualification: updatedRows });
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform2")
                    .then(
                        (response) => {
                            console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            console.log(dataFromBackend.form2Data);

                            if (dataFromBackend.form2Data) {
                                const form2data = dataFromBackend.form2Data;
                                setData((prev) => ({ ...prev, universityinstitute: form2data.universityinstitute }));
                                setData((prev) => ({ ...prev, department: form2data.department }));
                                setData((prev) => ({ ...prev, nameofphdsupervisor: form2data.nameofphdsupervisor }));
                                setData((prev) => ({ ...prev, yearofjoining: form2data.yearofjoining }));
                                setData((prev) => ({ ...prev, dateofsuccessfulthesis: form2data.dateofsuccessfulthesis }));
                                setData((prev) => ({ ...prev, dateofaward: form2data.dateofaward }));
                                setData((prev) => ({ ...prev, titleofphdthesis: form2data.titleofphdthesis }));
                                setData((prev) => ({ ...prev, degreecertificateb: form2data.degreecertificateb }));
                                setData((prev) => ({ ...prev, degreecertificatec: form2data.degreecertificatec }));
                                setData((prev) => ({ ...prev, universityinstituteb: form2data.universityinstituteb }));
                                setData((prev) => ({ ...prev, universityinstitutec: form2data.universityinstitutec }));
                                setData((prev) => ({ ...prev, branchstreamb: form2data.branchstreamb }));
                                setData((prev) => ({ ...prev, branchstreamc: form2data.branchstreamc }));
                                setData((prev) => ({ ...prev, yearofjoiningb: form2data.yearofjoiningb }));
                                setData((prev) => ({ ...prev, yearofjoiningc: form2data.yearofjoiningc }));
                                setData((prev) => ({ ...prev, yearofcompletionb: form2data.yearofcompletionb }));
                                setData((prev) => ({ ...prev, yearofcompletionc: form2data.yearofcompletionc }));
                                setData((prev) => ({ ...prev, durationb: form2data.durationb }));
                                setData((prev) => ({ ...prev, percentagec: form2data.percentagec }));
                                setData((prev) => ({ ...prev, durationc: form2data.durationc }));
                                setData((prev) => ({ ...prev, percentageb: form2data.percentageb }));
                                setData((prev) => ({ ...prev, percentagec: form2data.percentagec }));
                                setData((prev) => ({ ...prev, divisionb: form2data.divisionb }));
                                setData((prev) => ({ ...prev, divisionc: form2data.divisionc }));
                                setData((prev) => ({ ...prev, school12: form2data.school12 }));
                                setData((prev) => ({ ...prev, school10: form2data.school10 }));
                                setData((prev) => ({ ...prev, yearofpassing12: form2data.yearofpassing12 }));
                                setData((prev) => ({ ...prev, percentage12: form2data.percentage12 }));
                                setData((prev) => ({ ...prev, yearofpassing10: form2data.yearofpassing10 }));
                                setData((prev) => ({ ...prev, percentage10: form2data.percentage10 }));
                                setData((prev) => ({ ...prev, division12: form2data.division12 }));
                                setData((prev) => ({ ...prev, division10: form2data.division10 }));
                                setData((prev) => ({ ...prev, additionaleducationqualification: form2data.additionaleducationqualification }));
                                setHowmany(form2data.additionaleducationqualification.length)
                                // setRows([...rows, form2data.additionaleducationqualification]);
                                // console.log(typeof form2data.additionaleducationqualification);
                                // console.log(form2data.additionaleducationqualification)
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


    const form2submit = async (e) => {
        e.preventDefault();
        console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform2", data)
                .then(
                    (response) => {navigate('/form3') },
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
                <form onSubmit={form2submit}>
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
                            2. Educational Qualifications
                            </p>
                        </div>
                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                (A) Details of PhD *
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="universityinstitute"><div className=' text-nowrap w-48 font-semibold'>University/Institute</div></label>
                                    <input value={data.universityinstitute} onChange={(e) => setData({ ...data, universityinstitute: e.target.value })} type="text" required placeholder='University/Institute' id="universityinstitute" name="universityinstitute" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="nameofphdsupervisor"><div className=' text-nowrap w-48 font-semibold'>Name of PhD Supervisor</div></label>
                                    <input value={data.nameofphdsupervisor} onChange={(e) => setData({ ...data, nameofphdsupervisor: e.target.value })} type="text" placeholder='Name of PhD Supervisor' id="nameofphdsupervisor" name="nameofphdsupervisor" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dateofsuccessfulthesis"><div className=' w-48 font-semibold'>Date of Successful Thesis Defence</div></label>
                                    <input value={data.dateofsuccessfulthesis} onChange={(e) => setData({ ...data, dateofsuccessfulthesis: e.target.value })} type="date" required placeholder='Date of Defence' id="dateofsuccessfulthesis" name="dateofsuccessfulthesis" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>



                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="department"><div className=' w-48 font-semibold'>Department</div></label>
                                    <input value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} type="text" required placeholder="Department" id="fathername" name="fathername" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="yearofjoining"><div className=' text-nowrap w-48 font-semibold'>Year of Joining</div></label>
                                    <input value={data.yearofjoining} onChange={(e) => setData({ ...data, yearofjoining: e.target.value })} type="text" required placeholder='Year of Joining' id="yearofjoining" name="yearofjoining" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dateofaward"><div className=' w-48 font-semibold'>Date of Award</div></label>
                                    <input value={data.dateofaward} onChange={(e) => setData({ ...data, dateofaward: e.target.value })} type="date" required placeholder='Date of Award' id="dateofaward" name="dateofaward" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                            </div >

                        </div>
                        <div className=' w-full'>
                            <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                <label htmlFor="titleofphdthesis"><div className=' w-48 font-semibold'>
                                    Title of PhD Thesis</div></label>
                                <input value={data.titleofphdthesis} onChange={(e) => setData({ ...data, titleofphdthesis: e.target.value })} type="text" required placeholder="Title of PhD Thesis" id="titleofphdthesis" name="titleofphdthesis" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-wrap justify-between  bg-white  rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                (B) Academic Details - M. Tech./ M.E./ PG Details
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="degreecertificateb"><div className=' text-nowrap w-48 font-semibold'>Degree/Certificate</div></label>
                                    <input value={data.degreecertificateb} onChange={(e) => setData({ ...data, degreecertificateb: e.target.value })} type="text" required placeholder='Degree/Certificate' id="degreecertificateb" name="degreecertificateb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="branchstreamb"><div className=' text-nowrap w-48 font-semibold'>Branch/Stream</div></label>
                                    <input value={data.branchstreamb} onChange={(e) => setData({ ...data, branchstreamb: e.target.value })} type="text" placeholder='Branch/Stream' id="branchstreamb" name="branchstreamb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="yearofcompletionb"><div className=' w-48 font-semibold'>Year of Completion</div></label>
                                    <input value={data.yearofcompletionb} onChange={(e) => setData({ ...data, yearofcompletionb: e.target.value })} type="text" required placeholder='Date of Defence' id="yearofcompletionb" name="yearofcompletionb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="percentageb"><div className=' w-48 font-semibold'>Percentage/ CGPA</div></label>
                                    <input value={data.percentageb} onChange={(e) => setData({ ...data, percentageb: e.target.value })} type="text" required placeholder='Percentage/ CGPA' id="percentageb" name="percentageb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>



                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="universityinstituteb"><div className=' w-48 font-semibold'>University/Institute</div></label>
                                    <input value={data.universityinstituteb} onChange={(e) => setData({ ...data, universityinstituteb: e.target.value })} type="text" required placeholder="University/Institute" id="universityinstituteb" name="universityinstituteb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="yearofjoiningb"><div className=' text-nowrap w-48 font-semibold'>Year of Joining</div></label>
                                    <input value={data.yearofjoiningb} onChange={(e) => setData({ ...data, yearofjoiningb: e.target.value })} type="text" required placeholder='Year of Joining' id="yearofjoiningb" name="yearofjoiningb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="durationb"><div className=' w-48 font-semibold'>Duration (in years)</div></label>
                                    <input value={data.durationb} onChange={(e) => setData({ ...data, durationb: e.target.value })} type="text" required placeholder='Duration (in years)' id="durationb" name="durationb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="divisionb"><div className=' w-48 font-semibold'>Division/Class</div></label>
                                    <input value={data.divisionb} onChange={(e) => setData({ ...data, divisionb: e.target.value })} type="text" required placeholder='Division/Class' id="divisionb" name="divisionb" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                            </div >

                        </div>


                    </div>
                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                (C) Academic Details - B. Tech /B.E. / UG Details *
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="degreecertificatec"><div className=' text-nowrap w-48 font-semibold'>Degree/Certificate</div></label>
                                    <input value={data.degreecertificatec} onChange={(e) => setData({ ...data, degreecertificatec: e.target.value })} type="text" required placeholder='Degree/Certificate' id="degreecertificatec" name="degreecertificatec" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="branchstreamc"><div className=' text-nowrap w-48 font-semibold'>Branch/Stream</div></label>
                                    <input value={data.branchstreamc} onChange={(e) => setData({ ...data, branchstreamc: e.target.value })} type="text" placeholder='Branch/Stream' id="branchstreamc" name="branchstreamc" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="yearofcompletionc"><div className=' w-48 font-semibold'>Year of Completion</div></label>
                                    <input value={data.yearofcompletionc} onChange={(e) => setData({ ...data, yearofcompletionc: e.target.value })} type="text" required placeholder='Date of Defence' id="yearofcompletionc" name="yearofcompletionc" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="percentagec"><div className=' w-48 font-semibold'>Percentage/ CGPA</div></label>
                                    <input value={data.percentagec} onChange={(e) => setData({ ...data, percentagec: e.target.value })} type="text" required placeholder='Percentage/ CGPA' id="percentagec" name="percentagec" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>



                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="universityinstitutec"><div className=' w-48 font-semibold'>University/Institute</div></label>
                                    <input value={data.universityinstitutec} onChange={(e) => setData({ ...data, universityinstitutec: e.target.value })} type="text" required placeholder="University/Institute" id="universityinstitutec" name="universityinstitutec" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="yearofjoiningc"><div className=' text-nowrap w-48 font-semibold'>Year of Joining</div></label>
                                    <input value={data.yearofjoiningc} onChange={(e) => setData({ ...data, yearofjoiningc: e.target.value })} type="text" required placeholder='Year of Joining' id="yearofjoiningc" name="yearofjoiningc" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="durationc"><div className=' w-48 font-semibold'>Duration (in years)</div></label>
                                    <input value={data.durationc} onChange={(e) => setData({ ...data, durationc: e.target.value })} type="text" required placeholder='Duration (in years)' id="durationc" name="durationc" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="divisionc"><div className=' w-48 font-semibold'>Division/Class</div></label>
                                    <input value={data.divisionc} onChange={(e) => setData({ ...data, divisionc: e.target.value })} type="text" required placeholder='Division/Class' id="divisionc" name="divisionc" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                            </div >

                        </div>


                    </div>
                    <div className='flex flex-wrap justify-between   rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                (D) Academic Details - School *
                            </p>
                        </div>
                        <table className='m-auto mt-2 mb-2 w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                    10th/12th/HSC/Diploma
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg font-bold'>
                                    School
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg font-bold'>
                                        Year of
                                        Passing
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Percentage/
                                        Grade
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Division/
                                        Class
                                    </p></div>
                                </th>
                            </tr>

                            <tr>
                                <td className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center   w-full bg-white' >
                                    <input type="text" value={`12th/HSC/Diploma`} readOnly id="" name="" className="inline-block bg-slate-200 border-gray-500 shadow-md  focus:outline-transparent  focus-visible:ring p-1  w-full rounded-sm" />
                                </div></td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input type="text" value={data.school12} onChange={(e) => setData({ ...data, school12: e.target.value })} required placeholder="School" id="school12" name="school12" className="inline-block  shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.yearofpassing12} onChange={(e) => setData({ ...data, yearofpassing12: e.target.value })} type="text" required placeholder='Passing Year' id="yearofpassing12" name="yearofpassing12" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.percentage12} onChange={(e) => setData({ ...data, percentage12: e.target.value })} type="text" required placeholder='Percentage/Grade' id="percentage12" name="percentage12" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.division12} onChange={(e) => setData({ ...data, division12: e.target.value })} type="text" required placeholder='Division/Class' id="division12" name="division12" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center   w-full bg-white' >
                                    <input type="text" value={`10th`} readOnly id="" name="" className="inline-block bg-slate-200 border-gray-500 shadow-md  focus:outline-transparent  focus-visible:ring p-1  w-full rounded-sm" />
                                </div></td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input type="text" value={data.school10} onChange={(e) => setData({ ...data, school10: e.target.value })} required placeholder="School" id="school10" name="school10" className="inline-block  shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.yearofpassing10} onChange={(e) => setData({ ...data, yearofpassing10: e.target.value })} type="text" required placeholder='Passing Year' id="yearofpassing10" name="yearofpassing10" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.percentage10} onChange={(e) => setData({ ...data, percentage10: e.target.value })} type="text" required placeholder='Percentage/Grade' id="percentage10" name="percentage10" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                                <td className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <input value={data.division10} onChange={(e) => setData({ ...data, division10: e.target.value })} type="text" required placeholder='Division/Class' id="division10" name="division10" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                    </div>
                                </td>
                            </tr>









                        </table>
                    </div>
                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (E) Additional Educational Qualification (If any)
                                </p>

                                <div onClick={() => addRow()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add more</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr>
                                <th className='border-2 border-slate-400'><div className='p-3 flex-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                    Degree/
                                    Certificate
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3  flex justify-center items-center w-full bg-white'><p className='text-lg font-bold'>
                                    University/
                                    Institute
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Branch/
                                        Stream
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                        Year of
                                        Joining
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Year of
                                        Completion
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Duration
                                        (in years)
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Percentage/
                                        CGPA
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3  flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                        Division
                                        /Class
                                    </p></div>
                                </th>
                            </tr>

                            {data.additionaleducationqualification.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        {row.data.map((cell, cellIndex) => (

                                            <td className='border-2 border-slate-400' key={cellIndex}>
                                                <div className='p-3  flex-wrap justify-center items-center  w-full bg-white' >
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        placeholder={
                                                            cellIndex === 0 ? 'Degree' :
                                                                cellIndex === 1 ? 'College' :
                                                                    cellIndex === 2 ? 'Subjects' :
                                                                        cellIndex === 3 ? 'Year of join' :
                                                                            cellIndex === 4 ? 'Year of Graduation' :
                                                                                cellIndex === 5 ? 'Duration' :
                                                                                    cellIndex === 6 ? 'Percentage' :
                                                                                        cellIndex === 7 ? 'Rank' : ''
                                                        }
                                                        required
                                                        onChange={(e) => {
                                                            const newData = [...row.data];
                                                            newData[cellIndex] = e.target.value;
                                                            const updatedRows = [...data.additionaleducationqualification];
                                                            updatedRows[index].data = newData;
                                                            setData({ ...data, additionaleducationqualification: updatedRows });
                                                        }}
                                                        className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                    />
                                                </div>
                                                {/* {console.log(index>=data.additionaleducationqualification.length)} */}
                                                {(index >= howmany) ? (cellIndex == 7 ? <div className='pl-28 '><img onClick={() => removeRow(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
                                            </td>
                                        ))}

                                    </tr>





                                </>
                            ))}













                        </table>
                    </div>

                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form1'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form2
