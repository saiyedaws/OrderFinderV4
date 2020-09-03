

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

function selectBusinessHours(){


  var businessHoursField = $('select[id*="usiness"],select[name*="usiness"]'); // Yes, it's called .val(), not .value()
  businessHoursField.val("BOTH").change();

}