const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const routes = require('./routes')

const initData = require('./start/initData')



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',routes)
const PORT = config.get("PORT")??8080

async function start(){
    try{
        mongoose.connection.once('open',()=>{
            initData()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green("mongoDB connected..."))
        app.listen(PORT,()=>console.log(chalk.green(`server started on port ${PORT}...`)))

    }catch(e){
        console.log(chalk.red(e.message))
        process.exit(1)
    }

}

start()