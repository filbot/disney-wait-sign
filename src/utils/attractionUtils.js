export function getAttractions(attractions, count = 7, collection = null, sortBy = 'waitTime') {
    let filtered = attractions;

    if (collection) {
        filtered = filtered.filter(attraction =>
            collection.some(name => attraction.name.toLowerCase().includes(name.toLowerCase()))
        );
    } else {
        filtered = filtered.filter(attraction => attraction.waitTime !== null && attraction.waitTime !== '∞');
    }

    if (sortBy === 'collection' && collection) {
        filtered.sort((a, b) => {
            const indexA = collection.findIndex(name => a.name.toLowerCase().includes(name.toLowerCase()));
            const indexB = collection.findIndex(name => b.name.toLowerCase().includes(name.toLowerCase()));
            return indexA - indexB;
        });
    } else {
        filtered.sort((a, b) => b.waitTime - a.waitTime);
    }

    return filtered.slice(0, count).map(attraction => ({
        ...attraction,
        name: attraction.name.replace(/™/g, ''),
        waitTime: attraction.waitTime === null ? 'Closed' : attraction.waitTime
    }));
}
