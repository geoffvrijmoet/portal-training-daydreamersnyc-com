import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to safely render HTML content
export function formatHtmlContent(html: string) {
  if (typeof window === 'undefined') return { text: html, links: [] }

  // First, create a temporary div to parse the HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  
  // Get clean text
  const text = tempDiv.textContent || tempDiv.innerText || ''
  
  // Get all links
  const links = Array.from(tempDiv.getElementsByTagName('a')).map(a => ({
    text: a.textContent || '',
    href: a.href
  }))
  
  return { text, links }
}

// Helper function to get last name
export function getLastName(fullName: string): string {
  const nameParts = fullName.trim().split(' ')
  return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName
}
