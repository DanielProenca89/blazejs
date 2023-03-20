import * as tf from '@tensorflow/tfjs'
import  inputs from './test.json' assert { type: "json" };
import { toJsonFile } from './getApiData.js';


let arr = inputs

let x= arr.map(e=> parseInt(new Date(e.created_at).getSeconds()))


console.log(x)
let y = arr.map(e=>parseFloat(e.crash_point))

const xTrain = tf.tensor1d(x);

const yTrain = tf.tensor1d(y)

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// compilar o modelo
model.compile({ loss: 'meanSquaredError', optimizer: 'Adamax' });

model.fit(xTrain, yTrain, { epochs: 100 }).then(async () => {
  // fazer uma previsão com o modelo
  const created_at = new Date('2023-03-11T00:06:00.343Z').getSeconds();
  const xPredict = tf.tensor1d(x);
  const yPredict = model.predict(xPredict);
  const res =  await yPredict.array()
  console.log(res)
  toJsonFile(res,"result")
  //console.log("resultados: "+res.lenght)
  //const compare = res.filter((e,i)=>e<=y[i])
  //console.log("Acertos: " + compare.lenght)
  //console.log("Porcentagem "+ parseFloat(compare.lenght/res.lenght).toFixed(2))

});