"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

import EventList from '../components/EventList';
import CreateEventButton from '../components/CreateEventButton';
import SortButton from '../components/SortButton';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import EventForm from '../components/EventForm';
import EventDetails from '../components/EventDetails';
import Map from '../components/Map';
import FilterInput from '../components/FilterInput';

import Event from '../lib/definitions';
import { sortEvents } from '../lib/sortUtils';
import { filterEvents } from '../lib/filterUtils';
import { updateEvents } from '../lib/updateEvents';
import { recommendEventsAlgorithm } from '../lib/recommendEventsAlgorithm';

import { Button, Typography, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'category' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);

  const sortedEvents = sortEvents(events, sortField, sortOrder);
  const filteredEvents = filterEvents(sortedEvents, filterText);

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

  const handleFilterChange = (text: string) => {
    setFilterText(text);
  };

  const renderSortButton = (field: 'title' | 'date', label: string) => (
    <SortButton
      field={field}
      label={label}
      sortField={sortField}
      sortOrder={sortOrder}
      onClick={handleSort}
    />
  );

  const handleMarkerClick = (event: any) => {
    console.log('Marker clicked:', event);
  };

  const handleDetailsClick = (event: Event) => {
    setSelectedEvent(event);
    const recommendedEvents = recommendEventsAlgorithm(event, events);
    setRecommendedEvents(recommendedEvents);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <Box p={4}>
      <>
        {selectedEvent && (
          <EventDetails
            selectedEvent={selectedEvent}
            onClose={handleCloseDetails}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            recommendedEvents={recommendedEvents}
            onDetailsClick={handleDetailsClick}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Events
          </Typography>
          <Link href="/">
            <Button variant="contained" color="primary" startIcon={<ArrowBack />}>
              Go to Home Page
            </Button>
          </Link>
        </div>
        <CreateEventButton onClick={() => setIsFormOpen(true)} />

        <Box mt={2} display="flex" justifyContent="space-between">
          <FilterInput value={filterText} onChange={handleFilterChange} />

          <div>
            {renderSortButton('title', 'Sort by Title')}
            {renderSortButton('date', 'Sort by Date')}
          </div>
        </Box>

        <EventList
          events={filteredEvents}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          onDetailsClick={handleDetailsClick}
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
          const updatedEvents = updateEvents(events, submittedEvent, editEvent);
          setEvents(updatedEvents);
        }} eventToEdit={editEvent} />

        <Map events={filteredEvents} onMarkerClick={handleMarkerClick} />
      </>
    </Box>
  );
};

export default EventListPage;
