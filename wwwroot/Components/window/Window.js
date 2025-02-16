var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX, __frag, BaseComponent } from "../../libs/Omnicatz/JSX.js";
let Window = class Window extends BaseComponent {
    makeContainer() {
        this.Id = crypto.randomUUID();
        const wrapper = JSX("section", { class: "window", id: this.Id });
        return wrapper;
    }
    title;
    SetParam(name, value) {
        if (name === "title") {
            this.title = value;
        }
        this.Render();
    }
    View() {
        if (this.children !== undefined) {
            return JSX(__frag, null,
                JSX("header", null,
                    JSX("h2", null, "dfgdfgdgf")),
                JSX("div", null,
                    JSX("div", null, ...this.children)));
        }
        return JSX("div", null);
    }
};
Window = __decorate([
    CSS("/Components/Window/Window.css"),
    Component("omni-window")
], Window);
export { Window };
//# sourceMappingURL=Window.js.map