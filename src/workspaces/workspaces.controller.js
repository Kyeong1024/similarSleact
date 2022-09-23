"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WorkspacesController = void 0;
var common_1 = require("@nestjs/common");
var WorkspacesController = /** @class */ (function () {
    function WorkspacesController() {
    }
    WorkspacesController.prototype.getMyWorkspaces = function () { };
    WorkspacesController.prototype.createWorkspace = function () { };
    WorkspacesController.prototype.getWorkspaceMembers = function () { };
    WorkspacesController.prototype.createWorkspaceMembers = function () { };
    WorkspacesController.prototype.getWorkspaceMember = function () { };
    __decorate([
        (0, common_1.Get)()
    ], WorkspacesController.prototype, "getMyWorkspaces");
    __decorate([
        (0, common_1.Post)()
    ], WorkspacesController.prototype, "createWorkspace");
    __decorate([
        (0, common_1.Get)(':url/members')
    ], WorkspacesController.prototype, "getWorkspaceMembers");
    __decorate([
        (0, common_1.Post)(':url/members')
    ], WorkspacesController.prototype, "createWorkspaceMembers");
    __decorate([
        (0, common_1.Get)(':url/members/:id')
    ], WorkspacesController.prototype, "getWorkspaceMember");
    WorkspacesController = __decorate([
        (0, common_1.Controller)('api/workspaces')
    ], WorkspacesController);
    return WorkspacesController;
}());
exports.WorkspacesController = WorkspacesController;
