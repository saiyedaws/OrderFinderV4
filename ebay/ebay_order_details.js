let bg_port = chrome.runtime.connect({ name: "ebay_order_details" });

/*
console.log("Starting");
setTimeout(() => 
{
    console.log(scrapeOrderDetails());
    bg_port.postMessage({ type: 'from_order_details', orderDetails: scrapeOrderDetails()});
    

}, 1000);
*/

waitUntilElementExists(".row.item.ng-scope", (el) =>


    
	sendOrderDetailsToBackGround()
);

function sendOrderDetailsToBackGround() 
{
    makeQuantityElmBigger();



	console.log(scrapeOrderDetails());
	bg_port.postMessage({
		type: "from_order_details",
		orderDetails: scrapeOrderDetails(),
	});
}

function scrapeOrderDetails() {
	var shippingAddressNameVar = document.getElementById("shippingAddressName")
		.innerText;
	var shippingAddressLine1Var = document.getElementById("shippingAddressLine1")
		.innerText;
	var shippingAddressLine2Var = document.getElementById("shippingAddressLine2")
		.innerText;
	var shippingAddressCityStateZipVar = document
		.getElementById("shippingAddressCityStateZip")
		.innerText.toLowerCase();

	var shippingAddressCityStateZipObject = getshippingAddressCityStateZip();

	var cityVar = shippingAddressCityStateZipObject.cityVar;
	var provinceVar = shippingAddressCityStateZipObject.provinceVar;
	var postalCodeVar = shippingAddressCityStateZipObject.postalCodeVar;

	var itemID = document.querySelectorAll('td[id*="_ItemId"]')[0].innerText;
	var orderNumber = document
		.querySelectorAll('span[data-test-id*="orderId"]')[0]
		.innerText.replace("Order number: ", "");
	var orderQuantity = document.querySelectorAll('td[id*="_Quantity"]')[0]
		.innerText;

	var orderDetails = {
		shippingAddressName: shippingAddressNameVar,
		shippingAddressLine1: shippingAddressLine1Var,
		city: cityVar,
		province: provinceVar,
		postalCode: postalCodeVar,
		shippingAddressLine2: shippingAddressLine2Var,
		itemID: itemID,
		orderNumber: orderNumber,
		orderQuantity: orderQuantity,
	};

	return orderDetails;
}

function getshippingAddressCityStateZip(shippingAddressCityStateZipVar) {
	var shippingAddressCityStateZipVar = document
		.getElementById("shippingAddressCityStateZip")
		.innerText.toLowerCase();

	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" ab ",
		" alberta "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" bc ",
		" british columbia "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" mb ",
		" manitoba "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" nb ",
		" new brunswick "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" nl ",
		" newfoundland "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" nt ",
		" northwest territories "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" ns ",
		" nova scotia "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" nu ",
		" nunavut "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" on ",
		" ontario "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" pe ",
		" prince edward island "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" qc ",
		" quebec "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" sk ",
		" saskatchewan "
	);
	shippingAddressCityStateZipVar = shippingAddressCityStateZipVar.replace(
		" yt ",
		" yukon "
	);

	var provinceVar = "";
	var postalCodeVar = "";
	var temp = "";
	var cityVar = "";

	console.log(shippingAddressCityStateZipVar);

	temp = "alberta";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Alberta";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "british columbia";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "British Columbia";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "manitoba";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Manitoba";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "new brunswick";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "New Brunswick";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "newfoundland";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Newfoundland";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "northwest territories";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Northwest Territories";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "nova scotia";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Nova Scotia";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "nunavut";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Nunavut";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "ontario";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Ontario";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "prince edward island";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Prince Edward Island";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "quebec";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Quebec";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "saskatchewan";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Saskatchewan";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	temp = "yukon";
	if (shippingAddressCityStateZipVar.includes(temp)) {
		provinceVar = "Yukon";
		var cityRegex = ".*(?= " + temp + ")";
		cityVar = shippingAddressCityStateZipVar.match(cityRegex)[0];

		var postalCodeRegex = "(?<=" + temp + " ).*";
		postalCodeVar = shippingAddressCityStateZipVar.match(postalCodeRegex)[0];
	}

	var shippingAddressCityStateZipObject = {
		provinceVar: provinceVar,
		cityVar: cityVar,
		postalCodeVar: postalCodeVar,
	};

	return shippingAddressCityStateZipObject;
}


function makeQuantityElmBigger(){
    var elems = document.querySelectorAll("[id*='_Quantity']")
    console.log(elems.length);

    var quantityElm = elems[0];
    var quantity = quantityElm.innerText;


    quantityElm.style.fontSize = "x-large";
    quantityElm.style.color = "red";

    quantityElm.innerText = "QUANTITY: "+quantity
    
}