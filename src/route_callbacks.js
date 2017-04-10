import store from '../store';
import { fetchPhotos } from '../actions';

//dispatch is being used by redux-thunk
export function onPhotosEnter() {
  store.dispatch(fetchPhotos());
}