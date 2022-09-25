import {
  HttpException,
  Injectable,
  NotAcceptableException,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async join(email: string, password: string, nickname: string) {
    //트렌젝션
    const queryRunner = this.dataSource.createQueryRunner(); // queryrunner 생성

    await queryRunner.connect(); // queryRunner 연결
    await queryRunner.startTransaction(); // Transaction 시작

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new Error('이미존재하는 사용자 입니다.');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });

      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        WorkspaceId: 1,
        UserId: returned.id,
      });

      await queryRunner.manager.getRepository(ChannelMembers).save({
        ChannelId: 1,
        UserId: returned.id,
      });

      await queryRunner.commitTransaction(); // 성공적으로 transaction 끝나서 commit 해줌

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 실패해서 roll back
    } finally {
      await queryRunner.release(); // 연결 끊기, 데이터베이스에는 연결 최대치가 있으므로 연결을 해주었으면 항상 끊어 줘야 한다.
    }
  }
}

// 트렌젝션 적용할때 repository를 적용하고 싶으나 query bulider안에서 적용 시켜야 롤백 같은 것이 작동된다.
// 만약 repository를 사용한다면 app module의 typeorm module 설정에서 작동된다.
