import React, { useState } from 'react';
import Card from './Card';

export default function CardList({data}) {
  const { api, port } = data;
  const [expanded, setExpanded] = useState(api?.map(() => false));

  const onSelected = (index) => {
    const current = expanded[index];
    const nextExpanded = api.map(() => false);
    nextExpanded[index] = !current;
    setExpanded(nextExpanded);
  }

  return (
    <div>
      {
        api.map((e, index) => (
          <Card 
            id={`${e.method}-${index}`}
            method={e.method} 
            title={e.uri} 
            description={`http://localhost:${port}${e.uri}`} 
            expanded={expanded[index]} 
            handleChange={() => onSelected(index)} 
            responses={e.responses}
            uriKey={e.uri+e.method}
            port={port}
          />
        ))
      }
    </div>
  );
}
