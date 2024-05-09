import React, { useState, useEffect } from 'react'
import Blinking from '../components/Blinking.jsx'
import Header from '../components/Header.jsx'
import Logout from '../components/Logout.jsx'
import back from '../assets/back.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Form8() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })
    const navigate = useNavigate();
    const [data, setData] = useState({
        researchpapers: '',
        phdcertificate: '',
        pgdocument: '',
        ugdocument: '',
        twelvedocument: '',
        tendocument: '',
        payslip: '',
        undertaking: '',
        phdexperience: '',
        anyotherdocument: '',
        signature: '',
        name1: '',
        name2: '',
        name3: '',
        position1: '',
        position2: '',
        position3: '',
        association1: '',
        association2: '',
        association3: '',
        institution1: '',
        institution2: '',
        institution3: '',
        email1: '',
        email2: '',
        email3: '',
        contact1: '',
        contact2: '',
        contact3: '',
    })
    // const [updatedid,setUpdatedid]=useState(false);
    // const [updatedimage,setUpdatedimage]=useState(false);
    const [viewresearchpapers, setViewresearchpapers] = useState('');
    const [viewphdcertificate, setViewphdcertificate] = useState('');
    const [viewpgdocument, setViewpgdocument] = useState('');
    const [viewugdocument, setViewugdocument] = useState('');
    const [viewtwelvedocument, setViewtwelvedocument] = useState('');
    const [viewtendocument, setViewtendocument] = useState('');
    const [viewpayslip, setViewpayslip] = useState('');
    const [viewundertaking, setViewundertaking] = useState('');
    const [viewphdexperience, setViewphdexperience] = useState('');
    const [viewanyotherdocument, setViewanyotherdocument] = useState('');
    const [signatureurl, setSignatureurl] = useState('');
    const [username, setUsername] = useState('');



    const showResearchpapers = () => {
        if (!viewresearchpapers) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewresearchpapers, '_blank');
        }
    }
    const showPhdcertificate = () => {
        if (!viewphdcertificate) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewphdcertificate, '_blank');
        }
    }
    const showPgdocument = () => {
        if (!viewpgdocument) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewpgdocument, '_blank');
        }
    }
    const showUgdocument = () => {
        if (!viewugdocument) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewugdocument, '_blank');
        }
    }
    const showTwelvedocument = () => {
        if (!viewtwelvedocument) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewtwelvedocument, '_blank');
        }
    }
    const showTendocument = () => {
        if (!viewtendocument) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewtendocument, '_blank');
        }
    }
    const showPayslip = () => {
        if (!viewpayslip) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewpayslip, '_blank');
        }
    }
    const showundertaking = () => {
        if (!viewundertaking) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewundertaking, '_blank');
        }
    }
    const showPhdexperience = () => {
        if (!viewphdexperience) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewphdexperience, '_blank');
        }
    }
    const showAnyotherdocument = () => {
        if (!viewanyotherdocument) {
            toast.warning("No files are uploaded");
        }
        else {
            window.open(viewanyotherdocument, '_blank');
        }
    }


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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform8")
                    .then(
                        (response) => {
                            // console.log(response.data.data.form1Data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;


                            setUsername(`${user.firstname} ${user.lastname}`);

                            if (dataFromBackend.form8Data) {
                                // setUpdatedid(true);
                                // setUpdatedimage(true);
                                const formdata = dataFromBackend.form8Data;
                                setViewresearchpapers(formdata.researchpapers);
                                setViewphdcertificate(formdata.phdcertificate);
                                setViewpgdocument(formdata.pgdocument);
                                setViewugdocument(formdata.ugdocument);
                                setViewtwelvedocument(formdata.twelvedocument);
                                setViewtendocument(formdata.tendocument);
                                setViewpayslip(formdata.payslip);
                                setViewundertaking(formdata.undertaking);
                                setViewphdexperience(formdata.phdexperience);
                                setViewanyotherdocument(formdata.anyotherdocument);
                                setSignatureurl(formdata.signature);

                                setData((prev) => ({ ...prev, name1: formdata.name1 }));
                                setData((prev) => ({ ...prev, name2: formdata.name2 }));
                                setData((prev) => ({ ...prev, name3: formdata.name3 }));
                                setData((prev) => ({ ...prev, contact1: formdata.contact1 }));
                                setData((prev) => ({ ...prev, contact2: formdata.contact2 }));
                                setData((prev) => ({ ...prev, contact3: formdata.contact3 }));
                                setData((prev) => ({ ...prev, position1: formdata.position1 }));
                                setData((prev) => ({ ...prev, position2: formdata.position2 }));
                                setData((prev) => ({ ...prev, position3: formdata.position3 }));
                                setData((prev) => ({ ...prev, association1: formdata.association1 }));
                                setData((prev) => ({ ...prev, association2: formdata.association2 }));
                                setData((prev) => ({ ...prev, association3: formdata.association3 }));
                                setData((prev) => ({ ...prev, email1: formdata.email1 }));
                                setData((prev) => ({ ...prev, email2: formdata.email2 }));
                                setData((prev) => ({ ...prev, email3: formdata.email3 }));
                                setData((prev) => ({ ...prev, institution1: formdata.institution1 }));
                                setData((prev) => ({ ...prev, institution2: formdata.institution2 }));
                                setData((prev) => ({ ...prev, institution3: formdata.institution3 }));

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


    const form8submit = async (e) => {
        e.preventDefault();
        // console.log(e);
        const formData = new FormData()
        formData.append("researchpapers", data.researchpapers);
        formData.append("phdcertificate", data.phdcertificate);
        formData.append("pgdocument", data.pgdocument);
        formData.append("ugdocument", data.ugdocument);
        formData.append("twelvedocument", data.twelvedocument);
        formData.append("tendocument", data.tendocument);
        formData.append("payslip", data.payslip);
        formData.append("undertaking", data.undertaking);
        formData.append("phdexperience", data.phdexperience);
        formData.append("anyotherdocument", data.anyotherdocument);
        formData.append("signature", data.signature);
        formData.append("email1", data.email1);
        formData.append("email2", data.email2);
        formData.append("email3", data.email3);
        formData.append("contact1", data.contact1);
        formData.append("contact2", data.contact2);
        formData.append("contact3", data.contact3);
        formData.append("institution1", data.institution1);
        formData.append("institution2", data.institution2);
        formData.append("institution3", data.institution3);
        formData.append("position1", data.position1);
        formData.append("position2", data.position2);
        formData.append("position3", data.position3);
        formData.append("name1", data.name1);
        formData.append("name2", data.name2);
        formData.append("name3", data.name3);
        formData.append("association1", data.association1);
        formData.append("association2", data.association2);
        formData.append("association3", data.association3);
        console.log(formData.get("researchpapers"));
        console.log(formData.get("phdcertificate"));
        console.log(formData.get("pgdocument"));
        console.log(formData.get("ugdocument"));
        console.log(formData.get("twelvedocument"));
        console.log(formData.get("tendocument"));
        console.log(formData.get("payslip"));
        console.log(formData.get("undertaking"));
        console.log(formData.get("phdexperience"));
        console.log(formData.get("anyotherdocument"));
        console.log(formData.get("signature"));
        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform8", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(
                    (response) => { navigate('/finaldeclaration') },
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
                <form onSubmit={form8submit}>

                    <div className='mx-3 flex justify-between'>
                        <p className='text-2xl p-2'>
                            Welcome: <span className='font-bold text-red-500'>{username}</span>
                        </p>
                        <div className='mt-3 flex justify-between gap-4'>
                            <Link to='/change-password'><div className="bg-blue-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer ">Change password</div></Link>
                            <Logout />
                        </div>
                    </div>

                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                            20. Reprints of 5 Best Research Papers *
                        </p>
                    </div>

                    <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#51768F] text-lg font-semibold'>
                                Upload 5 Best Research Papers in a single PDF &lt; 6MB
                            </p>
                            <div>
                                <div onClick={showResearchpapers} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                            </div>
                        </div>

                        <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                            <div className='text-lg font-bold text-green-600 w-full'>
                                Update 5 best papers
                            </div>
                            <div className='w-full'>
                                <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, researchpapers: e.target.files[0] }))} type="file" id="researchpapers" name="researchpapers" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                            </div>
                        </div>

                    </div>

                    <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                        <p className='text-[#6739BB] text-lg font-bold'>
                            21. Check List of the documents attached with the online application *
                        </p>
                    </div>


                    <div className='flex flex-wrap justify-between  bg-white rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                Check List of the documents attached with the online application (Documents should be uploaded in PDF format only):
                            </p>
                            <p className='text-red-500 text-sm font-semibold'>
                                Uploaded PDF files will not be displayed as part of the printed form.
                            </p>
                        </div>


                        <div className='xl:flex justify-evenly gap-3 xl:flex-row w-full p-3'>

                            <div className='  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 m-2'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md xl:gap-52 shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        PHD Certificate
                                    </p>
                                    <div>
                                        <div onClick={showPhdcertificate} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div className='text-lg font-bold text-green-600 w-full p-2'>
                                        Update PHD Certificate
                                    </div>
                                    <div className='w-full p-2'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, phdcertificate: e.target.files[0] }))} type="file" id="phdcertificate" name="phdcertificate" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>

                            <div className=' bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 m-2 '>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        PG Documents
                                    </p>
                                    <div>
                                        <div onClick={showPgdocument} className="bg-blue-500 text-white cursor-pointer p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <div className='text-lg font-bold text-green-600 w-full p-2'>
                                        Update All semester/year-Marksheets and degree certificate
                                    </div>
                                    <div className='w-full p-2'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, pgdocument: e.target.files[0] }))} type="file" id="pgdocument" name="pgdocument" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>



                        </div>


                        <div className='xl:flex-row xl:flex w-full gap-3 justify-evenly p-3'>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        UG Documents
                                    </p>
                                    <div>
                                        <div onClick={showUgdocument} className="bg-blue-500 text-white cursor-pointer p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Update All semester/year-Marksheets and degree certificate
                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, ugdocument: e.target.files[0] }))} type="file" id="ugdocument" name="ugdocument" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        12th/HSC/Diploma Documents
                                    </p>
                                    <div>
                                        <div onClick={showTwelvedocument} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Update 12th/HSC/Diploma/Marksheet(s) and passing certificate
                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, twelvedocument: e.target.files[0] }))} type="file" id="twelvedocument" name="twelvedocument" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>



                        </div>


                        <div className='xl:flex-row xl:flex w-full gap-3 justify-evenly p-3'>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        10th/SSC Documents
                                    </p>
                                    <div>
                                        <div  onClick={showTendocument} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Update 1oth/SSC Marksheet(s) and passing certificate
                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, tendocument: e.target.files[0] }))} type="file" id="tendocument" name="tendocument" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        Pay Slip
                                    </p>
                                    <div>
                                        <div onClick={showPayslip} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Update Pay Slip
                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, payslip: e.target.files[0] }))} type="file" id="payslip" name="payslip" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>



                        </div>


                        <div className='xl:flex-row xl:flex w-full gap-3 justify-evenly p-3'>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        NOC or Undertaking
                                    </p>
                                    <div>
                                        <div onClick={showundertaking} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Undertaking-in case, NOC is not available at the time of application but will be provided at the time of interview
                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, undertaking: e.target.files[0] }))} type="file" id="undertaking" name="undertaking" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        Post phd Experience Certificate/All Experience Certificates/ Last Pay slip/
                                    </p>
                                    <div>
                                        <div onClick={showPhdexperience} className="bg-blue-500 cursor-pointer text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-green-600 w-full'>
                                        Update Certificate


                                    </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, phdexperience: e.target.files[0] }))} type="file" id="phdexperience" name="phdexperience" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>



                        </div>

                        <div className='xl:flex-row xl:flex w-full gap-3 justify-evenly p-3'>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>
                                        Upload any other relevant document in a single PDF (For example award certificate, experience certificate etc) . If there are multiple documents, combine all the documents in a single PDF) &lt; 1MB.
                                    </p>
                                    <div>
                                        <div onClick={showAnyotherdocument} className="bg-blue-500 cursor-pointer  text-white p-2 rounded-sm hover:bg-blue-600">View Uploaded File</div>
                                    </div>
                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='text-lg font-bold text-red-600 w-full'>
                                        Upload any other document                                </div>
                                    <div className='w-full'>
                                        <input accept="application/pdf" onChange={e => setData((prev) => ({ ...prev, anyotherdocument: e.target.files[0] }))} type="file" id="anyotherdocument" name="anyotherdocument" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                                <div className=' bg-[#D9EDF7] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                    <p className='text-[#51768F] text-lg font-semibold'>

                                        Upload your Signature in JPG only
                                    </p>

                                </div>

                                <div className='flex flex-wrap w-full justify-between gap-4 p-4'>
                                    <div className='h-28 w-28  shadow-md shadow-blue-500 rounded-md m-5 '><img src={signatureurl} alt="uploaded signature" className='h-28 w-28' /></div>

                                    <div className='w-full'>
                                        <input accept="image/jpeg" onChange={e => setData((prev) => ({ ...prev, signature: e.target.files[0] }))} type="file" id="signature" name="signature" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>

                            </div>



                        </div>

                        <div className=' w-full rounded-md p-3 flex flex-wrap  shadow-md  justify-center items-center mb-2'>
                            <p className='text-[#6739BB] text-lg font-bold'>
                                22. Referees *
                            </p>
                        </div>

                        <div className='flex flex-wrap justify-between   rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                            <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                                <p className='text-[#3C766A] text-lg font-semibold'>
                                    Fill the Details

                                </p>
                            </div>
                            <table className='m-auto mt-2 mb-2 w-full'>
                                <tr>
                                    <th className='border-2 border-slate-400 bg-white'><div className='p-3  flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>

                                        Name
                                    </p></div></th>
                                    <th className='border-2 border-slate-400 bg-white'><div className='p-3 flex justify-center items-center  w-full bg-white'><p className='text-lg font-bold'>
                                        Position
                                    </p></div></th>

                                    <th className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' ><p className=' text-lg font-bold'>
                                            Association with Referee
                                        </p></div>
                                    </th>
                                    <th className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                            Institution/Organization
                                        </p></div>
                                    </th>
                                    <th className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                            E-mail
                                        </p></div>
                                    </th>
                                    <th className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center  w-full bg-white'><p className=' text-lg font-bold'>
                                            Contact No.
                                        </p></div>
                                    </th>
                                </tr>

                                <tr>

                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input type="text" value={data.name1} onChange={(e) => setData({ ...data, name1: e.target.value })} required placeholder="Name" id="name1" name="name1" className="inline-block  shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.position1} onChange={(e) => setData({ ...data, position1: e.target.value })} type="text" required placeholder='Position' id="position1" name="position1" className="inline-block  focus:outline-transparent shadow-md focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <select required name='association1' className="focus:outline-transparent focus-visible:ring shadow-md p-1 w-full border rounded-sm" value={data.association1} onChange={(e) => setData({ ...data, association1: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="Thesis Supervisor">Thesis Supervisor</option>
                                                <option value="Postdoc Supervisor">Postdoc Supervisor</option>
                                                <option value="Reserarch Collaborator">Reserarch Collaborator</option>
                                                <option value="Other">Other</option>
                                                
                                            </select>                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.institution1} onChange={(e) => setData({ ...data, institution1: e.target.value })} type="text" required placeholder='Institution/Organization' id="institution1" name="institution1" className="inline-block shadow-md  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.email1} onChange={(e) => setData({ ...data, email1: e.target.value })} type="text" required placeholder='Email' id="email1" name="email1" className="inline-block shadow-md  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.contact1} onChange={(e) => setData({ ...data, contact1: e.target.value })} type="text" required placeholder='Contact No.' id="contact1" name="contact1" className="inline-block shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input type="text" value={data.name2} onChange={(e) => setData({ ...data, name2: e.target.value })} required placeholder="Name" id="name2" name="name2" className="inline-block  shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.position2} onChange={(e) => setData({ ...data, position2: e.target.value })} type="text" required placeholder='Position' id="position2" name="position2" className="inline-block shadow-md  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <select required name='association2' className="focus:outline-transparent focus-visible:ring shadow-md p-1 w-full border rounded-sm" value={data.association2} onChange={(e) => setData({ ...data, association2: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="Thesis Supervisor">Thesis Supervisor</option>
                                                <option value="Postdoc Supervisor">Postdoc Supervisor</option>
                                                <option value="Reserarch Collaborator">Reserarch Collaborator</option>
                                                <option value="Other">Other</option>
                                                
                                            </select>                                           </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.institution2} onChange={(e) => setData({ ...data, institution2: e.target.value })} type="text" required placeholder='Institution/Organization' id="institution2" name="institution2" className="inline-block  focus:outline-transparent shadow-md focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.email2} onChange={(e) => setData({ ...data, email2: e.target.value })} type="text" required placeholder='Email' id="email2" name="email2" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border shadow-md w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.contact2} onChange={(e) => setData({ ...data, contact2: e.target.value })} type="text" required placeholder='Contact No.' id="contact2" name="contact2" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 shadow-md border w-full rounded-sm" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>

                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input type="text" value={data.name3} onChange={(e) => setData({ ...data, name3: e.target.value })} required placeholder="Name" id="name3" name="name3" className="inline-block  shadow-md focus:outline-transparent  focus-visible:ring p-1 border  w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.position3} onChange={(e) => setData({ ...data, position3: e.target.value })} type="text" required placeholder='Position' id="position3" name="position3" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 shadow-md border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                        <select required name='association3' className="focus:outline-transparent shadow-md focus-visible:ring p-1 w-full border rounded-sm" value={data.association3} onChange={(e) => setData({ ...data, association3: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="Thesis Supervisor">Thesis Supervisor</option>
                                                <option value="Postdoc Supervisor">Postdoc Supervisor</option>
                                                <option value="Reserarch Collaborator">Reserarch Collaborator</option>
                                                <option value="Other">Other</option>
                                                
                                            </select>                                           </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.institution3} onChange={(e) => setData({ ...data, institution3: e.target.value })} type="text" required placeholder='Institution/Organization' id="institution3" name="institution3" className="inline-block  focus:outline-transparent shadow-md focus-visible:ring p-1 border w-full rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.email3} onChange={(e) => setData({ ...data, email3: e.target.value })} type="text" required placeholder='Email' id="email3" name="email3" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full shadow-md rounded-sm" />
                                        </div>
                                    </td>
                                    <td className='border-2 border-slate-400 bg-white'>
                                        <div className='p-3 flex justify-center items-center   w-full bg-white' >
                                            <input value={data.contact3} onChange={(e) => setData({ ...data, contact3: e.target.value })} type="text" required placeholder='Contact' id="contact3" name="contact3" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full shadow-md rounded-sm" />
                                        </div>
                                    </td>
                                </tr>









                            </table>
                        </div>






                    </div>

                    <div className='h-20 p-5 mt-4 flex justify-between'>
                        <Link to='/form7'><div className="bg-[#007BEA]  text-white tx-sm text-nowrap pr-2 pl-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer "><img src={back} height={30} width={30} alt="" /></div></Link>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form8
