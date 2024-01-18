import { addInDB, addInDBById, deletData, getAllDataOrderedByTimestamp, getData, getLoggedInUser, logout, updateData, uploadFile } from "../utils/functions.mjs";


let textInput = document.querySelector("#textInput");
let post = document.querySelector("#post");
let Imagepost = document.querySelector("#Imagepost");
let userName = document.querySelector("#userName");
let editPost = document.querySelector("#editPost");
let deletPost = document.querySelector("#deletPost");
let postedText = document.querySelector("#postedText");
let post_imageHtml = document.querySelector("#post_image");
let postsDiv = document.querySelector("#postsDiv");
let profileImageUser = document.querySelector("#profileImageUser");
let navbarUserName = document.querySelector("#navbarUserName");
let navbarUserProfile = document.querySelector("#navbarUserProfile");
let LogoutBtn = document.querySelector("#LogoutBtn");


// navbar dropdown profile 
window.toggleDropdown = ()=> {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === "block") {
              openDropdown.style.display = "none";
          }
      }
  }
}


// let gettingUserId = async ()=>{

const getUser = await getLoggedInUser();
if (!getUser) window.location.href = "../login.html"
const gettingdata = await getData(getUser.uid, "users")
profileImageUser.src = gettingdata?.data?.profilePicture || "../assests/download.png";
navbarUserProfile.src = gettingdata?.data?.profilePicture || "../assests/download.png";
navbarUserName.innerHTML = gettingdata?.data?.name;

// creating Post 
let postDate = new Date;
let postSec = postDate.getSeconds();



const postHandler = async (element) => {
  element.preventDefault()
  postsDiv.innerHTML = "";
  if (textInput.value == "" && Imagepost.files.length == 0) return alert("Please Write Some Thing")
  const posts = {
    userText: textInput.value,
    userId: getUser.uid,
    user: gettingdata.data,
    likeColor:"blue",
    roll:"user",
  }
  // console.log(getUser, "===>>>.get user")
  console.log("post handler working....")
  if (Imagepost.files[0]) {
    const imageName = `${Date.now()}-${Imagepost.files[0].name}`
    const uploadImage = await uploadFile(Imagepost.files[0], imageName);
    if (uploadImage.status) {

      posts.iamgeUrl = uploadImage.downloadURL;
    }
  }
  console.log(posts, "===>>>> posts")
  const addingPostsInDB = await addInDB(posts, "posts");
  if (addingPostsInDB.status) {

  } else {
    // console.log(addingPostsInDB.message, "====>>>> add post in db")
  }
  textInput.value = "";
  Imagepost.value = "";
  displayingPosts();
}
post.addEventListener("click", postHandler)

let displayInput = document.getElementById("displayInput");
let displayPic = document.getElementById("displayPic")

let editBtn = document.querySelector("#editBtn");
let saveChanges = document.querySelector("#saveChanges");
let descrEdit = document.querySelector("#descrEdit");
let profileEdit = document.querySelector("#profileEdit");
let closeEditProfileModal = document.querySelector("#closeEditProfileModal");

window.editPostHandler = async idpost => {
  document.getElementById('editProfileModal').style.display = 'block';
  saveChanges.setAttribute("onclick", `savePostHandler('${idpost}')`);
}

const closeEditProfileModalHandler = () => {
  document.getElementById('editProfileModal').style.display = 'none';

}
closeEditProfileModal.addEventListener("click", closeEditProfileModalHandler)

let data;
window.savePostHandler = async id => {
  postsDiv.innerHTML = "";
   data = {
    userText: descrEdit.value,
    userId: getUser.uid,
    user: gettingdata.data,
    likeColor:"blue"
  }
  if (profileEdit.files[0]) {
    const profilePictureName = `${new Date().getTime()}-${profileEdit.files[0].name}`
    const uploadingFile = await uploadFile(profileEdit.files[0], profilePictureName)
    console.log(uploadingFile.status)
    if (uploadingFile.status) {
      data.iamgeUrl = uploadingFile.downloadURL;
    }
  }
  console.log(data, "===>>>> post data")

  const updatingData = await updateData(data, id, "posts");
  if (updatingData.status) {
    alert('Changes saved!');
    displayingPosts()
  } else {
    updatingData.message
  }

  document.getElementById('editProfileModal').style.display = 'none';
}

