"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DmsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var DmsController = /** @class */ (function () {
    function DmsController() {
    }
    DmsController.prototype.getChat = function (query, param) {
        console.log(param.url, param.id);
        console.log(query.perPage, query.page);
    };
    DmsController.prototype.postChat = function (body) {
        console.log(body);
    };
    __decorate([
        (0, swagger_1.ApiParam)({
            name: 'url',
            required: true,
            description: '워크스페이스 url'
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            required: true,
            description: '사용자 아이디'
        }),
        (0, swagger_1.ApiQuery)({
            name: 'perPage',
            required: true,
            description: '한번에 가져오는 갯수'
        }),
        (0, swagger_1.ApiQuery)({
            name: 'page',
            required: true,
            description: '불러올 페이지'
        }),
        (0, common_1.Get)(':id/chats'),
        __param(0, (0, common_1.Query)()),
        __param(1, (0, common_1.Param)())
    ], DmsController.prototype, "getChat");
    __decorate([
        (0, common_1.Post)(':id/chats'),
        __param(0, (0, common_1.Body)())
    ], DmsController.prototype, "postChat");
    DmsController = __decorate([
        (0, swagger_1.ApiTags)('DM'),
        (0, common_1.Controller)('api/workspaces/:url/dms')
    ], DmsController);
    return DmsController;
}());
exports.DmsController = DmsController;
