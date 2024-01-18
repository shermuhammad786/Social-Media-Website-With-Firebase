import { addInDBById, signUp, uploadFile } from "./utils/functions.mjs";

const name = document.getElementById('fullName');
const email = document.getElementById('email');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const cPassword = document.getElementById('cPassword');
const profilePicture = document.getElementById('profilePicture');
const signupBtn = document.getElementById('signupBtn');




const signupHandler = async () => {
    console.log("working signup handler")

    //checking if password and confirm password are same
    if (password.value !== cPassword.value) {
        alert('Password and Confirm Password does not match');
        return;
    }

    //checking if any field is empty
    if (!name.value || !email.value|| !password.value || !cPassword.value || !profilePicture.value) {
        alert('Please fill all the fields');
        return;
    }

    // creating data object to add in db
    const data = {
        name: name.value,
        email: email.value,
        // userName: userName.value,
        password: password.value
    }

    //calling signup function from utils/functions.mjs
    const registering = await signUp(email.value, password.value)
    if (registering.status) {
        const profilePictureName = `${new Date().getTime()}-${profilePicture.files[0].name}`
        //calling uploadFile function from utils/functions.mjs
        const upload = await uploadFile(profilePicture.files[0], profilePictureName)
        if (upload.status) {
            data.profilePicture = upload.downloadURL
            alert(upload.message , "profile upload successful")
        } else {
            alert(upload.message , "profile upload not success")
        }
        //calling addInDBById function from utils/functions.mjs
        const userAddInDB = await addInDBById(data, registering.data.user.uid, "users")
        if (userAddInDB.status) {
            alert(userAddInDB.message , "=====>>>>   user add in db OK")
            alert(registering.message , "=====>>>>   registering user OK")
            if(registering.status && userAddInDB.status && upload.status) window.location.href = "./home/index.html"
        } else {
            alert(userAddInDB.message , "=====>>>>   user add in db NOT OK")
        }
    } else {
        alert(registering.message , "=====>>>>  registering user NOT OK")
    }
    
}
signupBtn.addEventListener('click', signupHandler)