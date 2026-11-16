import { useTodos } from './useTodos';
import type { Location, Todo } from './data';

const columns: Array<{ id: Location; icon: string; subtitle: string }> = [
  { id: 'Main', icon: '◈', subtitle: 'Click an item to sort it' },
  { id: 'Fruit', icon: '◉', subtitle: 'Returns after 5 seconds' },
  { id: 'Vegetable', icon: '✳', subtitle: 'Returns after 5 seconds' },
];

function TodoButton({ todo, onClick }: { todo: Todo; onClick: () => void }) {
  return <button className="todo" onClick={onClick} type="button" aria-label={`${todo.name}: ${todo.location === 'Main' ? `move to ${todo.type}` : 'return to main list'}`}>
    <span className={`item-icon ${todo.type.toLowerCase()}`}>{todo.type === 'Fruit' ? '●' : '✳'}</span>
    <span>{todo.name}</span>
    <span className="arrow" aria-hidden="true">{todo.location === 'Main' ? '↗' : '↶'}</span>
  </button>;
}

export function App() {
  const { todos, categorize, returnToMain, reset } = useTodos();
  return <div className="page">
    <header className="topbar"><div className="brand"><span className="brand-icon">7</span><span>SOLUTIONS <span className="muted">/ CHALLENGE</span></span></div><span className="top-note">FRONTEND ASSIGNMENT · 01</span></header>
    <main className="content">
      <div className="eyebrow"><span className="status-dot"/> INTERACTIVE REACT CHALLENGE</div>
      <div className="heading-row"><div><h1>Auto-sort <em>todo list.</em></h1><p className="intro">Select any item to move it into its category. It will return automatically in five seconds, or click it again to send it back immediately.</p></div><button type="button" className="reset" onClick={reset}>↺ &nbsp; Reset list</button></div>
      <section className="board" aria-label="Todo board">
        {columns.map((column) => {
          const items = todos.filter((todo) => todo.location === column.id);
          return <div className={`column ${column.id.toLowerCase()}`} key={column.id}>
            <div className="column-header"><div className="column-name"><span className="column-icon">{column.icon}</span><h2>{column.id === 'Main' ? 'All items' : column.id}</h2></div><span className="count">{items.length.toString().padStart(2, '0')}</span></div>
            <p className="column-subtitle">{column.subtitle}</p>
            <div className="column-items">{items.length ? items.map((todo) => <TodoButton key={todo.id} todo={todo} onClick={() => todo.location === 'Main' ? categorize(todo) : returnToMain(todo.id)}/>) : <div className="empty">{column.id === 'Main' ? 'All sorted! Items will return shortly.' : 'No items yet'}<small>{column.id === 'Main' ? 'You can click an item on the right to return it.' : 'Choose an item from the first column.'}</small></div>}</div>
          </div>;
        })}
      </section>
      <footer><span><span className="status-dot"/> All changes happen instantly</span><span>Built with React + TypeScript</span></footer>
    </main>
  </div>;
}
