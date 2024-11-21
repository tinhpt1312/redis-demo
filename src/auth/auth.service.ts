import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VerificationService } from 'src/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly verificationService: VerificationService,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.verificationService.sendVerificationCode(
      email,
      hashedPassword,
    );

    return { message: 'Please check your email for verification code' };
  }

  async verifyEmail(email: string, code: string): Promise<{ message: string }> {
    console.log('Verifying email:', email, 'with code:', code);

    const pendingUser = this.verificationService.verifyCodeAndGetUser(
      email,
      code,
    );
    console.log('Received pendingUser:', pendingUser);

    if (!pendingUser) {
      throw new UnauthorizedException('Invalid verification code');
    }

    const user = this.userRepository.create({
      email: pendingUser.email,
      password: pendingUser.password,
    });
    await this.userRepository.save(user);

    return { message: 'Email verified successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
