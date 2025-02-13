import { BaseComponent } from "./JSX.js";
import { Ctr } from "./types.js";

/// <reference path="./libs/Omnicatz/types" />

export function Component<V, T extends BaseComponent<V>>(tagName: string) {
    return (ctor: Ctr<T>) => {
        window.Omnicatz.Components.RegisterElement(tagName, ctor);
    };
}
