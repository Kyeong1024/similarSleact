"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WorkspacesModule = void 0;
var common_1 = require("@nestjs/common");
var workspaces_service_1 = require("./workspaces.service");
var workspaces_controller_1 = require("./workspaces.controller");
var WorkspacesModule = /** @class */ (function () {
    function WorkspacesModule() {
    }
    WorkspacesModule = __decorate([
        (0, common_1.Module)({
            providers: [workspaces_service_1.WorkspacesService],
            controllers: [workspaces_controller_1.WorkspacesController]
        })
    ], WorkspacesModule);
    return WorkspacesModule;
}());
exports.WorkspacesModule = WorkspacesModule;
