import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  // @Post('send-code')
  // sendVerificationCode(@Body('email') email: string) {
  //   const code = this.verificationService.sendVerificationCode(email);

  //   return {
  //     message: 'Verification code sent',
  //     code,
  //   };
  // }

  // @Post('verify-code')
  // verifyCode(@Body() body: { email: string; code: string }) {
  //   const { email, code } = body;

  //   const isVerified = this.verificationService.verifyCode(email, code);

  //   if (isVerified) {
  //     return {
  //       message: 'Code verified',
  //     };
  //   }

  //   return {
  //     message: 'Code is incorrect',
  //   };
  // }
}
