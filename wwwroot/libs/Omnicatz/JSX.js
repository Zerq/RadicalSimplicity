import "./types.js";
export const __frag = "__frag";
export function JSX(tag, attributes, ...children) {
    if (tag === __frag) {
        const docFrag = document.createDocumentFragment();
        children.forEach(child => {
            if (typeof child === "string") {
                docFrag.appendChild(document.createTextNode(child));
            }
            else {
                docFrag.appendChild(child);
            }
        });
        return docFrag;
    }
    if (window.Omnicatz.Components.Has(tag)) {
        return window.Omnicatz.Components.CreateElement(tag, attributes, children).Container;
    }
    const newElement = document.createElement(tag);
    for (const key in attributes) {
        if (key.startsWith("on")) {
            newElement.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
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
    GetTag(ctr) {
        return this.#reverseMap.get(ctr);
    }
    #map = new Map();
    #reverseMap = new Map();
    // public Register(string, )
    static instance;
    Has(tag) {
        return this.#map.has(tag);
    }
    RegisterElement(tag, ctr) {
        this.#map.set(tag, ctr);
        this.#reverseMap.set(ctr, tag);
    }
    CreateElement(tag, params, children) {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();
        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }
        newComponent.SetChildren(children);
        newComponent.Render();
        return newComponent;
    }
}
export class BaseComponent {
    model;
    #container;
    #id;
    get Id() {
        return this.#id;
    }
    set Id(val) {
        this.#id = val;
    }
    get Container() {
        return this.#container;
    }
    constructor() {
        this.#container = this.makeContainer();
    }
    children;
    SetChildren(children) {
        this.children = children;
    }
    makeContainerDefault(ctr, params = { tagType: undefined, class: undefined }) {
        this.Id = crypto.randomUUID();
        ;
        /*optional params --> */
        const element = document.createElement(params.tagType ?? "div");
        if (params.class) {
            element.className = params.class;
        }
        /*<-- optional params  */
        element.setAttribute("data-tagtype", window.Omnicatz.Components.GetTag(ctr));
        element.id = this.Id;
        return element;
    }
    Render() {
        this.#container.innerHTML = "";
        const view = this.View();
        if (view !== null) {
            this.#container.appendChild(view);
        }
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