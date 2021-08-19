import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.get('JWT_SECRET_KEY'),
      secretOrKey: process.env.JWT_TOKEN_KEY,
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy', payload);
    const user = await this.authService.getUser({ _id: payload.id });

    return user;
  }
}
