const checkSubmit = document.querySelector ('input[type=button]');
checkSubmit.addEventListener("click", validateForm);
console.log(checkSubmit);

var confirmationBanner = document.getElementById("banner");
confirmationBanner.style.visibility = "hidden";
var isAnOptionSelected = false;

function validateForm(){
    let input1 = document.querySelector ('input[type=text]');
    let input2 = document.querySelector ("input.input2");
    let input3 = document.querySelector ("input.input2");
    let inputfield1 = input1.value;
    let inputfield2 = input2.value;
    let inputfield3 = input3.value;
    
    if (inputfield1 == "") {
        input1.style.border ="solid 1px #ff0000";
    }
    if (inputfield2 == "") {
         input2.style.border ="solid 1px #ff0000";
         }
    if (inputfield3 == "") {
        input3.style.border ="solid 1px #ff0000";
        }    
    else if (inputfield1 != "" && inputfield2 != "") {
        input1.style.border = "solid 1px green";
        input2.style.border = "solid 1px green";
        input3.style.border = "solid 1px green";
        confirmationBanner.style.visibility = "visible";
        }    
}