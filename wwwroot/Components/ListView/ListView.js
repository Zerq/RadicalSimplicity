var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListView_1;
import { Component } from "../../libs/Omnicatz/Component.js";
import { CSS } from "../../libs/Omnicatz/CSS.js";
import { JSX, BaseComponent } from "../../libs/Omnicatz/JSX.js";
let ListView = ListView_1 = class ListView extends BaseComponent {
    #listItemTemplate;
    #tableTemplate;
    #tableHeader;
    #listMode;
    #iconSize;
    makeContainer() {
        return this.makeContainerDefault(ListView_1, { class: "Box" });
    }
    SetParam(name, value) {
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
    View() {
        if (this.#listMode === "TabletView" && this.#tableTemplate && this.#tableHeader) {
            return JSX("table", { "data-iconSize": this.#iconSize ?? "Small" },
                JSX("thead", null,
                    JSX("tr", null, ...(this.#tableHeader ? this.#tableHeader.map(n => JSX("td", null, n)) : []))),
                ...this.model.map(n => this.#tableTemplate(n)));
        }
        if (!this.#listItemTemplate) {
            return JSX("div", null);
        }
        return JSX("ul", { "data-iconSize": this.#iconSize ?? "Small" }, ...this.model.map(item => JSX("li", null, this.#listItemTemplate(item))));
    }
};
ListView = ListView_1 = __decorate([
    CSS("/Components/Box/ListView.css"),
    Component("omni-listview")
], ListView);
export { ListView };
//# sourceMappingURL=ListView.js.map