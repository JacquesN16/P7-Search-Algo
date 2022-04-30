function searchAlgo1_1(arr, key){
    let results = []

    arr = arr.filter( i => i === key )
    results = arr

    if(!results){
        return -1
    }
    return results 
}

