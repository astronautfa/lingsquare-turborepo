"use client"

import * as React from "react"
import { ReactLenis } from "@studio-freight/react-lenis"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

const lenisOptions = {
  lerp: 0.1,
  duration: 0.8,
  smoothTouch: true, //smooth scroll for touch devices
  smooth: true,
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  )
}
