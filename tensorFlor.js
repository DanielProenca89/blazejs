import * as tf from '@tensorflow/tfjs'
import  inputs from './test.json' assert { type: "json" };
import { getApiData, toJsonFile } from './getApiData.js';
// Model configuration
const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));
model.compile({ loss: 'binaryCrossentropy', optimizer: 'sgd' });

// Input data
// Array of days, and their capacity used out of 
// 100% for 5 hour period

let data = inputs.map(e=>parseFloat(e))

let sort = data.map(e=>Math.floor(Math.random() * e))

console.log(sort)

const xs = tf.tensor2d(data, [data.length, 1]);

// Labels
const ys = tf.tensor2d(sort, [sort.length, 1])
console.log(ys)

// Train the model using the data.
model.fit(xs, ys).then(async () => {
    const FirstRes = await getApiData('2023-03-16', '2023-03-16', 1)
    let records = FirstRes.records.map(e=>parseFloat(e.crash_point))
  const res =  await model.predict(tf.tensor2d(records, [records.length, 1])).array();
  toJsonFile(res, "resultado")
  console.log(res)
}).catch((e) => {
  console.log(e.message);
});