import "./types.js";
export function JSX(tag, attributes, ...children) {
    if (window.Omnicatz.Components.Has(tag)) {
        return window.Omnicatz.Components.CreateElement(tag, attributes).Container;
    }
    const newElement = document.createElement(tag);
    for (const key in attributes) {
        if (key.startsWith("on")) {
            newElement.addEventListener(key.substring(1), attributes[key]);
            continue;
        }
        newElement.setAttribute(key, attributes[key]);
    }
    children.forEach(elm => {
        if (!elm) {
            return;
        }
        if (typeof elm === "string") {
            newElement.appendChild(document.createTextNode(elm));
            return;
        }
        newElement.appendChild(elm);
    });
    return newElement;
}
class ComponentRegistry {
    #map = new Map();
    // public Register(string, )
    static instance;
    Has(tag) {
        return this.#map.has(tag);
    }
    RegisterElement(tag, ctr) {
        this.#map.set(tag, ctr);
    }
    CreateElement(tag, params) {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();
        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }
        newComponent.Render();
        return newComponent;
    }
}
export class BaseComponent {
    model;
    #container;
    get Container() {
        return this.#container;
    }
    constructor() {
        this.#container = this.makeContainer();
    }
    Render() {
        this.#container.innerHTML = "";
        this.#container.appendChild(this.View());
    }
}
if (!window.Omnicatz) {
    window.Omnicatz = {};
}
if (!window.Omnicatz.Components) {
    Object.defineProperty(window.Omnicatz, "Components", {
        get value() {
            if (!ComponentRegistry.instance) {
                ComponentRegistry.instance = new ComponentRegistry();
            }
            return ComponentRegistry.instance;
        }
    });
}
//# sourceMappingURL=JSX.js.map