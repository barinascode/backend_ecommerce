const expressLoader     =   require('./expressLoader')
const mongooseLoader    =   require('./mongooseLoader')
const controllersLoader =   require('./controllersLoader')

 const loader = async ({ app, mongoose }) => {
    
    await expressLoader({ app })
    await mongooseLoader({ mongoose })
    
    const handlersControllers = await controllersLoader({ mongoose })

    return {
        handlersControllers
    }

}

module.exports = loader