import 'jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-testing-library';
import Heading from '.';

test('Heading', () => {
  const { getByText, rerender } = render(<Heading>Heading</Heading>);
  expect(getByText('Heading')).toHaveTextContent('Heading');
  rerender(<Heading variant="h2">Heading</Heading>);
  expect(getByText('Heading')).toHaveTextContent('Heading');
});