# YouTube-unsubscriber
Unsubscribes you from all YouTube channels.

# Instructions
1. Navigate to ```https://www.youtube.com/feed/channels``` in any modern browser.
2. Access developer tools using either **F12** or **CTRL+SHIFT+I**, and click on console tab.
3. Paste the following script into the console, and click **Run**.

```js
// * main code (self-executing function for unsubscribing oneself from all youtube channels)
(async ()=>{
  // * Variables
  // set general delay between each unsubscription process
  const timeOut = 2000
  
	// get entire document (page) height
  const getDocumentHeight = () => {
    const body = document.body, html = document.documentElement;
		return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }
  
  // * Functions
  // scroll down to bottom of page
  const keepScrolling = async () => {
    return setTimeout(function () {
      window.scrollTo(0, getDocumentHeight());
    }, 1000); 
  }
  
  // random delay function for random delays
  const createRandomDelay = async (start, end) => {
    const delay = Math.floor(Math.random() * (end - start + 1)) + start;
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
  
  // keep scrolling indefinitely until reached the very bottom of the page
  let prevGridContentLength = 0
  while(true){
    // get current length of content grid (all channels)
    const curGridContentLength = document.querySelectorAll("div#content-section").length
    // if previous length is the same as current, break out of loop (as we know that bottom of page has been reached)
    if(prevGridContentLength === curGridContentLength) break
    // otherwise, keep looping. Set prev to cur length.
    prevGridContentLength = curGridContentLength
    // scroll further down
    await keepScrolling()
  }
  
  // get names of channels subscribed to
	const channels = document.querySelectorAll("div#info-section")
  let channelNames = [...channels].map(channel=>channel.querySelector("yt-formatted-string#text").innerHTML)
  
  // get all subscription buttons
  const subscriptionButtons = document.querySelectorAll("button[aria-label^='Unsubscribe from']")

  // get total channels subscribed to
  const totalToBeUnsubbed = subscriptionButtons.length;
  // initialize counter
  let totalLeftToBeUnsubbed = totalToBeUnsubbed

  for (let i = 0; i < totalToBeUnsubbed; ++i) {
    setTimeout(async () => {
      // get current button
      const curButton = subscriptionButtons[i]
      // get button text
      const curButtonText = (curButton.textContent || curButton.innerText).toLowerCase()
      
      // if channel has already been unsubscribed from, break out of function
      if(curButtonText !== "subscribed") return
      
      // click current button
      curButton.click()

      await createRandomDelay(500, 1500) // pause

      // get and click unsubscribe confirmation button
      const unsubConfirmButton = document.querySelector('[aria-label="Unsubscribe"]');
			unsubConfirmButton.click()

      // decrement count by 1
      totalLeftToBeUnsubbed--;
      
      // messages to console for clarity / readability purposes
      console.log(`<<< Unsubscribed from the channel "${channelNames[i]}". >>>`)
      console.log(`    ${totalLeftToBeUnsubbed} channels left.`)
      // if on last subscription, send final confirmation message
      if(i === totalToBeUnsubbed - 1) console.log(`<<< Done - ${totalToBeUnsubbed} subscriptions erased from existence! >>>`)

			await createRandomDelay(1500, 2500) // pause
    }, (i + 1) * timeOut)
  }
})()
```

# References
- <a href="https://stackoverflow.com/questions/48874382/how-to-unsubscribe-from-all-the-youtube-channels-at-once">Unsubscribe from all YouTube channels at once</a>
- <a href="https://stackoverflow.com/questions/10351658/javascript-get-custom-buttons-text-value">Get button's text</a>
- <a href="https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page">Scroll automatically to bottom of page</a>
- <a href="https://stackoverflow.com/questions/24947837/javascript-page-is-fully-loaded-boolean-check">Execute code only if page fully loaded</a>
- <a href="https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript">Get height of entire document</a>
- <a href="https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript">How to reload a website</a>
