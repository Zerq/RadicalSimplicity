import { BaseComponent, JSX, __frag } from "./libs/Omnicatz/JSX.js"
import { CSS} from "./libs/Omnicatz/CSS.js"

import "./libs/Omnicatz/types.js"
import "./libs/Omnicatz/JSX.js"
import "./libs/Omnicatz/Router.js";
import { AbsCtr, RouterLike } from "./libs/Omnicatz/types.js";
import "./Components/CheckBox/CheckBox.js";
import "./Components/NavMenu/NavMenu.js";

import "./Components/window/Window.js";
import "./Components/Box/Box.js";
import "./Views/Home/HomeView.js";
import "./Views/about/AboutView.js";




import { Component } from "./libs/Omnicatz/Component.js";
import { Children, ReactNode } from "react";
import { MenuDataLike, LinkLike } from "./Components/NavMenu/NavMenu.js";



 
export abstract class BasicAppRoot extends BaseComponent<unknown> {
    public constructor() {
        super();
        window.addEventListener("hashchange", e => {
            window.Omnicatz.Router.Route(location.hash);
        });
        this.Route(window.Omnicatz.Router);
    }

   protected setInitialView(view:string){
        requestAnimationFrame(() => {
            location.hash = view
            window.Omnicatz.Router.Route(location.hash);
        });
    }

    public  abstract Route(router: RouterLike);

    public renderView(view: string, params: { [name: string]: any }, children: Array<string | HTMLElement>) {

        const result = window.Omnicatz.Components.CreateElement(view, params, children);
        this.Container.querySelector("main").innerHTML = "";
        result.Render();
        this.Container.querySelector("main").appendChild(result.Container);
    }

    protected abstract menuItems: Array<LinkLike>;

    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();
        return <div  id={this.Id}></div>;   
    }

    public SetParam(name: string, value: any) { }

    protected View(): HTMLElement {
      return <>
        <nav-box title="TestPage" items={this.menuItems}></nav-box>
        <main class="testComponent">

        </main>
        </>;
    }
}


@CSS("/layout.css")
@Component("my-app")
export class AppComponent extends BasicAppRoot {
 
    public constructor(){
        super();
        this.setInitialView("#home")
 
    }

    public Route(router: RouterLike) {
        router.RegisterPath("#home", () => {
            this.renderView("home-view", {},[]);
        });

        router.RegisterPath("#about", () => {
            this.renderView("about-view", {},[]);
        });
    }

    menuItems = [{Name: "Home", Url: "#home"}, {Name: "About", Url: "#about"}]
}



(() => {
    document.body.appendChild(<my-app></my-app>);
})();