const server = async ({ app, mongoose, loaders, routes, controllers, jwt }) => {
    
    // Inyected controllers
    const { handlersControllers }  = await loaders({ app, mongoose, controllers, jwt })

    await routes({ app, handlersControllers })

    const port  = 80

    app.listen( port , err => {
            if (err) {
            console.log(err);
            return;
            }
            console.log(`Your server is ready on port ${ port }!`);
        });
    }

module.exports = server