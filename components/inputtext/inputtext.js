/// <reference path="../../typedefinition/primeui.d.ts" />
System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var InputText;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InputText = (function () {
                function InputText(el) {
                    this.el = el;
                    this.initialized = false;
                }
                InputText.prototype.ngOnInit = function () {
                    jQuery(this.el.nativeElement).puiinputtext({
                        disabled: this.disabled
                    });
                    this.initialized = true;
                };
                InputText.prototype.ngOnChanges = function (changes) {
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement).puiinputtext('option', key, changes[key].currentValue);
                        }
                    }
                };
                InputText.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement).puiinputtext('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], InputText.prototype, "disabled", void 0);
                InputText = __decorate([
                    core_1.Directive({
                        selector: '[pInputText]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], InputText);
                return InputText;
            })();
            exports_1("InputText", InputText);
        }
    }
});
//# sourceMappingURL=inputtext.js.map