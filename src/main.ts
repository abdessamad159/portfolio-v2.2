import './style.css'
import { renderIdentityCore } from './components/IdentityCore'
import { renderProjectsLayer } from './components/ProjectsLayer'
import { renderDigitalIdentity } from './components/DigitalIdentity'
import { renderMicroConsole } from './components/MicroConsole'
import { renderContact } from './components/Contact'
import { renderNavigation } from './components/Navigation'
import { Router } from './router'

const app = document.querySelector<HTMLDivElement>('#app')!;

// Render Navigation (Persistent)
const navContainer = document.createElement('div');
navContainer.id = 'nav-container';
app.appendChild(navContainer);
renderNavigation(navContainer);

// Create Content Container for Router
const contentContainer = document.createElement('main');
contentContainer.id = 'content-container';
app.appendChild(contentContainer);

// Initialize Router
const router = new Router(contentContainer);

// Define Routes
router.addRoute('/', (element) => {
  renderIdentityCore(element);
});

router.addRoute('/projects', (element) => {
  renderProjectsLayer(element);
});

router.addRoute('/about', (element) => {
  const diContainer = document.createElement('div');
  const consoleContainer = document.createElement('div');
  
  element.appendChild(diContainer);
  element.appendChild(consoleContainer);
  
  renderDigitalIdentity(diContainer);
  renderMicroConsole(consoleContainer);
});

router.addRoute('/contact', (element) => {
  renderContact(element);
});
