import { Module } from '@nestjs/common';
import { AccessControlService } from './control.service';
import { AccessControlResolver } from './control.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [AccessControlService,AccessControlResolver],
})

export class AccessControlModule {}