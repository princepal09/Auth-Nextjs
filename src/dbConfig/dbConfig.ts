import mongoose from 'mongoose'


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MONGODB CONNECTED SUCCESSFULLY")
        })

        connection.on("error", (err) => {
            console.log("MONGODb connection error. Please make sure mongodb is running", err)
            process.exit()
        })
        
    } catch (error) {
        console.log("Something goes wrong")
        console.log(error)
    }

}

