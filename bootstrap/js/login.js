/**
 * Created by rulersex on 2017/1/22.
 */

function initEvent() {
    document.getElementById("text-password").onblur = checkPassWord;
    document.getElementById("text-confirm").onblur = confirmPassWord;
    document.getElementById("agree").onblur=canSubmit;
}

function checkPassWord() {
    var doc = document;
    var password = doc.getElementById("text-password").value,
        spanpassword = doc.getElementById("checkpassword");
    if (spanpassword.classList.contains("glyphicon-ok")) {
        spanpassword.classList.remove("glyphicon-ok");
        if (password.length >= 6 && password.length <= 16) {
            spanpassword.classList.add("glyphicon-ok");
        } else {
            spanpassword.classList.add("glyphicon-remove");
        }
    } else  if(spanpassword.classList.contains("glyphicon-remove")){
        spanpassword.classList.remove("glyphicon-remove");
        if (password.length >= 6 && password.length <= 16) {
            spanpassword.classList.add("glyphicon-ok");
        } else {
            spanpassword.classList.add("glyphicon-remove");
        }
    }else{
        if (password.length >= 6 && password.length <= 16) {
            spanpassword.classList.add("glyphicon-ok");
        } else {
            spanpassword.classList.add("glyphicon-remove");
        }
    }
}
//confirmpassword
function confirmPassWord() {
    var doc = document;
    var spanconfirmpass = doc.getElementById("confirmpassword"),
        password = doc.getElementById("text-password").value,
        confirmpassword = doc.getElementById("text-confirm").value;

    if (spanconfirmpass.classList.contains("glyphicon-ok")) {
        spanconfirmpass.classList.remove("glyphicon-ok");
        if (password === confirmpassword) {
            spanconfirmpass.classList.add("glyphicon-ok");
        } else {
            spanconfirmpass.classList.add("glyphicon-remove");
        }
    }else if(spanconfirmpass.classList.contains("glyphicon-remove")){
        spanconfirmpass.classList.remove("glyphicon-remove");
        if (password === confirmpassword) {
            spanconfirmpass.classList.add("glyphicon-ok");
        } else {
            spanconfirmpass.classList.add("glyphicon-remove");
        }
    }else{
        if (password === confirmpassword) {
            spanconfirmpass.classList.add("glyphicon-ok");
        } else {
            spanconfirmpass.classList.add("glyphicon-remove");
        }
    }
}
function canSubmit(){
    if (document.getElementById("agree").checked==true||document.getElementById("agree").checked==="checked"){
        document.getElementById("submit").disabled=false;

    }else{
        document.getElementById("submit").disabled=true;
    }
}

initEvent();