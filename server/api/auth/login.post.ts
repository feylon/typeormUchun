import joi from "joi";
import jwt from "jsonwebtoken";
import { setCookie } from "h3"

const SchemaBody = joi.object({
    username  : joi.string().min(3).max(20).required(),
    password  : joi.string().min(3).max(20).required()
})

export default defineEventHandler(async (event)=>{
const body  = await readBody(event);

const {error, value} = SchemaBody.validate(body);

if (error) {
    throw createError({
        statusCode: 400,
        statusMessage: error.details[0].message
    });
}

const userList : {username : string, password : string}[] = [
    {username : "feylon", password : "123456"},
    {username : "feylon2", password : "123456"},
]

const user = userList.find(user => user.username === value.username && user.password === value.password)

if (!user) {
    throw createError({
        statusCode: 401,
        statusMessage: "Login or password is wrong"
    })
}
const token : {
    access_token : string,
    refresh_token : string
} = {
    access_token : jwt.sign({username : user.username}, 'secret', { expiresIn: '1h' }),
    refresh_token : jwt.sign({username : user.username}, 'secret', { expiresIn: '1h' })
}

setCookie(event, "AccessToken", token.access_token,{
    path : '/',
    httpOnly : true,
    maxAge : 60 * 60 * 24
});

setCookie(event, "RefreshToken", token.refresh_token, {
    path : '/',
    httpOnly : true,
    maxAge : 60 * 60 * 24
})


return token})
