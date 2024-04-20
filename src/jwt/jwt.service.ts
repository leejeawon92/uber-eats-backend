import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  hello() {
    console.log('jwt서비스 생성완료');
  }
}