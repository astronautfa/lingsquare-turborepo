// eslint-disable-next-line no-redeclare
import React, { FC, ReactNode, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuContext } from './MenuProvider'
import { CommandWrapperProps } from './types'
import useClickOutside from './hooks/useClickOutside'
import useAnimation from './hooks/useAnimation'

import {
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbSeparator,
} from "@lingsquare/ui/src/components"

export const CommandWrapper: FC<
  CommandWrapperProps & { children: ReactNode }
> = ({ children, defaultValue }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    open,
    setOpen,
    placeholder,
    animate,
    query,
    setQuery,
    state,
    crumbs,
    input,
  } = useContext(MenuContext)

  useClickOutside({
    ref: menuRef,
    handler: () => setOpen(0),
  })

  const { firefox, prefersReducedMotion } = useAnimation()

  return (
    <div className='kmenu'>
      <AnimatePresence>
        {open > 0 && (
          <motion.div
            className='backdrop'
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <motion.div
              className='dialog bg-background border'
              role='dialog'
              aria-modal='true'
              ref={menuRef}
              initial={{
                opacity: firefox || prefersReducedMotion ? 1 : 0,
                scale: firefox || prefersReducedMotion ? 1 : 0.98,
              }}
              animate={{
                opacity: 1,
                scale: animate ? 0.97 : 1,
              }}
              exit={{
                opacity: firefox || prefersReducedMotion ? 1 : 0,
                scale: firefox || prefersReducedMotion ? 1 : 0.95,
              }}
            >
              <BreadCrumb variant={'ghost'} size={'sm'} className="gap-1 rounded-lg p-2">
                {crumbs?.map((crumb, index) => (
                  <span className="flex items-center justify-start">
                    <BreadCrumbItem onClick={() => setOpen(index + 1)} key={index} index={index} className='cursor-pointer'>
                      {crumb}
                    </BreadCrumbItem>
                    {crumbs.length > 0 && index !== crumbs.length - 1 && <BreadCrumbSeparator />}
                  </span>
                ))}
              </BreadCrumb>
              <input
                placeholder={placeholder || 'What do you need?'}
                defaultValue={defaultValue}
                value={query}
                className='searchbar'
                aria-expanded='true'
                aria-autocomplete='list'
                aria-haspopup='listbox'
                aria-readonly='true'
                role='combobox'
                autoFocus
                spellCheck='false'
                ref={input}
                aria-activedescendant={state.selected.toString()}
                onChange={(e) => setQuery(e.target.value)}
              />
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}