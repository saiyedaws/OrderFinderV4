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

    var deliveryData = 
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

   


    var storedLegal = chrome.storage.local.get('deliveryData', function(deliveryData) 
    {
        console.log(deliveryData);
        //bg_port.postMessage({ type: 'from_amazon_order', amazonItemUrl: getCurrentUrl()});

    });

    return deliveryData;

}



function getDate()
 {
     
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime;

 }



function appendCustomOrderButton(orderDataNote)
{
    //var element = document.body;
    var element = document.getElementById("placeYourOrder");
    element.style.display = "none";

    var button = document.createElement("button");
    button.id = "custom_order_button";
    button.type = "button";
    button.innerHTML = "Order Now and Copy To Clipboard";
    //css
    button.style.color = "blue";
    button.style.padding = "15px 32px";

    element.parentElement.prepend(button);


    button.onclick = function () 
    {

       
        chrome.storage.local.get('deliveryData', function(storage) 
        {
            appendToLocalStorage(storage.deliveryData,"allOrderDetails");
         
    
        });

      
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = orderDataNote;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();


        console.log(orderDataNote);

        
        document.getElementById("placeYourOrder").click();

	};
   

}

async function makeNoteAndOrder()
{
    var deliveryData = getAmazonDeliveryData();

  

   
    var orderDataNote = await makeNote();

    await appendCustomOrderButton(orderDataNote);


}

function makeNote()
{
    console.log("Making Note");

    return new Promise((resolve)=>
    {

        chrome.storage.local.get('deliveryData', function(storage) 
        {
        
            console.log(storage);
    
    
            //ETA
            var deliveryDate = storage.deliveryData.deliveryDate;
            var pcID = localStorage.getItem("pcID");
            var email = localStorage.getItem("email") || "";
    
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
    
            var newdate = year + "/" + month + "/" + day;
            
    
    
            var orderDataNote = 
            "SS/ "+email+"/ "+pcID+"/ "+deliveryDate+" / Ordered on: "+newdate+" -";
    
            console.log(orderDataNote);
    
           
    
            resolve(orderDataNote);
    
            
            
    
    
        });

    });






}

waitUntilElementExists('.asin-title', (el) => makeNoteAndOrder());

