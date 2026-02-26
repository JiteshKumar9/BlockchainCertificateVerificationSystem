export default function Footer() {
  const iconStyle = { 
    color: '#94a3b8', 
    transition: 'color 0.3s ease',
    ':hover': { color: '#3b82f6' }
  };
  
  const socialIcons = [
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com', 
      svg: <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.8v2.2h.1c.7-1.2 2.4-2.5 4.9-2.5 5.2 0 6.2 3.4 6.2 7.9V24h-5v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24H7V8z"/>
    },
    { 
      name: 'Twitter/X', 
      href: 'https://twitter.com', 
      svg: <path d="M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.38 1.89-2.39-.83.49-1.75.85-2.72 1.05A4.18 4.18 0 0 0 16.1 4c-2.33 0-4.21 1.92-4.21 4.29 0 .34.03.67.1.99C7.9 9.1 4.6 7.34 2.44 4.6c-.37.65-.58 1.39-.58 2.19 0 1.52.76 2.86 1.92 3.65-.71-.02-1.39-.22-1.98-.54v.05c0 2.12 1.48 3.89 3.44 4.29-.36.1-.75.15-1.15.15-.28 0-.55-.03-.81-.08.55 1.76 2.15 3.04 4.04 3.08A8.38 8.38 0 0 1 1 19.54a11.8 11.8 0 0 0 6.41 1.9c7.7 0 11.91-6.5 11.91-12.13l-.01-.55C21.2 7.64 21.9 6.87 22.46 6z"/>
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com', 
      svg: <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.5 0-.25-.01-1.08-.02-1.96-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.57 2.37 1.12 2.95.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.7.12 2.5.35 1.9-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.6.69.5A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com', 
      svg: <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07 1.86 17.1 5.53 21.22 10.3 22v-7.02H7.9v-2.91h2.4v-2.22c0-2.37 1.41-3.69 3.56-3.69 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.93h2.63l-.42 2.91h-2.21V22c4.77-.78 8.44-4.89 8.44-9.93z"/>
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com', 
      svg: <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5-2.75a.75.75 0 1 0 .75.75.75.75 0 0 0-.75-.75z"/>
    }
  ];

  return (
    <footer 
      style={{ 
        padding: '40px 20px',
        borderTop: '1px solid rgba(100, 116, 139, 0.2)', 
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        marginTop: '40px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: 16, 
        flexWrap: 'wrap'
      }}>
        <span 
          style={{ 
            color: '#94a3b8', 
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          © 2025 Blockchain Certificate Verification System. All rights reserved.
        </span>
        <div 
          style={{ 
            display: 'flex', 
            gap: 16, 
            alignItems: 'center', 
            flexWrap: 'wrap' 
          }}
        >
          <a 
            href="/help" 
            style={{ 
              color: '#94a3b8', 
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              ':hover': { 
                color: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#94a3b8';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Help
          </a>
          <a 
            href="mailto:support@example.com" 
            style={{ 
              color: '#94a3b8', 
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              ':hover': { 
                color: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#94a3b8';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Support
          </a>
          {socialIcons.map((icon) => (
            <a 
              key={icon.name}
              href={icon.href} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={icon.name}
              style={{
                color: '#94a3b8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#3b82f6';
                e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#94a3b8';
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                {icon.svg}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}


