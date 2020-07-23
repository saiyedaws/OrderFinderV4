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
    updateQuantityAndMsgBackground();
});


async function updateQuantityAndMsgBackground()
{

    var itemRowDetails = await getItemRowDetails();
    
    if(itemRowDetails.quantity < 2)
    {

        await setRowCellValue(itemRowDetails.itemID, 'availableQuantity', 2);
    }

  
    bg_port.postMessage({ type: 'from_revise_listing', reviseListingDetails: itemRowDetails});

}


function getItemRowDetails()
{
    return new Promise(resolve =>{
        var table_rows_pattern = 'tbody[id*=grid-row]';
        $row = $(table_rows_pattern).first();
    
    
        var itemRowDetails = 
        {
            SKU: $row.find('td[class*="listingSKU"]').find('.cell-wrapper').text(),
            quantity: parseInt($row.find('td[class*="availableQuantity"]').find('.cell-wrapper').text().replace(/[^0-9]/g, '')),
            itemID: $row.find(".grid-row").attr("data-id")
        }

        resolve(itemRowDetails);



    });



}


function setItemQuantity(itemNumber ,quantity) 
{


    setRowCellValue(itemNumber, 'availableQuantity', quantity).then(() => 
    {

    });

}


function setRowCellValue(itemNumber, key, value) 
{

    return new Promise (resolve => {

        var table_row_pattern = 'tbody[id*=grid-row-'+itemNumber+']';

        $row = $(table_row_pattern).first();
        $row.find('td[class*="' + key + '"]').find('button[data]').click();
            

        setTimeout(
            function() 
            {
              
              document.execCommand('insertText', false, value);


              setTimeout(
                function() 
                {
                    $form = $('form[id*="inline-editors"]');
                    $form.find('button[type="submit"]').click();


                    setTimeout(() => resolve(), 8000); // Third Wait - After Submitting clicking


                }, 700);//Second Wait - After Text Enetered

            }, 500);//First Wait - After Form openm



        

    });
}
