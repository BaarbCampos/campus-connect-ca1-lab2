
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Coding Workshop',
    location: 'IT Lab',
    time: '10:00 AM',
    category: 'Technology',
    description: 'Learn programming and practise coding with other students.'
  },
  {
    id: 2,
    title: 'Football Match',
    location: 'Sports Ground',
    time: '2:00 PM',
    category: 'Sports',
    description: 'Join other students for a friendly football match.'
  },
  {
    id: 3,
    title: 'Campus Coffee Meetup',
    location: 'Student Cafe',
    time: '11:30 AM',
    category: 'Social',
    description: 'Meet new people and enjoy a friendly campus meetup.'
  },
  {
    id: 4,
    title: 'Creative Art Workshop',
    location: 'Art Room',
    time: '3:00 PM',
    category: 'Creative',
    description: 'Explore your creativity in a fun art workshop.'
  }
];

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Event Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Event not found.</p>
          <IonButton onClick={() => navigate('/home')}>
            Back to Events
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>Location: {event.location}</p>
            <p>Time: {event.time}</p>
            <p>
              Category: <IonBadge>{event.category}</IonBadge>
            </p>
            <p>{event.description}</p>

            <IonButton onClick={() => navigate('/home')}>
              Back to Events
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
