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






export const test=async (inicio,fim)=>{
    const res = await getApiData(inicio,fim, 1)
    let records = res.records
    let pages = parseFloat(res.total_pages)
    console.log("resultados: "+records.length)
    console.log("paginas: "+pages)

    let i = 1
    while(pages > 0){

        i = i + 1
        console.log("Pagina: "+i)
        const newRes = await getApiData(inicio,fim, i)
        
        records = [...records, ...newRes.records]

        pages = pages - 1
    }
    return records

    
 }

//test('2023-01-01', '2023-02-28')*/