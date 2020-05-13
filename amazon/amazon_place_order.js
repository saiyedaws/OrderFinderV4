function getTotalPurchasePrice()
{
    var totalPrice = "N/A";
    var orderSummaryElements = document.getElementsByClassName("small-line-height");

    for(var i = 0; i < orderSummaryElements.length; i++)
    {
        if(orderSummaryElements[i].innerText.includes("Total:"))
        {
            var orderSummaryTotal = orderSummaryElements[i].getElementsByClassName("a-text-right aok-nowrap a-nowrap")[0];
            totalPrice = orderSummaryTotal.innerText.replace("CDN$ ","");
            break;
        }
      
    }

    return totalPrice;
}






function getDeliveryDate()
{
    var deliveryDate = "ETA N/A";
    var date = document.getElementsByClassName("a-row a-text-bold a-size-medium a-spacing-small")[0];



    /*
    var month = date.children[1].innerText;
    var day = date.children[2].innerText;
    var year = date.children[3].innerText;

    deliveryDate = "ETA "+month+" "+day+" "+year;
    */

   deliveryDate = date.innerText;

    return deliveryDate;
};


function getAmazonDeliveryData(){

    deliveryData = 
    {
        totalPurchasePrice: getTotalPurchasePrice(),
        deliveryDate: getDeliveryDate(),
        title: document.getElementsByClassName("asin-title")[0].innerText,
        buyerAddress: document.getElementsByClassName("displayAddressUL")[0].innerText,
        itemImage: document.getElementsByClassName("a-column a-span3")[0].querySelectorAll("img")[0].getAttribute("src")


    }

    console.log(deliveryData);



    chrome.storage.local.set({
        'deliveryData': deliveryData
    });


    var storedLegal = chrome.storage.local.get('deliveryData', function(deliveryData) 
    {
        console.log(deliveryData);
        //bg_port.postMessage({ type: 'from_amazon_order', amazonItemUrl: getCurrentUrl()});

    });

}




waitUntilElementExists('.asin-title', (el) => getAmazonDeliveryData());

