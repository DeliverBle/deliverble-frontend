import { HomeService } from '../api/home';
import { HOME_DATA } from './home.data';

export function homeDataMock(): HomeService {
  const getPrivateVideoData = async () => {
    await wait(500);
    return HOME_DATA;
  };
  const getPublicVideoData = async () => {
    await wait(500);
    return HOME_DATA;
  };

  return { getPrivateVideoData, getPublicVideoData };
}

const wait = (milliSeconds: number) => new Promise((resolve) => setTimeout(resolve, milliSeconds));
