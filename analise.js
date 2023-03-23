import  inputs from './test.json' assert { type: "json" };
import  {TrainAndPredict}  from './tensorFlor.js';
import { toJsonFile, getApiData, test } from './getApiData.js';


const hoje = new Date(['2023'],['03'],['23'])




const arr = Array.from({ length: 1440 }, (value, index) => index).map(e=> {hoje.setMinutes(hoje.getMinutes() + 1)
return hoje.toISOString()
})



//const inputs = await test('2023-03-01', '2023-03-22')
//toJsonFile(inputs, "test")

let now = await test('2023-03-23', '2023-03-24')

let dataset = [...inputs, ...now]

const result = await TrainAndPredict(dataset, dataset.map(e=>new Date(e.created_at).getMinutes()))


const flat = result.response.flat()


const map =  dataset.map((e,i)=>{
    return {
        bet: flat[i],
        crash_point:e.crash_point,
        created_at:e.created_at

    }
}).filter(e=>e.bet <= e.crash_point && e.bet > 1)




//const newRes = await TrainAndPredict(map, data.records.map(e=>new Date(e.created_at).getSeconds()))
let testDate  = new Date()




let i = 10
let p = 0
let media = 0
let zero = 0
while(i > 0){
    testDate.setMinutes(new Date().getMinutes())
    const newRes = await TrainAndPredict(map, [testDate.getMinutes()])
    console.log(testDate.toLocaleString())
    const flat2 = newRes.response.flat()
    console.log(flat2)
    media = media + flat2[0]
    zero = flat2[0] < 1? zero+1:zero+0 
    p = p + 1
    i= i-1
}
console.log(media/10)
console.log(100-((zero/10)*100))






/*const map2 = arr.map((e,i)=>{
    return {
        bet: flat2[i],
        created_at:e

    }
}).filter(e=> e.bet > 1)*/





 /*const comp = now.map(e=>{
    let hora = new Date(e.created_at).getHours()
    let minuto = new Date(e.created_at).getMinutes()

    e.results = map2.filter(f=>{
        
        let hora2 = new Date(f.created_at).getHours()
        let minuto2 = new Date(f.created_at).getMinutes()

        if(hora == hora2 && minuto == minuto2){
            return true
        }
    }).map(g=>g.bet)

    return e
})





toJsonFile(comp, "comparativo")

console.log('Resultado: '+comp.length)
console.log('Total: '+now.length)*/