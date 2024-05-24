import { Map as YMap, Placemark } from '@pbe/react-yandex-maps';
import { MAP_COORDS, MAP_ZOOM } from '../../consts/data';

interface Props {
  className?: string;
}

export function Map({ className }: Props) {
  return (
    <YMap
      width={'auto'}
      height={'auto'}
      style={{
        minHeight: 230,
        borderRadius: 10,
        overflow: 'hidden'
      }}
      defaultState={{
        center: MAP_COORDS,
        zoom: MAP_ZOOM,
      }}
      className={className}
    >
      <Placemark
        geometry={MAP_COORDS}
        defaultOptions={{ iconColor: '#0753A1' }}
      />
    </YMap>
  );
}
