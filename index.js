import { argv } from 'node:process'

import { crawlPage } from "./crawl.js"

const main = () => {
    let args = argv.slice(2)
    
    if(args.length < 1){
         console.log("too little args!");  return;
    }
    if(args.length > 1){
        console.log("too many args!");  return;
    } 
   
    crawlPage(args[0])
        .then((pages) => console.log(pages))
        .catch((error) => console.log(error))
}

main()
