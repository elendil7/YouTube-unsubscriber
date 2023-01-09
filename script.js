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
  
  // sleep function for specific delay
  const sleep = (secs) => {
    return new Promise((res) => setTimeout(res, secs * 1000));
  };
  
  // random delay function for random delays
  const createRandomDelay = async (start, end) => {
    const delay = Math.floor(Math.random() * (end - start + 1)) + start;
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
  
  // final code to be run after all subscriptions removed
  const finalMeasures = async () => {
    // some messages to console
    console.log(`<<< Done - ${totalToBeUnsubbed} subscriptions erased from existence! >>>`)
    console.log("!!! Reloading page in 10 seconds... !!!")
    // wait 10 seconds
    await sleep(10)
    // reload page
   	window.location.reload()
  }
  
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
      if(i === totalToBeUnsubbed - 1) return finalMeasures()

			await createRandomDelay(1500, 2500) // pause
    }, (i + 1) * timeOut)
  }
})()
