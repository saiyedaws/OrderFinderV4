// Saves options to chrome.storage
function save_phone() 
{

    var phoneNumber = document.getElementById("phoneID").value;
    var pcID = document.getElementById("pcID").value;

    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('pcID', pcID);
}
  


  document.getElementById('save_phone').addEventListener('click', save_phone);




  function save_profile() 
{

    var oldItems = JSON.parse(localStorage.getItem('emailArray')) || [];

    var newItem = 
    {
     'email': document.getElementById("email").value,
     'password': document.getElementById("password").value
    
    };
    
     oldItems.push(newItem);
    
     localStorage.setItem('emailArray', JSON.stringify(oldItems));

     console.log(oldItems);

}

document.getElementById('save_email').addEventListener('click', save_profile);


function clear_profile()
{
    console.log("Clearing Array");
    localStorage.removeItem("emailArray");
}

document.getElementById('clear_email').addEventListener('click', clear_profile);