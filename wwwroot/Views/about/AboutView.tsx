import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";


@Component("about-view")
export class AboutView extends BaseComponent<unknown> {
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

    }
 

    protected View(): HTMLElement {
        return <div> blarg </div>;
    }

}
