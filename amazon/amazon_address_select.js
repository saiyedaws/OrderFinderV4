bg_port.onMessage.addListener((request) => 
{

    if(request.type === 'from_background' && request.command === "paste_address") 
    {
        console.log("paste_address_from_background recieved");
        pasteBuyerAddress(request.details, request.savedPhoneNumber);
        console.log("req.savedPhoneNumber: "+request.savedPhoneNumber);

    }

});

function pasteBuyerAddress(details, savedPhoneNumber){

    console.log(details);
    console.log("savedPhoneNumber: "+savedPhoneNumber);


    document.querySelectorAll('[id*="enterAddressFullName"]')[0].value  = changeBuyerName(details);
    //document.getElementById('enterAddressFullName').value = changeBuyerName(details);

    try {
        document.getElementById('enterAddressAddressLine1').value = "- "+details.order.shippingAddressLine1;
    } catch (error) {
        document.querySelectorAll('[id*="enterAddressLine1"]')[0].value  = "- "+details.order.shippingAddressLine1;
        console.log(error);
    }

    // document.getElementById('enterAddressAddressLine1').value = "- "+details.order.shippingAddressLine1;

    try {
        document.querySelectorAll('[id*="enterAddressLine2"]')[0].value  = details.order.shippingAddressLine2;
    } catch (error) {
        document.getElementById('enterAddressAddressLine2').value = details.order.shippingAddressLine2;
        console.log(error);
    }


   //document.querySelectorAll('[id*="enterAddressLine2"]')[0].value  = details.order.shippingAddressLine2;
    //document.getElementById('enterAddressAddressLine2').value = details.order.shippingAddressLine2;


    document.querySelectorAll('[id*="enterAddressCity"]')[0].value  = details.order.city;
    //document.getElementById('enterAddressCity').value = details.order.city;

    document.querySelectorAll('[id*="enterAddressPostalCode"]')[0].value  = details.order.postalCode;
    //document.getElementById('enterAddressPostalCode').value = details.order.postalCode;
    
    document.querySelectorAll('[id*="enterAddressStateOrRegion"]')[0].value  = details.order.province;
    //document.getElementById("enterAddressStateOrRegion").value = details.order.province;

    document.querySelectorAll('[id*="enterAddressPhoneNumber"]')[0].value  = savedPhoneNumber;
   // document.getElementById('enterAddressPhoneNumber').value = savedPhoneNumber;


   try {
    document.getElementById("BusinessHours").selectedIndex = 1; 

   } catch (error) {
    console.log(error);
   }

 

    try {
        var businessHours = $('[name="address-ui-widgets-addr-details-business-hours"]'); // Yes, it's called .val(), not .value()
        businessHours.val("BOTH").change();

        setTimeout(() => {
            businessHours.val("BOTH").change();
        }, 100);

        setTimeout(() => {
            businessHours.val("BOTH").change();
        }, 200);
       
    
       } catch (error) {
    
    
        console.log(error);
       }
    

   






}



function changeBuyerName(details)
{
    var name = details.order.shippingAddressName;
    var letter = "xx";

    if(details.sold.username === "hockey-grandpa")
    {
        letter = "a";
        name = letter+"_"+name;

    }

    if(details.sold.username === "coach-cody")
    {
        letter = "b";
        name = letter+"_"+name;
    }

    if(details.sold.username === "healthy_planet")
    {
        letter = "c";
        name = letter+"_"+name;
    }

    if(details.sold.username === "tamah_95")
    {
        letter = "d";
        name = letter+"_"+name;
    }

    if(details.sold.username === "greba3714")
    {
        letter = "e";
        name = letter+"_"+name;
    }

    if(details.sold.username === "my_games_mart")
    {
        letter = "f";
        name = letter+"_"+name;
    }

    if(details.sold.username === "mymom-n-popshop")
    {
        letter = "g";
        name = letter+"_"+name;
    }

    if(details.sold.username === "hanchau75")
    {
        letter = "h";
        name = letter+"_"+name;
    }

    return name;

}
