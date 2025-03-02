export function MapMap(map, callback) {
    const list = [];
    map.forEach((a, b) => list.push(callback(b, a)));
    return list;
}
//# sourceMappingURL=MapMap.js.map