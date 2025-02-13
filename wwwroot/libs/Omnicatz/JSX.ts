import { ReactNode } from "react";
import "./types.js";
import { BaseComponentLike, ComponentRegistryLike, Ctr } from "./types.js";

export const __frag = "__frag";

export function JSX(tag: string, attributes: { [name: string]: any; }, ...children: Array<string | HTMLElement>) {

    if (tag === __frag){
         const docFrag = document.createDocumentFragment();
        children.forEach(child=> {
            if (typeof child  === "string"){
                docFrag.appendChild(document.createTextNode(child));
            }else {
                docFrag.appendChild(child);
            }
        });
       
        return docFrag;
    }


    if ( window.Omnicatz.Components.Has(tag)) {
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

    CreateElement<T, V extends BaseComponent<T>>(tag: string, params: { [name: string]: any }, children:  Array<string | HTMLElement>): V {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();

        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }

        newComponent.SetChildren(children);

        newComponent.Render()

        return <V>newComponent;
    }
}

export abstract class BaseComponent<T> implements BaseComponentLike<T> {
    protected model: T;
    #container: HTMLElement;

    id:string;

    get Id(): string{
        return this.id;
    }

    set Id(val:string){
        this.id = val;
    }




    public get Container():HTMLElement {
        return this.#container;
    }

    public constructor() {
        this.#container = this.makeContainer();
    }


    protected children:  Array<string | HTMLElement>;

    SetChildren(children:  Array<string | HTMLElement>): void {
        this.children = children;
    }
 
    protected abstract makeContainer(): HTMLElement;

    public abstract SetParam(name: string, value: any);




    protected abstract View(): HTMLElement;
    public Render() {
        this.#container.innerHTML = "";
        const view = this.View();    
        if (view !== null){
            this.#container.appendChild(view);
        }

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
