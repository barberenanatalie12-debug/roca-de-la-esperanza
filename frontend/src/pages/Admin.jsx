import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function Admin() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, event_date, deleted')
      .eq('deleted', false)

    if (error) {
      console.error(error)
    } else {
      setEvents(data)
    }
  }

  async function deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .update({ deleted: true })
      .eq('id', id)

    if (error) {
      console.error(error)
    } else {
      fetchEvents()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await supabase.from('events').insert([
      {
        title,
        description,
        event_date: date
      }
    ])

    if (error) {
      console.error(error)
    } else {
      fetchEvents()
    }
  }

  return (
    <div>
      <h1>Roca de la Esperanza</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Event</button>
      </form>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.event_date}
            <br />
            {event.description}
            <br />
            <button onClick={() => deleteEvent(event.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin