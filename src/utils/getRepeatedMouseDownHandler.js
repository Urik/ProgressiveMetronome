// @flow

export default function getRepeatedMouseDownHandler(initialInterval: number, repeatedInterval: number, handler: (MouseEvent) => void) {
  let handleMouseUp = getHandleMouseUp(() => {});

  return (event: MouseEvent) => {
    console.log('Starting tempo change');
    event.preventDefault();
    event.stopPropagation();

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

  function getHandleMouseUp(action) {
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);      
      action();
    };
  }
}