//jQuery is a JavaScript library designed to simplify HTML DOM tree
function processImage(file) {
    let photo = file.files[0];

    $("#textarea").val("Result:");
    showImage(file);

    $(".loading-spinner").toggleClass("hidden");

    var subscriptionKey = "95c6c7a15ef647ea84609083a6b64733";

    var uriBase =
        "https://female-coders.cognitiveservices.azure.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,smile,glasses,emotion," +
            "hair"
    };

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request headers.
        beforeSend: function(xhrObj){
            // Generic binary data
            xhrObj.setRequestHeader("Content-Type","application/octet-stream");
            // When virtualizing your APIs behind an Azure API Management (APIM) servic
            // Azure API Management is a fully managed service that enables customers to publish, secure, transform, maintain, and monitor APIs
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        processData: false,
        data: photo,
    })
        .done(function(data) {
            JSON.stringify(data, null, 2);
            $("#textarea").val(JSON.stringify(data, null, 2));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : ($.parseJSON(jqXHR.responseText).message) ?
                    $.parseJSON(jqXHR.responseText).message :
                    $.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        })
        .always(function () {
            $(".loading-spinner").toggleClass("hidden");
        });
};

function showImage(file) {
    //we need Filereader to load the data of the computer of an user
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    //all data are loaded successfully
    fileReader.onload = function (e) {
        $("#image").attr("src", this.result);
    }
}
