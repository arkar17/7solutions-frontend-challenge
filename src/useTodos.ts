import { useCallback, useEffect, useRef, useState } from 'react';
import { makeInitialTodos, moveTodo, type Todo } from './data';

export const RETURN_DELAY_MS = 5000;

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(makeInitialTodos);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const clearTimer = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer !== undefined) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const returnToMain = useCallback((id: number) => {
    clearTimer(id);
    setTodos((current) => moveTodo(current, id, 'Main'));
  }, [clearTimer]);

  const categorize = useCallback((todo: Todo) => {
    clearTimer(todo.id);
    setTodos((current) => moveTodo(current, todo.id, todo.type));
    const timer = setTimeout(() => {
      timers.current.delete(todo.id);
      setTodos((current) => moveTodo(current, todo.id, 'Main'));
    }, RETURN_DELAY_MS);
    timers.current.set(todo.id, timer);
  }, [clearTimer]);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setTodos(makeInitialTodos());
  }, []);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  return { todos, categorize, returnToMain, reset };
}
