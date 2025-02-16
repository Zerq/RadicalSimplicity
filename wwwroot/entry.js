var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseComponent, JSX, __frag } from "./libs/Omnicatz/JSX.js";
import { CSS } from "./libs/Omnicatz/CSS.js";
import "./libs/Omnicatz/types.js";
import "./libs/Omnicatz/JSX.js";
import "./libs/Omnicatz/Router.js";
import "./Components/CheckBox/CheckBox.js";
import "./Components/NavMenu/NavMenu.js";
import "./Components/window/Window.js";
import "./Components/Box/Box.js";
import "./Views/Home/HomeView.js";
import "./Views/about/AboutView.js";
import { Component } from "./libs/Omnicatz/Component.js";
export class BasicAppRoot extends BaseComponent {
    constructor() {
        super();
        window.addEventListener("hashchange", e => {
            window.Omnicatz.Router.Route(location.hash);
        });
        this.Route(window.Omnicatz.Router);
    }
    setInitialView(view) {
        requestAnimationFrame(() => {
            location.hash = view;
            window.Omnicatz.Router.Route(location.hash);
        });
    }
    renderView(view, params, children) {
        const result = window.Omnicatz.Components.CreateElement(view, params, children);
        this.Container.querySelector("main").innerHTML = "";
        result.Render();
        this.Container.querySelector("main").appendChild(result.Container);
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("div", { id: this.Id });
    }
    SetParam(name, value) { }
    View() {
        return JSX(__frag, null,
            JSX("nav-box", { title: "TestPage", items: this.menuItems }),
            JSX("main", { class: "testComponent" }));
    }
}
let AppComponent = class AppComponent extends BasicAppRoot {
    constructor() {
        super();
        this.setInitialView("#home");
    }
    Route(router) {
        router.RegisterPath("#home", () => {
            this.renderView("home-view", {}, []);
        });
        router.RegisterPath("#about", () => {
            this.renderView("about-view", {}, []);
        });
    }
    menuItems = [{ Name: "Home", Url: "#home" }, { Name: "About", Url: "#about" }];
};
AppComponent = __decorate([
    CSS("/layout.css"),
    Component("my-app"),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
(() => {
    document.body.appendChild(JSX("my-app", null));
})();
//# sourceMappingURL=entry.js.map