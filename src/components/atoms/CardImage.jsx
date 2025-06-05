import React from 'react';
      import ApperIcon from '@/components/ApperIcon';

      function CardImage({ icon, iconClassName = '', containerClassName = '' }) {
        return (
          <div className={`w-full h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center ${containerClassName}`}>
            <ApperIcon name={icon} className={`h-16 w-16 text-primary group-hover:scale-110 transition-transform ${iconClassName}`} />
          </div>
        );
      }

      export default CardImage;