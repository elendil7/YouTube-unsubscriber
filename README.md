# YouTube-unsubscriber
Unsubscribes you from all YouTube channels.

# Instructions
1. Navigate to ```https://www.youtube.com/feed/channels``` in any modern browser.
2. Access developer tools using either **F12** or **CTRL+SHIFT+I**, and click on console tab.
3. Paste the following script into the console, and click **Run**.

```js
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
```

# Notes
- Script will automatically reload the page 10 seconds after finishing.
- If there are any subscriptions left, simply run the script again.

# Tools
- <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox browser</a>
- <a href="https://firefox-source-docs.mozilla.org/devtools-user/">Firefox DevTools User Docs</a>
- <a href="https://www.cleancss.com/javascript-minify/">JavaScript minifier</a>

# References

## Forums

- <a href="https://stackoverflow.com/questions/48874382/how-to-unsubscribe-from-all-the-youtube-channels-at-once">Unsubscribe from all YouTube channels at once</a>
- <a href="https://stackoverflow.com/questions/10351658/javascript-get-custom-buttons-text-value">Get button's text</a>
- <a href="https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page">Scroll automatically to bottom of page</a>
- <a href="https://stackoverflow.com/questions/24947837/javascript-page-is-fully-loaded-boolean-check">Execute code only if page fully loaded</a>
- <a href="https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript">Get height of entire document</a>
- <a href="https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript">How to reload a website</a>
- <a href="https://stackoverflow.com/questions/17620222/chrome-go-to-url-via-console">Navigate to different URL via browser console</a>
- <a href="https://stackoverflow.com/questions/1033398/how-to-execute-a-function-when-page-has-fully-loaded">Wait for page to be fully loaded (event listener)</a>
- <a href="https://stackoverflow.com/questions/12329008/scrolling-to-the-next-element">Scroll to next element & animate transition</a>

## Documentation
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">Element.scrollIntoView()</a>

<!-- <a href=""></a> -->

