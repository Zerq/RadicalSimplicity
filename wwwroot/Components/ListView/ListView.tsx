import { Children, ReactNode } from "react";
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX, BaseComponent } from "../../libs/Omnicatz/JSX.js"
import { MapMap } from "./MapMap.js";
import { CheckBox } from "../CheckBox/CheckBox.js";




export type ListMode = "ListView" | "TabletView";

export type IconSize = "Large" | "Small";

@CSS("/Components/Box/ListView.css")
@Component("omni-listview")
export class ListView<V, T extends Array<V>> extends BaseComponent<T> {
    #listItemTemplate: (data: V) => HTMLElement;
    #tableTemplate: (data: V) => HTMLTableRowElement;
    #tableHeader: Array<string>;
    #listMode: ListMode;
    #iconSize: IconSize;

    protected makeContainer(): HTMLElement {
        return this.makeContainerDefault(ListView, { class: "Box" });
    }

    public SetParam(name: string, value: any) {
        if (name.toLowerCase() === "data") {
            this.model = value;
        }

        if (name.toLowerCase() === "iconsize") {
            this.#iconSize = value;
        }

        if (name.toLowerCase() === "listmode") {
            this.#listMode = value;
        }

        if (name.toLowerCase() === "listitemtemplate") {
            this.#listItemTemplate = value;
        }

        if (name.toLowerCase() === "tabletemplate") {
            this.#tableTemplate = value;
        }

        if (name.toLowerCase() === "tableheader") {
            this.#tableHeader = value;
        }

        this.Render();
    }

    protected View(): HTMLElement {
        if (this.#listMode === "TabletView" && this.#tableTemplate && this.#tableHeader) {
            return <table data-iconSize={this.#iconSize ?? "Small"}>
                <thead>
                    <tr>
                        {...(this.#tableHeader ? this.#tableHeader.map(n => <td>{n}</td>) : [])}
                    </tr>
                </thead>
                {...this.model.map(n => this.#tableTemplate(n))}
            </table>;
        }


        if (!this.#listItemTemplate) {
            return <div></div>
        }

        return <ul data-iconSize={this.#iconSize ?? "Small"} >
            {...this.model.map(item => <li>
                {this.#listItemTemplate(item)}
            </li>
            )}
        </ul>
    }
}