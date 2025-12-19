'use client'

export default function Error({ error, reset }) {
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
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        color: '#2a1a45'
      }}>
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="transition-colors hover:bg-[#5a3a8a]"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3f2265',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600'
        }}
      >
        Try again
      </button>
    </div>
  )
}
