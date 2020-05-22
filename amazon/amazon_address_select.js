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


    document.getElementById('enterAddressFullName').value = changeBuyerName(details);

    document.getElementById('enterAddressAddressLine1').value = "- "+details.order.shippingAddressLine1;

    document.getElementById('enterAddressAddressLine2').value = details.order.shippingAddressLine2;
    document.getElementById('enterAddressCity').value = details.order.city;
    document.getElementById('enterAddressPostalCode').value = details.order.postalCode;
    document.getElementById("enterAddressStateOrRegion").value = details.order.province;

    document.getElementById('enterAddressPhoneNumber').value = savedPhoneNumber;
    document.getElementById("BusinessHours").selectedIndex = 1; 






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
        letter = "a";
        name = letter+"_"+name;
    }

    if(details.sold.username === "healthy_planet")
    {
        letter = "b";
        name = letter+"_"+name;
    }

    if(details.sold.username === "tamah_95")
    {
        letter = "c";
        name = letter+"_"+name;
    }

    if(details.sold.username === "greba3714")
    {
        letter = "d";
        name = letter+"_"+name;
    }

    if(details.sold.username === "my_games_mart")
    {
        letter = "e";
        name = letter+"_"+name;
    }

    if(details.sold.username === "mymom-n-popshop")
    {
        letter = "f";
        name = letter+"_"+name;
    }

    if(details.sold.username === "hanchau75")
    {
        letter = "g";
        name = letter+"_"+name;
    }

    return name;

}
