import { getMessage } from './src/api/tivoliApi.ts';

//detta är också en testfil och ska ersättas. 

getMessage()
  .then(data => {
    console.log('Meddelande:', data); 
  })
  .catch(error => {
    console.error('Fel:', error);
  });
