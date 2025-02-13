import { CSS } from "../../libs/Omnicatz/CSS.js";
import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";




@CSS("/Components/CheckBox/CheckBox.css")
@Component("omni-checkbox")
export class CheckBox extends BaseComponent<boolean> {

    public constructor() {
        super();
        this.model = false;
        this.Render();
    }

    click(e: MouseEvent) {
        this.model = !this.model;
        this.Render();

        let checkboxChanged = new CustomEvent("checkboxchanged", { detail: this.model })
        this.Container.querySelector(".box").dispatchEvent(checkboxChanged);

    }

    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();
        const wrapper = <div class="Omnicheckbox" id={this.Id}></div>;
        return wrapper;
    }



    #onCheckboxChanged: (e: undefined) => void;


    public SetParam(name: string, value: any) {


        if (name === "checked") {
            this.model = value === "true";
        }

        if (name.toLowerCase() === "oncheckboxchanged") {
            this.#onCheckboxChanged = value;
        }



        this.Render();
    }

    protected View(): HTMLElement {
 

        if (this.model === true) {
           return <div class="box" onCheckboxChanged={e => {
                if (this.#onCheckboxChanged) {
                    this.#onCheckboxChanged(e)
                }
            }} onClick={e => this.click(e)}>
                <input type="checkbox" data-id={this.Id} checked="" />
                <div class="slider"></div>
            </div>;
        }
      
        return <div class="box" onCheckboxChanged={e => {
                if (this.#onCheckboxChanged) {
                    this.#onCheckboxChanged(e)
                }
            }} onClick={e => this.click(e)}>
                <input type="checkbox" data-id={this.Id} />
                <div class="slider"></div>
            </div>;
 
    
    }
}
