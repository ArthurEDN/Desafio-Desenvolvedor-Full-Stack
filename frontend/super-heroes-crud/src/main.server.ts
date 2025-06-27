import 'zone.js/node';

import { bootstrapApplication } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app';

const config = {
  providers: [
    provideServerRendering(),
    provideHttpClient()
  ]
};

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;