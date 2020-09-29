let bg_port = chrome.runtime.connect({ name: "popup" });

try {
    updatePcDataPopupValues();
} catch (error) {
    
}

try {
    updatePopupAmazonBuyerDataValues();
} catch (error) {
    
}

try {
    updateEmailSelectOptions();
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







function updatePcDataPopupValues()
{
    var savedPhoneNumber = localStorage.getItem("phoneNumber");
    var savedPcID = localStorage.getItem("pcID");
    var savedEmail = localStorage.getItem("email") || "";

    console.log("Updated Phone Value: "+savedPhoneNumber);

    document.getElementById("savedPhoneID").innerText = savedPhoneNumber;
    document.getElementById("savedPCID").innerText = savedPcID;
    document.getElementById("savedEmailID").innerText = savedEmail;
}


function updatePopupAmazonBuyerDataValues(){
    chrome.storage.local.get('deliveryData', function(storage) 
    {
        console.log(storage);


        document.getElementById("amazon_item_title").innerText = storage.deliveryData.title;
        document.getElementById("amazon_item_image").setAttribute("src", storage.deliveryData.itemImage);

        document.getElementById("amazon_total_price").innerText = "Order Total: CDN$"+storage.deliveryData.totalPurchasePrice;
        document.getElementById("amazon_buyer_address").innerText = storage.deliveryData.buyerAddress;
        document.getElementById("amazon_delivery_date").innerText = storage.deliveryData.deliveryDate;

    });

}




function updateEmailSelectOptions()
{

    var sel = document.getElementById('profile');

    var profiles = JSON.parse(localStorage.getItem('emailArray')) || [];

    console.log(profiles);

    for(var i = 0; i < profiles.length; i++)
    {
        console.log(profiles[i].email);

        //<option value="0">Default</option>
        var opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild( document.createTextNode(profiles[i].email) );

        // set value property of opt
        opt.value = i+1; 



        sel.appendChild(opt); 
    }



}


function getSelectedEmail(){
    var profile = document.getElementById("profile");
    var profileValue = profile.options[profile.selectedIndex].value;
    var profileEmail = profile.options[profile.selectedIndex].innerText;

    console.log(profileValue);
    console.log(profileEmail);

    localStorage.setItem('email', profileEmail);
    document.getElementById("savedEmailID").innerText = profileEmail;

}

document.getElementById('save_email_button').addEventListener('click', getSelectedEmail);


function makeNote()
{
    console.log("Making Note");


    chrome.storage.local.get('deliveryData', function(storage) 
    {
        console.log("Making Note");
        console.log(storage);


        //ETA
        var deliveryDate = storage.deliveryData.deliveryDate;
        var pcID = localStorage.getItem("pcID");
        var email = localStorage.getItem("email") || "";

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = year + "/" + month + "/" + day;
        


        var note = 
        "SS/ "+email+"/ "+pcID+"/ "+deliveryDate+" / Ordered on: "+newdate+" -";

        console.log(note);

        document.getElementById("noteID").innerText = note;



        bg_port.postMessage(
        
            {
                 type: "from_popup",
                 command: "copy_note",
                 note: note
        
            });
        


    });



}

document.getElementById('make_note_button').addEventListener('click', makeNote);

document.getElementById('view_orders').addEventListener('click', viewOrders);

function viewOrders(){

   

    var allOrderDetails = JSON.parse(localStorage.getItem('allOrderDetails'));

    
    console.log('allOrderDetails',allOrderDetails);

    chrome.storage.local.get('allOrderDetails', function(storage) 
    {
        console.log('storage.allOrderDetails',storage.allOrderDetails);
    });
  



   

}