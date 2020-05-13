let bg_port = chrome.runtime.connect({ name: "ebay_revise_listing" });

console.log("Starting Ebay SKU!");


/*
setTimeout(() => {
    getItemRowDetails();

    bg_port.postMessage({ type: 'from_revise_listing', reviseListingDetails: getItemRowDetails()});
    
}, 1000);
*/

waitUntilElementExists('.cell-wrapper',(el) =>
{
    getItemRowDetails();
    bg_port.postMessage({ type: 'from_revise_listing', reviseListingDetails: getItemRowDetails()});
});


function getItemRowDetails()
{

    var table_rows_pattern = 'tbody[id*=grid-row]';
    $row = $(table_rows_pattern).first();


    var itemRowDetails = 
    {
        SKU: $row.find('td[class*="listingSKU"]').find('.cell-wrapper').text(),
        quantity: parseInt($row.find('td[class*="availableQuantity"]').find('.cell-wrapper').text().replace(/[^0-9]/g, '')),
        itemID: $row.find(".grid-row").attr("data-id")
    }


    return itemRowDetails;

}