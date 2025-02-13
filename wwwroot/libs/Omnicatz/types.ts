import { ReactNode } from "react";

 

export  interface RouterLike {
    Route(newHash: string): void;
    EvaluateRoute(hash: string): VoidFunc | null;
    RegisterPath(format: string, action: Function):void;
    RegisterSimplePath(format: string, action: () => void):void;
} 

export interface OmnicatzsLike {
    Components:ComponentRegistryLike;
    Router:RouterLike;
    
}

declare global {
        interface Window {
            Omnicatz:OmnicatzsLike,
        }
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
    CreateElement<T, V extends BaseComponentLike<T>>(tag: string, params: { [name: string]: any }, children:  Array<string | HTMLElement>): BaseComponentLike<V>;
    Has(tag): boolean;
}
