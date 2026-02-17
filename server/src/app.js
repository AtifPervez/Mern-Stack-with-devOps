const express = require('express')
const router = require('./router/route')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.json())
mongoose.connect('mongodb+srv://atifpervez:34BmDa5XVvtznQvO@code.8mvlc.mongodb.net/eveserverind_cpanel_59')

    .then(() => console.log('Mongodb is connected'))
    .catch((err) => console.log(err))

app.use('/', router)

app.listen(3000, () => {
    console.log('Server is connected on port', 3000);
})


//*****count frequency*******
// let arr = [1, 2, 3, 1]
// function frequency(arr) {
//     let map = new Map()
//     for (let i = 0; i < arr.length; i++) {
//         if (map.has(arr[i])) {
//             map.set(arr[i], map.get(arr[i]) + 1)
//         }
//         else {
//             map.set(arr[i], 1)
//         }


//     }
//     return map
// }
// console.log(frequency(arr));


//left rotation by one elements
const arr = [1, 2, 3, 4, 5]//output=[2,3,4,5,1]
function leftRotation(arr) {
    const firstEle = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1]
    }
    arr[arr.length - 1] = firstEle
    return arr
}
const res = leftRotation(arr)
console.log(res);

