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
        internationaljournalpapers: '',
        internationalconferencepapers: '',
        patents: '',
        bookchapters: '',
        nationaljournalpapers: '',
        nationalconferencepapers: '',
        books: '',
        url: '',
        bestpublications: [],
        patenttable: [],
        booktable: [],
        bookchaptertable: [],
    })
    const [username, setUsername] = useState('');
    const [howmanyp, setHowmanyp] = useState('');
    const [howmanyb, setHowmanyb] = useState('');
    const [howmanybp, setHowmanybp] = useState('');
    const [howmanybo, setHowmanybo] = useState('');
    // const [coldata,setColdata]=useState([{ id: 0, data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']},{ id: 1, data: ['1', '2', '3', '4', '5', '6', '7', '8'] } ])
    const navigate = useNavigate();

    

    const addRowp = () => {
        const newRow = { id: data.patenttable.length, data: ['', '', '', '', '', '', ''] };
        setData({ ...data, patenttable: [...data.patenttable, newRow] });
    };

    const removeRowp = (id) => {
        const updatedRows = data.patenttable.filter(row => row.id !== id);
        setData({ ...data, patenttable: updatedRows });
    };
    const addRowb = () => {
        const newRow = { id: data.booktable.length, data: ['', '', '', ''] };
        setData({ ...data, booktable: [...data.booktable, newRow] });
    };

    const removeRowb = (id) => {
        const updatedRows = data.booktable.filter(row => row.id !== id);
        setData({ ...data, booktable: updatedRows });
    };
    const addRowbo = () => {
        const newRow = { id: data.bookchaptertable.length, data: ['', '', '', ''] };
        setData({ ...data, bookchaptertable: [...data.bookchaptertable, newRow] });
    };

    const removeRowbo = (id) => {
        const updatedRows = data.bookchaptertable.filter(row => row.id !== id);
        setData({ ...data, bookchaptertable: updatedRows });
    };
    const addRowbp = () => {
        const newRow = { id: data.bestpublications.length, data: ['', '', '', '','','',''] };
        setData({ ...data, bestpublications: [...data.bestpublications, newRow] });
    };

    const removeRowbp = (id) => {
        const updatedRows = data.bestpublications.filter(row => row.id !== id);
        setData({ ...data, bestpublications: updatedRows });
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingForm4")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setUsername(`${user.firstname} ${user.lastname}`);
                            // console.log(dataFromBackend.Form2Data);

                            if (dataFromBackend.form4Data) {
                                const form4data = dataFromBackend.form4Data;
                                setData((prev) => ({ ...prev, internationaljournalpapers: form4data.internationaljournalpapers }));
                                setData((prev) => ({ ...prev, internationalconferencepapers: form4data.internationalconferencepapers }));
                                setData((prev) => ({ ...prev, patents: form4data.patents }));
                                setData((prev) => ({ ...prev, bookchapters: form4data.bookchapters }));
                                setData((prev) => ({ ...prev, nationaljournalpapers: form4data.nationaljournalpapers }));
                                setData((prev) => ({ ...prev, nationalconferencepapers: form4data.nationalconferencepapers }));
                                setData((prev) => ({ ...prev, books: form4data.books }));
                                setData((prev) => ({ ...prev, url: form4data.url }));
                                setData((prev) => ({ ...prev, bestpublications: form4data.bestpublications }));
                                setData((prev) => ({ ...prev, patenttable: form4data.patenttable }));
                                setData((prev) => ({ ...prev, booktable: form4data.booktable }));
                                setData((prev) => ({ ...prev, bookchaptertable: form4data.bookchaptertable }));

                                setHowmanyp(form4data.patenttable.length)
                                setHowmanyb(form4data.booktable.length)
                                setHowmanybo(form4data.bookchaptertable.length)
                                setHowmanybp(form4data.bookchaptertable.length)
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


    const Form4submit = async (e) => {
        e.preventDefault();
        // console.log(e);

        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingForm4", data)
                .then(
                    (response) => { navigate('/form5') },
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
            <div className=' xl:mx-36  bg-white border-2 border-black rounded-lg shadow-xl shadow-blue-300 m-3 xl:p-0 mb-10'>
                <form onSubmit={Form4submit}>
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
                            5. Summary of Publications *
                        </p>
                    </div>
                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>

                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col  xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="internationaljournalpapers"><div className=' text-nowrap w-23 '>Number of International Journal Papers</div></label>
                                    <input value={data.internationaljournalpapers} maxLength={3} onChange={(e) => setData({ ...data, internationaljournalpapers: e.target.value })} type="text" required id="internationaljournalpapers" name="internationaljournalpapers" className="inline-block shadow-lg  focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="internationalconferencepapers"><div className=' text-nowrap w-23 '>Number of International Conference Papers</div></label>
                                    <input value={data.internationalconferencepapers} maxLength={3} onChange={(e) => setData({ ...data, internationalconferencepapers: e.target.value })} type="text" id="internationalconferencepapers" name="internationalconferencepapers" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="patents"><div className=' w-23 '>Number of Patent(s) [Filed, Published, Granted]</div></label>
                                    <input value={data.patents} maxLength={3} onChange={(e) => setData({ ...data, patents: e.target.value })} type="text" required id="patents" name="patents" className="inline-block  shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="bookchapters"><div className=' w-23 '> Number of Book Chapter(s)</div></label>
                                    <input value={data.bookchapters} maxLength={3} onChange={(e) => setData({ ...data, bookchapters: e.target.value })} type="text" required id="bookchapters" name="bookchapters" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>





                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="nationaljournalpapers"><div className=' text-nowrap w-48 font'>Number of National Journal Papers</div></label>
                                    <input value={data.nationaljournalpapers} maxLength={3} onChange={(e) => setData({ ...data, nationaljournalpapers: e.target.value })} type="text" required id="nationaljournalpapers" name="nationaljournalpapers" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="nationalconferencepapers"><div className=' text-nowrap w-48 font'>Number of National Conference Papers</div></label>
                                    <input value={data.nationalconferencepapers} maxLength={3} onChange={(e) => setData({ ...data, nationalconferencepapers: e.target.value })} type="text" required id="nationalconferencepapers" name="nationalconferencepapers" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="books"><div className=' w-48 font'>Number of Book(s)</div></label>
                                    <input value={data.books} maxLength={3} onChange={(e) => setData({ ...data, books: e.target.value })} type="text" required id="books" name="books" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-10 rounded-sm" />
                                </div>

                            </div >

                        </div>

                    </div>

                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                            6. List of 10 Best Publications (Journal/Conference)
                        </p>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    List of 10 Best Publications (Journal/Conference)
                                </p>

                                <div onClick={() => addRowbp()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg w-full font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg w-full font-bold'>
                                    Author(s)
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Title
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Name of Journal/Conference
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Year, Vol., Page
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Impact Factor
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        DOI
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Status (published/accepted)
                                    </p></div>
                                </th>





                            </tr>

                            {data.bestpublications.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
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
                                                                cellIndex === 0 ? '	Author' :
                                                                    cellIndex === 1 ? 'Title' :
                                                                        cellIndex === 2 ? 'Journal name' :
                                                                            cellIndex === 3 ? 'Year of publication' :
                                                                                cellIndex === 4 ? 'Impact factor' :
                                                                                    cellIndex === 5 ? 'DOI' :

                                                                                        cellIndex === 6 ? 'status(published/accepted)' : ''

                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.bestpublications];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, bestpublications: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanybp) ? (cellIndex == 6 ? <div className='pl-[85%]'><img onClick={() => removeRowbp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
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
                            7. List of Patent(s), Book(s), Book Chapter(s)
                        </p>
                    </div>


                    <div className='flex flex-wrap justify-between rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <div className='mx-3 w-full flex justify-between items-center '>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    (A) Patent(s)
                                </p>

                                <div onClick={() => addRowp()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg w-full font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg w-full font-bold'>
                                    Inventor(s)
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Title of Patent
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Country of Patent
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Patent Number
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Date of Filing
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Date of Published
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Status (Filed/Published/Granted)
                                    </p></div>
                                </th>





                            </tr>

                            {data.patenttable.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
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
                                                                cellIndex === 0 ? '	Inventor(s)' :
                                                                    cellIndex === 1 ? 'Title' :
                                                                        cellIndex === 2 ? 'Country' :
                                                                            cellIndex === 3 ? 'Patent number' :
                                                                                cellIndex === 4 ? 'DD/MM/YYYY' :
                                                                                    cellIndex === 5 ? 'DD/MM/YYYY' :
                                                                                        cellIndex === 6 ? 'status' : ''

                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.patenttable];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, patenttable: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyp) ? (cellIndex == 6 ? <div className='pl-[85%]'><img onClick={() => removeRowp(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
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
                                    (B) Book(s)
                                </p>

                                <div onClick={() => addRowb()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg w-full font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg w-full font-bold'>
                                    Author(s)
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Title of the Book
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Year of Publication
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        ISBN
                                    </p></div>
                                </th>







                            </tr>

                            {data.booktable.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
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
                                                                cellIndex === 0 ? '	Author' :
                                                                    cellIndex === 1 ? 'Title' :
                                                                        cellIndex === 2 ? 'Year' :

                                                                            cellIndex === 3 ? 'ISBN' : ''

                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.booktable];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, booktable: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanyb) ? (cellIndex == 3 ? <div className='pl-[85%]'><img onClick={() => removeRowb(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
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
                                    (C) Book Chapter(s)
                                </p>

                                <div onClick={() => addRowbo()} className="bg-red-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-red-600 cursor-pointer ">Add Details</div>


                            </div>
                        </div>
                        <table className='mt-2 m-auto w-full'>
                            <tr >
                                <th className='border-2 border-slate-400'><div className='p-3 bord-wrap justify-center items-center   w-full bg-white' ><p className=' text-lg w-full font-bold'>

                                    S. No.
                                </p></div></th>
                                <th className='border-2 border-slate-400'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg w-full font-bold'>
                                    Author(s)
                                </p></div></th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                    Title of the Book Chapter(s)
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        Year of Publication
                                    </p></div>
                                </th>
                                <th className='border-2 border-slate-400'>
                                    <div className='p-3 flex justify-center items-center   w-full bg-white'><p className=' text-lg w-full font-bold'>
                                        ISBN
                                    </p></div>
                                </th>







                            </tr>

                            {data.bookchaptertable.map((row, index) => (
                                <>
                                    <tr key={row.id}>
                                        <td className='border-2 border-slate-400'>
                                            <div className='p-[0.95rem] flex-wrap justify-center items-center  text-lg w-full bg-white' >
                                                {index + 1}
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
                                                                cellIndex === 0 ? '	Author' :
                                                                    cellIndex === 1 ? 'Title' :
                                                                        cellIndex === 2 ? 'Year' :

                                                                            cellIndex === 3 ? 'ISBN' : ''

                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                const newData = [...row.data];
                                                                newData[cellIndex] = e.target.value;
                                                                const updatedRows = [...data.bookchaptertable];
                                                                updatedRows[index].data = newData;
                                                                setData({ ...data, bookchaptertable: updatedRows });
                                                            }}
                                                            className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm"

                                                        />
                                                    </div>

                                                    {(index >= howmanybo) ? (cellIndex == 3 ? <div className='pl-[85%]'><img onClick={() => removeRowbo(row.id)} src={remove} className=' h-[1.87rem] m-1 hover:cursor-pointer' alt="" srcset="" /></div> : <div className='h-[2.39rem] '></div>) : ''}
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
                                    URL
                                </p>
                            </div>
                        </div>
                        
                            <div className='flex-col w-full  xl:flex xl:flex-row p-2 m-2 justify-between gap-3 '>
                            <label htmlFor="url"><div className=' text-nowrap w-48 font'>Google Scholar Link</div></label>
                        <input value={data.url}  onChange={(e) => setData({ ...data, url: e.target.value })} type="text" required id="url" name="url" className="inline-block shadow-lg focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                            
                        

                        </div>
                    </div>



                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form3'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white px-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form2