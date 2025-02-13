var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";
let CheckBox = class CheckBox extends BaseComponent {
    constructor() {
        super();
        this.model = false;
        this.Render();
    }
    click(e) {
        this.model = !this.model;
        this.Render();
        let checkboxChanged = new CustomEvent("checkboxchanged", { detail: this.model });
        this.Container.querySelector(".box").dispatchEvent(checkboxChanged);
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        const wrapper = JSX("div", { class: "Omnicheckbox", id: this.Id });
        return wrapper;
    }
    #onCheckboxChanged;
    SetParam(name, value) {
        if (name === "checked") {
            this.model = value === "true";
        }
        if (name.toLowerCase() === "oncheckboxchanged") {
            this.#onCheckboxChanged = value;
        }
        this.Render();
    }
    View() {
        if (this.model === true) {
            return JSX("div", { class: "box", onCheckboxChanged: e => {
                    if (this.#onCheckboxChanged) {
                        this.#onCheckboxChanged(e);
                    }
                }, onClick: e => this.click(e) },
                JSX("input", { type: "checkbox", "data-id": this.Id, checked: "" }),
                JSX("div", { class: "slider" }));
        }
        return JSX("div", { class: "box", onCheckboxChanged: e => {
                if (this.#onCheckboxChanged) {
                    this.#onCheckboxChanged(e);
                }
            }, onClick: e => this.click(e) },
            JSX("input", { type: "checkbox", "data-id": this.Id }),
            JSX("div", { class: "slider" }));
    }
};
CheckBox = __decorate([
    CSS("/Components/CheckBox/CheckBox.css"),
    Component("omni-checkbox"),
    __metadata("design:paramtypes", [])
], CheckBox);
export { CheckBox };
//# sourceMappingURL=CheckBox.js.map