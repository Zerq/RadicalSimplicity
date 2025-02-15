var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";
let AboutView = class AboutView extends BaseComponent {
    Name;
    constructor() {
        super();
        this.Render();
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("div", { class: "HomeView", id: this.Id });
    }
    SetParam(name, value) {
    }
    View() {
        return JSX("div", null, " blarg ");
    }
};
AboutView = __decorate([
    Component("about-view"),
    __metadata("design:paramtypes", [])
], AboutView);
export { AboutView };
//# sourceMappingURL=AboutView.js.map