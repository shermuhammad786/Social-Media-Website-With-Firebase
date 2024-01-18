import { getData, getLoggedInUser, logout, updateData, uploadFile } from "../utils/functions.mjs";

let user_Name = document.querySelector("#user_Name")
let PostText = document.querySelector("#PostText");
let postEmail = document.querySelector("#postEmail")
let ProfilePic = document.getElementById("ProfilePic")
let phoneNumberHtml = document.querySelector("#phoneNumber");
let navProfilePic = document.getElementById("navProfilePic")
let LogoutBtn = document.querySelector("#LogoutBtn");


// modal Input 
let firstNameEdit = document.querySelector("#firstNameEdit")
let lastNameEdit = document.querySelector("#lastNameEdit")
let emailEdit = document.querySelector("#emailEdit")
let phoneNumberEdit = document.querySelector("#phoneNumberEdit")
let descrEdit = document.querySelector("#descrEdit")
let profileEdit = document.querySelector("#profileEdit")







let userId;
const getLoggedUser = async () => {
    const gettingLogUser = await getLoggedInUser()
    console.log(gettingLogUser)
    if (!gettingLogUser) return window.location.href = "../login.html"
    userId = gettingLogUser.uid;
    console.log(userId)
    const gettingData = await getData(userId, "users");
    const { name, email, phoneNumber, descr, profilePicture } = gettingData.data

    // console.log(profilePicture);
    user_Name.innerHTML = name;
    postEmail.innerHTML = email ? email : "No Email Updated";
    PostText.innerHTML = descr ? descr : "No Description Updated";
    phoneNumberHtml.innerHTML = phoneNumber ? phoneNumber : "No Phone Numebr Updated"

    navProfilePic.style.backgroundImage = `url(${profilePicture ? profilePicture : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fblack-profile-picture&psig=AOvVaw0QPbgxYLRACqugTuGMv9NC&ust=1705506900061000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIDRhrii4oMDFQAAAAAdAAAAABAJ"})`

    ProfilePic.style.backgroundImage = `url(${profilePicture ? profilePicture : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fblack-profile-picture&psig=AOvVaw0QPbgxYLRACqugTuGMv9NC&ust=1705506900061000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIDRhrii4oMDFQAAAAAdAAAAABAJ"})`

}
getLoggedUser();



// modal
let editBtn = document.querySelector("#editBtn");
let saveChanges = document.querySelector("#saveChanges");
let closeEditProfileModal = document.querySelector("#closeEditProfileModal");

// open modal 
const editBtnHandler = async () => {
    document.getElementById('editProfileModal').style.display = 'block';
}
editBtn.addEventListener("click", editBtnHandler)


// close modal 
const closeEditProfileModalHandler = () => {
    document.getElementById('editProfileModal').style.display = 'none';

}
closeEditProfileModal.addEventListener("click", closeEditProfileModalHandler)


// save changes in modal 
const saveChangesHandler = async () => {
    const data = {
        name: `${firstNameEdit.value}  ${lastNameEdit.value}`,
        email: emailEdit.value,
        phoneNumber: phoneNumberEdit.value,
        descr: descrEdit.value,
        // profilePic: uploadingFileUrl
    }
    // let uploadingFileUrl;
    // const uploadfileHandler = async () => {
    if (profileEdit.files[0]) {

        const profilePictureName = `${new Date().getTime()}-${profileEdit.files[0].name}`
        const uploadingFile = await uploadFile(profileEdit.files[0], profilePictureName)
        console.log(uploadingFile.status)
        if (uploadingFile.status) {
            data.profilePicture = uploadingFile.downloadURL;
        }
    }
    console.log(userId)
    const updatingData = await updateData(data, userId, "users");
    // console.log(updateData)
    if (updatingData.status) {
        alert(updatingData.message);
        document.getElementById('editProfileModal').style.display = 'none';
        // console.log(gettingData, "====>>>>  after data save")
    } else {
        alert(updatingData.message)
    }

    // window.location.reload()
}
saveChanges.addEventListener("click", saveChangesHandler)


// const updatingDataHandler = async ()=>{
// }
// updatingDataHandler()

const LogoutBtnHandler = async () => {
    const loggingOut = await logout();
    if (loggingOut.status) {
        window.location.href("../login.html")
    }
}
LogoutBtn.addEventListener("click", LogoutBtnHandler);




// var a = {}
// b = {key:'b'},
// c = {key:'c'};
// a[b] = 123;
// a[c] = 456;
// conosle.log(a[b])