import app from './app.js';
import { PORT } from './config.js'

//import cron from 'node-cron'
/*
cron.schedule('* * * * *', function () {
    console.log('running a task every minute');
});*/

app.listen(PORT);
console.log("servidor corriendo en puerto", PORT);