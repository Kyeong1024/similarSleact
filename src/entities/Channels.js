"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Channels = void 0;
var typeorm_1 = require("typeorm");
var ChannelChats_1 = require("./ChannelChats");
var ChannelMembers_1 = require("./ChannelMembers");
var Users_1 = require("./Users");
var Workspaces_1 = require("./Workspaces");
var Channels = /** @class */ (function () {
    function Channels() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' })
    ], Channels.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'name', length: 30 })
    ], Channels.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)('tinyint', {
            name: 'private',
            nullable: true,
            width: 1,
            "default": function () { return "'0'"; }
        })
    ], Channels.prototype, "private");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Channels.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Channels.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'WorkspaceId', nullable: true })
    ], Channels.prototype, "WorkspaceId");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelChats_1.ChannelChats; }, function (channelchats) { return channelchats.Channel; })
    ], Channels.prototype, "ChannelChats");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelMembers_1.ChannelMembers; }, function (channelMembers) { return channelMembers.Channel; }, {
            cascade: ['insert']
        })
    ], Channels.prototype, "ChannelMembers");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Users_1.Users; }, function (users) { return users.Channels; })
    ], Channels.prototype, "Members");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Channels; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
    ], Channels.prototype, "Workspace");
    Channels = __decorate([
        (0, typeorm_1.Index)('WorkspaceId', ['WorkspaceId'], {}),
        (0, typeorm_1.Entity)({ schema: 'sleact' })
    ], Channels);
    return Channels;
}());
exports.Channels = Channels;
