/** Types model only the fields used by this assignment. */
export interface ApiUser {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

interface Accumulator {
  male: number;
  female: number;
  minAge: number;
  maxAge: number;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}

/** O(n) time: a single traversal; O(n + departments + distinct hair colors) output space. */
export function groupUsersByDepartment(users: readonly ApiUser[]): Record<string, DepartmentSummary> {
  // Maps avoid special-key collisions such as department names '__proto__'.
  const groups = new Map<string, Accumulator>();
  for (const user of users) {
    const department = user.company.department;
    let group = groups.get(department);
    if (!group) {
      group = { male: 0, female: 0, minAge: Infinity, maxAge: -Infinity, hair: Object.create(null) as Record<string, number>, addressUser: Object.create(null) as Record<string, string> };
      groups.set(department, group);
    }
    if (user.gender === 'male') group.male += 1;
    if (user.gender === 'female') group.female += 1;
    group.minAge = Math.min(group.minAge, user.age);
    group.maxAge = Math.max(group.maxAge, user.age);
    group.hair[user.hair.color] = (group.hair[user.hair.color] ?? 0) + 1;
    group.addressUser[`${user.firstName}${user.lastName}`] = user.address.postalCode;
  }

  // Safe conversion preserves department keys even if they conflict with Object.prototype.
  const result: Record<string, DepartmentSummary> = Object.create(null) as Record<string, DepartmentSummary>;
  for (const [department, group] of groups) {
    result[department] = {
      male: group.male,
      female: group.female,
      ageRange: `${group.minAge}-${group.maxAge}`,
      hair: group.hair,
      addressUser: group.addressUser,
    };
  }
  return result;
}
