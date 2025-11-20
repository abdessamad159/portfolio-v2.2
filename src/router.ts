export type RouteHandler = (element: HTMLElement) => void;

export class Router {
  private routes: Record<string, RouteHandler> = {};
  private rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(path: string, handler: RouteHandler) {
    this.routes[path] = handler;
  }

  private handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.slice(1) || '/'; // Remove #
    
    // Default to root if route not found
    const handler = this.routes[path] || this.routes['/'];
    
    // Clear root element
    this.rootElement.innerHTML = '';
    
    // Create a container for the page content to allow for transitions
    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-content';
    this.rootElement.appendChild(pageContainer);
    
    // Render route
    handler(pageContainer);
    
    // Update active state in navigation
    document.dispatchEvent(new CustomEvent('route-changed', { detail: { path } }));
  }
}
