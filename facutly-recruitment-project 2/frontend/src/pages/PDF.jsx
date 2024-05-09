import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png';
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PDF = () => {
    const instance = axios.create({
        withCredentials: true,
        // baseURL: 'http://localhost:8000',
        headers: { 'Access-Control-Allow-Origin': '*' },
        credentials: 'include',
    })
    const navigate = useNavigate();
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
    function formatDate(timestamp) {
        const createdTime = String(timestamp);
        const dateObj = new Date(createdTime);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    const [imageurl, setmImageurl] = useState('');
    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform1")
                    .then(
                        (response) => {
                            // console.log(response.data.data.form1Data)
                            const dataFromBackend = response.data.data;
                            const user = dataFromBackend.user;

                            setData((prev) => ({ ...prev, applicationnumber: String(user.applicationId) }));
                            setData((prev) => ({ ...prev, email: user.email }));
                            setData((prev) => ({ ...prev, category: user.category }));
                            console.log(user);
                            const formattedDate = formatDate(user.createdAt);
                            setData((prev) => ({ ...prev, dateofapplication: formattedDate }));
                            // setUsername(`${user.firstname} ${user.lastname}`);
                            console.log(dataFromBackend.form1Data);
                            if (dataFromBackend.form1Data) {
                                // setUpdatedid(true);
                                // setUpdatedimage(true);
                                const formdata = dataFromBackend.form1Data;
                                // setViewuploadedfile(formdata.updateidproof);
                                setmImageurl(formdata.updateimage);
                                console.log(formdata);
                                setData((prev) => ({ ...prev, advertisementnumber: formdata.advertisementnumber }));
                                setData((prev) => ({ ...prev, department: formdata.department }));
                                setData((prev) => ({ ...prev, post: formdata.post }));
                                setData((prev) => ({ ...prev, firstname: formdata.firstname }));
                                setData((prev) => ({ ...prev, lastname: formdata.lastname }));
                                setData((prev) => ({ ...prev, dob: formdata.dob }));
                                setData((prev) => ({ ...prev, maritalstatus: formdata.maritalstatus }));
                                setData((prev) => ({ ...prev, idproof: formdata.idproof }));
                                setData((prev) => ({ ...prev, fathername: formdata.fathername }));
                                setData((prev) => ({ ...prev, middlename: formdata.middlename }));
                                setData((prev) => ({ ...prev, nationality: formdata.nationality }));
                                setData((prev) => ({ ...prev, gender: formdata.gender }));
                                setData((prev) => ({ ...prev, Street: formdata.Street }));
                                setData((prev) => ({ ...prev, City: formdata.City }));
                                setData((prev) => ({ ...prev, State: formdata.State }));
                                setData((prev) => ({ ...prev, Country: formdata.Country }));
                                setData((prev) => ({ ...prev, pinzip: formdata.pinzip }));
                                setData((prev) => ({ ...prev, Street2: formdata.Street2 }));
                                setData((prev) => ({ ...prev, City2: formdata.City2 }));
                                setData((prev) => ({ ...prev, State2: formdata.State2 }));
                                setData((prev) => ({ ...prev, Country2: formdata.Country2 }));
                                setData((prev) => ({ ...prev, pinzip2: formdata.pinzip2 }));
                                setData((prev) => ({ ...prev, mobile: formdata.mobile }));
                                setData((prev) => ({ ...prev, altmobile: formdata.altmobile }));
                                setData((prev) => ({ ...prev, landlinenumber: formdata.landlinenumber }));
                                setData((prev) => ({ ...prev, alternateemail: formdata.alternateemail }));

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



    const [data2, setData2] = useState({
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


    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform2")
                    .then(
                        (response) => {

                            const dataFromBackend = response.data.data;

                            if (dataFromBackend.form2Data) {
                                const form2data = dataFromBackend.form2Data;
                                setData2((prev) => ({ ...prev, universityinstitute: form2data.universityinstitute }));
                                setData2((prev) => ({ ...prev, department: form2data.department }));
                                setData2((prev) => ({ ...prev, nameofphdsupervisor: form2data.nameofphdsupervisor }));
                                setData2((prev) => ({ ...prev, yearofjoining: form2data.yearofjoining }));
                                setData2((prev) => ({ ...prev, dateofsuccessfulthesis: form2data.dateofsuccessfulthesis }));
                                setData2((prev) => ({ ...prev, dateofaward: form2data.dateofaward }));
                                setData2((prev) => ({ ...prev, titleofphdthesis: form2data.titleofphdthesis }));
                                setData2((prev) => ({ ...prev, degreecertificateb: form2data.degreecertificateb }));
                                setData2((prev) => ({ ...prev, degreecertificatec: form2data.degreecertificatec }));
                                setData2((prev) => ({ ...prev, universityinstituteb: form2data.universityinstituteb }));
                                setData2((prev) => ({ ...prev, universityinstitutec: form2data.universityinstitutec }));
                                setData2((prev) => ({ ...prev, branchstreamb: form2data.branchstreamb }));
                                setData2((prev) => ({ ...prev, branchstreamc: form2data.branchstreamc }));
                                setData2((prev) => ({ ...prev, yearofjoiningb: form2data.yearofjoiningb }));
                                setData2((prev) => ({ ...prev, yearofjoiningc: form2data.yearofjoiningc }));
                                setData2((prev) => ({ ...prev, yearofcompletionb: form2data.yearofcompletionb }));
                                setData2((prev) => ({ ...prev, yearofcompletionc: form2data.yearofcompletionc }));
                                setData2((prev) => ({ ...prev, durationb: form2data.durationb }));
                                setData2((prev) => ({ ...prev, percentagec: form2data.percentagec }));
                                setData2((prev) => ({ ...prev, durationc: form2data.durationc }));
                                setData2((prev) => ({ ...prev, percentageb: form2data.percentageb }));
                                setData2((prev) => ({ ...prev, percentagec: form2data.percentagec }));
                                setData2((prev) => ({ ...prev, divisionb: form2data.divisionb }));
                                setData2((prev) => ({ ...prev, divisionc: form2data.divisionc }));
                                setData2((prev) => ({ ...prev, school12: form2data.school12 }));
                                setData2((prev) => ({ ...prev, school10: form2data.school10 }));
                                setData2((prev) => ({ ...prev, yearofpassing12: form2data.yearofpassing12 }));
                                setData2((prev) => ({ ...prev, percentage12: form2data.percentage12 }));
                                setData2((prev) => ({ ...prev, yearofpassing10: form2data.yearofpassing10 }));
                                setData2((prev) => ({ ...prev, percentage10: form2data.percentage10 }));
                                setData2((prev) => ({ ...prev, division12: form2data.division12 }));
                                setData2((prev) => ({ ...prev, division10: form2data.division10 }));
                                setData2((prev) => ({ ...prev, additionaleducationqualification: form2data.additionaleducationqualification }));
                                console.log(data2.additionaleducationqualification);
                                // setHowmany(form2data.additionaleducationqualification.length)
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

    const [data4, setData4] = useState({
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


    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingForm4")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;

                            // console.log(dataFromBackend.Form2Data);

                            if (dataFromBackend.form4Data) {
                                const form4data = dataFromBackend.form4Data;
                                setData4((prev) => ({ ...prev, internationaljournalpapers: form4data.internationaljournalpapers }));
                                setData4((prev) => ({ ...prev, internationalconferencepapers: form4data.internationalconferencepapers }));
                                setData4((prev) => ({ ...prev, patents: form4data.patents }));
                                setData4((prev) => ({ ...prev, bookchapters: form4data.bookchapters }));
                                setData4((prev) => ({ ...prev, nationaljournalpapers: form4data.nationaljournalpapers }));
                                setData4((prev) => ({ ...prev, nationalconferencepapers: form4data.nationalconferencepapers }));
                                setData4((prev) => ({ ...prev, books: form4data.books }));
                                setData4((prev) => ({ ...prev, url: form4data.url }));
                                setData4((prev) => ({ ...prev, bestpublications: form4data.bestpublications }));
                                setData4((prev) => ({ ...prev, patenttable: form4data.patenttable }));
                                setData4((prev) => ({ ...prev, booktable: form4data.booktable }));
                                setData4((prev) => ({ ...prev, bookchaptertable: form4data.bookchaptertable }));


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


    const [data3, setData3] = useState({
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

    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform3")
                    .then(
                        (response) => {
                            const dataFromBackend = response.data.data;

                            if (dataFromBackend.form3Data) {
                                const form3data = dataFromBackend.form3Data;
                                setData3((prev) => ({ ...prev, position: form3data.position }));
                                setData3((prev) => ({ ...prev, organization: form3data.organization }));
                                setData3((prev) => ({ ...prev, status: form3data.status }));
                                setData3((prev) => ({ ...prev, dateofjoining: form3data.dateofjoining }));
                                setData3((prev) => ({ ...prev, dateofleaving: form3data.dateofleaving }));
                                setData3((prev) => ({ ...prev, duration: form3data.duration }));
                                setData3((prev) => ({ ...prev, areasofspecialization: form3data.areasofspecialization }));
                                setData3((prev) => ({ ...prev, currentareaofresearch: form3data.currentareaofresearch }));
                                setData3((prev) => ({ ...prev, experience: form3data.experience }));
                                setData3((prev) => ({ ...prev, employmenthistory: form3data.employmenthistory }));
                                setData3((prev) => ({ ...prev, teachingexperience: form3data.teachingexperience }));
                                setData3((prev) => ({ ...prev, researchexperience: form3data.researchexperience }));
                                setData3((prev) => ({ ...prev, industrialexperience: form3data.industrialexperience }));





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


    const [data5, setData5] = useState({

        professionalsocieties: [],
        professionaltraining: [],
        awardandrecognition: [],
        sponsoredprojects: [],
        consultancyprojects: [],
    })


    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform5")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;

                            // console.log(dataFromBackend.form6Data);

                            if (dataFromBackend.form5Data) {
                                const form5data = dataFromBackend.form5Data;
                                setData5((prev) => ({ ...prev, professionalsocieties: form5data.professionalsocieties }));
                                setData5((prev) => ({ ...prev, professionaltraining: form5data.professionaltraining }));
                                setData5((prev) => ({ ...prev, awardandrecognition: form5data.awardandrecognition }));
                                setData5((prev) => ({ ...prev, sponsoredprojects: form5data.sponsoredprojects }));
                                setData5((prev) => ({ ...prev, consultancyprojects: form5data.consultancyprojects }));






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


    const [data6, setData6] = useState({

        phdthesissupervision: [],
        mastersdegree: [],
        bachelorsdegree: [],
    })


    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform6")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;


                            if (dataFromBackend.form6Data) {
                                const form6data = dataFromBackend.form6Data;
                                setData6((prev) => ({ ...prev, phdthesissupervision: form6data.phdthesissupervision }));
                                setData6((prev) => ({ ...prev, mastersdegree: form6data.mastersdegree }));
                                setData6((prev) => ({ ...prev, bachelorsdegree: form6data.bachelorsdegree }));






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


    const [data7, setData7] = useState({

        significantresearch: '',
        significantteaching: '',
        relevantinformation: '',
        professionalservice: '',
        journalpublications: '',
        conferencepublications: '',
    })

    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform7")
                    .then(
                        (response) => {
                            // console.log(response.data)
                            const dataFromBackend = response.data.data;


                            if (dataFromBackend.form7Data) {
                                const form7data = dataFromBackend.form7Data;
                                setData7((prev) => ({ ...prev, significantresearch: form7data.significantresearch }));
                                setData7((prev) => ({ ...prev, significantteaching: form7data.significantteaching }));
                                setData7((prev) => ({ ...prev, relevantinformation: form7data.relevantinformation }));
                                setData7((prev) => ({ ...prev, professionalservice: form7data.professionalservice }));

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


    const [data8, setData8] = useState({
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
    const [signatureurl, setSignatureurl] = useState('');

    useEffect(() => {
        const formdata = async () => {
            try {
                await instance.get("http://localhost:8000/api/v1/forms/gettingform8")
                    .then(
                        (response) => {
                            // console.log(response.data.data.form1Data)
                            const dataFromBackend = response.data.data;

                            if (dataFromBackend.form8Data) {
                                // setUpdatedid(true);
                                // setUpdatedimage(true);
                                const formdata = dataFromBackend.form8Data;

                                setSignatureurl(formdata.signature);


                                setData8((prev) => ({ ...prev, name1: formdata.name1 }));
                                setData8((prev) => ({ ...prev, name2: formdata.name2 }));
                                setData8((prev) => ({ ...prev, name3: formdata.name3 }));
                                setData8((prev) => ({ ...prev, contact1: formdata.contact1 }));
                                setData8((prev) => ({ ...prev, contact2: formdata.contact2 }));
                                setData8((prev) => ({ ...prev, contact3: formdata.contact3 }));
                                setData8((prev) => ({ ...prev, position1: formdata.position1 }));
                                setData8((prev) => ({ ...prev, position2: formdata.position2 }));
                                setData8((prev) => ({ ...prev, position3: formdata.position3 }));
                                setData8((prev) => ({ ...prev, association1: formdata.association1 }));
                                setData8((prev) => ({ ...prev, association2: formdata.association2 }));
                                setData8((prev) => ({ ...prev, association3: formdata.association3 }));
                                setData8((prev) => ({ ...prev, email1: formdata.email1 }));
                                setData8((prev) => ({ ...prev, email2: formdata.email2 }));
                                setData8((prev) => ({ ...prev, email3: formdata.email3 }));
                                setData8((prev) => ({ ...prev, institution1: formdata.institution1 }));
                                setData8((prev) => ({ ...prev, institution2: formdata.institution2 }));
                                setData8((prev) => ({ ...prev, institution3: formdata.institution3 }));

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


    return (
        <div>
            <div className='border-4 border-black mx-28 my-8 p-6 bg-white'>
                <div className='flex items-center'>
                    <div className='w-24'>
                        <img src={logo} alt="logo" className='h-auto w-24' />
                    </div>
                    <div className=' w-full text-center mr-24'>
                        <div className='text-xl font-bold'>
                            भारतीय प्रौद्योगिकी संस्थान पटना
                        </div>
                        <div className='text-xl font-bold'>
                            Indian Institute of Technology Patna
                        </div>
                    </div>
                </div>
                <div className='h-7 bg-[#175395] text-white text-center font-bold text-base'>
                    Application for the Faculty Position
                </div>
                <div className='flex justify-between mb-3'>
                    <div>
                        <p className='text-xl font-bold text-red-500'>{`${data.firstname} ${data.middlename} ${data.lastname}`}</p>
                        <p>Advertisement Number : {`${data.advertisementnumber}`}</p>
                        <p>Date of Application : {`${data.dateofapplication}`}</p>
                        <p>Post Applied for : {`${data.post}`}</p>
                        <p>Department  : {`${data.department}`}</p>
                        <p>Application Number : {`${data.applicationnumber}`}</p>



                    </div>
                    <div className='p-4 m-4'>
                        <img src={imageurl} alt="" className='h-28 w-28' />
                    </div>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1] '>1. Personal Details</span>
                    </p>
                </div>
                <div className='mt-3'>
                    <table className='w-full '>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                First Name
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Middle Name
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Last Name
                            </th>
                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.firstname}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.middlename}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.lastname}`}
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='mt-6'>
                    <table className='w-full '>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>


                                Date of Birth
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Gender
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Marital Status
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Category
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Nationality                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                ID Proof
                            </th>
                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.dob}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.gender}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.maritalstatus}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.category}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.nationality}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.idproof}`}
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='mt-6'>
                    <table className='w-full '>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>


                                Current Address
                            </th>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>

                                Permanent Address
                            </th>

                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.Street}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.Street2}`}
                            </td>


                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.City}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.City2}`}
                            </td>


                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.State}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.State2}`}
                            </td>


                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.Country}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.Country2}`}
                            </td>


                        </tr>
                        <tr>
                            <td className='border-2 border-slate-300'>
                                {`${data.pinzip}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data.pinzip2}`}
                            </td>


                        </tr>
                    </table>
                </div>
                <div className='mt-6 mb-3'>
                    <table className='w-full '>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>
                                Mobile
                            </th>
                            <td className='border-2 border-slate-300'>

                                {`${data.mobile}`}
                            </td>
                        </tr>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>
                                Alternate Mobile
                            </th>
                            <td className='border-2 border-slate-300'>

                                {`${data.altmobile}`}
                            </td>
                        </tr>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>
                                Landline Phone No.
                            </th>
                            <td className='border-2 border-slate-300'>

                                {`${data.landlinenumber}`}
                            </td>
                        </tr>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>
                                E-mail
                            </th>
                            <td className='border-2 border-slate-300'>

                                {`${data.email}`}
                            </td>
                        </tr>
                        <tr>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300'>
                                Alternate E-mail
                            </th>
                            <td className='border-2 border-slate-300'>

                                {`${data.alternateemail}`}
                            </td>
                        </tr>
                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>2. Educational Qualifications</span>
                    </p>
                </div>

                <div className='mt-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                (A) Ph. D. Details
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                University/
                                Institute
                            </th>
                            <th className='border-2 border-slate-300'>
                                Department
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Ph. D.
                                Supervisor
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                successful
                                thesis Defence
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Award
                            </th>
                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                {`${data2.universityinstitute}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.department}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.nameofphdsupervisor}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofjoining}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.dateofsuccessfulthesis}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.dateofaward}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-300'>
                                Title of Ph. D. Thesis
                            </th>
                            <td colSpan={5} className='border-2 border-slate-300'>
                                {`${data2.titleofphdthesis}`}
                            </td>
                        </tr>
                    </table>
                </div>

                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                (B) Academic Details - PG
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Degree
                            </th>
                            <th className='border-2 border-slate-300'>
                                University/
                                Institute
                            </th>
                            <th className='border-2 border-slate-300'>
                                Subjects
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Graduation
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                                (in years)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Percentage/CGPA
                            </th>
                            <th className='border-2 border-slate-300'>
                                Division/Class
                            </th>
                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                {`${data2.degreecertificateb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.universityinstituteb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.branchstreamb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofjoiningb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofcompletionb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.durationb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.percentageb}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.divisionb}`}
                            </td>
                        </tr>

                    </table>
                </div>


                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (C) Academic Details - UG
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Degree
                            </th>
                            <th className='border-2 border-slate-300'>
                                University/
                                Institute
                            </th>
                            <th className='border-2 border-slate-300'>
                                Subjects
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Graduation
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                                (in years)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Percentage/CGPA
                            </th>
                            <th className='border-2 border-slate-300'>
                                Division/Class
                            </th>
                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                {`${data2.degreecertificatec}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.universityinstitutec}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.branchstreamc}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofjoiningc}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofcompletionc}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.durationc}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.percentagec}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.divisionc}`}
                            </td>
                        </tr>

                    </table>
                </div>



                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (D) Academic Details - School
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                10th/12th/HSC/Diploma
                            </th>
                            <th className='border-2 border-slate-300'>
                                School
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of Passing
                            </th>
                            <th className='border-2 border-slate-300'>
                                Percentage/CGPA
                            </th>
                            <th className='border-2 border-slate-300'>
                                Division/Class
                            </th>


                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                12th/HSC/Diploma
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.school12}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofpassing12}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.percentage12}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.division12}`}
                            </td>

                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                10th
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.school10}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.yearofpassing10}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.percentage10}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data2.division10}`}
                            </td>

                        </tr>

                    </table>
                </div>



                <div className='mt-6 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (E) Additional Educational Qualifications (If any)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Degree
                            </th>
                            <th className='border-2 border-slate-300'>
                                University/
                                Institute
                            </th>
                            <th className='border-2 border-slate-300'>
                                Subjects
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of
                                Graduation
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                                (in years)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Percentage/CGPA
                            </th>
                            <th className='border-2 border-slate-300'>
                                Division/Class
                            </th>


                        </tr>

                        {data2.additionaleducationqualification.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>3. Employment Details</span>
                    </p>
                </div>

                <div className='mt-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (A) Present Employment
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Position
                            </th>
                            <th className='border-2 border-slate-300'>
                                Organization/Institution
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Leaving
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                                (in years)
                            </th>


                        </tr>
                        <tr>
                            <td className=' border-2 border-slate-300'>
                                {`${data3.position}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data3.organization}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data3.dateofjoining}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data3.dateofleaving}`}
                            </td>
                            <td className='border-2 border-slate-300'>
                                {`${data3.duration}`}
                            </td>

                        </tr>


                    </table>
                </div>

                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                (B) Employment History (After PhD )
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Position
                            </th>
                            <th className='border-2 border-slate-300'>
                                Organization/Institution
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Leaving
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                                (in years)
                            </th>



                        </tr>

                        {data3.employmenthistory.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                        <tr className='w-full'>
                            <td colSpan={5} className='border-2 border-slate-300'>
                            Experience : Minimum 3 years’ post phd experience <span className='font-bold text-red-500'>{`${data3.experience}`}</span>
                            </td>
                        </tr>

                    </table>
                </div>



                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>



                                (C) Teaching Experience (After PhD)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Position
                            </th>
                            <th className='border-2 border-slate-300'>
                                Employer
                            </th>
                            <th className='border-2 border-slate-300'>
                                Course Taught
                            </th>
                            <th className='border-2 border-slate-300'>
                                UG/PG
                            </th>
                            <th className='border-2 border-slate-300'>
                                No. of Students
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Leaving
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                            </th>



                        </tr>

                        {data3.teachingexperience.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>



                                (D) Research Experience
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Position
                            </th>
                            <th className='border-2 border-slate-300'>
                                Institute
                            </th>
                            <th className='border-2 border-slate-300'>
                                Supervisor
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Leaving
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                            </th>




                        </tr>

                        {data3.researchexperience.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>


                <div className='mt-6 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>




                                (E) Industrial Experience
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Organization
                            </th>
                            <th className='border-2 border-slate-300'>
                                Work Profile
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Joining
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Leaving
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                            </th>




                        </tr>

                        {data3.industrialexperience.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>4. Area(s) of Specialization and Current Area(s) of Research</span>
                    </p>
                </div>
                <div className='mt-3 mb-3'>
                    <table className="w-full">
                        <tr className='w-full'>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                Area(s) of Specialization
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data3.areasofspecialization}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                Current Area(s) of Research
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data3.currentareaofresearch}`}
                            </td>
                        </tr>

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>5. Summary of Publications</span>
                    </p>
                </div>
                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of International Journal Papers
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.internationaljournalpapers}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of National Journal Papers
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.nationaljournalpapers}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of International Conference Papers
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.internationalconferencepapers}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of National Conference Papers
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.nationalconferencepapers}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of Patent(s)
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.patents}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400 w-1/3'>
                                Number of Book(s)
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.books}`}
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <th className='border-2 border-slate-400'>
                                Number of Book Chapter(s)
                            </th>
                            <td className='border-2 border-slate-400'>
                                {`${data4.bookchapters}`}
                            </td>
                        </tr>
                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>6. List of 10 Best Research Publications (Journal/Conference)</span>
                    </p>
                </div>
                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>
                                (A) Journals(s)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Author(s)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Journal
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year, Vol., Page
                            </th>
                            <th className='border-2 border-slate-300'>
                                Impact Factor
                            </th>
                            <th className='border-2 border-slate-300'>
                                DOI
                            </th>
                            <th className='border-2 border-slate-300'>
                                Status
                            </th>




                        </tr>

                        {data4.bestpublications.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>7. List of Patent(s), Book(s), Book Chapter(s)</span>
                    </p>
                </div>

                <div className='mt-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={8} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                (A) Patent(s)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Inventor(s)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Patent
                            </th>
                            <th className='border-2 border-slate-300'>
                                Country of
                                Patent
                            </th>
                            <th className='border-2 border-slate-300'>
                                Patent
                                Number
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Filing
                            </th>
                            <th className='border-2 border-slate-300'>
                                Date of
                                Published
                            </th>
                            <th className='border-2 border-slate-300'>
                                Status
                                Filed/Published
                            </th>




                        </tr>

                        {data4.patenttable.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>
                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (B) Book(s)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Author(s)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of the Book
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of Publication
                            </th>
                            <th className='border-2 border-slate-300'>
                                ISBN
                            </th>



                        </tr>

                        {data4.booktable.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>


                <div className='mt-6 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (C) Book Chapter(s)
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Inventor(s)
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of the Book Chapter
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year of Publication
                            </th>
                            <th className='border-2 border-slate-300'>
                                ISBN
                            </th>

                        </tr>

                        {data4.bookchaptertable.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>


                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>8. Google Scholar Link</span>
                    </p>
                </div>
                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                URL
                            </th>
                        </tr>
                        <tr className='w-full'>
                            <td className="border-2 border-slate-300 text-center">
                                <a href={data4.url}>{data4.url}</a>
                            </td>
                        </tr>
                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>9. Membership of Professional Societies</span>
                    </p>
                </div>

                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={3} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                Details
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of the Professional Society
                            </th>
                            <th className='border-2 border-slate-300'>
                                Membership Status (Lifetime/Annual)
                            </th>


                        </tr>

                        {data5.professionalsocieties.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>10. Professional Training</span>
                    </p>
                </div>

                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={5} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                Details
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Type of Training Received
                            </th>
                            <th className='border-2 border-slate-300'>
                                Organisation
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year
                            </th>
                            <th className='border-2 border-slate-300'>
                                Duration
                            </th>


                        </tr>

                        {data5.professionaltraining.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>11. Award(s) and Recognition(s)</span>
                    </p>
                </div>

                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={4} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                Details
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Award
                            </th>
                            <th className='border-2 border-slate-300'>
                                Awarded By
                            </th>
                            <th className='border-2 border-slate-300'>
                                Year
                            </th>



                        </tr>

                        {data5.awardandrecognition.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>12. Research Supervision</span>
                    </p>
                </div>
                <div className='mt-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>
                                (A) PhD Thesis Supervision
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Student/Research Scholar
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Thesis
                            </th>
                            <th className='border-2 border-slate-300'>
                                Role
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing/Completed
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing Since/ Year of Completion
                            </th>

                        </tr>

                        {data6.phdthesissupervision.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>
                <div className='mt-6'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>
                                (B) M.Tech/M.E./Master's Thesis Supervision
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Student/Research Scholar
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Thesis
                            </th>
                            <th className='border-2 border-slate-300'>
                                Role
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing/Completed
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing Since/ Year of Completion
                            </th>

                        </tr>

                        {data6.mastersdegree.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div className='mt-6 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>

                                (C) B.Tech/B.E./Bachelor's Project Supervision
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Name of Student
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Project
                            </th>
                            <th className='border-2 border-slate-300'>
                                Role
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing/Completed
                            </th>
                            <th className='border-2 border-slate-300'>
                                Ongoing Since/ Year of Completion
                            </th>

                        </tr>

                        {data6.bachelorsdegree.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>



                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>13. Sponsored Projects/ Consultancy Details</span>
                    </p>
                </div>



                <div className='mt-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={7} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (A) Sponsored Projects
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Sponsoring Agency
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Project
                            </th>
                            <th className='border-2 border-slate-300'>
                                Sanctioned Amount
                            </th>
                            <th className='border-2 border-slate-300'>
                                Period
                            </th>
                            <th className='border-2 border-slate-300'>
                                Role
                            </th>
                            <th className='border-2 border-slate-300'>
                                Status
                            </th>



                        </tr>

                        {data5.sponsoredprojects.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>


                <div className='mt-6 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={7} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>


                                (B) Consultancy Projects
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                S. No.
                            </th>
                            <th className='border-2 border-slate-300'>
                                Organization
                            </th>
                            <th className='border-2 border-slate-300'>
                                Title of Project
                            </th>
                            <th className='border-2 border-slate-300'>
                                Amount of Grant
                            </th>
                            <th className='border-2 border-slate-300'>
                                Period
                            </th>
                            <th className='border-2 border-slate-300'>
                                Role
                            </th>
                            <th className='border-2 border-slate-300'>
                                Status
                            </th>



                        </tr>

                        {data5.consultancyprojects.map((row, index) => (
                            <>
                                <tr key={row.id}>
                                    <td className='border-2 border-slate-400' key={index}>
                                        {`${index + 1}`}
                                    </td>
                                    {row.data.map((cell, cellIndex) => (

                                        <td className='border-2 border-slate-400' key={cellIndex}>
                                            {`${cell}`}
                                        </td>
                                    ))}

                                </tr>
                            </>
                        ))}

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>14. Significant research contribution and future plans</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.significantresearch}`}
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>15. Significant teaching contribution and future plans</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.significantteaching}`}
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>16. Any other relevant information</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.relevantinformation}`}
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>17. Professional Service as Reviewer/Editor etc.</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.professionalservice}`}
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>18. Detailed List of Journal Publications
                            (Including Sr. No., Author's Names, Paper Title, Volume, Issue, Year, Page Nos., Impact Factor (if any), DOI, Status [Published/Accepted])</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.journalpublications}`}
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>19. Detailed List of Conference Publications
                            (Including Sr. No., Author's Names, Paper Title, Name of the conference, Year, Page Nos., DOI [If any])</span>
                    </p>
                </div>

                <div className='p-2 border-2 border-slate-300 mt-3 mb-3'>
                    <p>
                        {`${data7.conferencepublications}`}
                    </p>
                </div>

                <div className='mb-3'>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>
                            20. Reprints of 5 Best Research Papers-Attached</span>
                    </p>
                </div>
                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>
                            21. Check List of the documents attached with the online application</span>
                    </p>
                </div>
                <div className='mt-3 mb-3'>
                    <p>
                        1. PHD Certificate
                    </p>
                    <p>
                        2. PG Certificate
                    </p>
                    <p>
                        3. UG Certificate
                    </p>
                    <p>
                        4. 12th/HSC/Diploma
                    </p>
                    <p>
                        5. 10th/SSC Certificate
                    </p>
                    <p>
                        6. 10 Years Post phd Experience Certificate
                    </p>
                    <p>
                        7. Any other relevant documents ( Experience Certificate, Award Certificate, etc.)
                    </p>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>
                            22. Referees</span>
                    </p>
                </div>

                <div className='mt-3 mb-3'>
                    <table className='w-full'>
                        <tr className='w-full'>
                            <th colSpan={6} className='text-[#0A5398] border-2 border-slate-300 bg-slate-300 '>




                                Details of Referees
                            </th>
                        </tr>
                        <tr>
                            <th className='border-2 border-slate-300'>
                                Name
                            </th>
                            <th className='border-2 border-slate-300'>
                                Position
                            </th>
                            <th className='border-2 border-slate-300'>
                                Association with Referee
                            </th>
                            <th className='border-2 border-slate-300'>
                                Institution/
                                Organization
                            </th>
                            <th className='border-2 border-slate-300'>
                                E-mail
                            </th>
                            <th className='border-2 border-slate-300'>
                                Contact No.
                            </th>



                        </tr>

                        <tr className='w-full'>
                            <td className='border-2 border-slate-400'>
                                {`${data8.name1}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.position1}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.association1}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.institution1}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.email1}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.contact1}`}
                            </td>

                        </tr>
                        <tr className='w-full'>
                            <td className='border-2 border-slate-400'>
                                {`${data8.name2}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.position2}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.association2}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.institution2}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.email2}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.contact2}`}
                            </td>

                        </tr>
                        <tr className='w-full'>
                            <td className='border-2 border-slate-400'>
                                {`${data8.name3}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.position3}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.association3}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.institution3}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.email3}`}
                            </td>
                            <td className='border-2 border-slate-400'>
                                {`${data8.contact3}`}
                            </td>

                        </tr>

                    </table>
                </div>

                <div>
                    <p className=' text-[#A40A0B] font-bold'>
                        <span className='bg-[#F1F1D1]'>
                            23. Final Declaration</span>
                    </p>
                </div>
                <div className='border-2 border-slate-300 p-2 mt-3 mb-3'>

                    I hereby declare that I have carefully read and understood the instructions and particulars mentioned in the advertisment and this application form. I further declare that all the entries along with the attachments uploaded in this form are true to the best of my knowledge and belief
                </div>

                <div className='mt-6'>
                    <div className='h-20 w-20 border-2 border-slate-300'>
                        <img src={signatureurl} alt="" className='h-20 w-20'/>
                    </div>
                </div>
                <div>
                    <p>Signature of Applicant</p>
                </div>

                <div>
                <Link to='/finaldeclaration'><button className='border-2 rounded bg-slate-300 shadow-sm m-3 p-1'>
                    back
                </button></Link>

                <button className='border-2 rounded bg-slate-300 shadow-sm m-3 p-1' onClick={()=>window.print()}>
                    Print Application
                </button>

                </div>
            </div>
        </div>
    )
}

export default PDF
