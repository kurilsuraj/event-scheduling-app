import "./styles.css";
import { Component } from "react";

import React, { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleAddEvent = () => {
    if (eventName && eventDate && eventTime) {
      const newEvent = {
        id: events.length + 1,
        name: eventName,
        date: eventDate,
        time: eventTime,
        description: eventDescription,
      };
      setEvents([...events, newEvent]);
      localStorage.setItem("events", JSON.stringify([...events, newEvent]));
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventDescription("");
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEventId(event.id);
    setEventName(event.name);
    setEventDate(event.date);
    setEventTime(event.time);
    setEventDescription(event.description);
  };

  const handleSaveEdit = () => {
    if (selectedEventId) {
      const updatedEvents = events.map((event) => {
        if (event.id === selectedEventId) {
          return {
            ...event,
            name: eventName,
            date: eventDate,
            time: eventTime,
            description: eventDescription,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setSelectedEventId(null);
    }
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="bg-container">
      <h1 className="main-heading">Event Scheduler</h1>
      <div className="event-create-container">
        <div className="event-item">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="event-item">
          <label>Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="event-item">
          <label>Event Time:</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div className="event-item">
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <button className="add-event-button" onClick={handleAddEvent}>Add Event</button>
      </div>

      {selectedEventId && (
        <div>
          <button onClick={handleSaveEdit}>Save Changes</button>
          <button onClick={() => setSelectedEventId(null)}>Cancel</button>
        </div>
      )}
      <ul className="event-list-container">
        {events.map((event) => (
          <li className="event-list-card" key={event.id}>
            {event.name} - {event.date} {event.time}
            <button onClick={() => handleEditEvent(event)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
