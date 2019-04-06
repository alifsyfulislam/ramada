var adArea = document.querySelector('.ad_area');

var namajTiming = [
    { h: 4, m: 35, s: 0,i:0,AzanName: "Fajar"},
    { h: 12, m: 1, s: 0,i:1,AzanName: "Zohur"},
    { h: 15, m: 29, s: 0,i:2,AzanName: "Asar"},
    { h: 18, m: 17, s: 0,i:3,AzanName: "Magrib"},
    { h: 7, m: 34, s: 0,i:4,AzanName: "Esha"}
];
function ctaFunction(){
    var ctaUrl = "https://www.wizardsbd.com/";
    window.open(ctaUrl);
}
document.getElementById("playAudio").addEventListener("click", function () {
    var promise = document.getElementById("azanSource").play();
    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            document.getElementById("playAudio").style.display = "block";
        });
    }
});

function checkAjanTime() {
    var today = new Date();
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    namajTiming.forEach(item=>{
        if(parseInt(today.getHours())==item.h && parseInt(today.getMinutes())==item.m && parseInt(today.getSeconds())==item.s) {
            document.getElementById("playAudio").click();
        }
        if((item.i==0|| item.i==3) &&timeTosec(item.h, item.m, item.s)-timeTosec(parseInt(today.getHours()),parseInt(today.getMinutes()),parseInt(today.getSeconds()))>0 &&
            timeTosec(item.h, item.m, item.s)-timeTosec(parseInt(today.getHours()),parseInt(today.getMinutes()),parseInt(today.getSeconds()))<=20*60) {
            // console.log(timeTosec(item.h, item.m, item.s)+" - "+timeTosec(parseInt(today.getHours()),parseInt(today.getMinutes()),parseInt(today.getSeconds()))+" - "+15*60)
            document.getElementById("countDown").innerText = printTimer(timeTosec(item.h, item.m, item.s)-timeTosec(parseInt(today.getHours()),parseInt(today.getMinutes()),parseInt(today.getSeconds())));
        }
        else{
            document.getElementById("countDown").innerText =(today.getHours()<10?"0"+today.getHours() : today.getHours()) + ":" + (today.getMinutes()<10? "0"+today.getMinutes(): today.getMinutes()) + ":" + (today.getSeconds()<10 ? "0"+today.getSeconds():today.getSeconds());
        }

        if (item.i==0){
            document.getElementById('title').innerText = "আজকের সেহেরি এর শেষ সময়!";
        }

        else if(item.i ==3){
            document.getElementById('title').innerText = "আজকের ইফতার এর শেষ সময়!";
        }

        else{
            document.getElementById('title').innerText = "এখন সময়";
        }

    });
}
function printTimer(sec) {
    return ((sec-sec%60)/60<10?("0"+(sec-sec%60)/60): (sec-sec%60)/60)+":"+(sec%60<10? ("0"+sec%60): sec%60)
}
function timeTosec(h, m, s) {
    return h*60*60+m*60+s;
}



setInterval(()=>{
    checkAjanTime();
}, 1000);