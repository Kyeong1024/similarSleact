"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_module_1 = require("./users/users.module");
var dms_module_1 = require("./dms/dms.module");
var channels_module_1 = require("./channels/channels.module");
var workspaces_module_1 = require("./workspaces/workspaces.module");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var Users_1 = require("./entities/Users");
var ChannelChats_1 = require("./entities/ChannelChats");
var ChannelMembers_1 = require("./entities/ChannelMembers");
var Channels_1 = require("./entities/Channels");
var DMs_1 = require("./entities/DMs");
var Mentions_1 = require("./entities/Mentions");
var WorkspaceMembers_1 = require("./entities/WorkspaceMembers");
var Workspaces_1 = require("./entities/Workspaces");
var auth_module_1 = require("./auth/auth.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    port: 3306,
                    host: process.env.DB_HOSTNAME,
                    password: process.env.DB_PASSWORD,
                    username: process.env.DB_USERNAME,
                    database: process.env.DB_DATABASE,
                    entities: [
                        ChannelChats_1.ChannelChats,
                        ChannelMembers_1.ChannelMembers,
                        Channels_1.Channels,
                        DMs_1.DMs,
                        Mentions_1.Mentions,
                        Users_1.Users,
                        WorkspaceMembers_1.WorkspaceMembers,
                        Workspaces_1.Workspaces,
                    ],
                    migrations: [__dirname + '/src/migrations/*.ts'],
                    synchronize: false,
                    logging: true,
                    keepConnectionAlive: true,
                    autoLoadEntities: true
                }),
                users_module_1.UsersModule,
                dms_module_1.DmsModule,
                channels_module_1.ChannelsModule,
                workspaces_module_1.WorkspacesModule,
                auth_module_1.AuthModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
