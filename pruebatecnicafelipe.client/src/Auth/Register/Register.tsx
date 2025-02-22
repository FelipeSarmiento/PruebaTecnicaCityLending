import { useEffect } from "react";
import {Link} from "react-router-dom";

export function Register() {
    
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

    const handleSignUp = (event: any) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        if (!validatePassword(data.password)){
            alert("The password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
            return;
        }
        if (!validateEmail(data.email)){
            alert("Please enter a valid email.")
            return;
        }
        if (!validatePhone(data.phoneNumber)){
            alert("Please enter a valid phone number (10 characteres).")
            return;
        }
        
        
        createUser(data)
        
    }
    
    
    return (
        <div className="min-h-[calc(100vh - 100px)]">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-xl">
                    <form onSubmit={ handleSignUp } className="grid grid-cols-2 gap-x-10 gap-y-2">
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                Address
                            </label>
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
                            <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm py-1">Your password must contain at least:</span>
                                <ul className="text-xs px-1 list-inside list-disc text-gray-900">
                                    <li>8 characters</li>
                                    <li>1 Uppercase letter</li>
                                    <li>1 Number</li>
                                    <li>1 Special character</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        I have an account! &nbsp;
                        <Link to="/Auth/Login" className="font-semibold text-lime-500 hover:text-lime-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
    async function createUser(user: any) {
        const response = await fetch('/User/AddUser', {
            method: 'POST',
            body: JSON.stringify({
                "idUser": 0,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "address": user.address,
                "phoneNumber": user.phoneNumber,
                "email": user.email,
                "country": user.country,
                "city": user.city,
                "userType": "employee",
                "password": user.password,
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        
        if (response.ok){
            alert("User Added Successfully!")
            window.location.href = "/Auth/Login"
        }
        else {
            const data = await response.json();
            alert("Error: " + data.message)
        }
    }
}

