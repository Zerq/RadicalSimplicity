import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";


@Component("home-view")
export class HomeView extends BaseComponent<unknown> {
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

    changed(e: CustomEvent) {
        console.log("checkbox changed to " + e.detail);
    }

    protected View(): HTMLElement {
        return <div> 
            <omni-checkbox onCheckboxChanged={e => this.changed(e)} checked="true" /> 
            <omni-box Orientation="Horizontal">
            <omni-box Orientation="Vertical">
                <div>hello</div>
                <div>Bob</div>
                <div>Blarg</div>
                </omni-box>

                <omni-box Orientation="Vertical">
                <div>wrew</div>
                <div>345</div>
                <div>tyu</div>
                </omni-box>


            </omni-box>
        
        </div>;
    }

}
