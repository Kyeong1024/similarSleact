"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChannelsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var ChannelsController = /** @class */ (function () {
    function ChannelsController() {
    }
    ChannelsController.prototype.getWorkspaceChannels = function () {
        console.log('getChannel');
    };
    ChannelsController.prototype.getWorkspaceChannel = function () { };
    ChannelsController.prototype.createWorkspaceChannels = function () { };
    ChannelsController.prototype.getWorkspaceChannelMembers = function () { };
    ChannelsController.prototype.createWorkspaceMembers = function () { };
    ChannelsController.prototype.getWorkspaceChannelChats = function () { };
    ChannelsController.prototype.createWorkspaceChannelChats = function () { };
    __decorate([
        (0, common_1.Get)(':url/channels')
    ], ChannelsController.prototype, "getWorkspaceChannels");
    __decorate([
        (0, common_1.Get)(':url/channels/:name')
    ], ChannelsController.prototype, "getWorkspaceChannel");
    __decorate([
        (0, common_1.Post)(':url/channels')
    ], ChannelsController.prototype, "createWorkspaceChannels");
    __decorate([
        (0, common_1.Get)(':url/channels/:name/members')
    ], ChannelsController.prototype, "getWorkspaceChannelMembers");
    __decorate([
        (0, common_1.Post)(':url/channels/:name/members')
    ], ChannelsController.prototype, "createWorkspaceMembers");
    __decorate([
        (0, common_1.Get)(':url/channels/:name/chats')
    ], ChannelsController.prototype, "getWorkspaceChannelChats");
    __decorate([
        (0, common_1.Post)(':url/channels/:name/chats')
    ], ChannelsController.prototype, "createWorkspaceChannelChats");
    ChannelsController = __decorate([
        (0, swagger_1.ApiTags)('CHANNEL'),
        (0, common_1.Controller)('api/workspaces')
    ], ChannelsController);
    return ChannelsController;
}());
exports.ChannelsController = ChannelsController;
