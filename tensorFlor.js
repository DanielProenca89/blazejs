import * as tf from '@tensorflow/tfjs'
//import  inputs from './test.json' assert { type: "json" };
//import { toJsonFile } from './getApiData.js';







export async function TrainAndPredict(arr, pred){
  let x= arr.map(e=> parseInt(new Date(e.created_at).getMinutes()))


  let y = arr.map(e=>parseFloat(e.crash_point))

  const xTrain = tf.tensor1d(x);

  const yTrain = tf.tensor1d(y)

  let model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1]}));
  model.add(tf.layers.dense({ units: 1, inputShape: [1], activation:"relu" }));

  // compilar o modelo
  model.compile({ loss: 'meanSquaredError', optimizer: 'Adamax' });


 await model.fit(xTrain, yTrain, { epochs: 1 });
  

    // fazer uma previsão com o modelo

    const xPredict = tf.tensor1d(pred);
    const yPredict = model.predict(xPredict);
    const score = model.evaluate(xPredict, yPredict)
   
    const res =  await yPredict.array()

    return {response:res, score:score}

}