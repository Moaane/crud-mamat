import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('find-all')
  async findAll() {
    return this.bookService.findAll();
  }

  @Get('find-all-popular')
  async findAllByPopular() {
    return await this.bookService.findAllByPopular()
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