let exitTimee;
let postlike = "sher";
let singlePost;
const displayingPosts = async () => {
  const displayPosts = await getAllDataOrderedByTimestamp("posts")
  if (displayPosts.status) {
    console.log(displayPosts.message);
  } else {
    alert(displayPosts.message)
  }
  displayPosts.data.reverse().forEach(post => {
    console.log(post ,  "====>>>> single post")
    singlePost = post
    // getting post time 

    const getTime = new Date()
    const postTime = post.timestamp.toDate();
    var milliseconds = getTime - postTime;
    var minutes = Math.floor(milliseconds / 60000);
    var secondss = Math.floor(milliseconds / 1000);
    var hours = Math.floor(milliseconds / 3600000);
    var days = Math.floor(milliseconds / 86400000);
    var years = Math.floor(milliseconds / 31536000000);
    // console.log(minutes, secondss, hours)
    if (secondss < 0) {
      secondss = 0;
    } else {
      secondss
    }
    exitTimee = `${secondss} seconds ago`;
    if (secondss >= 60) {
      exitTimee = `${minutes} minutes ago`
    }
    if (minutes >= 60) {
      exitTimee = `${hours} hours ago`
    }
    if (hours >= 24) {
      exitTimee = `${days} days ago`
    }
  if(days >= 365){
    exitTimee = `${years} years ago`
  }
console.log(getUser)
if(getUser.uid == post.userId){
  console.log("match" , post.user.name)

}
    let puttedMaterial = `
        <div class="main_container_post">
         <div class="post">
           <div class="post__top">
             <img class="user__avatar post__avatar" src="${post?.user?.profilePicture}" />
             <div class="post__topInfo d-flex justify-content-between  w-100">
               <div>
                 <h3 id="userName">${post?.user?.name}</h3>
               <p>${exitTimee}</p>
               </div>

               <div>
                 <div class="dropdown">
                   <button class="btn dropdown w-100" type="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                     <li class="lh-1 ms-3"></li>
                     <li class="lh-1 ms-3"></li>
                     <li class="lh-1 ms-3"></li>
                   </button>
                   <ul class="dropdown-menu">
                     <li class="dropdown-item for-all-color" id="editPost" onclick="editPostHandler('${post.id}')">Edit Post</li>
                     <li class="dropdown-item for-all-color" id="deletPost" onclick="deletPostHandler('${post.id}')">Delet Post</li>
                   </ul>
                 </div>
               </div>

             </div>
           </div>

           <div class="post__bottom">
             <p id="postedText">${post.userText ? post.userText : ""}</p>
           </div>

           <div class="post__image">
             <img id="post_image"
               src="${post.iamgeUrl ? post.iamgeUrl : ""}" />
           </div>

           <div class="post__options">
             <div class="post__option" onclick="likebtnHandler(this)">
             <span class="fa fa-thumbs-up"></span>
               <p onclick="likebtnHandler(this)">Like</p>
             </div>

             <div class="post__option">
               <i class="uil uil-comment-alt"></i>
               <p>Comment</p>
             </div>

             <div class="post__option">
               <i class="uil uil-share"></i>
               <p>Share</p>
             </div>
           </div>
         </div>
       </div>
       `
    postsDiv.innerHTML += puttedMaterial
  });
}
displayingPosts();

  window.likebtnHandler = async e =>{
let color;
  if(e.children[0].style.color == "blue"){
    e.children[0].style.color = "gray"
    color = "gray";
  }else{
    e.children[0].style.color = "blue";
    color = "blue"
  }
  console.log(color)
}
window.deletPostHandler = async (postId)=>{
  const deletingPost = await deletData("posts" , postId);
  if(deletingPost.status){
    alert(deletingPost.message)
  }else{
    alert(deletingPost.message);
  }
}

// logout 
const LogoutBtnHandler = async ()=>{
  const loggingOut = await logout();
  if(loggingOut.status){
    alert(loggingOut.message);
      window.location.href = "../login.html" 
      // alert("log out successful")
  }
  }
  LogoutBtn.addEventListener("click",LogoutBtnHandler); 



//   // Assuming you have a function to update the user's profile picture in the authentication system
// // Update this function according to the authentication system you are using
// const updateProfilePictureInAuth = async (newProfilePictureUrl) => {
//   // Implementation for updating profile picture in authentication system
//   // For example, if you are using Firebase Authentication:
//   await firebase.auth().currentUser.updateProfile({
//     photoURL: newProfilePictureUrl
//   });
// };

// // Function to update the profile picture in the database for all user posts
// const updateProfilePictureInPosts = async (userId, newProfilePictureUrl) => {
//   // Assuming you have a function to update user profile pictures in the posts collection
//   // Update this function based on your database structure and operations
//   // For example, if you are using Firebase Firestore:
//   const postsRef = firebase.firestore().collection('posts');
//   const userPostsQuery = postsRef.where('userId', '==', userId);

//   try {
//     const userPostsSnapshot = await userPostsQuery.get();

//     userPostsSnapshot.forEach(async (doc) => {
//       await doc.ref.update({
//         userProfilePicture: newProfilePictureUrl
//       });
//     });

//     console.log('Profile picture updated in posts.');
//   } catch (error) {
//     console.error('Error updating profile picture in posts:', error);
//   }
// };

// // Example usage when the user changes their profile picture
// const newProfilePictureUrl = '...'; // Replace with the new profile picture URL
// const userId = '...'; // Replace with the user's ID

// // Update profile picture in authentication system
// await updateProfilePictureInAuth(newProfilePictureUrl);

// // Update profile picture in posts
// await updateProfilePictureInPosts(userId, newProfilePictureUrl);
