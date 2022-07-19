import { HomeService } from '../api/home';
import { HOME_DATA } from './home.data';

export function homeDataMock(): HomeService {
  const getVideoData = async () => {
    await wait(500);
    return HOME_DATA;
  };

  return { getVideoData };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
