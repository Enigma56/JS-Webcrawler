import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

const normalizedURL = 'blog.boot.dev/path'

test('URL ends with \/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe(normalizedURL);
})

test('URL does not end with \/', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe(normalizedURL);
})

test('URL removes protocol', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe(normalizedURL);
}) 
