import './Auth.css'; // Reusing layout styles

export default function About() {
  return (
    <div className="page-container align-center">
      <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <h1 className="auth-title" style={{ textAlign: 'left', marginBottom: '24px' }}>About FlipMini</h1>
        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            FlipMini is a comprehensive frontend technical exercise inspired by industry-leading 
            e-commerce platforms like Flipkart. It serves as a demonstration of modern React development 
            practices.
          </p>
          
          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Core Features</h3>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Full product catalog with intelligent search and filtering</li>
            <li>Advanced cart management with dynamic quantity controls</li>
            <li>Persistent local backend powered by JSON Server</li>
            <li>Fully responsive design mimicking popular native e-commerce apps</li>
            <li>Seamless dark and light mode toggle</li>
            <li>Mock authentication and order tracking workflows</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', marginTop: '24px', marginBottom: '12px' }}>Technology Stack</h3>
          <p>
            Built from scratch utilizing <strong style={{ color: 'var(--accent-primary)' }}>React 18</strong>, <strong style={{ color: 'var(--accent-primary)' }}>TypeScript</strong>, and <strong style={{ color: 'var(--accent-primary)' }}>Vite</strong>. State is elegantly managed via React Context APIs, eliminating external dependency bloat. We also leverage CSS Variables for a robust internal design system.
          </p>
        </div>
      </div>
    </div>
  );
}
