import { Component } from "../../libs/Omnicatz/Component.js";
import { BaseComponent, JSX } from "../../libs/Omnicatz/JSX.js";
import { Route } from "../../libs/Omnicatz/types.js";



type TestTypeItem = { burklax: number, blarg: boolean, splarg: string };


type TestType = {
    checked: boolean,
    list: Array<TestTypeItem>;
}

@Route("#home")
@Component("home-view")
export class HomeView extends BaseComponent<TestType> {
    Name: string;

    public constructor() {
        super();
        this.model = {
            checked: true,
            list: [{ burklax: 3, blarg: true, splarg: "hello" }, { burklax: 23, blarg: false, splarg: "zog zog zog" }, { burklax: 223, blarg: true, splarg: "weeee" }]
        };
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
            <omni-window Orientation="Vertical">
                <omni-checkbox disabled="true" onCheckboxChanged={e => this.changed(e)} checked="true" />
                <omni-checkbox onCheckboxChanged={e => this.changed(e)} checked={this.model.checked} />
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

                    <omni-listview
                        data={this.model.list}
                        listmode="TabletView"
                        tableheader={["Blarg","Burklax", "Splarg"]}
                        tabletemplate={(n: TestTypeItem) => {
                            const item = <tr>
                                <td>{n.blarg}</td>
                                <td>{n.burklax}</td>
                                <td>{n.splarg}</td>
                            </tr>;
                            return item;
                        }}
                        listItemTemplate={(n: TestTypeItem) => {
                            const item = <div>
                                <div>{n.blarg}</div>
                                <div>{n.burklax}</div>
                                <div>{n.splarg}</div>
                            </div>;
                            return item;
                        }}
                    ></omni-listview>


                </omni-box>
            </omni-window>
        </div>;
    }

}
