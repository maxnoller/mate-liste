var products = []
function scanProduct(){
    var sourceElement = document.getElementById("scanner");
    Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector('#scanner'),
                    constraints: {
                        width: sourceElement.offsetWidth,
                        height: (sourceElement.offsetHeight-50)*0.8,
                        facingMode: "environment"
                    },
                },
                decoder: {
                    readers: [
                        "ean_reader",
                    ],
                },

            }, function (err) {
                if (err) {
                    console.log(err);
                    return
                }

                console.log("Initialization finished. Ready to start");
                Quagga.start();

                // Set flag to is running
                _scannerIsRunning = true;
            });
            Quagga.onDetected(function (result) {
                products.push(result.codeResult.code);
                addProductToCart();
                Quagga.stop();
            });
}
function makeProductsString(){
    var productsStr = "";
    for (i = 0; i < products.length;i++){
        if(productsStr == ""){
            productsStr = products[i];
        } else {
            productsStr = productsStr + "_"+products[i];
        }
    }
    return productsStr;
}
function addProductToCart(){
    $.ajax({
    url: '/getCart',
    data: {
      'products': makeProductsString()
    },
    type: "get",
    success: function (data) {
      document.getElementById("main").innerHTML = data;
    }
  });    
}
function buyProducts(){
    $.ajax({
        url: 'buyProducts',
        data: {
            'products': makeProductsString()
        },
        type: "get",
        success: function (data){
            alert(data);
        }
    });
}