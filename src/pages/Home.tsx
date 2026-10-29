
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonInput
} from '@ionic/react';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const events = [
  { id: 1, title: 'Coding Workshop', location: 'IT Lab', time: '10:00 AM', category: 'Technology' },
  { id: 2, title: 'Football Match', location: 'Sports Ground', time: '2:00 PM', category: 'Sports' },
  { id: 3, title: 'Campus Coffee Meetup', location: 'Student Cafe', time: '11:30 AM', category: 'Social' },
  { id: 4, title: 'Creative Art Workshop', location: 'Art Room', time: '3:00 PM', category: 'Creative' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const [joinedIds, setJoinedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('joinedEventIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('joinedEventIds', JSON.stringify(joinedIds));
  }, [joinedIds]);

  const toggleJoin = (id: number) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((eventId) => eventId !== id));
    } else {
      setJoinedIds([...joinedIds, id]);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Campus Connect</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Campus Events</h1>
        <p>Discover activities and meet other students.</p>

        <IonInput
          label="Your name"
          labelPlacement="stacked"
          value={name}
          placeholder="Enter your name"
          onIonInput={(event) => setName(event.detail.value ?? '')}
        />

        {name.trim() !== '' && <p>Hello, {name}!</p>}

        <h2>Upcoming Events</h2>

        <IonInput
          label="Search events"
          labelPlacement="stacked"
          value={search}
          placeholder="Search by event title"
          onIonInput={(event) => setSearch(event.detail.value ?? '')}
        />

        <p>
          Joined events: <IonBadge>{joinedIds.length}</IonBadge>
        </p>

        {filteredEvents.length === 0 && (
          <p>No events found. Try another search.</p>
        )}

        {filteredEvents.map((event) => (
          <IonCard key={event.id}>
            <IonCardHeader>
              <IonCardTitle>{event.title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>Location: {event.location}</p>
              <p>Time: {event.time}</p>
              <p>
                Category: <IonBadge>{event.category}</IonBadge>
              </p>

              <IonButton
                color={joinedIds.includes(event.id) ? 'medium' : 'primary'}
                onClick={() => toggleJoin(event.id)}
              >
                {joinedIds.includes(event.id) ? 'Leave' : 'Join'}
              </IonButton>

              <IonButton onClick={() => navigate(`/event/${event.id}`)}>
                View Details
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
