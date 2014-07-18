var item = new Object();
if (typeof (format) == 'undefined') {
    var format = '{itm_quantity}[URL="{itm_url}"]{itm_name}[/URL] {itm_price}'
}
if (typeof (before) == 'undefined') {
    var before = ''
}
if (typeof (after) == 'undefined') {
    var after = ''
}

function replaceVars(a) {
    var b = format;
    for (key in a) {
        b = b.replace("{" + key + "}", a[key])
    }
    return b
}

function hwvs() {
    var a = document.getElementsByTagName("table")[0];
    if (typeof (a) != 'undefined') {
        var b = a.getElementsByTagName("tbody")[0];
        var c = b.rows;
        var d = new Array();
        var e = $(a.getElementsByTagName("p")[0]).text();
        d.push("Total build cost: €" + hwvsFixPrice(e.substring(0, e.length - 2)) + " + €11.99 shipping");
        for (var i = 1; i < c.length; i += 2) {
            var f = c[i].cells[0];
            item.itm_url = f.getElementsByTagName("a")[0].href;
            item.itm_name = $(f).text().trim();
            item.itm_price = $(c[i].cells[2]).text().trim();
            log("Item_" + i + " price: " + item.itm_price);
            item.itm_quantity = parseInt(c[i].cells[3].getElementsByTagName("input")[0].value, 10);
            item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
            item.itm_price = "€" + hwvsFixPrice(item.itm_price.substring(0, item.itm_price.length - 2));
            log("Item_" + i + " fixed price: " + item.itm_price);
            d.push(replaceVars(item))
        }
    } else {
        alert("You must place an item in your basket first.")
    }
    return d
}

function hwvsFixPrice(a) {
    return a.replace(",", "'").replace(".", ",").replace("'", ".")
}

function scan() {
    var b = new Array();
    var c = $('div.btRight').text();
    var d = $('#ctl00_ContentPlaceHolder2_labelTotalCarriage').text();
    var e = $('#ctl00_ContentPlaceHolder2_labelTotalVat').text();
    b.push("Total build cost: " + c + " (inc Delivery £" + d + " and VAT £" + e + ")");
    $('.btRow').each(function (a) {
        item.itm_url = $('.btDesc a', this).attr('href');
        item.itm_name = $('.btDesc a', this).text().trim();
        item.itm_price = $('.btInc', this).text().trim();
        item.itm_quantity = parseInt($('.btQty input', this).val(), 10);
        item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
        b.push(replaceVars(item))
    });
    return b
}

function dabs() {
    var b = new Array();
    var c = $('td[class="total-bg lprice"]').text().trim();
    b.push("Total build cost: " + c + " (inc delivery " + $('#delivery').text().trim() + ")");
    $('table.basktbl tr:contains("Quicklinx")').each(function (a) {
        item.itm_url = "http://www.dabs.ie" + $('td.la p a', this).attr('href');
        item.itm_name = $('td.la p a', this).text().trim();
        item.itm_price = $('td.lprice:eq(1) span', this).text();
        item.itm_quantity = parseInt($('td:eq(2) input', this).val(), 10);
        item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
        b.push(replaceVars(item))
    });
    return b
}

function memoryc() {
    var b = new Array();
    var c = jQuery('#bctotal_price').text();
    b.push("Total build cost: " + c);
    jQuery('.blue_border_tr:eq(0) tr:contains("Item Number")').each(function (a) {
        item.itm_url = jQuery('.prod_desc', this).attr('href');
        item.itm_name = jQuery('.title_green_font', this).text();
        item.itm_price = jQuery('span[id^="cart_vat"]', this).text().match(/VAT(.\s[^\s]+)/i)[1];
        item.itm_quantity = parseInt(jQuery('input[name^="quantity"]', this).val(), 10);
        item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
        b.push(replaceVars(item))
    });
    return b
}

function overclockers() {
    var a = new Array();
    var b = document.getElementById("orderTotal").cells[2].innerHTML;
    a.push("Total build cost: " + b);
    var c = document.getElementById("shoppingBkt");
    var d = c.rows;
    for (var i = 1; i < d.length - 4; i++) {
        item.itm_url = d[i].cells[1].getElementsByTagName("a")[0].href;
        item.itm_name = d[i].cells[1].getElementsByTagName("a")[0].innerHTML;
        item.itm_price = d[i].cells[4].getElementsByTagName("span")[0].innerHTML;
        item.itm_quantity = parseInt(d[i].cells[2].getElementsByTagName("input")[0].value, 10);
        item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
        a.push(replaceVars(item))
    };
    return a
}

