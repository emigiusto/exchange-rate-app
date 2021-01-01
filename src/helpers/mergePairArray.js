export default function mergePairArray(currentPairs,newPairs) {
    //Merges current currency array of pairs on state with new Currency pairs returned from API's call
    //replacing the new ones with the old ones
    var newPairsStringify = newPairs.map(newPairInfo => JSON.stringify(newPairInfo.pair))

    //Deletes all elements from first array that are included in the newArray so we can replace them
    var filteredCurrentPairs = currentPairs.filter(currentPairInfo => !(newPairsStringify.includes(JSON.stringify(currentPairInfo.pair))))
    return [...filteredCurrentPairs,...newPairs]
}
