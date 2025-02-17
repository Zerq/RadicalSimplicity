var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Box_1;
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX, BaseComponent } from "../../libs/Omnicatz/JSX.js";
let Box = Box_1 = class Box extends BaseComponent {
    makeContainer() {
        return this.makeContainerDefault(Box_1, { class: "Box" });
    }
    Orientation;
    SetParam(name, value) {
        if (name.toLowerCase() === "orientation") {
            this.Orientation = value;
        }
        this.Render();
    }
    View() {
        if (this.children !== undefined) {
            return JSX("div", { "data-orientation": this.Orientation }, ...this.children);
        }
        return JSX("div", null);
    }
};
Box = Box_1 = __decorate([
    CSS("/Components/Box/Box.css"),
    Component("omni-box")
], Box);
export { Box };
//# sourceMappingURL=Box.js.map