bg_port.onMessage.addListener((request) => 
{

    if(request.type === 'from_background' && request.command === "paste_address") 
    {
        console.log("paste_address_from_background recieved");
        pasteBuyerAddress(request.details);

    }

});

function pasteBuyerAddress(details){

    console.log(details);


    document.getElementById('enterAddressFullName').value = changeBuyerName(details);

    document.getElementById('enterAddressAddressLine1').value = "- "+details.order.shippingAddressLine1;

    document.getElementById('enterAddressAddressLine2').value = details.order.shippingAddressLine2;
    document.getElementById('enterAddressCity').value = details.order.city;
    document.getElementById('enterAddressPostalCode').value = details.order.postalCode;
    document.getElementById("enterAddressStateOrRegion").value = details.order.province;


    document.getElementById('enterAddressPhoneNumber').value = "N/A - Phone Number";
    document.getElementById("BusinessHours").selectedIndex = 1; 






}



function changeBuyerName(details)
{
    var name = details.order.shippingAddressName;

    if(details.sold.username === "hockey-grandpa")
    {
        name = name + " a";
    }

    if(details.sold.username === "coach-cody")
    {
        name = name + " b";
    }

    if(details.sold.username === "healthy_planet")
    {
        name = name + " c";
    }

    if(details.sold.username === "tamah_95")
    {
        name = name + " d";
    }

    if(details.sold.username === "greba3714")
    {
        name = name + " e";
    }

    if(details.sold.username === "my_games_mart")
    {
        name = name + " f";
    }

    if(details.sold.username === "mymom-n-popshop")
    {
        name = name + " g";
    }

    if(details.sold.username === "hanchau75")
    {
        name = name + " h";
    }

    return name;

}
