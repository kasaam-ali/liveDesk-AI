const appointments = [];

export function bookAppointment({ name, phone, date, time, purpose }) {
  const appointment = {
    id: `apt-${Date.now()}`,
    name,
    phone,
    date,
    time,
    purpose: purpose || 'admission inquiry',
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };

  appointments.push(appointment);
  console.log('Appointment booked:', appointment);
  return appointment;
}

export function getAllAppointments() {
  return [...appointments];
}

export function getAppointmentsByDate(date) {
  return appointments.filter((apt) => apt.date === date);
}
