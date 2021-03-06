import { MouseEvent as ReactMouseEvent, SyntheticEvent } from 'react';

type MyMouseEvent = ReactMouseEvent<HTMLButtonElement, MouseEvent>;

export default function getRepeatedMouseDownHandler<T extends SyntheticEvent>(initialInterval: number, repeatedInterval: number, handler: (_: T) => void) {
  let handleMouseUp = getHandleMouseUp(() => {});

  return (event: T) => {
    console.log('Starting tempo change');
    //We prevent the context menu because it interferes with the touchend event.
    document.addEventListener('contextmenu', preventContextMenu);

    handler(event);
    const timeoutId = setTimeout(() => {
      console.log('Started timeout');
      handler(event);
      const intervalId = setInterval(() => {
        console.log('Executing from interval');
        handler(event);
      }, repeatedInterval);
      handleMouseUp = getHandleMouseUp(() => clearInterval(intervalId));
    }, initialInterval);
    handleMouseUp = getHandleMouseUp(() => clearTimeout(timeoutId));

    event.target.addEventListener('mouseup', () => handleMouseUp());
    event.target.addEventListener('mouseout', () => handleMouseUp());
    event.target.addEventListener('touchend', () => handleMouseUp());

  };
  function preventContextMenu(event: Event) {
    return event.preventDefault();
  }

  function getHandleMouseUp(action: () => void) {
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      action();
    };
  }
}
