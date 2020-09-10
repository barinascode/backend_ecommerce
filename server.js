const server = async ({ app, mongoose, loaders, routes, controllers }) => {
    
    // Inyected controllers
    const { handlersControllers }  = await loaders({ app, mongoose, controllers })

    await routes({ app, handlersControllers })

    app.listen( 80 , err => {
            if (err) {
            console.log(err);
            return;
            }
            console.log(`Your server is ready !`);
        });
    }

module.exports = server