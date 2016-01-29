import invariant from 'invariant';

 let messages = {
  date: 'Data',
  time: 'Czas',
  event: 'Zdarzenie',
  allDay: 'cały dzień',
  week: 'tydzień',
  day: 'dzień',
  month: 'miesiąc',
  previous: 'poprzedni',
  next: 'następny',
  yesterday: 'wczoraj',
  tomorrow: 'jutro',
  today: 'dzisiaj',
  agenda: 'dziennik',

  showMore: total => `+${total} more`
}

export function set(key, msg){
  invariant(messages.hasOwnProperty(key),
    `The message key: "${key}" is not a valid message name. ` +
    `valid keys are: ${Object.keys(messages).join(', ')}`
  )

  messages[key] = msg;
}

export function result(msg, ...args){
  return typeof msg === 'function' ? msg(args) : msg
}

export default function messages(msgs){
  return {
    ...messages,
    ...msgs
  }
}
