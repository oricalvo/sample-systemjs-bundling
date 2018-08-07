import {AppComponent} from "./app.component";
import * as angular from "angular";
import {appModule} from "./app.module";

const components = [
    AppComponent,
];

angular.bootstrap(document.querySelector("html"), [appModule.name]);
