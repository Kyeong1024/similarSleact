"use strict";
exports.__esModule = true;
exports.Token = void 0;
var common_1 = require("@nestjs/common");
exports.Token = (0, common_1.createParamDecorator)(function (data, ctx) {
    var response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
});
