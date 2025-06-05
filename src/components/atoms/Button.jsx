import React from 'react';

      function Button({ children, onClick, disabled, className = '', icon: Icon, variant = 'primary', ...props }) {
        const baseStyles = 'flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium';

        const variantStyles = {
          primary: 'bg-primary text-white hover:bg-primary-dark',
          secondary: 'bg-secondary text-white hover:bg-secondary-dark',
          outline: 'bg-transparent text-gray-700 border border-gray-200 hover:bg-gray-50',
          text: 'bg-transparent text-gray-700 hover:text-gray-900',
        };

        const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

        return (
          <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
            {...props}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {children}
          </button>
        );
      }

      export default Button;