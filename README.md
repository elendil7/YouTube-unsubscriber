# YouTube-unsubscriber

## Info
- Unsubscribes you from all YouTube channels.
- Minified using <a href="https://github.com/wilsonzlin/minify-js">wilsonzlin's minify-js project</a>, using command: ```minify-js --output output.js test.js --mode global```.

## Instructions
1. Navigate to ```https://www.youtube.com/feed/channels``` in any modern browser.
2. Access developer tools using either **F12** or **CTRL+SHIFT+I**, and click on console tab.
3. Paste the following script into the console, and click **Run**.

```js
{class a{constructor(timeOut,document){this.timeOut=timeOut;this.document=document}getDocumentHeight(){const b=document.body,c=document.documentElement;return Math.max(b.scrollHeight,b.offsetHeight,c.clientHeight,c.scrollHeight,c.offsetHeight)}async keepScrolling(){let b=0;while(true){const c=document.querySelectorAll("div#content-section").length;if(b===c)break;b=c;setTimeout(window.scrollTo(0,this.getDocumentHeight()),1000)}}async scrollToNextSubscription(button){button.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})}sleep(secs){return new Promise(b=>setTimeout(b,secs*1000))}async createRandomDelay(start,end){const b=Math.floor(Math.random()*(end- start+ 1))+ start;return new Promise(c=>setTimeout(c,b))}async finalMeasures(totalToBeUnsubbed){console.log(`<<< Done - ${totalToBeUnsubbed} subscriptions erased from existence! >>>`);console.log("!!! Reloading page in 10 seconds... !!!");await this.sleep(10);window.location.reload()}checkIfCorrectWebsite(){const b="https://www.youtube.com/feed/channels";if(this.document.location.href!==b){this.document.location=b}}getChannelElems(){return document.querySelectorAll("div#info-section")}getChannelNames(channelElems){return [...channelElems].map(b=>b.querySelector("yt-formatted-string#text").innerHTML)}getSubscriptionButtons(){return document.querySelectorAll("button[aria-label^='Unsubscribe from']")}}(async()=>{const b=new a(2000,this.document);b.checkIfCorrectWebsite();await b.keepScrolling();const c=b.getChannelElems();const d=b.getChannelNames(c);const e=b.getSubscriptionButtons();const f=e.length;let g=f;if(f===0)return console.log("<<< No subscriptions found. >>>");for(let h=0;h<f;++h){setTimeout(async()=>{const i=e[h];const j=(i.textContent||i.innerText).toLowerCase();if(j!=="subscribed")return;await b.scrollToNextSubscription(c[h]);await b.sleep(0.5);i.click();await b.createRandomDelay(500,1500);const k=document.querySelector('[aria-label="Unsubscribe"]');k.click();g--;console.log(`<<< Unsubscribed from the channel "${d[h]}". >>>`);console.log(`    ${g} channels left.`);if(h===f- 1)return b.finalMeasures(f);await b.createRandomDelay(1500,2500)},(h+ 1)*b.timeOut)}})()}
```

## Notes
- Script will automatically reload the page 10 seconds after finishing.
- If there are any subscriptions left, simply run the script again.

## Tools
- <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox browser</a>
- <a href="https://firefox-source-docs.mozilla.org/devtools-user/">Firefox DevTools User Docs</a>
- <a href="https://www.cleancss.com/javascript-minify/">JavaScript minifier</a>
- <a href="https://searchenginereports.net/js-minify">Another JS minifier</a>

## References

### Forums

- <a href="https://stackoverflow.com/questions/48874382/how-to-unsubscribe-from-all-the-youtube-channels-at-once">Unsubscribe from all YouTube channels at once</a>
- <a href="https://stackoverflow.com/questions/10351658/javascript-get-custom-buttons-text-value">Get button's text</a>
- <a href="https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page">Scroll automatically to bottom of page</a>
- <a href="https://stackoverflow.com/questions/24947837/javascript-page-is-fully-loaded-boolean-check">Execute code only if page fully loaded</a>
- <a href="https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript">Get height of entire document</a>
- <a href="https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript">How to reload a website</a>
- <a href="https://stackoverflow.com/questions/17620222/chrome-go-to-url-via-console">Navigate to different URL via browser console</a>
- <a href="https://stackoverflow.com/questions/1033398/how-to-execute-a-function-when-page-has-fully-loaded">Wait for page to be fully loaded (event listener)</a>
- <a href="https://stackoverflow.com/questions/12329008/scrolling-to-the-next-element">Scroll to next element & animate transition</a>

### Documentation
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">Element.scrollIntoView()</a>

<!-- <a href=""></a> -->

