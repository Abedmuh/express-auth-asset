const rolesService = require('../src/services/user');
const Role = require('../src/models/roles');
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
