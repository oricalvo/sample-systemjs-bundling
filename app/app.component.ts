import {appModule} from "./app.module";
import * as template from "./app.component.html";
import "./app.component.css";

export class AppComponent {
    constructor() {
    }
}

appModule.component("appRoot", {
    controller: AppComponent,
    template: template,
})
