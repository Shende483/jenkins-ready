"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const login_controller_1 = require("./login.controller");
const register_module_1 = require("../registerAuth/register.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../../../common/strategies/jwt.strategy");
const otp_service_1 = require("../../../common/otp.service");
const redis_module_1 = require("../../../common/redis.module");
const jwt_confing_1 = require("../../../config/jwt.confing");
let LoginModule = class LoginModule {
};
exports.LoginModule = LoginModule;
exports.LoginModule = LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [
            register_module_1.RegisterModule,
            redis_module_1.RedisModule,
            jwt_1.JwtModule.registerAsync(jwt_confing_1.default.asProvider()),
        ],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService, jwt_strategy_1.JwtStrategy, otp_service_1.OtpService],
    })
], LoginModule);
//# sourceMappingURL=login.module.js.map