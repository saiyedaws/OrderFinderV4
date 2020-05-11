let bg_port = chrome.runtime.connect({ name: "popup" });
try {
    updatePopupValues();
} catch (error) {
    
}




document.getElementById("main_form").addEventListener("submit", function(e) 
{
    e.preventDefault();


    document.getElementById("json").value = "";
    var textBox = document.getElementById("json");
    textBox.click();
    textBox.focus();
    document.execCommand('paste');



    var json = document.getElementById("json").value;


    var details = JSON.parse(json);
    console.log(details);
  

    bg_port.postMessage(
        
        {
             type: "from_popup",
             command: "find_on_amazon",
             details: details
    
        });
    
  
});



document.getElementById("paste_address_form").addEventListener("submit", function(e) 
{
    e.preventDefault();


    document.getElementById("json").value = "";
    var textBox = document.getElementById("json");
    textBox.click();
    textBox.focus();
    document.execCommand('paste');



    var json = document.getElementById("json").value;


    var details = JSON.parse(json);
    console.log(details);
  

    bg_port.postMessage(
        
        {
             type: "from_popup",
             command: "paste_address",
             details: details
    
        });
    
  
});





document.getElementById("phone_form").addEventListener("submit", function(e) 
{
    e.preventDefault();

    var phoneNumber = document.getElementById("phoneID").value;
    var pcID = document.getElementById("pcID").value;

    console.log(phoneNumber);
    console.log(pcID);

    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('pcID', pcID);

    var savedPhoneNumber = localStorage.getItem("phoneNumber");
    var savedPcID = localStorage.getItem("pcID");

    document.getElementById("savedPhoneID").innerText = savedPhoneNumber;
    document.getElementById("savedPCID").innerText = savedPcID;



    console.log("Saved Phone: "+savedPhoneNumber);


  
});



function updatePopupValues(){
    var savedPhoneNumber = localStorage.getItem("phoneNumber");
    var savedPcID = localStorage.getItem("pcID");

    console.log("Updated Phone Value: "+savedPhoneNumber);

    document.getElementById("savedPhoneID").innerText = savedPhoneNumber;
    document.getElementById("savedPCID").innerText = savedPcID;
}



