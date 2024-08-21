'use client'

import ReviewEmptyState from '@/components/placeholders/review-empty-state';
import { api } from '@lingsquare/trpc/client';
import { Spinner } from '@ui/components';
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
      <div>{
        decks.map((deck, index) => (
          <div key={index}>{deck.name}</div>
        ))}
      </div>
    )
  }
}

export default DeckBox