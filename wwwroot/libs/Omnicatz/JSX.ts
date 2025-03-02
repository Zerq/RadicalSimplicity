import { ReactNode } from "react";
import "./Omnicatz.js";

import { BaseComponentLike, ComponentRegistryLike, Ctr } from "./types.js";

export const __frag = "__frag";


export function JSX(tag: string, attributes: { [name: string]: any; }, ...children: Array<string | number | boolean | bigint | Date | HTMLElement>) {

    if (tag === __frag) {
        const docFrag = document.createDocumentFragment();
        children.forEach(child => {
            const type = window.Omnicatz.MetaData.Get(child);

            if (type.Name === "string") {
                docFrag.appendChild(document.createTextNode(child as string));
                return;
            }

            if (type.Name === "number") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }

            if (type.Name === "bigint") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }
            if (type.Name === "boolean") {
                docFrag.appendChild(document.createTextNode(child + ""));
                return;
            }

            if (type.Name === "Date") {
                docFrag.appendChild(document.createTextNode((child as Date).toString()));
                return;
            }

            docFrag.appendChild(child as HTMLElement);
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

        const type = window.Omnicatz.MetaData.Get(elm);

        if (type.Name === "string") {
            newElement.appendChild(document.createTextNode(elm as string));
            return;
        }

        if (type.Name === "number") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }

        if (type.Name === "bigint") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }
        if (type.Name === "boolean") {
            newElement.appendChild(document.createTextNode(elm + ""));
            return;
        }

        if (type.Name === "Date") {
            newElement.appendChild(document.createTextNode((elm as Date).toString()));
            return;
        }


        newElement.appendChild((elm as HTMLElement));

    });
    return newElement;
}
class ComponentRegistry implements ComponentRegistryLike {
    public GetTag(ctr: Ctr<BaseComponentLike<any>>): string {
        return this.#reverseMap.get(ctr);
    }

    #map: Map<string, Ctr<BaseComponentLike<any>>> = new Map();
    #reverseMap: Map<Ctr<BaseComponentLike<any>>, string> = new Map();

    // public Register(string, )
    public static instance: ComponentRegistry;

    public Has(tag): boolean {
        return this.#map.has(tag);
    }

    public RegisterElement<T>(tag: string, ctr: Ctr<BaseComponent<T>>) {
        this.#map.set(tag, ctr);
        this.#reverseMap.set(ctr, tag);
    }

    public CreateElement<T, V extends BaseComponent<T>>(tag: string, params: { [name: string]: any }, children: Array<string | HTMLElement>): V {
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

    #id: string;

    public get Id(): string {
        return this.#id;
    }

    public set Id(val: string) {
        this.#id = val;
    }

    public get Container(): HTMLElement {
        return this.#container;
    }

    public constructor() {
        this.#container = this.makeContainer();
    }


    protected children: Array<string | HTMLElement>;

    SetChildren(children: Array<string | HTMLElement>): void {
        this.children = children;
    }

    protected abstract makeContainer(): HTMLElement;

    protected makeContainerDefault(ctr: Ctr<BaseComponent<any>>, params: { tagType?: string, class?: string } = { tagType: undefined, class: undefined }): HTMLElement {
        this.Id = crypto.randomUUID();;

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

    public abstract SetParam(name: string, value: any);

    protected abstract View(): HTMLElement;
    public Render() {
        this.#container.innerHTML = "";
        const view = this.View();
        if (view !== null) {
            this.#container.appendChild(view);
        }

    }
}



if (!window.Omnicatz.Components) {
    Object.defineProperty(window.Omnicatz, "Components", {
        get value(): ComponentRegistryLike {
            if (!ComponentRegistry.instance) {
                ComponentRegistry.instance = new ComponentRegistry();
            }
            return ComponentRegistry.instance;
        }
    })
}