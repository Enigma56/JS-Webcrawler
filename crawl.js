import { JSDOM } from "jsdom"

const getURLsFromHTML = (htmlDocument, baseURL) => {
    //Acquire all hrefs from document
    const dom = new JSDOM(htmlDocument)
    const anchorElements = dom.window.document.querySelectorAll('a')
    
    const urls = []
    anchorElements.forEach((element) => {
        if(element.hasAttribute('href')){
            let href = element.href 

            try {
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch (error) {
                console.log(`error: ${error.message}: ${href}`) 
            }
        }
    })

    return urls 
}

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

export { normalizeURL, getURLsFromHTML};