function specialtech() {
    var a = new Array();
    var b = document.getElementsByClassName('ProductPriceSmall')[5].innerHTML;
    var c = document.getElementsByClassName('ProductPriceSmall')[4].innerHTML;
    var d = document.getElementsByClassName('ProductPriceSmall')[3].innerHTML;
    var e = document.getElementsByClassName('ProductPriceSmall')[2].innerHTML;
    a.push("Total build cost: " + b + " (inc Vat "+ e+ ", Shipping " + d + " and VAT on Shippig " + c + ")");
    var c = document.forms.cartform.getElementsByTagName('table')[0];
    var d = c.rows;
    for (var i = 0; i < d.length; i = i+2) {
        item.itm_url = d[i].cells[0].getElementsByTagName("a")[0].href;
        item.itm_name = d[i].cells[1].getElementsByClassName("ProductTitle")[0].innerHTML;
        item.itm_price = d[i].cells[1].getElementsByClassName("ProductPrice")[0].innerHTML;
        item.itm_quantity = parseInt(d[i].cells[1].getElementsByTagName("input")[0].value, 10);
        item.itm_quantity = (item.itm_quantity > 1 ? item.itm_quantity + ' x ' : '');
        a.push(replaceVars(item))
    };
    return a
}

function hideBuildBox() {
    document.getElementById("darkDiv").style.display = "none";
    document.getElementById("build_info").style.display = "none";
    return false
}

function popoutTextarea(a) {
    window.document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            hideBuildBox()
        }
    };
    a = before + "\n" + a + "\n" + after;
    if (document.getElementById("build_info") != null) {
        document.getElementById("build_post").innerHTML = a;
        document.getElementById("darkDiv").style.display = "block";
        document.getElementById("build_info").style.display = "block"
    } else {
        var b = 500;
        var c = 300;
        var d = document.createElement("div");
        d.setAttribute("id", "darkDiv");
        d.setAttribute("onclick", "hideBuildBox()");
        d.setAttribute("style", "top: 0px; left: 0px; background: #000000; position: absolute; z-index: 998; width: 100%; height: 100%; opacity: 0.5;");
        var f = document.createElement("div");
        f.setAttribute("id", "build_info");
        var g = "position: absolute;";
        g += "z-index: 999;";
        g += "top: " + (screen.availHeight / 2 - c) + "px;";
        g += "left: " + (screen.availWidth / 2 - b / 2) + "px;";
        g += "height: " + c + "px;";
        g += "width: " + b + "px;";
        g += "background: #f4a223;";
        g += "border: 10px solid #f4a223;";
        g += "box-shadow: 0px 0px 3px #222;";
        g += "border-radius: 20px;";
        g += "-webkit-border-radius: 20px;";
        g += "-moz-border-radius: 20px;";
        f.setAttribute("style", g);
        var h = document.createElement("div");
        h.setAttribute("style", "font-size: 20px; font-weight: 900;");
        h.appendChild(document.createTextNode("Your build info"));
        var i = document.createElement("a");
        i.setAttribute("style", "float: right; margin: -20px auto;");
        i.setAttribute("onclick", "return hideBuildBox();");
        i.appendChild(document.createTextNode("close"));
        var j = document.createElement("textarea");
        j.setAttribute("id", "build_post");
        j.setAttribute("onclick", "select();");
        j.setAttribute("cols", "1");
        j.setAttribute("rows", "1");
        j.setAttribute("style", "width: " + (b - 5) + "px; height: " + (c - 50) + "px;");
        j.appendChild(document.createTextNode(a));
        f.appendChild(h);
        f.appendChild(i);
        f.appendChild(j);
        document.body.appendChild(f);
        document.body.appendChild(d)
    }
    window.location.hash = "#"
}

function init_script() {
    var a = window.location.hostname;
    var b = window.location.pathname;
    if (a.match(/scan\.co\.uk/i)) {
        if (b.match(/basket/i)) {
            popoutTextarea(scan().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.href = 'https://secure.scan.co.uk/aspnet/shop/basket.aspx'
            }
        }
    } else if (a.match(/hardwareversand\.de/i)) {
        if (b.match(/basket\.jsp/i)) {
            popoutTextarea(hwvs().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.pathname = 'basket.jsp'
            }
        }
    } else if (a.match(/dabs\.ie/i)) {
        if (b.match(/basket/i)) {
            popoutTextarea(dabs().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.pathname = 'basket'
            }
        }
    } else if (a.match(/specialtech\.co\.uk/i)) {
        if (b.match(/cart/i)) {
            popoutTextarea(specialtech().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.pathname = 'basket'
            }
        }
    } else if (a.match(/memoryc\.com/i)) {
        if (b.match(/checkout/i)) {
            popoutTextarea(memoryc().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.pathname = 'buy/checkout.html'
            }
        }
    } else if (a.match(/overclockers\.co\.uk/i)) {
        if (b.match(/viewcart/i)) {
            popoutTextarea(overclockers().join("\n"))
        } else {
            var c = confirm("Would you like to be redirected to your basket?");
            if (c) {
                window.location.pathname = 'viewcart.php'
            }
        }
    } else {
        alert("Sorry this tool does not work with this website.")
    }
}