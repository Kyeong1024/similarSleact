"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UndefinedToNullInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var UndefinedToNullInterceptor = /** @class */ (function () {
    function UndefinedToNullInterceptor() {
    }
    UndefinedToNullInterceptor.prototype.intercept = function (context, next) {
        // controller 진입 전부분
        return next
            .handle()
            .pipe((0, rxjs_1.map)(function (data) { return (data === undefined ? null : data); }));
    };
    UndefinedToNullInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], UndefinedToNullInterceptor);
    return UndefinedToNullInterceptor;
}());
exports.UndefinedToNullInterceptor = UndefinedToNullInterceptor;