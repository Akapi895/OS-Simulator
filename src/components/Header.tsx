import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/process-scheduling', label: 'CPU Scheduling' },
  { to: '/deadlock', label: 'Deadlock' },
  // { to: '/memory', label: 'Memory Management' },
  { to: '/paging', label: 'Paging Replacement' },
  { to: '/disk-scheduling', label: 'Disk Scheduling' },
  { to: '/general-calculate', label: 'General Calculation' },
];

const Header = () => {
  const location = useLocation();
  return (
    <header
      style={{
        padding: '0 32px',
        background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
        color: '#fff',
        marginBottom: 24,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)', 
        borderRadius: '8px', 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: 64 }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: 24,
            marginRight: 40,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          OS Simulator
        </span>
        <nav style={{ display: 'flex', gap: 18 }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: location.pathname === item.to ? '#fbbf24' : '#fff',
                background: location.pathname === item.to ? 'rgba(255,255,255,0.15)' : 'transparent',
                padding: '8px 18px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.3s, color 0.3s, transform 0.2s',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item.label}
              {location.pathname === item.to && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    transform: 'translateY(2px)',
                    transition: 'transform 0.2s',
                    display: 'inline-block',
                    color: '#fbbf24',
                  }}
                >
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
