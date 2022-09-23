"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Workspaces = void 0;
var typeorm_1 = require("typeorm");
var Channels_1 = require("./Channels");
var DMs_1 = require("./DMs");
var Mentions_1 = require("./Mentions");
var WorkspaceMembers_1 = require("./WorkspaceMembers");
var Users_1 = require("./Users");
var Workspaces = /** @class */ (function () {
    function Workspaces() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' })
    ], Workspaces.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'name', unique: true, length: 30 })
    ], Workspaces.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'url', unique: true, length: 30 })
    ], Workspaces.prototype, "url");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Workspaces.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Workspaces.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.DeleteDateColumn)()
    ], Workspaces.prototype, "deletedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'OwnerId', nullable: true })
    ], Workspaces.prototype, "OwnerId");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Channels_1.Channels; }, function (channels) { return channels.Workspace; })
    ], Workspaces.prototype, "Channels");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DMs_1.DMs; }, function (dms) { return dms.Workspace; })
    ], Workspaces.prototype, "DMs");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Mentions_1.Mentions; }, function (mentions) { return mentions.Workspace; })
    ], Workspaces.prototype, "Mentions");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return WorkspaceMembers_1.WorkspaceMembers; }, function (workspacemembers) { return workspacemembers.Workspace; }, { cascade: ['insert'] })
    ], Workspaces.prototype, "WorkspaceMembers");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.Workspaces; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'OwnerId', referencedColumnName: 'id' }])
    ], Workspaces.prototype, "Owner");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Users_1.Users; }, function (users) { return users.Workspaces; })
    ], Workspaces.prototype, "Members");
    Workspaces = __decorate([
        (0, typeorm_1.Index)('name', ['name'], { unique: true }),
        (0, typeorm_1.Index)('url', ['url'], { unique: true }),
        (0, typeorm_1.Index)('OwnerId', ['OwnerId'], {}),
        (0, typeorm_1.Entity)({ schema: 'sleact', name: 'workspaces' })
    ], Workspaces);
    return Workspaces;
}());
exports.Workspaces = Workspaces;
