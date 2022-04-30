function searchAlgo1(arr, key){
    let results = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === key){
            results.push(i)
        }
    }
    if(!results){
        return -1
    }
    return results
}


