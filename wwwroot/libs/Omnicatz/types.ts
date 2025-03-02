import { ReactNode } from "react";
import { MetaDataLike } from "./MetaData.js";
import { BaseComponent } from "./JSX.js";

export  interface RouterLike {
    Route(newHash: string): void;
    EvaluateRoute(hash: string): VoidFunc | null;
    RegisterPath(format: string, action: Function):void;
    RegisterSimplePath(format: string, action: () => void):void;
    DefaultRouteAction?: (path:string, ctor: Ctr<BaseComponent<any>>, tag:string,  ...params:Array<any>) => void;
} 

/** abstract class type */
export type AbsCtr<T> = Function & { prototype: T; };
/** non-abstract class type */

export interface Ctr<T> {
    new(): T;
}

export type VoidFunc = () => void;


export interface BaseComponentLike<T> {
    get Container():HTMLElement;
    SetChildren(children:  Array<string | HTMLElement>):void;
    SetParam(name: string, value: any);
    Render():void;
}

export interface ComponentRegistryLike {
    RegisterElement<T>(tag: string, ctr: Ctr<BaseComponentLike<T>>): void;
    CreateElement<T, V extends BaseComponentLike<T>>(tag: string, params: { [name: string]: any }, children:  Array<string | boolean| number | bigint | Date| HTMLElement>): BaseComponentLike<V>;
    Has(tag): boolean;
    GetTag(ctr: Ctr<BaseComponentLike<any>>):string;
}




export function Route<V, T extends BaseComponent<V>>(path: string) {
    return (ctor: Ctr<T>) => {

        const tag = window.Omnicatz.Components.GetTag(ctor);

        window.Omnicatz.Router.RegisterPath(path, (...params:Array<any>)=>  window.Omnicatz.Router.DefaultRouteAction?.(path, ctor, tag, params));
    };
}
