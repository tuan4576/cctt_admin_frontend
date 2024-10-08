import { AxiosRequestConfig as OriginalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends OriginalAxiosRequestConfig {
  enableUploadFile?: boolean;
  enableJson?: boolean;
}

export type AxiosRequestConfig = CustomAxiosRequestConfig;
