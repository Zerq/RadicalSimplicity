/// <reference path="./libs/Omnicatz/types" />
export function Component(tagName) {
    return (ctor) => {
        window.Omnicatz.Components.RegisterElement(tagName, ctor);
    };
}
//# sourceMappingURL=Component.js.map