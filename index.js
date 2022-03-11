var btn = document.getElementById("btn");
var movemenu = document.getElementById("movemenu");
var switchcolor = document.getElementById("switch-color");
var ethAn = document.getElementById("ethAn");
var compressmenu = document.getElementById("movemenu");
var btcAn = document.getElementById("btcAn");

function toggleBtn(){
    btn.classList.toggle("active")
    switchanimation.classList.toggle("switch")
    switchcolor.classList.toggle("colorswitch")
    ethAn.classList.toggle("eth-an-active")
    btcAn.classList.toggle("btc-an-deactive")
}
function expandMenu(){
    movemenu.classList.toggle("expand-menu")
}