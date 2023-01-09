(async()=>{const timeOut=2000
const getDocumentHeight=()=>{const body=document.body,html=document.documentElement;return Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);}
const keepScrolling=async()=>{return setTimeout(function(){window.scrollTo(0,getDocumentHeight());},1000);}
const sleep=(secs)=>{return new Promise((res)=>setTimeout(res,secs*1000));};const createRandomDelay=async(start,end)=>{const delay=Math.floor(Math.random()*(end-start+1))+start;return new Promise((resolve)=>setTimeout(resolve,delay));};const finalMeasures=async()=>{console.log(`<<< Done - ${totalToBeUnsubbed} subscriptions erased from existence! >>>`)
console.log("!!! Reloading page in 10 seconds... !!!")
await sleep(10)
window.location.reload()}
let prevGridContentLength=0
while(true){const curGridContentLength=document.querySelectorAll("div#content-section").length
if(prevGridContentLength===curGridContentLength)break
prevGridContentLength=curGridContentLength
await keepScrolling()}
const channels=document.querySelectorAll("div#info-section")
let channelNames=[...channels].map(channel=>channel.querySelector("yt-formatted-string#text").innerHTML)
const subscriptionButtons=document.querySelectorAll("button[aria-label^='Unsubscribe from']")
const totalToBeUnsubbed=subscriptionButtons.length;let totalLeftToBeUnsubbed=totalToBeUnsubbed
for(let i=0;i<totalToBeUnsubbed;++i){setTimeout(async()=>{const curButton=subscriptionButtons[i]
const curButtonText=(curButton.textContent||curButton.innerText).toLowerCase()
if(curButtonText!=="subscribed")return
curButton.click()
await createRandomDelay(500,1500)
const unsubConfirmButton=document.querySelector('[aria-label="Unsubscribe"]');unsubConfirmButton.click()
totalLeftToBeUnsubbed--;console.log(`<<< Unsubscribed from the channel "${channelNames[i]}". >>>`)
console.log(`${totalLeftToBeUnsubbed} channels left.`)
if(i===totalToBeUnsubbed-1)return finalMeasures()
await createRandomDelay(1500,2500)},(i+1)*timeOut)}})()
