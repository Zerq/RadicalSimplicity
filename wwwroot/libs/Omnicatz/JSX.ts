import "./types.js";
import { BaseComponentLike, ComponentRegistryLike, Ctr } from "./types.js";

export function JSX(tag: string, attributes: { [name: string]: any; }, ...children: Array<string | HTMLElement>) {

    if ( window.Omnicatz.Components.Has(tag)) {
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
        if (!elm){
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

class ComponentRegistry implements ComponentRegistryLike{
    #map: Map<string, Ctr<BaseComponent<any>>> = new Map();
    // public Register(string, )
    static instance: ComponentRegistry;

    Has(tag): boolean {
        return this.#map.has(tag);
    }

    RegisterElement<T>(tag: string, ctr: Ctr<BaseComponent<T>>) {
        this.#map.set(tag, ctr);
    }

    CreateElement<T, V extends BaseComponent<T>>(tag: string, params: { [name: string]: any }): V {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();

        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }

        newComponent.Render()

        return <V>newComponent;
    }
}

export abstract class BaseComponent<T> implements BaseComponentLike<T> {
    protected model: T;
    #container: HTMLElement;

    public get Container():HTMLElement {
        return this.#container;
    }

    public constructor() {
        this.#container = this.makeContainer();
    }
 
    protected abstract makeContainer(): HTMLElement;

    public abstract SetParam(name: string, value: any);

    protected abstract View(): HTMLElement;
    public Render() {
        this.#container.innerHTML = "";
        this.#container.appendChild(this.View());
    }
}
 

if (!window.Omnicatz){
    window.Omnicatz = <any>{};
}

if (!window.Omnicatz.Components){
    Object.defineProperty(window.Omnicatz, "Components", { 
        get value() : ComponentRegistryLike {
            if (!ComponentRegistry.instance){
                ComponentRegistry.instance = new ComponentRegistry();
            }
            return  ComponentRegistry.instance;
        }
    })
}
