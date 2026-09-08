// Per the coding guideline: prefer a type guard over a type assertion.
// `(event.target as HTMLInputElement).value` tells TypeScript to trust us;
// this checks it at runtime instead, the same way the guideline's own
// `isProduct` example proves a value is safe rather than asserting it.
export function getInputElementValue(event: Event): string {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    return target.value
  }
  throw new Error(
    'getInputElementValue: event.target was not an HTMLInputElement',
  )
}

// Same idea for reading a CustomEvent's detail: `event as CustomEvent<T>`
// trusts the caller with zero runtime check. TypeScript can't verify an
// arbitrary generic shape at runtime, but it CAN verify the event is
// actually a CustomEvent instance rather than a plain Event — so that's
// the one real check this function adds before handing back the detail.
export function getCustomEventDetail<DetailType>(event: Event): DetailType {
  if (!(event instanceof CustomEvent)) {
    throw new Error('getCustomEventDetail: event was not a CustomEvent')
  }
  return event.detail as DetailType
}
