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


    return decodeHTMLEntities(deliveryDate);
};

function decodeHTMLEntities(text) 
{
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}


function getAmazonDeliveryData(){

    deliveryData = 
    {
        totalPurchasePrice: getTotalPurchasePrice(),
        deliveryDate: getDeliveryDate(),
        title: document.getElementsByClassName("asin-title")[0].innerText,
        buyerAddress: document.getElementsByClassName("displayAddressUL")[0].innerText,
        itemImage: document.getElementsByClassName("a-column a-span3")[0].querySelectorAll("img")[0].getAttribute("src"),
        date: getDate()

    }

    console.log(deliveryData);



    chrome.storage.local.set({
        'deliveryData': deliveryData
    });

    appendToLocalStorage(deliveryData);


    var storedLegal = chrome.storage.local.get('deliveryData', function(deliveryData) 
    {
        console.log(deliveryData);
        //bg_port.postMessage({ type: 'from_amazon_order', amazonItemUrl: getCurrentUrl()});

    });

}

function appendToLocalStorage(newItem)
{
    /*

var oldItems = JSON.parse(localStorage.getItem('allOrderDetails')) || [];

oldItems.push(newItem);

console.log('newItem',newItem);
console.log('oldItems',oldItems);

localStorage.setItem('allOrderDetails', JSON.stringify(oldItems));
*/

chrome.storage.local.get('allOrderDetails', function(storage) 
{
    console.log('storage.allOrderDetails',storage.allOrderDetails);

    if(!Array.isArray(storage.allOrderDetails)){
        var oldItems = [];

        console.log("Is not array");

    }else{
        var oldItems = storage.allOrderDetails;
        console.log("Is array");
    }

    oldItems.push(newItem);

   
    chrome.storage.local.set({
        'allOrderDetails': oldItems
    });

});




}

function getDate()
 {
     
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime;

 }





waitUntilElementExists('.asin-title', (el) => getAmazonDeliveryData());

