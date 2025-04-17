import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'salary',
  title: 'Salary',
  type: 'document',
  fields: [
    defineField({
      name: 'employer',
      title: 'Employer',
      type: 'string',
    }),
    defineField({
      name: 'salary',
      title: 'Salary',
      type: 'number',
    }),
  
    defineField({
      name: 'date_received',
      title: 'Date Received',
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
 
})
