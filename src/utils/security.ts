// Input sanitization and security utilities

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 10000) // Limit length
}

export const sanitizeObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj
  
  const sanitized: any = Array.isArray(obj) ? [] : {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value)
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
  }
  
  return sanitized
}

export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024
}

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type) || 
         allowedTypes.some(type => file.name.toLowerCase().endsWith(type.replace('application/', '.')))
}

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  
  constructor(private maxAttempts: number, private windowMs: number) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (validAttempts.length >= this.maxAttempts) {
      return false
    }
    
    validAttempts.push(now)
    this.attempts.set(key, validAttempts)
    return true
  }
  
  reset(key: string): void {
    this.attempts.delete(key)
  }
}
