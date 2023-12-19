"use client";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventList from '../components/EventList';
import CreateEventButton from '../components/CreateEventButton';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import EventForm from '../components/EventForm';
import Event from '../lib/definitions';
import EventPage from './[eventId]/page';
import Link from 'next/link';

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'category' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  const renderSortButton = (field: 'title' | 'date', label: string) => (
    <Button
      variant="outlined"
      color="primary"
      style={{
        margin: '20px 0',
        marginRight: '15px',
        borderRadius: '10px',
      }}
      onClick={() => handleSort(field)}
      endIcon={
        sortField === field ? (
          sortOrder === 'asc' ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowDropUpIcon />
          )
        ) : null
      }
    >
      {label}
    </Button>
  );
  

  const handleViewDetailsClick = (eventId: number) => {
    const selected = events.find((event) => event.id === eventId) || null;
    setSelectedEvent(selected);
  };

  return (
    <Box p={4}>
      {selectedEvent ? (
        <EventPage selectedEvent={selectedEvent} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h1" gutterBottom>
              Event List
            </Typography>
            <Link href="/">
              <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                Go to Home Page
              </Button>
            </Link>
          </div>
          <CreateEventButton onClick={() => setIsFormOpen(true)} />

          <Box mt={2} display="flex" justifyContent="start">
            {renderSortButton('title', 'Sort by Title')}
            {renderSortButton('date', 'Sort by Date')}
          </Box>

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
    </Box>
  );
};

export default EventListPage;
