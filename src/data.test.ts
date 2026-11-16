import { describe, expect, it } from 'vitest';
import { makeInitialTodos, moveTodo } from './data';

describe('moveTodo', () => {
  it('has all eleven initial items', () => expect(makeInitialTodos()).toHaveLength(11));
  it('moves into the matching category and appends when returned', () => {
    const initial = makeInitialTodos();
    const categorized = moveTodo(initial, 0, 'Fruit');
    expect(categorized.at(-1)).toMatchObject({ id: 0, location: 'Fruit' });
    const returned = moveTodo(categorized, 0, 'Main');
    expect(returned.at(-1)).toMatchObject({ id: 0, location: 'Main' });
    expect(new Set(returned.map((todo) => todo.id)).size).toBe(11);
  });
  it('does not change state for missing IDs or an unchanged destination', () => {
    const initial = makeInitialTodos();
    expect(moveTodo(initial, 100, 'Fruit')).toBe(initial);
    expect(moveTodo(initial, 0, 'Main')).toBe(initial);
  });
});
