"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Users = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var ChannelChats_1 = require("./ChannelChats");
var ChannelMembers_1 = require("./ChannelMembers");
var Channels_1 = require("./Channels");
var DMs_1 = require("./DMs");
var Mentions_1 = require("./Mentions");
var WorkspaceMembers_1 = require("./WorkspaceMembers");
var Workspaces_1 = require("./Workspaces");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' })
    ], Users.prototype, "id");
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, typeorm_1.Column)('varchar', { name: 'email', unique: true, length: 30 })
    ], Users.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, typeorm_1.Column)('varchar', { name: 'nickname', length: 30 })
    ], Users.prototype, "nickname");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, typeorm_1.Column)('varchar', { name: 'password', length: 100, select: false })
    ], Users.prototype, "password");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Users.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Users.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.DeleteDateColumn)()
    ], Users.prototype, "deletedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelChats_1.ChannelChats; }, function (channelchats) { return channelchats.User; })
    ], Users.prototype, "ChannelChats");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelMembers_1.ChannelMembers; }, function (channelmembers) { return channelmembers.User; })
    ], Users.prototype, "ChannelMembers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DMs_1.DMs; }, function (dms) { return dms.Sender; })
    ], Users.prototype, "DMs");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DMs_1.DMs; }, function (dms) { return dms.Receiver; })
    ], Users.prototype, "DMs2");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Mentions_1.Mentions; }, function (mentions) { return mentions.Sender; })
    ], Users.prototype, "Mentions");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Mentions_1.Mentions; }, function (mentions) { return mentions.Receiver; })
    ], Users.prototype, "Mentions2");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return WorkspaceMembers_1.WorkspaceMembers; }, function (workspacemembers) { return workspacemembers.User; })
    ], Users.prototype, "WorkspaceMembers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Owner; })
    ], Users.prototype, "OwnedWorkspaces");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Members; }),
        (0, typeorm_1.JoinTable)({
            name: 'workspacemembers',
            joinColumn: {
                name: 'UserId',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'WorkspaceId',
                referencedColumnName: 'id'
            }
        })
    ], Users.prototype, "Workspaces");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Channels_1.Channels; }, function (channels) { return channels.Members; }),
        (0, typeorm_1.JoinTable)({
            name: 'channelmembers',
            joinColumn: {
                name: 'UserId',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'ChannelId',
                referencedColumnName: 'id'
            }
        })
    ], Users.prototype, "Channels");
    Users = __decorate([
        (0, typeorm_1.Index)('email', ['email'], { unique: true }),
        (0, typeorm_1.Entity)({ schema: 'sleact', name: 'users' })
    ], Users);
    return Users;
}());
exports.Users = Users;
