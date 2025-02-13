var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseComponent, JSX } from "./libs/Omnicatz/JSX.js";
import "./libs/Omnicatz/types.js";
import "./libs/Omnicatz/JSX.js";
import "./libs/Omnicatz/Router.js";
import "./Components/CheckBox/CheckBox.js";
import "./Components/Box/Box.js";
import "./Views/Home/HomeView.js";
import { Component } from "./libs/Omnicatz/Component.js";
let AppComponent = class AppComponent extends BaseComponent {
    constructor() {
        super();
        window.addEventListener("hashchange", e => {
            window.Omnicatz.Router.Route(location.hash);
        });
        this.Route(window.Omnicatz.Router);
        requestAnimationFrame(() => {
            location.hash = "#home";
            window.Omnicatz.Router.Route(location.hash);
        });
    }
    Route(router) {
        router.RegisterPath("#home", () => {
            this.renderView("home-view", {}, []);
        });
    }
    renderView(view, params, children) {
        const result = window.Omnicatz.Components.CreateElement(view, params, children);
        this.Container.innerHTML = "";
        result.Render();
        this.Container.appendChild(result.Container);
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("main", { class: "testComponent", id: this.Id });
    }
    SetParam(name, value) { }
    View() {
        return null;
    }
};
AppComponent = __decorate([
    Component("my-app"),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
(() => {
    document.body.appendChild(JSX("my-app", null));
})();
//# sourceMappingURL=entry.js.map