import { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

export const App = ({children} : any) => {
    // @ts-ignore
    const { checkSession } = useAuth();

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

const AuthContext = createContext(null);

const SECRET_KEY = '3a7F$9kLpQr#2vY8wXz1tBmCnDcEeGh4jH'; // Cambia esto por una clave segura

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState(null);

    const encryptData = (data: any) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    };

    const decryptData = (ciphertext: any) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    const login = (userData: any) => {
        const encryptedUser = encryptData(userData);
        localStorage.setItem('userSession', encryptedUser);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userSession');
        setUser(null);
    };

    const checkSession = () => {
        const encryptedUser = localStorage.getItem('userSession');
        if (encryptedUser) {
            const userData = decryptData(encryptedUser);
            setUser(userData);
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout, checkSession } as any}>
            <App children={children} />
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
