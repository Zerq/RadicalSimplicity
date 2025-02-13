import { Children, ReactNode } from "react";
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX,  BaseComponent } from "../../libs/Omnicatz/JSX.js"

export type Orientation = "Vertical" | "Horizontal";

 

@CSS("/Components/Box/Box.css")
@Component("omni-box")
export class Box extends BaseComponent<boolean> {
    protected makeContainer(): HTMLElement {
        this.Id = crypto.randomUUID();
        const wrapper = <div class="Box " id={this.Id}></div>;
        return wrapper;
    }

    protected Orientation: Orientation;

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "orientation") {
            this.Orientation = value;
        }

        this.Render();
    }
    protected View(): HTMLElement {
    
        if (this.children !== undefined){
        
        return <div data-orientation={this.Orientation}>
                {...this.children}
            </div>;
            
        }

        return <div></div>
    }

}