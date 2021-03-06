let bg_port = chrome.runtime.connect({ name: "ebay_sold" });

//bg_port.postMessage({ type: 'from_sold', command: "inialize_page"});



bg_port.onMessage.addListener((request) => 
{

    if(request.type === 'from_background' && request.command === "append_copy_button") 
    {
        console.log(request.details);
        appendCopyDetailsButton(request.details);

    }


    if(request.type === 'from_background' && request.command === "append_completed_buttons") 
    {
        /*
        console.log(request.processedItems);

        setTimeout(() => {

            for (i = 0; i < request.processedItems.length; i++) 
            {
                var details = request.processedItems[i];
                appendCopyDetailsButton(details);
    
            }

            
        }, 300);
        */

       waitUntilElementExists('.process_address', addProcessedCopyButtons(request.processedItems));



    }



});



function addProcessedCopyButtons(processedItems)
{
    for (i = 0; i < processedItems.length; i++) 
    {
        var details = processedItems[i];
        appendCopyDetailsButton(details);

    }    
}


function findOrderNumberElement(orderNumber)
{
    var orderNumberElement = "";
    var orderNumbers = document.getElementsByClassName("item__order-number");

    for(var i = 0; i < orderNumbers.length; i++)
    {
        if(orderNumbers[i].innerText.includes(orderNumber))
        {
            orderNumberElement = orderNumbers[i];
            break;
        }
      
    }

    return orderNumberElement;
}

function appendCopyDetailsButton(details)
{
    /*
    //with xpath gets element that text contains ... saved to var thisHeading
    var xpath = "//span[contains(., '"+details.order.itemID+"')]";
    var headings = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null );
    var thisHeading = headings.iterateNext();
    */

    var thisHeading = findOrderNumberElement(details.order.orderNumber);

    var parent = thisHeading.parentElement.parentElement.parentElement;
    console.log(parent);

    var OrderDetailButtons = parent.getElementsByClassName("col-3")[0];
    console.log(OrderDetailButtons);

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Copy Address Now";
    btn.className = "copy_address";
    OrderDetailButtons.appendChild(btn);

    var json = JSON.stringify(details);
    //copyToClipboard(json); 


     //Send on click
    btn.onclick = function () 
    {
        console.log(details);
        copyToClipboard(json);
        bg_port.postMessage({ type: 'from_sold', command: "open_order_details", details: details}); 
        
    }


}

function appendButton(soldItem)
{

    var OrderDetailButtons = soldItem.getElementsByClassName("col-3")[0];
 

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Process Address";
    btn.className = "process_address";
    
    OrderDetailButtons.appendChild(btn);


    var orderDetailsUrl = OrderDetailButtons.querySelectorAll('.item__cta-wrapper a')[0].getAttribute("href");

        //Send on click
        btn.onclick = function () 
        {
            
            var itemID = soldItem.getElementsByClassName("item__itemid")[0].innerText.replace("Item ID: ","");
            var orderNumber = soldItem.getElementsByClassName("item__order-number")[0].innerText.replace("Order number: ","");;


            var username = document.getElementsByClassName("valign")[0].innerText.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            username = username.replace(/\n/g,"");
            username = username.replace(/- Visit.*/g,"");
            username = username.toLowerCase();

            
            var soldDetails = {
                itemID: itemID,
                orderNumber: orderNumber,
                orderDetailsUrl: orderDetailsUrl,
                username: username
            }


            console.log(soldDetails);


            bg_port.postMessage({ type: 'from_sold', command: "pass_sold_details", soldDetails: soldDetails});
    
        }
}


waitUntilElementDoesntExists();


function waitUntilElementDoesntExists()
{
   
        var selector = ".process_address";


        var el = document.querySelector(selector);
        console.log("Checking");

        if (!el)
        {
            console.log("Not Found");
            addProcessButtonToAllSoldCards();
            bg_port.postMessage({ type: 'from_sold', command: "inialize_page"});
        }
        
        setTimeout(() => waitUntilElementDoesntExists(), 3000);
}
        




function addProcessButtonToAllSoldCards()
{

    var soldItems = document.getElementsByClassName("sold-itemcard");
    for (var i = 0; soldItems[i]; i++) 
    {
        try
        {
            appendButton(soldItems[i]);
        }
        catch{};
      
        
    }

}











function copyToClipboard(text) 
{
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


