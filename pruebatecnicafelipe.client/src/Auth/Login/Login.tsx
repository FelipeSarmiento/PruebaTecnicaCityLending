import { Link } from "react-router-dom";

import { useAuth } from '../../context/AuthContext';

export function Login() {
    
    const { login } = useAuth();
    
    const handleSignIn = (event) => {
        event.preventDefault();
        
        const dataForm = new FormData(event.target);
        const data = Object.fromEntries(dataForm.entries());
        
        signIn(data)
        
    }
    
    return (
        <div className="min-h-[calc(100vh - 100px)]">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ handleSignIn } className="space-y-6">
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border-2 border-lime-500 px-3 py-1.5 text-sm/6 font-semibold text-lime-500 shadow-xs hover:bg-lime-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        ¿No estas registrado? &nbsp;
                        <Link to="/Auth/Register" className="font-semibold text-lime-500 hover:text-lime-500">
                             Registrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
    
    async function signIn(user){
        const response = await fetch("/User/GetUser", {
            method: "POST",
            body: JSON.stringify({
                "email": user.email,
                "password": user.password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const data = await response.json()
        if(response.ok){
            if (data.success){
                alert("Login successful")
                login(data.data)
            }
        } else {
            alert(data.message)
        }
    }
    
}
