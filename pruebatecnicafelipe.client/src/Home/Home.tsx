import {useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext.tsx";

export function Home() {
    
    const { user } = useAuth();
    
    const [companyLocation, setCompanyLocation] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    
    
    useEffect(() => {
        getAllCompanyLocationsPaged(pageNumber, user.idUser)
    }, []);

    useEffect(() => {
        getAllCompanyLocationsPaged(pageNumber, user.idUser)
    }, [pageNumber,pageSize]);
    
    
    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Company access points - Locations</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-3 gap-4 min-h-[70vh] rounded-2xl p-3">
                            <div className="col-span-2 flex flex-col space-y-2">
                                <div className="h-12 px-3 font-bold flex items-center text-xl border-b-2 border-gray-500">
                                    Your access points allowed
                                </div>
                                <div className="relative flex grow pb-10 flex-col font-bold border-2 rounded-2xl border-gray-500">
                                    <div className="h-16 flex border-b-2 border-gray-500 w-full">
                                        <div className="w-[10%] border-r-2 border-gray-500 flex items-center justify-center h-full">N°</div>
                                        <div className="w-[30%] border-r-2 border-gray-500 flex items-center h-full px-5">Name</div>
                                        <div className="w-[30%] border-r-2 border-gray-500 flex items-center h-full px-5">Address</div>
                                        <div className="w-[15%] border-r-2 text-center text-sm border-gray-500 flex items-center justify-center h-full">Time <br/>per day</div>
                                        <div className="w-[15%] flex items-center justify-center h-full">Status</div>
                                    </div>
                                    {
                                        companyLocation.length > 0 ? (
                                            companyLocation.map((item, index) => (
                                                <div key={ "companyLocation-" + index } className="h-16 flex items-center border-b-2 font-normal text-sm border-gray-500 w-full">
                                                    <div className="w-[10%] border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                        { item.idCompanyLocation }
                                                    </div>
                                                    <div className="w-[30%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                        { item.name }
                                                    </div>
                                                    <div className="w-[30%] truncate border-r-2 border-gray-500 flex items-center h-4/6 px-5">
                                                        { item.address }
                                                    </div>
                                                    <div className="w-[15%] text-center text-pretty border-r-2 border-gray-500 flex items-center justify-center h-4/6">
                                                        { item.finalTime -  item.initialTime }
                                                    </div>
                                                    <div className="w-[15%] flex items-center justify-center h-4/6">
                                                        {
                                                            item.status ? (
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
                                                </div>
                                            ))
                                        ) : "no records"
                                    }
                                    <div className="absolute bottom-0 text-xs w-full flex justify-between px-4 h-10 border-t-2 border-gray-500">
                                        <div className="flex items-center space-x-3">
                                            <span>Total Results: { totalCount }</span>
                                            <span>Showing: { companyLocation.length }</span>
                                        </div>
                                        <div className="flex">
                                            <button className="size-10 flex items-center justify-center" disabled>
                                                Prev
                                            </button>
                                            {
                                                Array.from({ length: totalPages }).map((_item, index) => {
                                                    return (
                                                        <button 
                                                            onClick={ () => {
                                                                setPageNumber(index + 1)
                                                            }}
                                                            key={"buttonPage" + index + 1} className="size-10 cursor-pointer text-black flex items-center justify-center">
                                                            {index + 1}
                                                        </button>
                                                    )
                                                })
                                            }
                                            <button className="size-10 flex items-center justify-center" disabled>
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="h-12 px-3 font-bold flex items-center text-xl border-b-2 border-gray-500">
                                    User Information
                                </div>
                                <div className="relative flex grow p-2 flex-col space-y-2 border-2 rounded-2xl border-gray-500">
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">First Name:&nbsp;</span>{ user.firstName }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">Last Name:&nbsp;</span>{ user.lastName }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">Email:&nbsp;</span>{ user.email }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">Address:&nbsp;</span>{ user.address }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">Phone Number:&nbsp;</span>{ user.phoneNumber }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">Country:&nbsp;</span>{ user.country }
                                    </div>
                                    <div className="flex items-center h-10">
                                        <span className="font-bold">City:&nbsp;</span>{ user.city }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )

    async function getAllCompanyLocationsPaged(pageNumber: any, idUser: number) {
        const result = await fetch(`/CompanyLocation/GetCompanyLocationsPagedByUser?pageNumber=${pageNumber}&pageSize=5&idUser=${idUser}`);
        if (result.ok) {
            const {data} = await result.json();
            setCompanyLocation(data.data);
            setTotalCount(data.totalCount);
            setTotalPages(data.totalPages);
            setPageNumber(data.pageNumber);
            setPageSize(data.pageSize);
        }
    }
    
}
