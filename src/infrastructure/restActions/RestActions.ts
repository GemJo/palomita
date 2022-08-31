import Payload from '@/infrastructure/restActions/Payload';
import axios, { AxiosResponse } from 'axios';

const API_PATH = 'http://localhost:8085/api';

export default class RestActions {
  protected get(url: string, payload: Payload): Promise<AxiosResponse> {
    return RestActions.doCall('GET', url, payload);
  }

  protected post(url: string, payload: Payload): Promise<AxiosResponse> {
    return RestActions.doCall('POST', url, payload);
  }

  protected put(url: string, payload: Payload): Promise<AxiosResponse> {
    return RestActions.doCall('PUT', url, payload);
  }

  protected delete(url: string, payload: Payload): Promise<AxiosResponse> {
    return RestActions.doCall('DELETE', url, payload);
  }

  private static doCall(method: string, url: string, payload: Payload) {
    return axios({
      method,
      url: `${API_PATH}${url}`,
      data: payload,
      headers: {},
    })
      .then((response) => (
        response.status >= 200 && response.status < 300 ? response.data : Promise.reject(response)
      ))
      .catch((error) => Promise.reject(error));
  }
}
