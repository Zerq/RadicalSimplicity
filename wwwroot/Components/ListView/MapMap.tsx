

export function MapMap<X, Y, Z>(map: Map<X, Y>, callback: (x:X, Y:Y) => Z): Array<Z> {
    const list: Array<Z> = [];
    map.forEach((a, b) => list.push(callback(b, a)));
    return list;
}
