import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes,ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe) // handler-level pipe
  createBoard(
    @Body() createBoardDto : CreateBoardDto
  ) : Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id : number) : Promise<Board>{
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id',ParseIntPipe) id ) : Promise<void> { // Parameter level pipe 사용
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id : number,
    @Body('status', BoardStatusValidationPipe) status : BoardStatus // Parameter level pipe
  ): Promise<Board>{
    return this.boardsService.updateBoardStatus(id, status);
  }

}
