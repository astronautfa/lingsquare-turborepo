'use client'

import ReviewEmptyState from '@/components/placeholders/review-empty-state';
import { DecksTableProvider } from '@/components/tables/decks/decks-table-provider';
import { api } from '@lingsquare/trpc/client';
import { Spinner } from '@ui/components';
import { DataTableSkeleton } from '@ui/components';
import React from 'react'

const DeckBox = () => {

  const { data: decks = [], isLoading } = api.deck.all.useQuery();

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (decks.length === 0) {
    return (
      <ReviewEmptyState />
    )
  } else {
    return (
      <div>
        {/* {decks.map((deck, index) => (
          <div key={index}>{deck.name}</div>
        ))} */}
        <DecksTableProvider>
          <React.Suspense
            fallback={
              <DataTableSkeleton
                columnCount={5}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                shrinkZero
              />
            }
          >
            {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
            {/* <TasksTable tasksPromise={tasksPromise} /> */}
          </React.Suspense>
        </DecksTableProvider>
      </div>
    )
  }
}

export default DeckBox