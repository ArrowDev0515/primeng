import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections overHidden">
            <div class="Content33 floatLeft overHidden TextShadow">
                <span class="defaultTopic mediumFont dispTable">PrimeNG</span>
                <span class="defaultText dispTable">PrimeNG is a collection of rich UI components for AngularJS2. PrimeNG is a sibling of the popular JavaServer Faces Component Suite, <a href="http://www.primefaces.org">PrimeFaces</a>.</span>
                <br />
                <span class="defaultText dispTable">All widgets are open source and free to use under Apache License 2.0, a commercial friendly license.</span>
                <br />
                <span class="defaultText dispTable">PrimeNG is developed by <a href="http://www.primetek.com.tr">PrimeTek Informatics</a>, a company with years of expertise in developing open source UI components.
                 For project news and updates, follow us on <a href="https://twitter.com/prime_ng">twitter.</a></span>
                <a [routerLink]="['Setup']" class="BigButton TextShadowNone YellowBtn"> <span class="floatLeft">Download</span> <img src="showcase/resources/images/btnArrow.svg" style="float:right"/></a>
                <a href="https://github.com/primefaces/primeng" class="BigButton TextShadowNone OrangeBtn"> <span class="floatLeft">View on GitHub</span> <img src="showcase/resources/images/btnDocumenticon.svg" style="float:right"/></a>
            </div>
            <div class="Content66 floatRight overHidden">
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/ajaxFramework.svg" />
                    <span class="PropertyTopic boldFont">PRIMEFACES UI</span>
                    <span class="PropertyText mediumFont">Derived from the mighty PrimeFaces</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/components.svg" />
                    <span class="PropertyTopic boldFont">WIDGETS</span>
                    <span class="PropertyText mediumFont">50+ Components<br />Easy to Use<br />Accessible</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/productivity.svg" />
                    <span class="PropertyTopic boldFont">PRODUCTIVITY</span>
                    <span class="PropertyText mediumFont">Simple<br />Lightweight<br />Powerful</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/mobile.svg" />
                    <span class="PropertyTopic boldFont">MOBILE</span>
                    <span class="PropertyText mediumFont">Responsive<br />Cross Browser<br />Touch Optimized</span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/community.svg"/>
                    <span class="PropertyTopic boldFont">COMMUNITY</span>
                    <span class="PropertyText mediumFont">Active<br />Vibrant<br />Open Source<br /></span>
                </div>
                <div class="PropertyBox TextShadow">
                    <img src="showcase/resources/images/themeswitcher.svg" />
                    <span class="PropertyTopic boldFont">THEMES</span>
                    <span class="PropertyText mediumFont">35+ Free Themes<br />Premium Themes<br />Theme Creator Tool<br /></span>
                </div>
            </div>
        </div>

        <div class="ContentSideSections overHidden PFLayouts">
            <span class="dispBlock logoBlueText fontSize30 mediumFont">Premium Layouts and Themes coming soon for PrimeNG</span>
            <p class="defaultText" style="margin-bottom:10px">Create <a href="http://www.primefaces.org/themes">awesome web applications</a> in no time, impress your users.</p>
            <div style="padding:30px">
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/modena-primeui"><img src="http://www.primefaces.org/images/highlights/modena.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/rio-primeui"><img src="http://www.primefaces.org/images/highlights/rio.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/adamantium-primeui"><img src="http://www.primefaces.org/images/highlights/adamantium.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/olympos"><img src="http://www.primefaces.org/images/highlights/olympos.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/titan"><img src="http://www.primefaces.org/images/highlights/titan.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/atlas"><img src="http://www.primefaces.org/images/highlights/atlas.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/sentinel"><img src="http://www.primefaces.org/images/highlights/sentinel.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/spark"><img src="http://www.primefaces.org/images/highlights/spark.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/ronin"><img src="http://www.primefaces.org/images/highlights/ronin.png" style="width:100%" /></a>
                </div>
                <div class="Content33 floatLeft overHidden">
                    <a href="http://www.primefaces.org/layouts/volt"><img src="http://www.primefaces.org/images/highlights/volt.png" style="width:100%" /></a>
                </div>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HomePageComponent {

}