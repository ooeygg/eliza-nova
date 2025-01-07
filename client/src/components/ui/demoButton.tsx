import React from 'react';
import { Button } from './button';

export const DemoButton = () => {
  return (
    <Button
      className="w-full max-w-md bg-primary/80 hover:bg-primary transition-colors duration-300 text-lg py-6"
      onClick={() => window.open('https://demo.novadova.com', '_blank')}
    >
      Try Demo
    </Button>
  );
};
