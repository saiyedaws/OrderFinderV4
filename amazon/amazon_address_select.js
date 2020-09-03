bg_port.onMessage.addListener((request) => 
{

    if(request.type === 'from_background' && request.command === "paste_address") 
    {
        console.log("paste_address_from_background recieved");
        pasteBuyerAddress(request.details, request.savedPhoneNumber);
        console.log("req.savedPhoneNumber: "+request.savedPhoneNumber);

    }

});

function pasteBuyerAddress(details, savedPhoneNumber)
{

    console.log(details);
    console.log("savedPhoneNumber: "+savedPhoneNumber);


    var fullName = changeBuyerName(details);
    pasteFullName(fullName);
  
    var addressLine1 = "- "+details.order.shippingAddressLine1;
    pasteAddressLine1(addressLine1);

    var addressLine2 = details.order.shippingAddressLine2;
    pasteAddressLine2(addressLine2);

    var city = details.order.city;
    pasteCity(city);


    var province = details.order.province;
    setTimeout(() => {
        pasteProvince(province);
    }, 500);
  

    var postalCode = details.order.postalCode;
    pastePostalCode(postalCode);

    setTimeout(() => {
        pasteBusinessHours();
    }, 1000);
    

    var phoneNumber = savedPhoneNumber;
    pastePhoneNumber(phoneNumber);

    
   



 

   




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


function pasteFullName(name)
{

  var nameField = document.querySelectorAll('input[id*="enterAddressFullName"]')[0];
  nameField.value = name;

}

function pasteAddressLine1(addressLine1){
  var addressLine1Field = document.querySelectorAll('input[id*="AddressLine1"]')[0];
  addressLine1Field.value = addressLine1;

}

function pasteAddressLine2(addressLine2){
  var addressLine1Field = document.querySelectorAll('input[id*="AddressLine2"]')[0];
  addressLine1Field.value = addressLine2;

}

function pasteCity(city){

  var cityField = document.querySelectorAll('input[id*="enterAddressCity"]')[0];
  cityField.value = city;
}


function pasteProvince(province){

  var provinceField = $('select[id*="enterAddressStateOrRegion"]');
  provinceField.val(province).change();

}

function pastePostalCode(postalCode){

  var postalCodeField = document.querySelectorAll('input[id*="enterAddressPostalCode"]')[0];
  postalCodeField.value = postalCode;
 


}

function pastePhoneNumber(phoneNumber){

  var phoneNumberField = document.querySelectorAll('input[id*="enterAddressPhoneNumber"]')[0];
  phoneNumberField.value = phoneNumber;
 
}

function pasteBusinessHours(){


  var businessHoursField = $('select[id*="usiness"],select[name*="usiness"]'); // Yes, it's called .val(), not .value()
  businessHoursField.val("BOTH").change();

}