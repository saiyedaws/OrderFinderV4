let bg_port = chrome.runtime.connect({ name: "ebay_order_details" });

/*
console.log("Starting");
setTimeout(() => 
{
    console.log(scrapeOrderDetails());
    bg_port.postMessage({ type: 'from_order_details', orderDetails: scrapeOrderDetails()});
    

}, 1000);
*/


waitUntilElementExists('.row.item.ng-scope', (el) => sendOrderDetailsToBackGround());


function sendOrderDetailsToBackGround()
{
    console.log(scrapeOrderDetails());
    bg_port.postMessage({ type: 'from_order_details', orderDetails: scrapeOrderDetails()});

}



function scrapeOrderDetails()
{
    
var shippingAddressNameVar = document.getElementById("shippingAddressName").innerText;
var shippingAddressLine1Var = document.getElementById("shippingAddressLine1").innerText;
var shippingAddressLine2Var = document.getElementById("shippingAddressLine2").innerText;
var shippingAddressCityStateZipVar = document.getElementById("shippingAddressCityStateZip").innerText;

var cityRegex = ".*(?= [A-Z]{2,3} )";
var cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

var provinceRegex = "(?<= )[A-Z]{2}(?= )";
var provinceVar = shippingAddressCityStateZipVar.match(provinceRegex)[0];


if(provinceVar == "AB")
{
    provinceVar = "Alberta";
    console.log("provinceVar:"+provinceVar);

}

if(provinceVar == "BC")
{
    provinceVar = "British Columbia";
    console.log("provinceVar:"+provinceVar);
}

if(provinceVar == "MB")
{
    provinceVar = "Manitoba";
    console.log("provinceVar:"+provinceVar);

}

if(provinceVar == "NB")
{
    provinceVar = "New Brunswick";
    console.log("provinceVar:"+provinceVar);

}

if(provinceVar == "NL")
{
    provinceVar = "Newfoundland";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "NT")
{
    provinceVar = "Northwest Territories";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "NS")
{
    provinceVar = "Nova Scotia";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "NU")
{
    provinceVar = "Nunavut";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "ON")
{
    provinceVar = "Ontario";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "PE")
{
    provinceVar = "Prince Edward Island";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "QC")
{
    provinceVar = "Quebec";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "SK")
{
    provinceVar = "Saskatchewan";
    console.log("provinceVar: "+provinceVar);

}

if(provinceVar == "YT")
{
    provinceVar = "Yukon";
    console.log("provinceVar: "+provinceVar);

}


var postalCodeRegex = "(?<= [A-Z]{2,3} ).*";
var postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];




var itemID = document.querySelectorAll('td[id*="_ItemId"]')[0].innerText;
var orderNumber = document.querySelectorAll('span[data-test-id*="orderId"]')[0].innerText.replace("Order number: ","");
var orderQuantity = document.querySelectorAll('td[id*="_Quantity"]')[0].innerText;

var orderDetails = 
{
    shippingAddressName: shippingAddressNameVar,
    shippingAddressLine1: shippingAddressLine1Var,
    city: cityVar,
    province: provinceVar,
    postalCode: postalCodeVar,
    shippingAddressLine2: shippingAddressLine2Var,
    itemID: itemID,
    orderNumber: orderNumber,
    orderQuantity: orderQuantity    
}


return orderDetails;

}