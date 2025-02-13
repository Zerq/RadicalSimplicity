import { BaseComponent, JSX } from "./JSX.js";
import { Ctr } from "./types.js";


export function CSS<V, T extends BaseComponent<V>>(href: string) {
    return (ctor: Ctr<T>) => {
        const possiblecss = document.querySelectorAll(`link[rel="stylesheet"][href="{href}"]`);
        if (possiblecss.length === 0) {
            document.head.appendChild(<link rel="stylesheet" href={ location.origin + href} />);
        }
    };
}
