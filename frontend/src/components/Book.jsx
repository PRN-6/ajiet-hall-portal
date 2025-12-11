import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"

const Book = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-1/2">
        <Calendar 
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border mt-12 [--cell-size:--spacing(20)] "
        />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Book;