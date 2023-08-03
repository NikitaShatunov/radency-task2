import type { Meta, StoryObj } from '@storybook/react';

import Cell  from '../components/Cell';

const meta = {
  title: 'Example/Cell',
  component: Cell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    styles: { control: oninput },
    children: { control: oninput }
  },
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Example: Story = {
  args: {
    children: 'June 5, 2022'
  },
};
