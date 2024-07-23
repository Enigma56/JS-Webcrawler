//const url = require('node:url')

const normalizeURL = (in_url) => {
    try {
        const url = new URL(in_url)

        const final_url =  url.host + url.pathname

        if(final_url.endsWith('/')) 
            return final_url.slice(0, final_url.length - 1)
        else{
            return final_url
        }
    } catch (error) {
       console.log(error) 
    }
}

export { normalizeURL };
