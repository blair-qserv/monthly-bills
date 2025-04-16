import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'billing',
  title: 'Billing',
  type: 'document',
  
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'due_date',
      title: 'Due Date',
      type: 'string',
  
    }),
    defineField({
      name: 'finished_date',
      title: 'Finished Date',
      type: 'string',
  
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'payment',
      title: 'Payment',
      type: 'string',
    }),
    defineField({
      name: 'account_number',
      title: 'Account No.',
      type: 'string',
    }),
    defineField({
      name: 'billing',
      title: 'Billing Name',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Paid', value: 'paid' },
          { title: 'Unpaid', value: 'unpaid' },
        ],
        layout: 'radio', // or 'dropdown' if you prefer
      },
      initialValue: 'unpaid', // optional default
    }) ,
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
 

  preview: {
    select: {
      title: 'name'
    }
  },
})
