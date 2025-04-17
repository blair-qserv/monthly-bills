import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'daily',
  title: 'Daily Expenses',
  type: 'document',
  fields: [
    defineField({
      name: 'expense',
      title: 'Expense',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'number',
      options: {
        list: Array.from({ length: 12 }, (_, i) => ({ title: new Date(2025, i).toLocaleString('default', { month: 'long' }), value: i + 1 }))
      }
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      options: {
        list: Array.from({ length: 10 }, (_, i) => ({ title: `${2025 - i}`, value: 2025 - i }))
      }
    }),
  ],
})
