"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Mentions = void 0;
var typeorm_1 = require("typeorm");
var Workspaces_1 = require("./Workspaces");
var Users_1 = require("./Users");
var Mentions = /** @class */ (function () {
    function Mentions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' })
    ], Mentions.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('enum', { name: 'category', "enum": ['chat', 'dm', 'system'] })
    ], Mentions.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ChatId', nullable: true })
    ], Mentions.prototype, "ChatId");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Mentions.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Mentions.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'WorkspaceId', nullable: true })
    ], Mentions.prototype, "WorkspaceId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'SenderId', nullable: true })
    ], Mentions.prototype, "SenderId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ReceiverId', nullable: true })
    ], Mentions.prototype, "ReceiverId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Mentions; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
    ], Mentions.prototype, "Workspace");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.Mentions; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'SenderId', referencedColumnName: 'id' }])
    ], Mentions.prototype, "Sender");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.Mentions2; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'ReceiverId', referencedColumnName: 'id' }])
    ], Mentions.prototype, "Receiver");
    Mentions = __decorate([
        (0, typeorm_1.Index)('WorkspaceId', ['WorkspaceId'], {}),
        (0, typeorm_1.Index)('SenderId', ['SenderId'], {}),
        (0, typeorm_1.Index)('ReceiverId', ['ReceiverId'], {}),
        (0, typeorm_1.Entity)({ schema: 'sleact', name: 'mentions' })
    ], Mentions);
    return Mentions;
}());
exports.Mentions = Mentions;
