checkBoxes();
addAutoOrderButton();

function checkBoxes() {
	addGiftOption();
	applyCoupon();
}

function saveAddressToLocalStorage() {
	document.getElementById("json").value = "";
	var textBox = document.getElementById("json");
	textBox.click();
	textBox.focus();
	document.execCommand("paste");

	var json = document.getElementById("json").value;

    var details = JSON.parse(json);
    
	console.log(details);

    localStorage.setItem("details", JSON.stringify(details));
    

  
    //var detailsLocalStorage = JSON.parse(localStorage.getItem('details'));
   // console.log("detailsLocalStorage",detailsLocalStorage);
    
}

function addAutoOrderButton() {
	var buybox = document.getElementById("desktop_buybox");

	var autoOrderButton = document.createElement("button");
	autoOrderButton.id = "auto_order_id";
	autoOrderButton.innerHTML = "Auto Order This Item";

	var textBox = document.createElement("input");
	textBox.type = "text";
	textBox.placeholder = "Leave Blank";
	textBox.id = "json";

	buybox.prepend(autoOrderButton);
	buybox.prepend(textBox);

	autoOrderButton.onclick = function () {
		try {
			saveAddressToLocalStorage();
		} catch (error) {}

        
        
		document.getElementById("add-to-cart-button").click();

		chrome.runtime.sendMessage(
			{ type: "from_amazon", command: "start_auto_order" },
			(tabId) => {
				console.log("My tabId is", tabId);
			}
		);

		//click no warranty
		setTimeout(() => {
			try {
				document.getElementById("siNoCoverage").click();
			} catch (error) {}
        }, 2000);
        
        		//click no warranty
		setTimeout(() => {
			try {
                document.getElementById("attachSiNoCoverage").click();
                proceedToCheckout();

			} catch (error) {}
        }, 2500);
        

	};
}

function proceedToCheckout(){
    try {
        setTimeout(() => {
			try {
                document.getElementById("attach-sidesheet-checkout-button").click();
                

			} catch (error) {}
        }, 2000);
    } catch (error) {
        
    }
}

function applyCoupon() {
	try {
		var couponElement = document.getElementById("vpcButton");
		var checkBox = couponElement.querySelector("input");
		checkBox.click();
	} catch (error) {}
}

function addGiftOption() {
	try {
		document.getElementById("gift-wrap").click();
	} catch (error) {}
}
