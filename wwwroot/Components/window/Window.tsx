import { Children, ReactNode } from "react";
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX, __frag, BaseComponent } from "../../libs/Omnicatz/JSX.js"

export type Orientation = "Vertical" | "Horizontal";


@CSS("/Components/Window/Window.css")
@Component("omni-window")
export class WindowControl extends BaseComponent<null> {
    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(WindowControl, {tagType:"section", class:"window"})
    }

    protected title: string;

    public SetParam(name: string, value: any) {
        if (name === "title") {
            this.title = value;
        }

        this.Render();
    }
    protected View(): HTMLElement {

        if (this.children !== undefined) {

            return <>
                <header>
                    <h2>dfgdfgdgf</h2>
                </header>
                <div>
                    <div>
                        {...this.children}
                    </div>
                </div>
            </>;
        }

        return <div></div>
    }

}