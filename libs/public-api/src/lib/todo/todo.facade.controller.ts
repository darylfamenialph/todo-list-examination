import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToDoFacadeService } from '@todo-list-examination/services';
import { BearerAuthGuard } from '@todo-list-examination/guards';
import { ApiResponseInterceptor } from '@todo-list-examination/interceptors';
import { InvalidRequestPayloadException } from '@todo-list-examination/exceptions';
import { convertStringToObjectId } from '@todo-list-examination/utilities';

@Controller('todo')
export class TodoFacadeController {
  constructor(private readonly _toDoFacadeService: ToDoFacadeService) {}

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  @Post('/add-new')
  async addNewTodo(
    @Request() req: any,
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    if (!title) {
      throw new InvalidRequestPayloadException({
        erorrCode: 'Missing Information',
        errorDescription: 'title is required',
      });
    }
    const result = await this._toDoFacadeService.addToDo({
      title,
      description,
      status: 'active',
      createdBy: req.user.userId,
    });

    return {
      details: { message: 'Todo Successfully Created', data: result },
    };
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  @Get('/get-user-todo-list')
  async getTodoByUser(
    @Request() req: any,
    @Query('limit') limit: number,
    @Query('page') page: number
  ) {
    const result = await this._toDoFacadeService.getToDoByUserId({
      userId: req.user.userId,
      page,
      limit,
    });

    return {
      data: result,
    };
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  @Get('/get-by-id')
  async getTodoListById(@Query('id') id: string) {
    if (!id) {
      throw new InvalidRequestPayloadException({
        erorrCode: 'Missing Information',
        errorDescription: 'id is required',
      });
    }

    const result: any = await this._toDoFacadeService.getToDoById({
      id: convertStringToObjectId(id),
    });

    return { data: result ? result['_doc'] : {} };
  }

  @UseGuards(BearerAuthGuard)
  @Put('/update-by-id')
  async updateToDoById(
    @Request() req: any,
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string
  ) {
    if (!id) {
      throw new InvalidRequestPayloadException({
        erorrCode: 'Missing Information',
        errorDescription: 'id is required',
      });
    }

    const result = await this._toDoFacadeService.updateToDoById({
      id: convertStringToObjectId(id),
      userId: req.user.userId,
      title,
      description,
      status,
    });

    if (result?.acknowledged && result?.matchedCount > 0) {
      return { message: 'Update Successful' };
    } else {
      return { message: 'Update Failed' };
    }
  }

  @UseGuards(BearerAuthGuard)
  @Delete('/delete-by-id')
  async deleteById(@Query('id') id: string) {
    if (!id) {
      throw new InvalidRequestPayloadException({
        erorrCode: 'Missing Information',
        errorDescription: 'id is required',
      });
    }

    const result = await this._toDoFacadeService.deleteToDoById({
      id: convertStringToObjectId(id),
    });

    if (result.acknowledged && result.deletedCount > 0) {
      return { message: 'Delete Successful' };
    } else {
      return { message: 'Delete Failed' };
    }
  }
}
