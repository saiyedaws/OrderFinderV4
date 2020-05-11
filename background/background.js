var ebay_sold_port;
var ebay_order_details_port;
var ebay_revise_listing_port;
var amazon_port;
var popup_port;


var processedItems = [];

chrome.extension.onConnect.addListener(port => 
{

    // Checks the connection source
    if(port.name === 'ebay_sold') 
    {

        ebay_sold_port = port;

        // Begins to listen messages from popup
        ebay_sold_port.onMessage.addListener(request => 
        {

 
            if(request.type === 'from_sold' && request.command === "pass_sold_details") 
            {

                getOrderDetails(request.soldDetails);
               
            }


            if(request.type === 'from_sold' && request.command === "inialize_page") 
            {

                ebay_sold_port.postMessage({
                    type: "from_background",
                    command: "append_completed_buttons",
                    processedItems: processedItems

                });
               
            }


            // Checks the form submission
             if(request.type === 'from_sold' && request.command === "open_order_details") 
            {
 
                openSoldDetails(request.details);
                    
            }



        });

        ebay_sold_port.onDisconnect.addListener(() => ebay_sold_port = null );
    }


        // Checks the connection source
        if(port.name === 'amazon') 
        {
    
            amazon_port = port;
    
            // Begins to listen messages from popup
            amazon_port.onMessage.addListener(request => 
            {
    
    
            });
    
            amazon_port.onDisconnect.addListener(() => amazon_port = null );
        }


        // Checks the connection source
        if(port.name === 'popup') 
        {
    
            popup_port = port;
    
            // Begins to listen messages from popup
            popup_port.onMessage.addListener(request => {
    
                // Checks the form submission
                if(request.type === 'from_popup' && request.command === "find_on_amazon") 
                {
 
                    findOnAmazon(request.details);

                    
                }


                if(request.type === 'from_popup' && request.command === "paste_address") 
                {
                    console.log("paste_address");

                    var savedPhoneNumber = localStorage.getItem("phoneNumber");
                    amazon_port.postMessage({type:"from_background",command: "paste_address", details: request.details, savedPhoneNumber:savedPhoneNumber });


                }









            });
    
            popup_port.onDisconnect.addListener(() => popup_port = null );
        }





});

async function getOrderDetails(soldDetails)
{

    var orderDetails = await fetchOrderDetails(soldDetails);
    var reviseListingDetails = await fetchReviseListingDetails(soldDetails);

    var details = 
    {
        sold:soldDetails,
        order:orderDetails,
        reviseListing:reviseListingDetails

    }

    console.log(details);

    processedItems.push(details);

    await createCopyButtonOnSoldPage(details);




}





function fetchOrderDetails(soldDetails)
{

    return new Promise(resolve => 
    {


        chrome.tabs.create({ url: soldDetails.orderDetailsUrl, active: false }, function(tab) {
    
            let ebay_order_tab_id = tab.id;


            chrome.extension.onConnect.addListener(port => 
            {
                
                // Checks the connection source
                if(port.name === 'ebay_order_details') 
                {

                    ebay_order_details_port = port;

                    // Begins to listen messages from popup
                    ebay_order_details_port.onMessage.addListener(request => 
                    {
                        
            
                        if(request.type === 'from_order_details' && request.orderDetails.itemID === soldDetails.itemID) 
                        {

                            chrome.tabs.remove(ebay_order_tab_id, () => 
                            {
                                resolve(request.orderDetails);
                            });
    
            
                        }


                    });

                    ebay_order_details_port.onDisconnect.addListener(() => ebay_order_details_port = null );
                }
                    
            });
        
            });



    });



}

function fetchReviseListingDetails(soldDetails)
{

    var itemRevisionUrl = "https://www.ebay.ca/sh/lst/active?status=ACTIVE&q_field1=listingId&q_op1=EQUAL&q_value1="+soldDetails.itemID+"&action=search";
    

    return new Promise(resolve => 
        {

            chrome.tabs.create({ url: itemRevisionUrl, active: false }, function(tab) 
            {

                let ebay_revise_listing_tab_id = tab.id;

                chrome.extension.onConnect.addListener(port => 
                    {
                        
                        // Checks the connection source
                        if(port.name === 'ebay_revise_listing') 
                        {
        
                            ebay_revise_listing_port = port;
        
                            // Begins to listen messages from popup
                            ebay_revise_listing_port.onMessage.addListener(request => 
                            {
                                
                    
                                if(request.type === 'from_revise_listing' && request.reviseListingDetails.itemID === soldDetails.itemID) 
                                {
        

                                    chrome.tabs.remove(ebay_revise_listing_tab_id, () => 
                                    {
                                        resolve(request.reviseListingDetails);
                                    });
            
                                    
                                }
        
        
                            });
        
                            ebay_revise_listing_port.onDisconnect.addListener(() => ebay_revise_listing_port = null );
                        }
                            
                    });


            });



        });


}

function openSoldDetails(details)
{
    return new Promise(resolve =>{
        chrome.tabs.create({ url: details.sold.orderDetailsUrl, active: true }, function(tab) 
        {
            resolve();
        });
    })
    
}

function findOnAmazon(details)
{
    return new Promise(resolve => {

        var sku = details.reviseListing.SKU;
        sku = atob(sku);
        if(sku.charAt(sku.length - 1) === '@') 
        {
            sku = sku.slice(0, -1) + '?th=1&psc=1';
        }
        sku = sku.replace(/\s+/g, '');
        var amazonItemUrl = 'https://www.amazon.ca/dp/' + sku;




        chrome.tabs.create({ url: amazonItemUrl, active: true }, function(tab) 
        {
            let amazon_tab_id = tab.id;
            resolve();

        });


    });


}

function createCopyButtonOnSoldPage(details)
{
    return new Promise(resolve => 
        {
            ebay_sold_port.postMessage({type:"from_background",command: "append_copy_button", details:details});

            resolve();
        });    
    

}