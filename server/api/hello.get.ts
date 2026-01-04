import {mdl} from "../utils/mdl"
export default defineEventHandler((event) => {
    mdl(event)
    
    return 'Hello World'
})