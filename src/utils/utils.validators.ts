export function required(val: unknown) {
  return !!val || 'Required field';
}

export function url(val: string) {
  return (
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      val
    ) || 'Invalid url'
  );
}

export function min(min: number) {
  return function (value: string | number) {
    return Number(value) > min || `Must be greater than ${min}`;
  };
}
