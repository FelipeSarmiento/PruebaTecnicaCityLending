import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.tsx";


const navigation = [
    { name: 'Management', href: '/management', current: false, admin: true },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export function NavBar() {
    
    // @ts-ignore
    const {  user, logout } = useAuth();
    

    return (
        <div>
            <Disclosure as="nav" className="bg-gray-800  h-20" >
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                            </DisclosureButton>
                        </div>
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex items-center">
                                <Link to="/">
                                    <span className="font-bold text-3xl text-lime-500">Test Felipe</span>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        // @ts-ignore
                                        item.admin && user?.userType === 'administrator' ?  (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : ""
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex gap-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {
                                user ? (
                                    <>
                                        <button
                                            type="button"
                                            disabled={true}
                                            className="relative rounded-md px-5 py-1 font-bold bg-lime-500 p-1 text-black focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="capitalize">{user?.firstName} | {user?.userType}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={
                                                logout
                                            }
                                            className="relative rounded-md px-5 py-1 cursor-pointer font-bold border-2 border-lime-600 p-1 text-lime-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="capitalize">Log Out</span>
                                        </button>
                                    </>
                                ) : ""
                            }
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
                <Outlet />
            </Disclosure>
        </div>
    )
}
