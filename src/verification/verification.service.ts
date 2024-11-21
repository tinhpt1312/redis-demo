import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface PendingUser {
  email: string;
  password: string;
  code: string;
}

@Injectable()
export class VerificationService {
  private pendingUsers = new Map<string, PendingUser>();

  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationCode(email: string, password: string) {
    const code = uuidv4().split('-')[0];

    console.log(
      'Before setting pendingUser - Map size:',
      this.pendingUsers.size,
    );

    const pendingUser = {
      email,
      password,
      code,
    };

    this.pendingUsers.set(email, pendingUser);

    console.log('After setting pendingUser:', {
      mapSize: this.pendingUsers.size,
      storedUser: this.pendingUsers.get(email),
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is ${code}`,
    });

    return { message: 'Verification code sent', code };
  }

  verifyCodeAndGetUser(email: string, code: string): PendingUser | null {
    console.log('Current Map state:', {
      size: this.pendingUsers.size,
      keys: Array.from(this.pendingUsers.keys()),
    });

    const pendingUser = this.pendingUsers.get(email);
    console.log('Found pendingUser:', pendingUser);
    console.log('Input code:', code);

    if (pendingUser && pendingUser.code === code) {
      this.pendingUsers.delete(email);
      return pendingUser;
    }

    return null;
  }
}
