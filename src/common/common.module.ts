import { Module } from '@nestjs/common';
import { DbModule } from './database/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
