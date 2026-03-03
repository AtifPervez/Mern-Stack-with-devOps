const express = require('express')
const router = require('./router/route')
const dotenv=require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Mongodb is connected'))
    .catch((err) => console.log(err))

app.use('/', router)

app.listen( process.env.PORT, () => {
    console.log('Server is connected on port', process.env.PORT);
})










// let a='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTlkNzIwY2Q5M2RkZTg1N2JiOTMwOTMiLCJ1c2VybmFtZSI6IlNhaGVlbSBLaGFuIiwiaWF0IjoxNzcyMDEwMzUwLCJleHAiOjE3NzIwMTM5NTB9.MCxtdoRBSIISc2x9QZIZPcnZwoIKh86wVhb1IQIJL3E'


// let b=a.split(' ')[1]
// console.log(b);



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
// const arr = [1, 2, 3, 4, 5]//output=[2,3,4,5,1]
// function leftRotation(arr) {
//     const firstEle = arr[0]
//     for (let i = 0; i < arr.length - 1; i++) {
//         arr[i] = arr[i + 1]
//     }
//     arr[arr.length - 1] = firstEle
//     return arr
// }
// const res = leftRotation(arr)
// console.log(res);

//FIND BIGGEST PRODUCT
// const arr = [7, 2, 3, 9, 10, 11, 12]
// let sortArr = arr.sort((a, b) => a - b)//ascending
// // let sortArr = arr.sort((a, b) => b - a)//decending
// function product(sortArr) {
//     let maxEle = sortArr[sortArr.length - 1]
//     let secMaxEle = sortArr[sortArr.length - 2]

//     return (maxEle * secMaxEle)
// }
// let res = product(sortArr)
// console.log(res);



