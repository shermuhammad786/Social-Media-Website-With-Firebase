// // Given Unix timestamp in milliseconds
// var timestamp = 1641901801000; // Replace this with your timestamp

// // Create a new Date object using the timestamp
// var exitTime = new Date(timestamp);

// // Extract hours, minutes, and seconds
// var hours = exitTime.getHours();
// var minutes = exitTime.getMinutes();
// var seconds = exitTime.getSeconds();

// console.log("Timestamp:", timestamp);
// console.log("Exit Time:", exitTime);
// console.log("Hours:", hours);
// console.log("Minutes:", minutes);
// console.log("Seconds:", seconds);
// document.addEventListener('DOMContentLoaded', function () {
//     const bottomAlert = document.getElementById('bottomAlert');

//     // Show the alert
//     function showAlert() {
//         bottomAlert.classList.add('show');
//     }

//     // Hide the alert
//     function hideAlert() {
//         bottomAlert.classList.remove('show');
//     }

//     // Trigger the alert after a delay (e.g., 3 seconds)
//     setTimeout(showAlert, 3000);

//     // You can also provide a way for users to dismiss the alert
//     bottomAlert.addEventListener('click', hideAlert);
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const showAlertBtn = document.getElementById('showAlertBtn');
//     const bottomAlert = document.getElementById('bottomAlert');

//     // Show the alert when the button is clicked
//     showAlertBtn.addEventListener('click', function () {
//         bottomAlert.classList.add('show');

//         // You can also set a timeout to hide the alert after a certain duration
//         setTimeout(function () {
//             bottomAlert.classList.remove('show');
//         }, 3000); // Adjust the duration as needed
//     });
// });


function showBottomAlert() {
    var bottomAlert = document.getElementById('bottomAlert');
    bottomAlert.classList.remove('hidden');
  
    setTimeout(function () {
      bottomAlert.classList.add('hidden');
    }, 3000); // Hide the alert after 3 seconds (adjust as needed)
  }
  
  