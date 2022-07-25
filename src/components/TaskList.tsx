import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
      {
        id: 2,
        title: 'Tomar café da manhã',
        isComplete: false
      },
      {
        id: 3,
        title: 'Passear com o cachorro',
        isComplete: false
      }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [randomId, setRandomId] = useState(3);
  const [errorTask, setErrorTask] = useState(false);
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    setRandomId(randomId + 1);
    newTaskTitle ? (
      setTasks(
        [...tasks, {
          id: randomId,
          title: newTaskTitle,
          isComplete: false
        }]
      ), 
      setErrorTask(false)
    ) : setErrorTask(true);

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    setTasks(tasks.map(task => task.id === id ? {...task, isComplete: true} : task))
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            data-cy="new-task"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
        {errorTask ? (
          <div className="input-error">
            <p>Não há tarefa para incluir!</p>
          </div> 
        ) : ''}
      </header>

      <main>
        <ul className="todo-list">
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : 'active'} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    data-testid="task-check"
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}