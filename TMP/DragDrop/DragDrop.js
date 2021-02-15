import React, { Component } from 'react'
import './DragDrop.css'

export default class DragDrop extends Component {
  state = {
    tasks: [
      {
        Name: 'React',
        Category: 'complete',
      },
      {
        Name: 'Anglular',
        Category: 'complete',
      },
      {
        Name: 'Vue',
        Category: 'complete',
      },
    ],
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:', id)
    ev.dataTransfer.setData('id', id)
  }

  onDragOver = (ev) => {
    ev.preventDefault()
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData('id')

    let tasks = this.state.tasks.filter((task) => {
      if (task.Name === id) {
        task.Category = cat
      }
      return task
    })

    this.setState({
      ...this.state,
      tasks,
    })
  }

  getDate = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    const tasks = [...json]

    this.setState({ tasks })
    console.log(json)
  }

  render() {
    var tasks = {
      vip: [],
      complete: [],
    }

    this.state.tasks.forEach((t) => {
      tasks[t.Category].push(
        <div key={t.Name} onDragStart={(e) => this.onDragStart(e, t.Name)} draggable className="dragdrop-elem">
          {t.Name}
        </div>
      )
    })

    return (
      <div>
        <div
          style={{
            display: 'flex',
            width: '400px',
            height: '300px',
            justifyContent: 'space-between',
          }}
        >
          <div
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => {
              this.onDrop(e, 'vip')
            }}
            style={{ border: '2px solid red', flex: 1, textAlign: 'center' }}
          >
            <h3>Role</h3>
            {tasks.vip}
            {console.log(this.state.tasks)}
          </div>
          <div
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, 'complete')}
            style={{ flex: 1, border: '2px solid green', textAlign: 'center' }}
          >
            <h3>Routes</h3>
            {tasks.complete}
          </div>
        </div>
        <button style={{ padding: '15px' }}>Click</button>
      </div>
    )
  }
}
