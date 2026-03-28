import { useParams } from 'react-router-dom';

export default function InfoPage() {
  const { pageId } = useParams<{ pageId: string }>();
  
  // Basic title formatting: "terms-of-use" -> "Terms Of Use"
  const formattedTitle = pageId 
    ? pageId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Information';

  return (
    <div className="page-container">
      <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="auth-title">{formattedTitle}</h1>
        <div style={{ marginTop: '24px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            Welcome to the <strong>{formattedTitle}</strong> page of FlipMini. 
            This is a placeholder page constructed as part of building the Flipkart-inspired UI.
          </p>
          <p style={{ marginTop: '16px' }}>
            In a real application, this page would contain detailed legal, company, or support information perfectly matching the context of {formattedTitle}. We've built this dynamic generic page to ensure all the footer links resolve correctly without causing a 404 error.
          </p>
        </div>
      </div>
    </div>
  );
}
