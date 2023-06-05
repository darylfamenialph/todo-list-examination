import {
  ToDoDocument,
  ToDoFacadeService,
} from '@todo-list-examination/services';
import { Model } from 'mongoose';
import { InvalidRequestPayloadException } from '@todo-list-examination/exceptions';
import { TodoFacadeController } from '../../todo/todo.facade.controller';

describe('Todo Facade Controller', () => {
  let todoFacadeController: TodoFacadeController;
  let toDoFacadeService: ToDoFacadeService;
  let todoModel: Model<ToDoDocument>;

  beforeEach(() => {
    toDoFacadeService = new ToDoFacadeService(todoModel);
    todoFacadeController = new TodoFacadeController(toDoFacadeService);
  });

  describe('Add New Todo', () => {
    it('should add new todo in the list', async () => {
      const expectedResult = {
        details: { data: undefined, message: 'Todo Successfully Created' },
      };
      let result: any;

      jest.spyOn(toDoFacadeService, 'addToDo').mockImplementation(() => result);

      expect(
        await todoFacadeController.addNewTodo(
          { user: { userId: '647c4ba7be7c2bff48369ebf' } },
          'test',
          'afadfsd'
        )
      ).toStrictEqual(expectedResult);
    });

    it('should return error due to missing title', async () => {
      let result: any;

      jest.spyOn(toDoFacadeService, 'addToDo').mockImplementation(() => result);

      await expect(
        todoFacadeController.addNewTodo(
          { user: { userId: '647c4ba7be7c2bff48369ebf' } },
          '',
          'afadfsd'
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });
  });

  describe('Get User Todo List', () => {
    it('should return list of todos', async () => {
      const expectedResult = {
        data: 'success',
      };
      const result: any = 'success';

      jest
        .spyOn(toDoFacadeService, 'getToDoByUserId')
        .mockImplementation(() => result);

      expect(
        await todoFacadeController.getTodoByUser(
          { user: { userId: 'test' } },
          1,
          1
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe('Get Todo By Id', () => {
    it('should return todo item', async () => {
      const testId = '647c772370013f4a8b596074';

      const expectedResult = {
        data: {
          _id: testId,
        },
      };

      const result: any = {
        _doc: {
          _id: testId,
        },
      };

      jest
        .spyOn(toDoFacadeService, 'getToDoById')
        .mockImplementation(() => result);

      await expect(
        todoFacadeController.getTodoListById(testId)
      ).resolves.toStrictEqual(expectedResult);
    });

    it('should return error due to missing id', async () => {
      let result: any;

      jest
        .spyOn(toDoFacadeService, 'getToDoById')
        .mockImplementation(() => result);

      await expect(
        todoFacadeController.getTodoListById('')
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });
  });

  describe('Update Todo By Id', () => {
    it('should Successfully update an item', async () => {
      const expectedResult = {
        message: 'Update Successful',
      };
      const result: any = {
        acknowledged: true,
        matchedCount: 1,
      };

      jest
        .spyOn(toDoFacadeService, 'updateToDoById')
        .mockImplementation(() => result);

      await expect(
        todoFacadeController.updateToDoById(
          { user: { userId: '647c4ba7be7c2bff48369ebf' } },
          '647c772370013f4a8b596074',
          'title',
          'dafdafdf',
          'done'
        )
      ).resolves.toStrictEqual(expectedResult);
    });

    it('should return error due to missing id', async () => {
      let result: any;

      jest
        .spyOn(toDoFacadeService, 'getToDoById')
        .mockImplementation(() => result);

      await expect(
        todoFacadeController.updateToDoById(
          { user: { userId: '647c4ba7be7c2bff48369ebf' } },
          '',
          'title',
          'dafdafdf',
          'done'
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });
  });

  describe('Delete Todo By Id', () => {
    it('should Successfully Delete an item', async () => {
      const expectedResult = {
        message: 'Delete Successful',
      };
      const result: any = {
        acknowledged: true,
        deletedCount: 1,
      };

      jest
        .spyOn(toDoFacadeService, 'deleteToDoById')
        .mockImplementation(() => result);

      await expect(
        todoFacadeController.deleteById('647c772370013f4a8b596074')
      ).resolves.toStrictEqual(expectedResult);
    });
  });

  it('should return error due to missing id', async () => {
    let result: any;

    jest
      .spyOn(toDoFacadeService, 'deleteToDoById')
      .mockImplementation(() => result);

    await expect(todoFacadeController.deleteById('')).rejects.toThrowError(
      InvalidRequestPayloadException
    );
  });
});
