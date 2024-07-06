class TimerFreeTokenBucket {
    constructor(capacity, fillRatePerSecond) {
        // total capacity of the bucket i.e. maximum burst rate
        this.capacity = capacity;
        // total tokens available, initialized to total capacity at the beginning
        this.tokens = capacity;
        // fill rate per second
        this.fillRatePerSecond = fillRatePerSecond
        // store the last filled date-time in unix timestamp in seconds
        this.lastFilled = Math.floor(Date.now() / 1000);
    }

    getAvailableTokens() {
        return this.tokens
    }

    refillTokens(){
        // current timestamp in seconds
        const now = Math.floor(Date.now() / 1000);
        // get total time elapsed in seconds since last time bucket was filled
        const timeElapsed = now - this.lastFilled;
        // get total accumulated tokens since last time the bucket was filled
        const accumulatedTokens = Math.floor(timeElapsed / this.fillRatePerSecond)
        // total avaibale tokens
        const totalAvailableTokens = accumulatedTokens + this.tokens;
        // add available tokens to the bucket, without exceeding the capacity
        this.tokens = Math.min(this.capacity,totalAvailableTokens)
        // set last filled time to current time
        this.lastFilled = now;
    }
 
    takeToken() {
        // try to refill the token if any tokens are accumulated during the elapsed time
        this.refillTokens();

        if (this.tokens > 0) {
            this.tokens -= 1
            return true
        }
        return false
    }
}

module.exports = { TimerFreeTokenBucket }