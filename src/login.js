// selectam buttonul
var checkSubmit = document.querySelector ('input[type=button]');
checkSubmit.addEventListener("click", validateForm);
// presupunem ca nu e selectat nimic
var isAnOptionSelected = false;

function validateForm(event){
     // selectam datele introduse in input'uri
    var inputfield1 = document.querySelector ('input[type=text]').value;
    var inputfield2 = document.querySelector ("input.input2").value;
    
    // verificam daca au fost introduse date in input, in caz contrar punem border rosu
    if (inputfield1 == "") {
        input1.style.border ="solid 1px #ff0000";
         }
    if (inputfield2 == "") {
         input2.style.border ="solid 1px #ff0000";
         }
    else if (inputfield1 != "" && inputfield2 != "") {
        input1.style.border = "solid 1px green";
        input2.style.border = "solid 1px green";
        confirmationBanner.style.visibility = "visible";
        }    
}