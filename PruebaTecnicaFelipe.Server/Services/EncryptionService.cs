using System;
using System.Security.Cryptography;
using System.Text;

public class EncryptionService
{
    private readonly byte[] _key; // Clave secreta para el cifrado
    private readonly byte[] _iv;  // Vector de inicialización (IV)

    public EncryptionService(string key, string iv)
    {
        // Convierte la clave y el IV a bytes
        _key = Encoding.UTF8.GetBytes(key);
        _iv = Encoding.UTF8.GetBytes(iv);

        // Asegúrate de que la clave y el IV tengan el tamaño correcto
        if (_key.Length != 32) // AES-256 requiere una clave de 32 bytes
            throw new ArgumentException("La clave debe tener 32 caracteres (256 bits).");
        if (_iv.Length != 16)  // AES requiere un IV de 16 bytes
            throw new ArgumentException("El IV debe tener 16 caracteres (128 bits).");
    }

    // Método para encriptar una cadena de texto
    public string Encrypt(string plainText)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = _key;
            aesAlg.IV = _iv;

            // Crear un encriptador para realizar la transformación
            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

            // Crear un flujo de memoria para almacenar los datos encriptados
            using (var msEncrypt = new System.IO.MemoryStream())
            {
                using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (var swEncrypt = new System.IO.StreamWriter(csEncrypt))
                    {
                        // Escribir el texto plano en el flujo de cifrado
                        swEncrypt.Write(plainText);
                    }
                }

                // Convertir los datos encriptados a una cadena Base64
                return Convert.ToBase64String(msEncrypt.ToArray());
            }
        }
    }

    // Método para desencriptar una cadena de texto
    public string Decrypt(string cipherText)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = _key;
            aesAlg.IV = _iv;

            // Crear un desencriptador para realizar la transformación
            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

            // Convertir la cadena Base64 a bytes
            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            // Crear un flujo de memoria para almacenar los datos desencriptados
            using (var msDecrypt = new System.IO.MemoryStream(cipherBytes))
            {
                using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (var srDecrypt = new System.IO.StreamReader(csDecrypt))
                    {
                        // Leer el texto desencriptado del flujo de descifrado
                        return srDecrypt.ReadToEnd();
                    }
                }
            }
        }
    }
}