function mergePairArray(currentPairs,newPairs) {
    var newPairsStringify = newPairs.map(newPairInfo => JSON.stringify(newPairInfo.pair))

    // Deletes all elements from first array that are included in the newArray so we can replace them
    var filteredCurrentPairs = currentPairs.filter(currentPairInfo => !(newPairsStringify.includes(JSON.stringify(currentPairInfo.pair))))

    return [...filteredCurrentPairs,...newPairs]
}

module.exports = {mergePairArray}
