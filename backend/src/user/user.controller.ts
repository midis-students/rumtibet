import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '../pipes/parse-object-id';
import { AuthGuard } from '../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findMe(@Request() req) {
    return this.userService.findById(req.user.id).select('-password');
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.userService.findById(id).select('-password');
  }
}
