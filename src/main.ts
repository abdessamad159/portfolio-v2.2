import './style.css'
import { renderIdentityCore } from './components/IdentityCore'
import { renderProjectsLayer } from './components/ProjectsLayer'
import { renderDigitalIdentity } from './components/DigitalIdentity'
import { renderMicroConsole } from './components/MicroConsole'
import { renderContact } from './components/Contact'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header id="identity-core"></header>
  <main id="projects-layer"></main>
  <section id="digital-identity"></section>
  <footer id="contact-section"></footer>
`

renderIdentityCore(document.getElementById('identity-core')!)
renderProjectsLayer(document.getElementById('projects-layer')!)
renderDigitalIdentity(document.getElementById('digital-identity')!)
renderMicroConsole(document.getElementById('micro-console-wrapper')!)
renderContact(document.getElementById('contact-section')!)
