import { getURLsFromHTML } from "./crawl.js"
const test_htmlDocument = '<!DOCTYPE html><p>Hello world</p><a href="https://blog.boot.dev">Learn Backend Development</a>'

const elements = getURLsFromHTML(test_htmlDocument, 'blog.boot.dev')
console.log(elements[0])

console.log('Hello World!')

