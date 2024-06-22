import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logLevel: LogLevel = LogLevel.Log;
  constructor() { }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  log(message: string): void {
    if (this.logLevel >= LogLevel.Log) {
      console.log(`LOG: ${message}`);
    }
  }

  debug(message: string): void {
    if (this.logLevel >= LogLevel.Debug) {
      console.debug(`DEBUG: ${message}`);
    }
  }

  info(message: string): void {
    if (this.logLevel >= LogLevel.Info) {
      console.info(`INFO: ${message}`);
    }
  }

  warn(message: string): void {
    if (this.logLevel >= LogLevel.Warn) {
      console.warn(`WARN: ${message}`);
    }
  }

  error(message: string, error?: any): void {
    if (this.logLevel >= LogLevel.Error) {
      console.error(`ERROR: ${message}`, error);
      Swal.fire({
        title: 'Error',
        text: `ERROR: ${message}`,
        icon: 'error',
      });
    }
  }
}

export enum LogLevel {
  Off = 0,
  Error,
  Warn,
  Info,
  Debug,
  Log
}
