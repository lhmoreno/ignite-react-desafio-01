import { FormEvent, useState } from 'react'
import styles from './App.module.css'
import logoSvg from './assets/logo.svg'
import clipboardPng from './assets/clipboard.png'
import { CheckCircle, Circle, PlusCircle, Trash } from 'phosphor-react'

type Task = {
  id: string
  description: string
  completed?: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  
  const completedTasksLength = tasks.reduce((length, task) => {
    if (task.completed) return length + 1
    return length
  }, 0)

  const sortedTasks = tasks.sort((task1, task2) => {
    if (task1.completed) return 1
    if (task2.completed) return -1
    return 0
  })

  function handleCreateNewTast(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskDescription = String(formData.get('task'))

    event.currentTarget.reset()

    let id = '1'
    if (tasks[tasks.length-1]) {
      id = String(Number(tasks[tasks.length-1].id) + 1)
    }

    setTasks((value) => {
      return [...value, {
        id,
        description: taskDescription
      }]
    })
  }

  function handleCompleteTask(taskIndex: number) {
    const newTasks = [...tasks]
    newTasks[taskIndex].completed = true

    setTasks(newTasks)
  }

  function handleUncompleteTask(taskIndex: number) {
    const newTasks = [...tasks]
    newTasks[taskIndex].completed = false

    setTasks(newTasks)
  }

  function handleDeleteTask(taskIndex: number) {
    setTasks((value) => {
      return value.filter((task, index) => index !== taskIndex)
    })
  }

  return (
    <div className={styles.container}>
      <header>
        <img src={logoSvg} alt="" />
      </header>
      <main>
        <form onSubmit={handleCreateNewTast}>
          <input 
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa" 
          />
          <button>
            Criar
            <PlusCircle size={18} weight="bold" />
          </button>
        </form>

        <div className={styles.tasksInfo}>
          <div>
            <p className={styles.createdTasksInfo}>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div>
            <p className={styles.completedTasksInfo}>Concluídas</p>
            <span>{`${completedTasksLength} de ${tasks.length}`}</span>
          </div>
        </div>

        <ul>
          {!sortedTasks.length &&
            <span>
              <img src={clipboardPng} alt="" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </span>
          }
          {sortedTasks.map((task, index) => (
            <li 
              key={task.id} 
              className={task.completed ? styles.completedTask : ''}
            >
              {task.completed ? 
                <button
                  className={styles.checked}
                  type="button"
                  onClick={() => handleUncompleteTask(index)}
                >
                  <CheckCircle weight="fill" />
                </button>
                :
                <button
                  className={styles.unchecked}
                  type="button"
                  onClick={() => handleCompleteTask(index)}
                >
                  <Circle />
                </button>
              }
              <p>{task.description}</p>
              <button
                className={styles.trash}
                type="button"
                onClick={() => handleDeleteTask(index)}
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
