import {CalendarDays, CircleX, Pencil, Save, SquareX, Trash2 } from 'lucide-react'
import {useEffect, useState } from 'react'

export function Management() {

    const [tab, setTab] = useState("locations")
    const [isOpen, setIsOpen] = useState(false);
    const [popUpContent, setPopUpContent] = useState()

    const [allCompanyLocations, setAllCompanyLocations] = useState([])
    
    const [users, setUsers] = useState([])
    const [editCompanyLocation, setEditCompanyLocation] = useState("")
    const [editUser, setEditUser] = useState("")
    const [totalCountUsers, setTotalCountUsers] = useState()
    const [totalPagesUsers, setTotalPagesUsers] = useState()
    const [pageNumberUsers, setPageNumberUsers] = useState(1)

    const [companyLocations, setCompanyLocations] = useState([])
    const [totalCountCompanyLocations, setTotalCountCompanyLocations] = useState(0)
    const [totalPagesCompanyLocations, setTotalPagesCompanyLocations] = useState(0)
    const [pageNumberCompanyLocations, setPageNumberCompanyLocations] = useState(1)

    useEffect(() => {
        getAllUsers(pageNumberUsers)
        getAllCompanyLocationsPaged(pageNumberCompanyLocations)
        GetAllCompanyLocations()
    }, []);

    useEffect(() => {
        GetAllCompanyLocations();
    }, [companyLocations]);

    useEffect(() => {
        getAllCompanyLocationsPaged(pageNumberCompanyLocations)
    }, [pageNumberCompanyLocations]);
    useEffect(() => {
        getAllUsers(pageNumberUsers)
    }, [pageNumberUsers]);

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Ajusta según el formato de tu país
    
    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };
    
    const validateEmail = (email) => {
        return emailRegex.test(email);
    };
    
    const validatePhone = (phone) => {
        return phoneRegex.test(phone);
    };
    
    const handleCreateUser = (event:any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userData = Object.fromEntries(formData.entries())

        if (!validatePassword(userData.password)){
            alert("The password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
            return;
        }
        if (!validateEmail(userData.email)){
            alert("Please enter a valid email.")
            return;
        }
        if (!validatePhone(userData.phoneNumber)){
            alert("Please enter a valid phone number (10 characteres).")
            return;
        }
        
        CreateUser(userData).then(() => {
            setIsOpen(false)
        }).then(() => {
            getAllUsers(pageNumberUsers)
        })
    }
    
    const handleUpdateCompanyLocation = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userData = Object.fromEntries(formData.entries())
        
        UpdatedCompanyLocation(userData)
        
    }
    const handleUpdateUser = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userData = Object.fromEntries(formData.entries())
        
        UpdatedUser(userData)
        
    }

    const handleCreateCompanyLocation = (event:any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const companyLocationData = Object.fromEntries(formData.entries())

        CreateCompanyLocation(companyLocationData).then(() => {
            setIsOpen(false)
        }).then(() => {
            getAllCompanyLocationsPaged(pageNumberCompanyLocations)
        })
    }
    
    const handleCreateSchedule = (event:any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const companyLocationData = Object.fromEntries(formData.entries())
        
        console.log(companyLocationData)
        
        CreateSchedule(companyLocationData)
        
    }

    const PopUpCreateLocation = () => {
        return (
            <div className="relative bg-white rounded-lg shadow-lg p-6 h-[85vh] w-3/6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Add Company Location</h2>
                <p className="text-gray-600 mb-4 text-center">
                    Type the basic information of the location
                </p>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ handleCreateCompanyLocation } className="space-y-3">
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                    Address
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                                    Status
                                </label>
                            </div>
                            <div className="mt-2">
                                <select required id="status" name="status" className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="accessSchedule" className="block text-sm/6 font-medium text-gray-900">
                                    Access Schedule
                                </label>
                            </div>
                            <div className="mt-2">
                                <select id="accessSchedule" name="accessSchedule" className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Create Location
                            </button>
                        </div>
                    </form>
                </div>
                <div className="absolute top-3 right-3 flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 text-black cursor-pointer transition"
                    >
                        <SquareX />
                    </button>
                </div>
            </div>
        )
    }

    const PopUpCreateUser = () => {
        return (
            <div className="relative bg-white rounded-lg flex flex-col items-center justify-evenly shadow-lg p-6 h-[85vh] w-3/6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Add New User</h2>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ handleCreateUser }
                          className="grid grid-cols-2 gap-x-10 gap-y-1">
                        <div>
                            <div className="mt-1">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    placeholder="Last Name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    placeholder="Address"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    placeholder="Phone Number"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    placeholder="Country"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    placeholder="City"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1 flex">
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    defaultValue=""
                                    className="block w-full rounded-md h-full border-box bg-white text-base px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    <option disabled={true} value="">Role</option>
                                    <option value="">Employee</option>
                                    <option value="">Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md h-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="mt-3 col-span-2">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Create User
                            </button>
                        </div>
                    </form>
                </div>
                <p>Or</p>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ sendEmail } className="grid grid-cols-2 gap-x-10 gap-y-1">
                        <div className="col-span-2">
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    placeholder="Type an email to send a link invite to sign up"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="mt-1 col-span-2">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Invite via Email
                            </button>
                        </div>
                    </form>
                </div>
                <div className="absolute top-3 right-3 flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 text-black cursor-pointer transition"
                    >
                        <SquareX />
                    </button>
                </div>
            </div>
        )
    }

    const PopUpSchedule = (idUser: number) => {
        
        return (
            <div className="relative bg-white rounded-lg flex flex-col items-center justify-center shadow-lg p-6 h-[85vh] w-3/6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Schedule a Location</h2>
                <p className="text-gray-600 mb-4 text-center">
                    Select the location and date to schedule
                </p>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ handleCreateSchedule } className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Location
                            </label>
                            <div className="mt-2">
                                <select
                                    id="idCompanyLocation"
                                    name="idCompanyLocation"
                                    defaultValue=""
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    <option selected disabled>Select a location</option>
                                    {
                                        allCompanyLocations.map((location: any) => (
                                            <option key={"idCompanyLocation" + location.id} value={location.idCompanyLocation}>{location.name}</option>
                                        ))
                                    }
                                    {
                                        allCompanyLocations.length === 0 ? (
                                            <option value="" disabled>No company locations available</option>
                                        ) : ""
                                    }
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="initialTime" className="block text-sm/6 font-medium text-gray-900">
                                    Initial Time
                                </label>
                            </div>
                            <div className="mt-2">
                                <input type="hidden" id="idUser" name="idUser" value={idUser} />
                                <select
                                    id="initialTime"
                                    name="initialTime"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    {
                                        Array.from({ length: 13 }).map((_hour, index) => (
                                            <option key={"hour-" + index + 6} value={index + 6}>{index + 6}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="finalTime" className="block text-sm/6 font-medium text-gray-900">
                                    Final Time
                                </label>
                            </div>
                            <div className="mt-2">
                                <select
                                    id="finalTime"
                                    name="finalTime"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                >
                                    {
                                        Array.from({ length: 13 }).map((_hour, index) => (
                                            <option key={"hour-" + index + 6} value={index + 6}>{index + 6}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Create Location
                            </button>
                        </div>
                    </form>
                </div>
                <div className="absolute top-3 right-3 flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-2 py-2 text-black cursor-pointer transition"
                    >
                        <SquareX />
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow-sm border-b-2">
                    <div className="mx-auto flex items-center justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Management</h1>
                        <div className="h-full flex gap-4 font-bold">
                            <button 
                                onClick={() => {
                                    setTab("locations")
                                }}
                                className="px-3 py-1 cursor-pointer bg-lime-500 rounded-lg">
                                Company
                            </button>
                            <button
                                onClick={() => {
                                    setTab("users")
                                }}
                                className="px-3 py-1 bg-lime-500 cursor-pointer rounded-lg">
                                Users
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 min-h-[70vh] h-[70vh] rounded-2xl p-3">
                            {
                                tab === "locations" ? (
                                    <div className="flex grow flex-col space-y-2">
                                        <div className="h-12 px-3 py-1 font-bold flex items-center justify-between text-xl border-b-2 border-gray-500">
                                            <span>
                                                All Company Locations
                                            </span>
                                            <button
                                                onClick={ () => {
                                                    // @ts-ignore
                                                    setPopUpContent(PopUpCreateLocation())
                                                    setIsOpen(true) 
                                                }}
                                                className="py-1 px-4 text-sm cursor-pointer bg-lime-500 rounded-lg">
                                                Create
                                            </button>
                                        </div>
                                        <div className="relative flex grow flex-col font-bold pb-10 border-2 rounded-2xl border-gray-500">
                                            <div className="h-16 flex border-b-2 border-gray-500 w-full">
                                                <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-full">N°</div>
                                                <div className="w-[20%] border-r-2 border-gray-500 flex items-center h-full px-5">
                                                    Name
                                                </div>
                                                <div className="w-[40%] border-r-2 border-gray-500 flex items-center h-full px-5">
                                                    Address
                                                </div>
                                                <div className="w-[10%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    Status
                                                </div>
                                                <div className="w-[10%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    Access <br/>Schedule
                                                </div>
                                                <div className="w-[15%] flex items-center justify-center h-full">
                                                    Actions
                                                </div>
                                            </div>
                                            {
                                                companyLocations.length > 0 ? (
                                                    companyLocations.map((companyLocation) => (
                                                        editCompanyLocation !== 'companyLocationID-' + companyLocation?.idCompanyLocation ? (
                                                        <div key={"companyLocationID-" + companyLocation?.idCompanyLocation } className="h-16 flex items-center border-b-2 font-normal text-sm border-gray-500 w-full">
                                                            <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                { companyLocation.idCompanyLocation as any}
                                                            </div>
                                                            <div className="w-[20%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                { companyLocation.name as any }
                                                            </div>
                                                            <div className="w-[40%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                { companyLocation.address as any }
                                                            </div>
                                                            <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                {
                                                                    companyLocation.status ? (
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-lime-600 ring-1 ring-lime-500/70 ring-inset">
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-red-600/70 ring-inset">
                                                                            Inactive
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                {
                                                                    companyLocation?.accessSchedule  ? (
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-lime-600 ring-1 ring-lime-500/70 ring-inset">
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-red-600/70 ring-inset">
                                                                            Inactive
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="w-[15%] flex items-center justify-evenly h-4/6">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditCompanyLocation("companyLocationID-" + companyLocation?.idCompanyLocation)
                                                                    }}
                                                                    className="size-6 cursor-pointer text-blue-500">
                                                                    <Pencil className="size-full" />
                                                                </button>
                                                                <button 
                                                                    onClick={ ()=> {
                                                                        // @ts-ignore
                                                                        deleteCompanyLocation(companyLocation.idCompanyLocation).then(() => {
                                                                            getAllCompanyLocationsPaged(pageNumberCompanyLocations)
                                                                        })
                                                                    }}
                                                                    className="size-6 cursor-pointer text-red-500">
                                                                    <Trash2 className="size-full" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        ) : (
                                                            <form onSubmit={handleUpdateCompanyLocation} key={"companyLocationID-" + companyLocation?.idCompanyLocation } className="h-16 flex items-center border-2 font-normal text-sm border-blue-500 w-full">
                                                                <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    <input type="text" className="w-full text-center py-3" hidden id="idCompanyLocation" name="idCompanyLocation" value={companyLocation.idCompanyLocation}/>
                                                                    {companyLocation.idCompanyLocation}
                                                                </div>
                                                                <div className="w-[20%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    <input type="text" className="w-full text-center border-b py-3" id="name" name="name" defaultValue={ companyLocation.name }/>
                                                                    
                                                                </div>
                                                                <div className="w-[40%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    <input type="text" name="address" className="w-full text-center border-b py-3" id="address" defaultValue={ companyLocation.address}/>
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    <select name="status" id="status" defaultValue={ companyLocation.status }>
                                                                        <option value="true">Active</option>
                                                                        <option value="false">Inactive</option>
                                                                    </select>
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    <select name="accessSchedule" id="accessSchedule" defaultValue={ companyLocation?.accessSchedule }>
                                                                        <option value="true">Active</option>
                                                                        <option value="false">Inactive</option>
                                                                    </select>
                                                                </div>
                                                                <div className="w-[15%] flex items-center justify-evenly h-4/6">
                                                                    <button type="submit" className="size-6 cursor-pointer text-green-500">
                                                                        <Save className="size-full"/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditCompanyLocation("")
                                                                        }}
                                                                        className="size-6 cursor-pointer text-gray-500">
                                                                        <CircleX className="size-full" />
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )
                                                    ))
                                                ) : "No Results"
                                            }
                                            <div className="absolute bottom-0 text-xs w-full flex justify-between px-4 h-10 border-t-2 border-gray-500">
                                                <div className="flex items-center space-x-3">
                                                    <span>Total Results: { totalCountCompanyLocations }</span>
                                                    <span>Showing: { companyLocations.length }</span>
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        onClick={() => {
                                                            // @ts-ignore
                                                            if (pageNumberCompanyLocations - 1 >= 0) {
                                                                // @ts-ignore
                                                                setPageNumberCompanyLocations(pageNumberCompanyLocations - 1)
                                                            }
                                                        }}
                                                        className="size-10 flex items-center cursor-pointer justify-center" >
                                                        Prev
                                                    </button>
                                                    {
                                                        Array.from({ length: totalPagesCompanyLocations }).map((_item, index) => {
                                                            return (
                                                                <button
                                                                    onClick={ () => {
                                                                        setPageNumberCompanyLocations(index + 1)
                                                                    }}
                                                                    key={"buttonPage" + index + 1} className="size-10 cursor-pointer text-black flex items-center justify-center">
                                                                    {index + 1}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                    <button 
                                                        onClick={() => {
                                                            // @ts-ignore
                                                            if (pageNumberCompanyLocations + 1 <= totalPagesCompanyLocations ) {
                                                                // @ts-ignore
                                                                setPageNumberCompanyLocations(pageNumberCompanyLocations + 1)
                                                            }
                                                        }}
                                                        className="size-10 flex items-center cursor-pointer justify-center">
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : tab === "users" ? (
                                    <div className="flex grow flex-col space-y-2">
                                        <div className="h-12 px-3 py-1 font-bold flex items-center justify-between text-xl border-b-2 border-gray-500">
                                            <span>
                                                All Company Users
                                            </span>
                                            <button
                                                onClick={ () => {
                                                    // @ts-ignore
                                                    setPopUpContent(PopUpCreateUser())
                                                    setIsOpen(true)
                                                }}
                                                className="py-1 px-4 text-sm cursor-pointer bg-lime-500 rounded-lg">
                                                Create
                                            </button>
                                        </div>
                                        <div className="relative flex grow flex-col font-bold pb-10 border-2 rounded-2xl border-gray-500">
                                            <div className="h-16 flex border-b-2 border-gray-500 w-full">
                                                <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-full">N°</div>
                                                <div className="w-[15%] border-r-2 border-gray-500 flex items-center text-center justify-center h-full px-5">
                                                    First <br/>Name
                                                </div>
                                                <div className="w-[15%] border-r-2 border-gray-500 flex items-center text-center  justify-center h-full px-5">
                                                    Last <br/>Name
                                                </div>
                                                <div className="w-[15%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    Email
                                                </div>
                                                <div className="w-[15%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    Phone <br/>Number
                                                </div>
                                                <div className="w-[10%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    Type of <br/>
                                                    User
                                                </div>
                                                <div className="w-[10%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">
                                                    User <br/>
                                                    Location
                                                </div>
                                                <div className="w-[15%] flex items-center justify-center h-full">
                                                    Actions
                                                </div>
                                            </div>
                                            {
                                                users.length > 0 ? 
                                                    users.map((user, index) => (
                                                        editUser !== "UserID-" + user.idUser ?  (
                                                            <div key={"UserID-" + user.idUser } className="h-16 flex items-center border-b-2 font-normal text-sm border-gray-500 w-full">
                                                                <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    {user.idUser}
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    {user.firstName}
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    {user.lastName}
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-1">
                                                                    <p>{user.email}</p>
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    {user.phoneNumber}
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    {
                                                                        user.userType == 'administrator' ? (
                                                                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-lime-600 ring-1 ring-lime-500/70 ring-inset">
                                                                            Admin
                                                                        </span>
                                                                        ) : (
                                                                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/70 ring-inset">
                                                                            Employee
                                                                        </span>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    { user.city } <br/>
                                                                    { user.country}
                                                                </div>
                                                                <div className="w-[15%] flex items-center justify-evenly h-4/6">
                                                                    <button
                                                                        onClick={ () => {
                                                                            setEditUser("UserID-" + user.idUser)
                                                                        }}
                                                                        className="size-6 cursor-pointer text-blue-500">
                                                                        <Pencil className="size-full" />
                                                                    </button>
                                                                    <button
                                                                        onClick={ () => {
                                                                            // @ts-ignore
                                                                            setPopUpContent(PopUpSchedule(user.idUser))
                                                                            setIsOpen(true)
                                                                        }}
                                                                        className="size-6 cursor-pointer text-gray-500">
                                                                        <CalendarDays className="size-full" />
                                                                    </button>
                                                                    <button
                                                                        onClick={ () => {
                                                                            deleteUser(user.idUser).then( () => {
                                                                                getAllUsers(pageNumberUsers);
                                                                            })
                                                                        }}
                                                                        className="size-6 cursor-pointer text-red-500">
                                                                        <Trash2 className="size-full" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <form onSubmit={ handleUpdateUser } key={"UserID-" + user.idUser } className="h-16 flex items-center border-2 font-normal text-sm border-blue-500 w-full">
                                                                <div className="w-[5%] border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    <input type="text" className="w-full text-center py-3"  id="idUser" name="idUser" value={user.idUser}/>
                                                                    {user.idUser}
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    <input type="text" className="w-full text-center py-3" id="firstName" name="firstName" defaultValue={user.firstName}/>
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    <input type="text" className="w-full text-center py-3"  id="lastName" name="lastName" defaultValue={user.lastName}/>
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-1">
                                                                    <input type="text" className="w-full text-center py-3"  id="email" name="email" defaultValue={user.email}/>
                                                                </div>
                                                                <div className="w-[15%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                                    <input type="text" className="w-full text-center py-3" id="phoneNumber" name="phoneNumber" defaultValue={user.phoneNumber}/>
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                                    <select name="userType" id="userType" defaultValue={ user.userType }>
                                                                        <option value="administrator">Administrator</option>
                                                                        <option value="employee">Employee</option>
                                                                    </select>
                                                                </div>
                                                                <div className="w-[10%] text-center truncate border-r-2 border-gray-500 flex flex-col items-center justify-center h-4/6">
                                                                    <input type="text" className="w-full text-center"  id="city" name="city" defaultValue={user.city}/>
                                                                    <input type="text" className="w-full text-center"  id="country" name="country" defaultValue={user.country}/>
                                                                </div>
                                                                <div className="w-[15%] flex items-center justify-evenly h-4/6">
                                                                    <button
                                                                        className="size-6 cursor-pointer text-green-500">
                                                                        <Save className="size-full" />
                                                                    </button>
                                                                    <button
                                                                        onClick={ () => {
                                                                            setEditUser("")
                                                                        }}
                                                                        className="size-6 cursor-pointer text-gray-500">
                                                                        <CircleX className="size-full" />
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        )
                                                    ))
                                                    : "No results"
                                            }
                                            <div className="absolute bottom-0 text-xs w-full flex justify-between px-4 h-10 border-t-2 border-gray-500">
                                                <div className="flex items-center space-x-3">
                                                    <span>Total Results: { totalCountUsers > 0 ? totalCountUsers : 0 }</span>
                                                    <span>Showing: { users.length }</span>
                                                </div>
                                                <div className="flex">
                                                    {
                                                        totalPagesUsers > 0 ? (
                                                            <button
                                                                onClick={() => {
                                                                    // @ts-ignore
                                                                    if (pageNumberUsers - 1 >= 0) {
                                                                        // @ts-ignore
                                                                        setPageNumberUsers(pageNumberUsers - 1)
                                                                    }
                                                                }}
                                                                className="size-10 flex items-center cursor-pointer justify-center" >
                                                                Prev
                                                            </button>
                                                        ) : ""
                                                    }
                                                    {
                                                        Array.from({ length: totalPagesUsers }).map((_item, index) => {
                                                            return (
                                                                <button
                                                                    onClick={ () => {
                                                                        setPageNumberUsers(index + 1)
                                                                    }}
                                                                    key={"buttonPage" + index + 1} className="size-10 cursor-pointer text-black flex items-center justify-center">
                                                                    {index + 1}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        totalPagesUsers > 0 ? (
                                                            <button
                                                                onClick={() => {
                                                                    // @ts-ignore
                                                                    if (pageNumberUsers + 1 <= totalPagesUsers ) {
                                                                        // @ts-ignore
                                                                        setPageNumberUsers(pageNumberUsers + 1)
                                                                    }
                                                                }}
                                                                className="size-10 flex items-center cursor-pointer justify-center">
                                                                Next
                                                            </button>
                                                        ) : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""
                            }
                            
                        </div>
                    </div>
                </main>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    { popUpContent }
                </div>
            )}
        </>
    )
    
    async function sendEmail(event){
        
        event.preventDefault()
        
        const dataForm = new FormData(event.target);
        const emailData = Object.fromEntries(dataForm.entries());
        
        try {
            const result = await fetch("Email/SendEmail", {
                method: "POST",
                body: JSON.stringify({
                    "to": emailData.email,
                    "subject": "Register with us!",
                    "body": "https://www.pruebatecnicafelipe.com/auth/register"
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }).then( () => {
                console.log("SI")
                alert(result.data.Message)
            })
        } catch (error) {
            alert(error.response?.data?.Message || "We ccouldn't send you mail, try again later")
        }
    }
    
    async function getAllUsers(pageNumber: any) {
        const result = await fetch(`/User/GetUsersPaged?pageNumber=${pageNumber}&pageSize=5`);
        if (result.ok) {
            const {data} = await result.json();
            setUsers(data.data);
            setTotalPagesUsers(data.totalPages);
            setTotalCountUsers(data.totalCount);
            setPageNumberUsers(data.pageNumber);
        }
    }
    async function getAllCompanyLocationsPaged(pageNumber: any) {
        const result = await fetch(`/CompanyLocation/GetCompanyLocationsPaged?pageNumber=${pageNumber}&pageSize=5`);
        if (result.ok) {
            const {data} = await result.json();
            setCompanyLocations(data.data);
            setTotalCountCompanyLocations(data.totalCount);
            setTotalPagesCompanyLocations(data.totalPages);
            setPageNumberCompanyLocations(data.pageNumber);
        }
    }
    
    async function deleteUser(idUser: any){
        await fetch(`/User/DeleteUser?idUser=${idUser}`);
    }
    
    async function deleteCompanyLocation(idCompanyLocation: any){
        await fetch(`/CompanyLocation/DeleteCompanyLocation?IdCompanyLocation=${idCompanyLocation}`)
    }
    
    async function CreateUser(user: any){
        // @ts-ignore
        const response = await fetch(`/User/AddUser`, {
            method: "POST",
            body: JSON.stringify({
                idUser: 0,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                email: user.email,
                country: user.country,
                city: user.city,
                userType: user.role,
                password: user.password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        if (response.ok) {
            const data = await response.json()
        }
        else {
            const data = await response.json()
            alert("Error creating user: " + data.message);
        }
    }
    async function CreateCompanyLocation(companyLocation: any){
        // @ts-ignore
        const response = await fetch(`/CompanyLocation/AddCompanyLocation`, {
            method: "POST",
            body: JSON.stringify({
                "idCompanyLocation": 0,
                "name": companyLocation.name,
                "address": companyLocation.address,
                "status": companyLocation.status === 'true' ? true : false,
                "accessSchedule": companyLocation.accessSchedule === 'true' ? true : false,
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        if (response.ok) {
            const data = await response.json()
        }
        else {
            const data = await response.json()
            alert("Error creating company location: " + data.message);
        }
    }
    
    async function GetAllCompanyLocations() {
        
        const result = await fetch("/CompanyLocation/GetAllCompanyLocationsAvailable")
        
        if (result.ok) {
            const data = await result.json();
            setAllCompanyLocations(data.data);
        }
        
    }
    
    async function UpdatedCompanyLocation(companyLocation: any){
        const result = await fetch('/CompanyLocation/UpdatedCompanyLocation', {
            method: "POST",
            body: JSON.stringify({
                "idCompanyLocation": Number(companyLocation.idCompanyLocation),
                "name": companyLocation.name,
                "address": companyLocation.address,
                "status": (/true/).test(companyLocation.status),
                "accessSchedule": (/true/).test(companyLocation.accessSchedule),
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        
        if (result.ok) {
            getAllCompanyLocationsPaged(pageNumberCompanyLocations);
            setEditCompanyLocation("");
        } else {
            const data = await result.json();
            console.log(data)
        }
        
    }
    async function UpdatedUser(user: any){
        const result = await fetch('/User/UpdateUser', {
            method: "POST",
            body: JSON.stringify({
                "idUser": Number(user.idUser),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "phoneNumber": user.phoneNumber,
                "email": user.email,
                "country": user.country,
                "city": user.city,
                "userType": user.userType
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        
        if (result.ok) {
            getAllUsers(pageNumberUsers);
            setEditUser("");
        } else {
            const data = await result.json();
        }
        
    }
    
    async function CreateSchedule(schedule: any) {
        const result = await fetch('/Schedule/AddSchedule', {
            method: "POST",
            body: JSON.stringify({
                "idUser": schedule.idUser,
                "idCompanyLocation": schedule.idCompanyLocation,
                "initialTime": schedule.initialTime,
                "finalTime": schedule.finalTime
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        if (result.ok) {
            const data = await result.json()
            if (data.success) {
                setIsOpen(false);
                alert(data.message)
            }
        }
    }
    
}
