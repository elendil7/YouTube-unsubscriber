// auto creates new object instance so that variables / class names don't conflict every time you run the script.
{
  // * Main code (class with various methods for unsubscribing oneself from all youtube channels, step by step)
  class UnsubscriptionManager {
    constructor(timeOut, document){
    	// general delay between each unsubscription process
    	this.timeOut = timeOut
      this.document = document
    }
    
    // get entire document (page) height
    getDocumentHeight(){
      const body = document.body, html = document.documentElement;
      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    
    // keep scrolling indefinitely until reached the very bottom of the page
    async keepScrolling(){
      let prevGridContentLength = 0
      while(true){
        // get current length of content grid (all channels)
        const curGridContentLength = document.querySelectorAll("div#content-section").length
        // if previous length is the same as current, break out of loop (as we know that bottom of page has been reached)
        if(prevGridContentLength === curGridContentLength) break
        // otherwise, keep looping. Set prev to cur length.
        prevGridContentLength = curGridContentLength
        // scroll further down to bottom of page
        setTimeout(window.scrollTo(0, this.getDocumentHeight()), 1000)
      }
    }
    
    // scroll to current subscription being unsubscribed, for cool visuals
    async scrollToNextSubscription(button){
			button.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
    
    // sleep function for specific delay
    sleep(secs){
      return new Promise((res) => setTimeout(res, secs * 1000))
    }

    // random delay function for random delays
    async createRandomDelay(start, end){
      const delay = Math.floor(Math.random() * (end - start + 1)) + start;
      return new Promise((resolve) => setTimeout(resolve, delay))
    }

    // final code to be run after all subscriptions removed
    async finalMeasures(totalToBeUnsubbed){
      // some messages to console
      console.log(`<<< Done - ${totalToBeUnsubbed} subscriptions erased from existence! >>>`)
      console.log("!!! Reloading page in 10 seconds... !!!")
      // wait 10 seconds
      await this.sleep(10)
      // reload page
      window.location.reload()
    }
    
    // ensure that user is on the correct webpage. If not, redirect & reload
    checkIfCorrectWebsite(){
      const URL = "https://www.youtube.com/feed/channels"
      if(this.document.location.href !== URL){
        // go to correct website
        this.document.location = URL
      }
    }
    
    getChannelElems(){
			return document.querySelectorAll("div#info-section")
    }
    
    getChannelNames(channelElems){
      // get names of channels subscribed to
      return [...channelElems].map(channel=>channel.querySelector("yt-formatted-string#text").innerHTML)
    }
    
    getSubscriptionButtons(){
      // get all subscription buttons
      return document.querySelectorAll("button[aria-label^='Unsubscribe from']")
    }
  }
  
  // self executing function to run new instance of execution (initiate unsubscription process), as well as all the logic (class methods) step by step.
  (async()=>{
    // make new instance of function
  	const instance = new UnsubscriptionManager(2000, this.document)
    
    instance.checkIfCorrectWebsite()
    await instance.keepScrolling()
    
    const channels = instance.getChannelElems()
    const channelNames = instance.getChannelNames(channels)
    const subscriptionButtons = instance.getSubscriptionButtons()
    
    // get total channels subscribed to
    const totalToBeUnsubbed = subscriptionButtons.length;
    // initialize counter
    let totalLeftToBeUnsubbed = totalToBeUnsubbed
    
    // if no subscriptions present, break script
    if(totalToBeUnsubbed === 0) return console.log("<<< No subscriptions found. >>>")
    
    for (let i = 0; i < totalToBeUnsubbed; ++i) {
      setTimeout(async () => {
        // get current button
        const curButton = subscriptionButtons[i]
        // get button text
        const curButtonText = (curButton.textContent || curButton.innerText).toLowerCase()

        // if channel has already been unsubscribed from, break out of function
        if(curButtonText !== "subscribed") return
        
        // smooth scroll current subscription element into user's fov
        await instance.scrollToNextSubscription(channels[i])
				
        await instance.sleep(0.5) // pause
        
        // click current button
        curButton.click()

        await instance.createRandomDelay(500, 1500) // pause

        // get and click unsubscribe confirmation button
        const unsubConfirmButton = document.querySelector('[aria-label="Unsubscribe"]');
        unsubConfirmButton.click()

        // decrement count by 1
        totalLeftToBeUnsubbed--;

        // messages to console for clarity / readability purposes
        console.log(`<<< Unsubscribed from the channel "${channelNames[i]}". >>>`)
        console.log(`    ${totalLeftToBeUnsubbed} channels left.`)
        // if on last subscription, send final confirmation message
        if(i === totalToBeUnsubbed - 1) return instance.finalMeasures(totalToBeUnsubbed)

        await instance.createRandomDelay(1500, 2500) // pause
      }, (i + 1) * instance.timeOut)
    }
  })()
}
