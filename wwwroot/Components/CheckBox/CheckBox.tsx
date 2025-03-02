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
    #animte = false;
    #disabled = false;

    click(e: MouseEvent) {
        if (!this.#disabled) {
            this.model = !this.model;
            this.#animte = true;
            this.Render();
            let checkboxChanged = new CustomEvent("checkboxchanged", { detail: this.model })
            this.Container.querySelector(".box").dispatchEvent(checkboxChanged);
        }
    }

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(CheckBox, { class: "Omnicheckbox" });
    }

    #onCheckboxChanged: (e: undefined) => void;

    public SetParam(name: string, value: any) {
        if (name === "disabled") {
            this.#disabled = value == "true";
        }

        if (name === "checked") {
            this.model = value == "true";
        }

        if (name.toLowerCase() === "oncheckboxchanged") {
            this.#onCheckboxChanged = value;
        }
        this.Render();
    }

    protected View(): HTMLElement {
        let cls = "box";
        if (this.#animte) {
            cls = "box animate";
        }

        let attributes: any = {
        };

        if (this.#disabled) {
            attributes.disabled = "";
        }

        if (this.model) {
            attributes.checked = "";
        }

        return <div class={cls} onCheckboxChanged={e => {
            if (this.#onCheckboxChanged) {
                this.#onCheckboxChanged(e)
            }
        }} onClick={e => this.click(e)}>
            <input type="checkbox" data-checked={this.model} data-id={this.Id}  {...attributes} />
            <div class="slider"></div>
        </div>;
    }
}
