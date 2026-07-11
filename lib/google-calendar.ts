import { google } from 'googleapis';

export async function createCalendarEvent({
  name,
  email,
  phone,
  topic,
  date,
  time,
}: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  date: string;
  time: string;
}) {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Handle newlines correctly regardless of how they are loaded
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events']
  });

  const calendar = google.calendar({ version: 'v3', auth });
  
  // Set the timezone to Jakarta
  const TIMEZONE = 'Asia/Jakarta';
  
  // Convert date and time to proper format
  // Assumes date is YYYY-MM-DD and time is HH:mm
  const startDateTime = new Date(`${date}T${time}:00+07:00`).toISOString();
  
  // Assume meeting is 45 mins
  const endDate = new Date(new Date(`${date}T${time}:00+07:00`).getTime() + 45 * 60000);
  const endDateTime = endDate.toISOString();

  const event = {
    summary: `Legal Consultation: ${name} (${topic})`,
    description: `<b>Client Details</b><br>Name: ${name}<br>Email: ${email}<br>WhatsApp: <a href="https://wa.me/${phone?.replace(/[^0-9]/g, '')}">${phone || 'N/A'}</a><br>Topic: ${topic}<br><br><i>Automatically scheduled via Smart Booking System</i>`,
    start: {
      dateTime: startDateTime,
      timeZone: TIMEZONE,
    },
    end: {
      dateTime: endDateTime,
      timeZone: TIMEZONE,
    },
    attendees: [
      { email },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
    // Add Google Meet link automatically
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    }
  };

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  const response = await calendar.events.insert({
    calendarId: calendarId,
    requestBody: event,
    conferenceDataVersion: 1, // needed for auto Google Meet link
    sendUpdates: 'all', // Send an email invitation to the attendees
  });

  return response.data;
}
