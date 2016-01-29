import {Component} from 'angular2/core';
import {RadioButton} from '../../../components/radiobutton/radiobutton';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">RadioButton</span>
                <span class="defaultText dispTable">RadioButton is an extension to standard radio button element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 1" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 2" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 3" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 3</label></div>
                </div>
            </div>
            Value 1 = {{val1}}

            <h3>Preselection</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 1" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group2" value="Option 2" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group2" value="Option 3" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 3</label></div>
                </div>
            </div>
            Value 2 = {{val2}}
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                    <h3>Import</h3>
<pre>
import {RadioButton} from 'primeng/primeng';
</pre>

                    <h3>Getting Started</h3>
                    <p>RadioButton is defined using p-radio element and value is bound to model property that supports two-way binding.</p>
                    
<pre>
&lt;p-radio name="groupname" value="val1" [(model)]="selectedValue"&gt;&lt;/p-radio&gt;
&lt;p-radio name="groupname" value="val2" [(model)]="selectedValue"&gt;&lt;/p-radio&gt;
</pre>

<pre>
export class ModelComponent {

    selectedValue: string;

}
</pre>

                    <p>As model is two-way binding enabled, giving a default value to the model is enough to display a radio button as checked by default.</p>
<pre>
export class ModelComponent {

    selectedValue: string = 'val1';

}
</pre>

                    <h3>Attributes</h3>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>name</td>
                                    <td>string</td>
                                    <td>null</td>
                                    <td>Name of the checkbox group.</td>
                                </tr>
                                <tr>
                                    <td>value</td>
                                    <td>any</td>
                                    <td>null</td>
                                    <td>Value of the checkbox.</td>
                                </tr>
                                <tr>
                                    <td>model</td>
                                    <td>any</td>
                                    <td>null</td>
                                    <td>An array of values to sync with two-way binding.</td>
                                </tr>
                                <tr>
                                    <td>disabled</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>When present, it specifies that the element should be disabled.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Events</h3>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Parameters</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>click</td>
                                    <td>-.</td>
                                    <td>Callback to invoke on radio button click.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Styling</h3>
                    <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['Theming']">theming page</a>.</p>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Element</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>pui-radiobutton</td>
                                    <td>Container element</td>
                                </tr>
                                <tr>
                                    <td>pui-radiobutton-box</td>
                                    <td>Container of icon.</td>
                                </tr>
                                <tr>
                                    <td>pui-radiobutton-icon</td>
                                    <td>Icon element.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Dependencies</h3>
                    <p>None.</p>
                    
                </p-tabPanel>

                <p-tabPanel header="Source">
<h3>Template</h3>
<pre>
&lt;h3 class="first"&gt;Basic&lt;/h3&gt;
&lt;div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px"&gt;
    &lt;div class="pui-grid-row"&gt;
        &lt;div class="pui-grid-col-1"&gt;&lt;p-radio name="group1" value="Option 1" [(model)]="val1"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 1&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="pui-grid-row"&gt;
        &lt;div class="pui-grid-col-1"&gt;&lt;p-radio name="group1" value="Option 2" [(model)]="val1"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 2&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="pui-grid-row"&gt;
        &lt;div class="pui-grid-col-1"&gt;&lt;p-radio name="group1" value="Option 3" [(model)]="val1"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 3&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
Value 1 = <span>{</span><span>{</span>val1<span>}</span><span>}</span>

&lt;h3&gt;Preselection&lt;/h3&gt;
&lt;div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px"&gt;
    &lt;div class="pui-grid-row"&gt;
        &lt;div class="pui-grid-col-1"&gt;&lt;p-radio name="group1" value="Option 1" [(model)]="val2"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 1&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="pui-grid-row"&gt;
        &lt;div class="pui-grid-col-1"&gt;&lt;p-radio name="group2" value="Option 2" [(model)]="val2"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 2&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="pui-grid-r ow"&gt;
         &lt;div class ="pui-grid-col-1"&gt;&lt;p-radio name="group2" value="Option 3" [(model)]="val2"&gt;&lt;/p-radio&gt;&lt;/div&gt;
        &lt;div class="pui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Option 3&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
Value 2 = <span>{</span><span>{</span>val2<span>}</span><span>}</span>
</pre>

<h3>RadioButtonDemoComponent</h3>
<pre>
export class RadioButtonDemoComponent {

    val1: string;

    val2: string = 'Option 2';
}
</pre>
                </p-tabPanel>
            </p-tabView>
        </div>
    `,
    styles: [`
        .pui-grid .pui-grid-col-1,
        .pui-grid .pui-grid-col-11 {
            padding: 4px 10px;
        }

        .pui-grid label {
            display: inline-block;
            margin: 3px 0px 0px 4px;
        }
    `],
    directives: [RadioButton,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class RadioButtonDemoComponent {

    val1: string;

    val2: string = 'Option 2';
}