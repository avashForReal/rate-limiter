class TokenBucket {
    constructor(capacity, fillRatePerSecond) {
        // total capacity of the bucket i.e. maximum burst rate
        this.capacity = capacity;
        // total tokens available, initialized to total capacity at the beginning
        this.tokens = capacity;

        // if 2 tokens per  1000 millisecond (1s) is supplied then, 
        // 1000/2 i.e 1 token will be generated every 500ms hence fulfilling out fill rate
        this.fillDelta = 1000 / fillRatePerSecond

        setInterval(() => this.addToken(), this.fillDelta)

    }

    getAvailableTokens() {
        return this.tokens
    }

    addToken() {
        if (this.tokens < this.capacity) {
            this.tokens += 1
        }
    }

    takeToken() {                
        if (this.tokens > 0) {
            this.tokens -= 1
            return true
        }
        return false
    }
}

module.exports = { TokenBucket }