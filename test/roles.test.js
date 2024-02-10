const rolesService = require('../src/services/user');
const Role = require('../src/models/roles');
const User = require('../src/models/user')
const InvariantError = require('../src/exceptions/InvariantError')

describe('postRole', () => {
  it('should add a new role', async () => {
    const roleData = { name: 'Super' };

    Role.prototype.save = jest.fn().mockResolvedValue(roleData);

    const addedRole = await rolesService.addRole(roleData);

    expect(Role.prototype.save).toHaveBeenCalledWith();

    expect(addedRole).toEqual(roleData);
  });

  it('should throw an error if role saving fails', async () => {
    const roleData = { name: 'Super' };

    Role.prototype.save = jest.fn().mockRejectedValue(new InvariantError('Database error'));

    await expect(rolesService.addRole(roleData)).rejects.toThrow(InvariantError);
  });
});

describe('registUser', () => {
  it('should add a new role', async () => {
    const userData = {
      name: 'admin',
      username: 'adminuser',
      email: 'admin@gmail.com',
      role: 'Admin',
      password: 'password'
    };

    User.prototype.save = jest.fn().mockResolvedValue(userData);

    const addedUser = await rolesService.addUser(userData);

    expect(User.prototype.save).toHaveBeenCalledWith();

    expect(addedUser).toEqual(userData);
  });

  it('should throw an error if user saving fails', async () => {
    const userData = {
      name: 'admin',
      username: 'adminuser',
      email: 'admin@gmail.com',
      role: 'Admin',
      password: 'password'
    };

    User.prototype.save = jest.fn().mockRejectedValue(new InvariantError('Database error'));

    await expect(rolesService.addUser(userData)).rejects.toThrow(InvariantError);
  });
});
