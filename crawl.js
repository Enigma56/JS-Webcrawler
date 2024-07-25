import { JSDOM } from "jsdom"

const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
    try {
        const obj_currentURL = new URL(currentURL)
        const obj_baseURL = new URL(currentURL)
        if(obj_currentURL.hostname !== obj_baseURL.hostname){
            return pages
        }
        
        const normal_currentURL = normalizeURL(currentURL)
        if(normal_currentURL in pages){
            pages[normal_currentURL] += 1
            return pages
        } else{
            pages[normal_currentURL] = 1
        }

        const htmlBody = await fetchHtmlBody(normal_currentURL)
        const urls = getURLsFromHTML(htmlBody, baseURL)

        //for(const url of urls){
          //  console.log(url)
            //await crawlPage(baseURL, url, pages)
        //}
        
        for (const url of urls) {
            const obj_url = new URL(url);
            if (obj_url.hostname === obj_baseURL.hostname) {
                await crawlPage(baseURL, url, pages);
            } else {
                console.log(`Skipping external URL: ${url}`);
            }
        }

        //console.log(pages)
        return pages

    } catch (error) {
        console.log(error)
    }
    
}

const fetchHtmlBody = async (url) => {
    const response = await fetch(url)

    if(response.status >= 400 && response.status < 500){
        console.log(`Request failed with error code ${response.status}`)                
        return
    }  
    if(response.headers.get('content-type').split(';')[0] !== 'text/html'){
        console.log(`Request has content type of ${response.headers.get('content-type')}`)        
        return
    }

    const data = await response.text()
    console.log(data)   
    
    return data
}

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
        const final_url =  `${url.protocol}${url.host}${url.pathname}`
        if(final_url.endsWith('/')) 
            return final_url.slice(0, final_url.length - 1)
        else{
            return final_url
        }
    } catch (error) {
       console.log(error) 
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage};
