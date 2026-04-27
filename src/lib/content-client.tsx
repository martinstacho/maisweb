'use client'
import { createContext, useContext } from 'react'

type ContentMap = Record<string, string>

const ContentContext = createContext<ContentMap>({})

export function ContentProvider({ children, content }: { children: React.ReactNode; content: ContentMap }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export function useContent() {
  const map = useContext(ContentContext)
  return (key: string, fallback?: string): string => map[key] ?? fallback ?? key
}
