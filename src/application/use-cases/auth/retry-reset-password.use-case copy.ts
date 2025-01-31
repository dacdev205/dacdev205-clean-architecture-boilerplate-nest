import dayjs from 'dayjs';
import { ResetPassJobData } from 'src/common/interface/reset-pass-job-data.interface';
import { USER_NOT_FOUND } from 'src/content/errors/user.error';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserUseCase } from '../users/delete-user.use-case';
import { FindUserByEmailUseCase } from '../users/find-user-by-email.use-case';
import { AuthQueue } from './auth.queue';

@Injectable()
export class RetryResetPassword {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly authQueue: AuthQueue,
  ) {}
  async retryResetPassword(email: string): Promise<any> {
    const user = await this.findUserByEmailUseCase.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const data = {
      codeId: uuidv4(),
      codeExpiredAt: dayjs().add(1, 'days').toDate(),
    };
    await this.updateUserUseCase.updateUser(user.id, data);
    const resetJobdata: ResetPassJobData = {
      to: email,
      resetCode: data.codeId,
    };
    await this.authQueue.addSendResetPassCodeJob(resetJobdata);
  }
}
