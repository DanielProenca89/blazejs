import fetch from "node-fetch"
import fs from 'fs'

export const getApiData= async (startDate, endDate, page)=>{
    const res = await fetch(`https://blaze.com/api/crash_games/history?startDate=${startDate}T00:00:00.000Z&endDate=${endDate}T23:59:59.999Z&page=${page}`)
    const json = res.json()
    return json
}



export const toJsonFile=(data, name)=>{
    fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
        if (err) throw err 
        console.log("Done writing")
    })
}






const test=async ()=>{
    const res = await getApiData('2023-03-16', '2023-03-16', 1)
    const records = res.records
    const pages = res.total_pages
    console.log("resultados: "+records.length)
    console.log("paginas: "+pages)




    toJsonFile(records, "test")   
 }

test()