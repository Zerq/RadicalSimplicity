import { BaseComponent, JSX } from "./libs/Omnicatz/JSX.js"
import "./libs/Omnicatz/types.js"
import "./libs/Omnicatz/JSX.js"
import "./libs/Omnicatz/Router.js";
import { AbsCtr, RouterLike } from "./libs/Omnicatz/types.js";
import "./Components/CheckBox/CheckBox.js";
import "./Components/Box/Box.js";


import "./Views/Home/HomeView.js";
import { Component } from "./libs/Omnicatz/Component.js";
import { Children, ReactNode } from "react";

@Component("my-app")
export class AppComponent extends BaseComponent<unknown> {
    public constructor() {
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

    public Route(router: RouterLike) {
        router.RegisterPath("#home", () => {
            this.renderView("home-view", {},[]);
        });
    }

    public renderView(view: string, params: { [name: string]: any }, children: Array<string | HTMLElement>) {

        const result = window.Omnicatz.Components.CreateElement(view, params, children);
        this.Container.innerHTML = "";
        result.Render();
        this.Container.appendChild(result.Container);
    }
    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();

        return <main class="testComponent" id={this.Id}></main>;
    }

    public SetParam(name: string, value: any) { }

    protected View(): HTMLElement {
        return null;
    }
}



(() => {
    document.body.appendChild(<my-app></my-app>);
})();