
export class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    baseX: number;
    baseY: number;
    density: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.density = (Math.random() * 30) + 1;
        // Subtle particle colors: white/grey with varying opacity
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; 
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse: { x: number | null, y: number | null, radius: number }) {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                // Repel - move away from mouse
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Return to original position (optional, or just float freely)
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
        } else {
             // Return to original position if no mouse interaction
             if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
        
        // Add some random movement to make it look alive even when returning
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check (optional, if we want them to wrap or bounce, 
        // but since they have a base position, they might just jitter around it.
        // Let's update base position slowly to make them drift)
        this.baseX += this.speedX;
        this.baseY += this.speedY;
    }
}

export class ParticleSystem {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    particles: Particle[] = [];
    mouse: { x: number | null, y: number | null, radius: number };
    animationId: number | null = null;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-background';
        this.ctx = this.canvas.getContext('2d')!;
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
             this.mouse.x = null;
             this.mouse.y = null;
        });
    }

    init() {
        this.particles = [];
        // Calculate number of particles based on screen area
        const numberOfParticles = (window.innerWidth * window.innerHeight) / 9000; 
        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            this.particles.push(new Particle(x, y));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init(); // Re-initialize particles on resize to fill new area
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(this.ctx);
            this.particles[i].update(this.mouse);
        }
        
        // Connect particles with lines if they are close enough
        this.connect();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    connect() {
        let opacityValue = 1;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                let distance = ((this.particles[a].x - this.particles[b].x) * (this.particles[a].x - this.particles[b].x))
                             + ((this.particles[a].y - this.particles[b].y) * (this.particles[a].y - this.particles[b].y));
                
                if (distance < (this.canvas.width/7) * (this.canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    this.ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue * 0.05 + ')'; // Very faint lines
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.canvas.remove();
    }
}

export const renderParticleBackground = (container: HTMLElement) => {
    const particleSystem = new ParticleSystem();
    container.appendChild(particleSystem.canvas);
};
