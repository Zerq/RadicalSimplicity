import { BaseComponent, JSX } from "./libs/Omnicatz/JSX.js"
import "./libs/Omnicatz/types.js"
import "./libs/Omnicatz/JSX.js"
import "./libs/Omnicatz/Router.js";
import { Ctr, RouterLike } from "./libs/Omnicatz/types.js";

/// <reference path="./libs/Omnicatz/types" />
export class AppComponent extends BaseComponent<unknown> {
    Id: string;

    public constructor(){
        super();
        window.addEventListener("hashchange", e=> {
            window.Omnicatz.Router.Route(location.hash);
        });   

        this.Route(window.Omnicatz.Router);

        requestAnimationFrame(()=> {
            location.hash = "#home";
            window.Omnicatz.Router.Route(location.hash);
        });
    }

    public Route(router:RouterLike){
        router.RegisterPath("#home", () => {
            this.renderView("home-view", {});
        });
    }

    public renderView(view: string, params: { [name: string]: any }) {
        const result = JSX(view, params);
        this.Container.innerHTML = "";
        this.Container.appendChild(result);
    }
 
    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();

        return <main class="testComponent" id={this.Id}></main>;
    }

    public SetParam(name: string, value: any) {}

    protected View(): HTMLElement {
        return null;
    }
}



export function Component<T>(ctr: Ctr<BaseComponent<T>>) {
    return function(tagName:string){
        window.Omnicatz.Components.RegisterElement(tagName, ctr);
    };

  }

@Component()
export class HomeView extends BaseComponent<unknown> {

    Id: string;
    Name: string;

    public constructor() {
        super();      
        
        this.Render();
    } 

    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();
        return <div class="HomeView" id={this.Id}></div>;
    }
    public SetParam(name: string, value: any) {
        if (name === "Name") {
            this.Name = value;
        }
    }
    protected View(): HTMLElement {
        return <div>ghjghj</div>;
    }

}

export function Entry() {
    window.Omnicatz.Components.RegisterElement("my-app", AppComponent);
    window.Omnicatz.Components.RegisterElement("home-view", HomeView);

    
    document.body.innerHTML = "";
    let val = <my-app></my-app>;
    document.body.appendChild(val);

 

}


