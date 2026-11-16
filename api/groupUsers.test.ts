import { describe, expect, it } from 'vitest';
import { groupUsersByDepartment, type ApiUser } from './groupUsers';

const user = (department: string, firstName: string, age: number, gender: string, color: string): ApiUser => ({
  company: { department }, firstName, lastName: 'Smith', age, gender, hair: { color }, address: { postalCode: '10100' },
});

describe('groupUsersByDepartment', () => {
  it('returns an empty object for no users', () => {
    expect(groupUsersByDepartment([])).toEqual({});
  });
  it('aggregates counts, age range, colors and addresses per department', () => {
    const groups = groupUsersByDepartment([
      user('Engineering', 'Ada', 22, 'female', 'Black'),
      user('Engineering', 'Ben', 45, 'male', 'Black'),
      user('Sales', 'Cam', 30, 'female', 'Blond'),
    ]);
    expect(groups.Engineering).toEqual({
      male: 1, female: 1, ageRange: '22-45', hair: { Black: 2 },
      addressUser: { AdaSmith: '10100', BenSmith: '10100' },
    });
    expect(groups.Sales.ageRange).toBe('30-30');
    expect(groups.Sales.female).toBe(1);
  });
  it('supports department keys that look like prototype properties', () => {
    expect(groupUsersByDepartment([user('__proto__', 'Ada', 20, 'female', 'Brown')])['__proto__'].female).toBe(1);
  });
});
