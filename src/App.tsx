import { useState } from "react";
import { Form, Image } from "./components";

import mockData from "./mockData.json";

const App = () => {
  const correctAnswer = mockData.location;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [correctGuessIndex, setCorrectGuessIndex] = useState<
    undefined | number
  >(undefined);

  const onSubmit = (value: string) => {
    if (value === correctAnswer) {
      setCorrectGuessIndex(activeIndex);
      return;
    }

    setActiveIndex((prevIndex) => prevIndex + 1);
    console.log("submitted");
  };

  return (
    <div className="App">
      <header className="App-header">Where?</header>
      <Image
        images={mockData.images}
        activeIndex={activeIndex}
        correctGuessIndex={correctGuessIndex}
      />
      <Form
        onSubmit={onSubmit}
        activeIndex={activeIndex}
        correctGuessIndex={correctGuessIndex}
      />
    </div>
  );
};

export default App;
