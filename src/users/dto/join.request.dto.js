"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.JoinRequestDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var Users_1 = require("../../../../../../../../../src/entities/Users");
var JoinRequestDto = /** @class */ (function (_super) {
    __extends(JoinRequestDto, _super);
    function JoinRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JoinRequestDto;
}((0, swagger_1.PickType)(Users_1.Users, [
    'email',
    'password',
    'nickname',
])));
exports.JoinRequestDto = JoinRequestDto;
