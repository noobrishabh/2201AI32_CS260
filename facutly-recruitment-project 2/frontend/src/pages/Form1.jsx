import React, { useState, useEffect } from 'react'
import Blinking from '../components/Blinking.jsx'
import Header from '../components/Header.jsx'
import Logout from '../components/Logout.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Form1() {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })
    const navigate=useNavigate();
    const [data, setData] = useState({
        advertisementnumber: '',
        applicationnumber: '',
        department: '',
        dateofapplication: '',
        post: '',
        firstname: '',
        lastname: '',
        dob: '',
        maritalstatus: '',
        idproof: '',
        fathername: '',
        middlename: '',
        nationality: '',
        gender: '',
        category: '',
        updateidproof: '',
        updateimage: '',
        Street: '',
        City: '',
        State: '',
        Country: '',
        pinzip: '',
        Street2: '',
        City2: '',
        State2: '',
        Country2: '',
        pinzip2: '',
        mobile: '',
        altmobile: '',
        landlinenumber: '',
        email: '',
        alternateemail: '',
    })
    const [updatedid,setUpdatedid]=useState(false);
    const [updatedimage,setUpdatedimage]=useState(false);
    const [viewuploadedfile,setViewuploadedfile] =useState('');
    const [imageurl, setmImageurl]=useState('');
    const [username, setUsername] = useState('');
    function formatDate(timestamp) {
        const createdTime = String(timestamp);
        const dateObj = new Date(createdTime);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; 
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    const showImage=()=>{
        if(!viewuploadedfile){
            toast.warning("No files are uploaded");
        }
        else{
            window.open(viewuploadedfile, '_blank');
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
                await instance.get("http://localhost:8000/api/v1/forms/gettingform1")
                    .then(
                        (response) => {
                            // console.log(response.data.data.form1Data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;
                            setData((prev)=>({...prev,applicationnumber:String(user.applicationId)}));
                            setData((prev)=>({...prev,email:user.email}));
                            setData((prev)=>({...prev,category:user.category}));
                            setData((prev)=>({...prev,email:user.email}));
                            setData((prev)=>({...prev,email:user.email}));
                            const formattedDate=formatDate(user.createdAt);
                            setData((prev)=>({...prev,dateofapplication:formattedDate}));
                            setUsername(`${user.firstname} ${user.lastname}`);
                            if(dataFromBackend.form1Data){
                                setUpdatedid(true);
                                setUpdatedimage(true);
                                const formdata=dataFromBackend.form1Data;
                                setViewuploadedfile(formdata.updateidproof);
                                setmImageurl(formdata.updateimage);
                                setData((prev)=>({...prev,advertisementnumber:formdata.advertisementnumber}));
                                setData((prev)=>({...prev,department:formdata.department}));
                                setData((prev)=>({...prev,post:formdata.post}));
                                setData((prev)=>({...prev,firstname:formdata.firstname}));
                                setData((prev)=>({...prev,lastname:formdata.lastname}));
                                setData((prev)=>({...prev,dob:formdata.dob}));
                                setData((prev)=>({...prev,maritalstatus:formdata.maritalstatus}));
                                setData((prev)=>({...prev,idproof:formdata.idproof}));
                                setData((prev)=>({...prev,fathername:formdata.fathername}));
                                setData((prev)=>({...prev,middlename:formdata.middlename}));
                                setData((prev)=>({...prev,nationality:formdata.nationality}));
                                setData((prev)=>({...prev,gender:formdata.gender}));
                                setData((prev)=>({...prev,Street:formdata.Street}));
                                setData((prev)=>({...prev,City:formdata.City}));
                                setData((prev)=>({...prev,State:formdata.State}));
                                setData((prev)=>({...prev,Country:formdata.Country}));
                                setData((prev)=>({...prev,pinzip:formdata.pinzip}));
                                setData((prev)=>({...prev,Street2:formdata.Street2}));
                                setData((prev)=>({...prev,City2:formdata.City2}));
                                setData((prev)=>({...prev,State2:formdata.State2}));
                                setData((prev)=>({...prev,Country2:formdata.Country2}));
                                setData((prev)=>({...prev,pinzip2:formdata.pinzip2}));
                                setData((prev)=>({...prev,mobile:formdata.mobile}));
                                setData((prev)=>({...prev,altmobile:formdata.altmobile}));
                                setData((prev)=>({...prev,landlinenumber:formdata.landlinenumber}));
                                setData((prev)=>({...prev,alternateemail:formdata.alternateemail}));
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
    const form1submit = async (e) => {
        e.preventDefault();
        // console.log(e);
        const formData = new FormData()
        formData.append("advertisementnumber", data.advertisementnumber);
        formData.append("applicationnumber", data.applicationnumber);
        formData.append("department", data.department);
        formData.append("dateofapplication", data.dateofapplication);
        formData.append("post", data.post);
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("dob", data.dob);
        formData.append("maritalstatus", data.maritalstatus);
        formData.append("idproof", data.idproof);
        formData.append("fathername", data.fathername);
        formData.append("middlename", data.middlename);
        formData.append("nationality", data.nationality);
        formData.append("gender", data.gender);
        formData.append("category", data.category);
        formData.append("updateidproof", data.updateidproof);
        formData.append("updateimage", data.updateimage);
        formData.append("Street", data.Street);
        formData.append("City", data.City);
        formData.append("State", data.State);
        formData.append("Country", data.Country);
        formData.append("pinzip", data.pinzip);
        formData.append("mobile", data.mobile);
        formData.append("altmobile", data.altmobile);
        formData.append("landlinenumber", data.landlinenumber);
        formData.append("email", data.email);
        formData.append("alternateemail", data.alternateemail);
        formData.append("Street2", data.Street2);
        formData.append("City2", data.City2);
        formData.append("State2", data.State2);
        formData.append("Country2", data.Country2);
        formData.append("pinzip2", data.pinzip2);
        console.log(data.City)
        console.log(formData.get("email"));
        try {
            await instance.post("http://localhost:8000/api/v1/forms/submittingform1", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(
                    (response) => {navigate('/form2') },
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
                <form onSubmit={form1submit}>
                    <div >
                        <div className='mx-3 flex justify-between'>
                            <p className='text-2xl p-2'>
                                Welcome: <span className='font-bold text-red-500'>{username}</span>
                            </p>
                            <div className='mt-3 flex justify-between gap-4'>
                                <Link to='/change-password'><div className="bg-blue-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-blue-600 cursor-pointer ">Change password</div></Link>
                                <Logout />
                            </div>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full'>
                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="advertisementnumber"><div className=' text-nowrap w-48 font-semibold'>Advertisement Number *</div></label>
                                    <select value={data.advertisementnumber} onChange={(e) => setData({ ...data, advertisementnumber: e.target.value })} autoFocus required id='advertisementnumber' name='advertisementnumber' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="IITP/FACEREC-CSE/2023/JULY/02">IITP/FACEREC-CSE/2023/JULY/02</option>
                                    </select>
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="applicationnumber"><div className=' text-nowrap w-48 font-semibold'>Application Number</div></label>
                                    <input value={data.applicationnumber} readOnly type="text" placeholder='Application no.' id="applicationnumber" name="applicationnumber" className="inline-block  focus:outline-transparent bg-slate-200 border-gray-500 shadow-md focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="department"><div className=' text-nowrap w-48 font-semibold'>Department/School *</div></label>
                                    <select value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })} required id='department' name='department' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="Computer Science And Engineering">Computer Science And Engineering</option>
                                    </select>
                                </div>


                            </div >
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dateofapplication"><div className=' text-nowrap w-48 font-semibold'>Date of Application</div></label>
                                    <input value={data.dateofapplication} readOnly type="text"  placeholder='DD/MM/YYYY' id="dateofapplication" name="dateofapplication" className="inline-block bg-slate-200 border-gray-500 shadow-md focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="post"><div className=' text-nowrap w-48 font-semibold'>Post Applied for *</div></label>
                                    <select value={data.post} onChange={(e) => setData({ ...data, post: e.target.value })} required name='post' id='post' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Associate Professor">Associate Professor</option>
                                        <option value="Assistant Professor Grade I">Assistant Professor Grade I</option>
                                        <option value="Assistant Professor Grade II">Assistant Professor Grade II</option>
                                    </select>
                                </div>
                            </div >
                        </div>
                        <div class="border-[0.05rem] border-blue-950 border-dashed mt-4 mx-3"></div>
                    </div>
                    <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className=' bg-[#DFF0D8] w-full rounded-md p-3 flex flex-wrap justify-between shadow-md shadow-green-900'>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                1. Personal Details:
                            </p>
                            <p className='text-[#3C766A] text-lg font-semibold'>
                                Upload/Update Photo *
                            </p>
                        </div>
                        <div className='flex-col xl:flex xl:flex-row w-full '>
                            <div className=' w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="firstname"><div className=' text-nowrap w-48 font-semibold'>First Name *</div></label>
                                    <input value={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })} type="text" required placeholder='First name' id="firstname" name="firstname" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="middlename"><div className=' text-nowrap w-48 font-semibold'>Middle Name</div></label>
                                    <input value={data.middlename} onChange={(e) => setData({ ...data, middlename: e.target.value })} type="text" placeholder='Middle Name' id="middlename" name="middlename" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="lastname"><div className=' text-nowrap w-48 font-semibold'>Last Name *</div></label>
                                    <input value={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })} type="text" required placeholder='Last name' id="lastname" name="lastname" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="dob"><div className=' w-48 font-semibold'>Date of Birth DD/MM/YYYY *</div></label>
                                    <input value={data.dob} pattern="\d{2}/\d{2}/\d{4}" title="Enter a date in the format dd/mm/yyyy" onChange={(e) => setData({ ...data, dob: e.target.value })} type="text" required placeholder='DD/MM/YYYY' id="dob" name="dob" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="maritalstatus"><div className=' text-nowrap w-48 font-semibold'>Marital Status *</div></label>
                                    <select value={data.maritalstatus} onChange={(e) => setData({ ...data, maritalstatus: e.target.value })} required name='maritalstatus' id='maritalstatus' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="idproof"><div className=' text-nowrap w-48 font-semibold'>ID Proof *</div></label>
                                    <select value={data.idproof} onChange={(e) => setData({ ...data, idproof: e.target.value })} required name='idproof' id='idproof' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="AADHAR">AADHAR</option>
                                        <option value="PAN-CARD">PAN-CARD</option>
                                        <option value="DRIVING-LICENSE">DRIVING-LICENSE</option>
                                        <option value="VOTER ID">VOTER ID</option>
                                        <option value="PASSPORT">PASSPORT</option>
                                        <option value="RATION CARD">RATION CARD</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </div>

                            </div >

                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="fathername"><div className=' w-48 font-semibold'>Father's Name *</div></label>
                                    <input value={data.fathername} onChange={(e) => setData({ ...data, fathername: e.target.value })} type="text" required placeholder="Father's Name" id="fathername" name="fathername" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>


                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="nationality"><div className=' text-nowrap w-48 font-semibold'>Nationality *</div></label>
                                    <select value={data.nationality} onChange={(e) => setData({ ...data, nationality: e.target.value })} required name='nationality' id='nationality' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="Indian">Indian</option>
                                        <option value="OCI">OCI</option>

                                    </select>
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="gender"><div className=' text-nowrap w-48 font-semibold'>Gender *</div></label>
                                    <select value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} required name='gender' id='gender' className="focus:outline-transparent inline-block focus-visible:ring p-1 w-full border rounded-sm" >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="category"><div className=' text-nowrap w-48 font-semibold'>Category</div></label>
                                    <input value={data.category} readOnly type="text" required placeholder='Category' id="category" name="category" className="inline-block  focus:outline-transparent bg-slate-200 border-gray-500 shadow-md focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between'>
                                    <div className=' text-nowrap w-48 font-semibold'>Update ID Proof</div>
                                    <div className='flex flex-row justify-between'>
                                        <div className="bg-green-500 text-white tx-sm text-nowrap px-1 py-1 rounded-sm hover:bg-green-600 cursor-pointer " onClick={showImage}>View uploaded file</div>
                                        <input onChange={e => setData((prev)=>({ ...prev, updateidproof: e.target.files[0] }))} type="file"  id="updateidproof" name="updateidproof" accept="image/*" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-1/2 rounded-sm" />
                                    </div>
                                </div>
                            </div >
                            <div className=' w-full xl:w-60 '>
                                <div className='h-48 w-48  shadow-md shadow-blue-500 rounded-md m-5 '><img src={imageurl} alt="uploaded image" className='h-48 w-48' /></div>
                                <input type="file" onChange={e => setData((prev)=>({ ...prev, updateimage: e.target.files[0] }))}  id="updateimage" name="updateimage" accept="image/*" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 w-60 border rounded-sm" />
                            </div >
                        </div>

                    </div>

                    <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className='flex-col xl:flex xl:flex-row w-full justify-between gap-4 mx-4'>
                            <div className=' w-full'>
                                <div className=' text-nowrap w-48 font-semibold h-10 mt-2'>Correspondence Address</div>
                                <textarea value={data.Street} onChange={(e) => setData({ ...data, Street: e.target.value })} required placeholder='Street' id="Street" name="Street" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.City} onChange={(e) => setData({ ...data, City: e.target.value })} required placeholder='City' id="City" name="City" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.State} onChange={(e) => setData({ ...data, State: e.target.value })} required placeholder='State' id="State" name="State" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.Country} onChange={(e) => setData({ ...data, Country: e.target.value })} required placeholder='Country' id="Country" name="Country" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.pinzip} onChange={(e) => setData({ ...data, pinzip: e.target.value })} required placeholder='PIN/ZIP' id="pinzip" name="pinzip" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                            </div >
                            <div className=' w-full'>
                                <div className=' text-nowrap w-48 font-semibold h-10 mt-2'>Permanent Address</div>
                                <textarea value={data.Street2} onChange={(e) => setData({ ...data, Street2: e.target.value })} required placeholder='Street' id="Street2" name="Street2" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.City2} onChange={(e) => setData({ ...data, City2: e.target.value })} required placeholder='City' id="City2" name="City2" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.State2} onChange={(e) => setData({ ...data, State2: e.target.value })} required placeholder='State' id="State2" name="State2" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.Country2} onChange={(e) => setData({ ...data, Country2: e.target.value })} required placeholder='Country' id="Country2" name="Country2" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                                <textarea value={data.pinzip2} onChange={(e) => setData({ ...data, pinzip2: e.target.value })} required placeholder='PIN/ZIP' id="pinzip2" name="pinzip2" rows="1" className="mb-4 inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" ></textarea>
                            </div >
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between  bg-white border-2 border-black rounded-lg shadow-xl hover:shadow-blue-300 xl:p-0 m-3 mt-6'>
                        <div className='flex-col xl:flex xl:flex-row w-full justify-between gap-4 mx-4'>
                            <div className='w-full'>

                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="mobile"><div className=' text-nowrap w-48 font-semibold'>Mobile *</div></label>
                                    <input value={data.mobile} title="Please enter 10 digit number"  pattern="[0-9]{10}" onChange={(e) => setData({ ...data, mobile: e.target.value })} type="text" required placeholder='mobile' id="mobile" name="mobile" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="altmobile"><div className=' text-nowrap w-48 font-semibold'>Alternate Mobile</div></label>
                                    <input value={data.altmobile} title="Please enter 10 digit number" pattern="[0-9]{10}" onChange={(e) => setData({ ...data, altmobile: e.target.value })} type="text" placeholder='Alternate Mobile' id="altmobile" name="altmobile" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="landlinenumber"><div className=' text-nowrap w-48 font-semibold'>Landline Number</div></label>
                                    <input value={data.landlinenumber} title="Landline number with area code and remaining 8 digits (0-9)" pattern="[0-9]{3}[0-9]{4}[0-9]{4}" onChange={(e) => setData({ ...data, landlinenumber: e.target.value })} type="text" placeholder='Landline Number' id="landlinenumber" name="landlinenumber" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                            </div >
                            <div className=' w-full'>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="email"><div className=' text-nowrap w-48 font-semibold'>Email</div></label>
                                    <input value={data.email} readOnly type="email" required placeholder='Email' id="email" name="email" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full bg-slate-200 border-gray-500 shadow-md rounded-sm" />
                                </div>
                                <div className='flex-col xl:flex xl:flex-row p-2 m-2 justify-between gap-3'>
                                    <label htmlFor="alternateemail"><div className=' text-nowrap w-48 font-semibold'>Alternate Email</div></label>
                                    <input value={data.alternateemail} onChange={(e) => setData({ ...data, alternateemail: e.target.value })} type="email" placeholder='Alternate Email' id="alternateemail" name="alternateemail" className="inline-block  focus:outline-transparent  focus-visible:ring p-1 border w-full rounded-sm" />
                                </div>
                            </div >
                        </div>
                    </div>
                    <div className='h-20 p-5 mt-4 flex justify-end'>
                       <button type="submit" className="bg-green-500 text-white p-2 rounded-sm hover:bg-green-600">SAVE & NEXT</button>
                 </div>
                </form>
            </div>
        </div>
    )
}

export default Form1
