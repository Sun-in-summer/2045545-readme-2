import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import {Inject, Injectable} from '@nestjs/common';
import { jwtConfig } from 'apps/users/src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '@readme/shared-types';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtMainConfig: ConfigType<typeof jwtConfig>,
  ){
    super ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtMainConfig.refreshTokenSecret,
      passReqToCallback: true,
    })
  }

  public async validate(_req: Request, payload: TokenPayload){
    return payload;
  }
}
