import { BaseComponent, JSX } from "./libs/Omnicatz/JSX.js";
import "./libs/Omnicatz/types.js";
import "./libs/Omnicatz/JSX.js";
import "./libs/Omnicatz/Router.js";
/// <reference path="./libs/Omnicatz/types" />
export class AppComponent extends BaseComponent {
    Id;
    constructor() {
        super();
        window.addEventListener("hashchange", e => {
            window.Omnicatz.Router.Route(location.hash);
        });
        window.Omnicatz.Router.RegisterPath("#home", () => {
            this.renderView("home-view", {});
        });
        requestAnimationFrame(() => {
            location.hash = "#home";
            window.Omnicatz.Router.Route(location.hash);
        });
    }
    renderView(view, params) {
        const result = JSX(view, params);
        this.Container.innerHTML = "";
        this.Container.appendChild(result);
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("main", { class: "testComponent", id: this.Id });
    }
    SetParam(name, value) {
    }
    View() {
        return JSX("div", null);
    }
}
export class HomeView extends BaseComponent {
    Id;
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
        if (name === "Name") {
            this.Name = value;
        }
    }
    View() {
        return JSX("div", null, "ghjghj");
    }
}
export function Entry() {
    window.Omnicatz.Components.RegisterElement("my-app", AppComponent);
    window.Omnicatz.Components.RegisterElement("home-view", HomeView);
    document.body.innerHTML = "";
    let val = JSX("my-app", null);
    document.body.appendChild(val);
}
//# sourceMappingURL=entry.js.map