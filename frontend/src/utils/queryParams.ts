export function optionalWithValue(arg: number | undefined, value: number) {
  return arg !== value ? arg : undefined;
}

export function listQueryParam(name: string, ids: number[]) {
  return ids.map((id) => `${name}=${id}`).join('&');
}

export function composeParams(params: string[]) {
  return `?${params.join('&')}`;
}
