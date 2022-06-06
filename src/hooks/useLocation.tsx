import {useEffect, useRef, useState} from 'react';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import {Location} from '../interfaces/appInterfaces';
import {resolvePreset} from '@babel/core';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const watchId = useRef<number>();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) return;

      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
      setRouteLines(routes => [...routes, location]);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          res({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => rej({err}),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      err => console.log({err}),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    initialPosition,
    routeLines,
    userLocation,
    followUserLocation,
    getCurrentLocation,
    stopFollowUserLocation,
  };
};
