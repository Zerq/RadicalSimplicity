var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";
import { Route } from "../../libs/Omnicatz/types.js";
let HomeView = class HomeView extends BaseComponent {
    Name;
    constructor() {
        super();
        this.model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
        this.Render();
    }
    makeContainer() {
        this.Id = crypto.randomUUID();
        return JSX("div", { class: "HomeView", id: this.Id });
    }
    SetParam(name, value) {
        if (name === "Name") {
            this.Name = value;
        }
    }
    changed(e) {
        console.log("checkbox changed to " + e.detail);
    }
    View() {
        return JSX("div", null,
            JSX("omni-window", { Orientation: "Vertical" },
                JSX("omni-checkbox", { disabled: "true", onCheckboxChanged: e => this.changed(e), checked: "true" }),
                JSX("omni-checkbox", { onCheckboxChanged: e => this.changed(e), checked: this.model.checked }),
                JSX("omni-box", { Orientation: "Horizontal" },
                    JSX("omni-box", { Orientation: "Vertical" },
                        JSX("div", null, "hello"),
                        JSX("div", null, "Bob"),
                        JSX("div", null, "Blarg")),
                    JSX("omni-box", { Orientation: "Vertical" },
                        JSX("div", null, "wrew"),
                        JSX("div", null, "345"),
                        JSX("div", null, "tyu")),
                    JSX("omni-listview", { data: this.model.list, listmode: "TabletView", tableheader: ["Blarg", "Burklax", "Splarg"], tabletemplate: (n) => {
                            const item = JSX("tr", null,
                                JSX("td", null, n.blarg),
                                JSX("td", null, n.burklax),
                                JSX("td", null, n.splarg));
                            return item;
                        }, listItemTemplate: (n) => {
                            const item = JSX("div", null,
                                JSX("div", null, n.blarg),
                                JSX("div", null, n.burklax),
                                JSX("div", null, n.splarg));
                            return item;
                        } }))));
    }
};
HomeView = __decorate([
    Route("#home"),
    Component("home-view"),
    __metadata("design:paramtypes", [])
], HomeView);
export { HomeView };
//# sourceMappingURL=HomeView.js.map