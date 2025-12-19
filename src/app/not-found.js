export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        color: '#2a1a45'
      }}>
        404 - Page Not Found
      </h2>
      <p style={{ 
        fontSize: '1rem', 
        color: '#666',
        marginBottom: '2rem'
      }}>
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3f2265',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '600'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3a8a'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3f2265'}
      >
        Go back home
      </a>
    </div>
  )
}
