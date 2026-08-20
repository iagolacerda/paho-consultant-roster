// React
import React from 'react';
// Local
import { Tr, Td, SkeletonBar } from './styles';

const WIDTHS = ['55%', '80%', '45%', '65%', '50%', '70%', '40%', '60%'];

interface SkeletonRowProps {
  columns: number;
}

export function SkeletonRow({ columns }: SkeletonRowProps) {
  return (
    <Tr>
      {Array.from({ length: columns }, (_, i) => (
        <Td key={i}>
          <SkeletonBar $width={WIDTHS[i % WIDTHS.length]} />
        </Td>
      ))}
    </Tr>
  );
}
