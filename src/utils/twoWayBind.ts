export function twoWayBind(state: string, setter: (val: any) => void) {
  return {
    value: state,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setter(e.target.value),
  };
}
