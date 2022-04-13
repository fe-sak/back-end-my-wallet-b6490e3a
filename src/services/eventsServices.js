import UnprocessableEntity from '../errors/UnprocessableEntity.js';
import * as repository from '../repositories/eventsRepository.js';

export async function createEvent({ type, value, user }) {
  const financialTypes = ['INCOME', 'OUTCOME'];
  if (!financialTypes.includes(type)) throw UnprocessableEntity();

  if (value < 0) throw UnprocessableEntity();

  await repository.createEvent({ user, value, type });
}

export async function readEvents(user) {
  const events = repository.readEvents(user);

  return events;
}

export function EventsSum(events) {
  const sum = events.rows.reduce(
    (total, event) =>
      event.type === 'INCOME' ? total + event.value : total - event.value,
    0
  );

  return sum;
}
