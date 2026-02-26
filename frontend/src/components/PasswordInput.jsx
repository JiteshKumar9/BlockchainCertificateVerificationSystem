import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // eye icons

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  name = "password",
  style = {},
}) {
  const [show, setShow] = useState(false);

  const defaultStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const mergedStyle = { ...defaultStyle, ...style };

  return (
    <div style={{ position: "relative" }}>
      <input
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={mergedStyle}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{
          position: "absolute",
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease'
        }}
        aria-label="Toggle password visibility"
        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
