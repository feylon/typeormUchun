export function mdl(event :any) {
    const {req, res} = event.node
    console.log("My url is " + req.url)
    throw  createError({
        statusCode: 424,
        statusMessage: 'Sahifa xato ketdi'
    })
}