import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      {...props}
    />
  )
}

export const CardHeader: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`mb-4 ${className}`}
      {...props}
    />
  )
}

export const CardTitle: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <h3
      className={`text-xl font-semibold text-gray-900 ${className}`}
      {...props}
    />
  )
}

export const CardDescription: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <p
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  )
}

export const CardContent: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`${className}`}
      {...props}
    />
  )
}
