import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    async register(dto: AuthDto) {
        const existingUser = await this.prisma.user.findMany({
            where: { username: dto.username }
        })

        if (existingUser) throw new HttpException('Username already', HttpStatus.CONFLICT)

        const newUser = await this.prisma.user.create({
            data: dto
        })

        const { password: newUserPassword, ...rest } = newUser


        return { status: HttpStatus.CREATED, user: rest }

    }

    async login(dto: AuthDto) {
        const isUserValid = await this.prisma.user.findUnique({
            where: { username: dto.username }
        })

        if (!isUserValid) throw new HttpException('Username Invalid', HttpStatus.UNAUTHORIZED)

        if (isUserValid.password !== dto.password) throw new HttpException('Password Invalid', HttpStatus.UNAUTHORIZED)

        return { message: "Selamat Login", status: HttpStatus.OK }
    }
}
