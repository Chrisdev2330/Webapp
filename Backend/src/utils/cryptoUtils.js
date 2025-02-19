import CryptoJS from 'crypto-js';

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, 'secreto').toString(); 
};

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secreto'); 
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptPassword, decryptPassword };