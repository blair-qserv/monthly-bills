import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '7wv9b09h',
  dataset: 'production',
  token:'sktM0FBIC4t7HCUooexmnT6ZWpEOkN6Mh5DOyw7d2TvsQryNaUwHgaM5JJVwOTHJi40sdtAZvb2i5sAtBkV6Xj1VGaITKoUtluOgJtaME4Nm7HzlTuzKUKPMraYVU2EfDhISp3mAUBN1jpsppzWMqA8dHC25gS8REZAQMi2h1gIYR4rvkCf7',
  useCdn: false,
  apiVersion: '2023-01-01'

})

export default client
