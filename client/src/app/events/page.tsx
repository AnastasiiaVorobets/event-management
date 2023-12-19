"use client";
import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import CreateEventButton from '../components/CreateEventButton';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import EventForm from '../components/EventForm';
import Event from '../lib/definitions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import EventPage from './[eventId]/page';

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'category' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteEventId !== null) {
      try {
        const response = await fetch(`http://localhost:4000/events/${deleteEventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete event');
        }

        const updatedEvents = events.filter((event) => event.id !== deleteEventId);
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error deleting event:', error);
      } finally {
        setDeleteEventId(null);
      }
    }
  };

  const handleDeleteClick = (eventId: number) => {
    setDeleteEventId(eventId);
  };

  const handleEditClick = (event: Event) => {
    setEditEvent(event);
    setIsFormOpen(true);
  };

  const handleFormClose = async () => {
    setEditEvent(null);
    setIsFormOpen(false);
  };

  const handleSort = (field: 'date' | 'category' | 'title') => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedEvents = [...events].sort((a, b) => {
    let compareResult;
  
    switch (sortField) {
      case 'date':
        compareResult = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'category':
        compareResult = a.category.localeCompare(b.category);
        break;
      case 'title':
        compareResult = a.title.localeCompare(b.title);
        break;
      default:
        compareResult = 0;
    }
  
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  /* const handleViewDetailsClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
  }; */

  const handleViewDetailsClick = (eventId: number) => {
    const selected = events.find((event) => event.id === eventId) || null;
    setSelectedEvent(selected);
  };

  return (
    <div>
      {selectedEvent ? (
        <EventPage selectedEvent={selectedEvent} />
      ) : (
        <>
          <h1>Event List</h1>
          <CreateEventButton onClick={() => setIsFormOpen(true)} />

          <div>
            <Button onClick={() => handleSort('title')}>Sort by Title</Button>
            <Button onClick={() => handleSort('date')}>Sort by Date</Button>
            <Button onClick={() => handleSort('category')}>Sort by Category</Button>
          </div>

          <EventList
            events={sortedEvents}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onViewDetailsClick={handleViewDetailsClick}
          />

          <DeleteConfirmationDialog
            open={deleteEventId !== null}
            onClose={() => setDeleteEventId(null)}
            onConfirm={handleDeleteConfirm}
          />

          <EventForm
            open={isFormOpen}
            onClose={handleFormClose}
            onSubmit={(submittedEvent) => {
              const updatedEvents = editEvent
                ? events.map((e) => (e.id === submittedEvent.id ? submittedEvent : e))
                : [...events, submittedEvent];

              setEvents(updatedEvents);
            }}
            eventToEdit={editEvent}
          />
        </>
      )}
    </div>
  );
};

export default EventListPage;
