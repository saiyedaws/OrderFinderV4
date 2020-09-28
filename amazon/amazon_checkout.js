function checkout(runmode) {
    chrome.extension.sendMessage({
        sksmode: runmode
    }, function(response) {
        var b = response.output.split(",.,");

        if (b[0] == "full") {
            console.log(6);
            if (xx.search("huc/view") > -1) {
                chrome.extension.sendMessage({
                    sksmode: "setcookie"
                });
                setTimeout(function() {
                    document.getElementById("hlb-ptc-btn-native").click();
                }, 2000);
                setTimeout(function() {
                    location.reload();
                }, 70000)
                if (!sessionStorage.y1) setTimeout(function() {
                    sessionStorage.y1 = 1;
                    location.reload();
                }, 70000);
            } else if (xx.search("cart/view") > -1) {
                chrome.extension.sendMessage({
                    sksmode: "setcookie"
                });
                setTimeout(function() {
                    document.getElementsByName("proceedToCheckout")[0].click();
                }, 2000);
                if (!sessionStorage.y2) setTimeout(function() {
                    sessionStorage.y2 = 1;
                    location.reload();
                }, 80000);
            } else if (xx.search("/signin") > -1) {
                if (sessionStorage.y9) {
                    var div = document.createElement('h1');
                    div.innerHTML = "The password you provided us seems to be incorrect -Amazon Autobuy Extension";
                    div.style.cssText = "text-align: center";
                    document.body.appendChild(div);
                }
                if (b[10] && !sessionStorage.y9) {
                    //console.log(b[10]);
                    if (!sessionStorage.y8) sessionStorage.y8 = 1;
                    else sessionStorage.y9 = 1;
                    setTimeout(function() {
                        document.getElementById("ap_password").value = atob(b[10]);
                        document.getElementById("signInSubmit-input").click();
                    }, 5000);
                } else {
                    var div = document.createElement('h1');
                    div.innerHTML = "Sorry, we are helpless as you did not provide us the password -Amazon Autobuy Extension";
                    div.style.cssText = "text-align: center";
                    document.body.appendChild(div);
                }

            } else if (xx.search("buy/addressselect") > 0) {
                document.getElementById("enterAddressFullName").value = b[1];
                document.getElementById("enterAddressAddressLine1").value = b[2];
                document.getElementById("enterAddressAddressLine2").value = b[3];
                document.getElementById("enterAddressCity").value = b[4];
                document.getElementById("enterAddressStateOrRegion").value = b[5];
                document.getElementById("enterAddressPostalCode").value = b[6];
                document.getElementById("enterAddressPhoneNumber").value = b[7];
                document.getElementById("Landmark").value = b[8];
                document.getElementById("AddressType").value = b[9];
                document.getElementsByName("shipToThisAddress")[0].click();
                if (!sessionStorage.y3) setTimeout(function() {
                    sessionStorage.y3 = 1;
                    location.reload();
                }, 180000);

            } else if (xx.search("buy/shipoptionselect") > 0) {
                document.getElementsByClassName("a-button-text")[0].click();
                if (!sessionStorage.y4) setTimeout(function() {
                    sessionStorage.y4 = 1;
                    location.reload();
                }, 24000);
                if (b[11] == "wallet") {
                    setTimeout(function() {
                        var a = document.getElementsByTagName("input");
                        if (document.getElementById("pm_300"))
                            for (j = 0; j < a.length; j++) {
                                if (a[j].value == "Continue") a[j].click();
                            }
                    }, 11000);
                } else {
                    setTimeout(function() {
                        if (document.getElementById("pm_300"))
                            if (document.getElementById("pm_300").checked) document.getElementById("pm_300").click();
                    }, 8000);

                    setTimeout(function() {
                        var a = document.getElementsByTagName("input");
                        var b = document.getElementsByName("paymentMethod");
                        for (i = 0; i < b.length; i++) {
                            if (b[i].value == "cashOnDeliveryCash") b[i].click();
                        }
                        for (j = 0; j < a.length; j++) {
                            if (a[j].value == "Continue") a[j].click();
                        }
                    }, 14000);
                }
                setTimeout(function() {
                    if (document.getElementsByName("placeYourOrder1")[0]) document.getElementsByName("placeYourOrder1")[0].click();
                }, 22000);
            } else if (xx.search("buy/payselect") > 0) {
                if (b[10] == "wallet") {
                    setTimeout(function() {
                        var a = document.getElementsByTagName("input");
                        if (document.getElementById("pm_300"))
                            for (j = 0; j < a.length; j++) {
                                if (a[j].value == "Continue") a[j].click();
                            }
                    }, 11000);
                } else {
                    setTimeout(function() {
                        if (document.getElementById("pm_300"))
                            if (document.getElementById("pm_300").checked) document.getElementById("pm_300").click();
                    }, 3000);

                    setTimeout(function() {
                        var a = document.getElementsByTagName("input");
                        var b = document.getElementsByName("paymentMethod");
                        for (i = 0; i < b.length; i++) {
                            if (b[i].value == "cashOnDeliveryCash") b[i].click();
                        }
                        for (j = 0; j < a.length; j++) {
                            if (a[j].value == "Continue") a[j].click();
                        }
                    }, 4000);
                }
                setTimeout(function() {
                    if (document.getElementsByName("placeYourOrder1")[0]) document.getElementsByName("placeYourOrder1")[0].click();
                }, 10000);
                if (!sessionStorage.y5) setTimeout(function() {
                    sessionStorage.y5 = 1;
                    location.reload();
                }, 13000);
            } else if (xx.search("buy/spc/") > -1) {
                if (!sessionStorage.y6) setTimeout(function() {
                    sessionStorage.y6 = 1;
                    location.reload();
                }, 8000);
                setTimeout(function() {
                    document.getElementsByName("placeYourOrder1")[0].click();
                }, 2000);
            } else if (xx.search("/thankyou/") > -1) {
                sessionStorage.removeItem("yureka");
            } else sessionStorage.removeItem("yureka");
        }
    });
}