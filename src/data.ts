export type Category = 'Fruit' | 'Vegetable';
export type Location = 'Main' | Category;
export interface Todo { id: number; name: string; type: Category; location: Location }

const initial: Array<{ type: Category; name: string }> = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export const makeInitialTodos = (): Todo[] => initial.map((item, id) => ({ ...item, id, location: 'Main' }));

// Each move removes the item from its current position and appends it to its destination.
export function moveTodo(items: Todo[], id: number, destination: Location): Todo[] {
  const item = items.find((candidate) => candidate.id === id);
  if (!item || item.location === destination) return items;
  return [...items.filter((candidate) => candidate.id !== id), { ...item, location: destination }];
}
